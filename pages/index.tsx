import { useCallback, useEffect, useRef, useState } from "react";
import { QueryStatus, usePaginatedQuery, useQuery } from "react-query";
import { Box, Flex } from "rebass";
import CitySelect from "../components/CitySelect";
import DepartmentSelect from "../components/DepartmentSelect";
import NeighbourSelect from "../components/NeighbourSelect";
import RegionSelect from "../components/RegionSelect";
import Head from 'next/head'
import Comparison from '../components/presentational/Comparison';
import Button from "../components/presentational/Button";
import Image from "next/image";
import { CurrentEntityComparison } from '../components/score-comparison';
import { MOBILE_WIDTH } from '../constants/constants';
import { BrowserContextWrapper, useWindow } from "../contexts/browser-context";
import departments from '../constants/departments.json';
import { StaticDataContext, useStaticData } from '../contexts/static-data-context';
import { indexService } from "../services/index-service";
import type { ForDistrictIndexes } from "../services/index-types";
import { autocompleteService } from "../services/autocomplete-service";

const StatCard = ({ label, data }) => {
  const { innerWidth } = useWindow();

  return <Box bg={'Lighter grey'} px={20} mx={innerWidth < MOBILE_WIDTH ? 0 : 10} width={innerWidth < MOBILE_WIDTH ? 1 : 1 / 2} mb={10} sx={{ height: '190px' }}>
    <h3>{label}</h3>
    <Flex sx={{ alignItems: 'flex-end' }}>
      <span style={{ fontSize: `8em`, lineHeight: '0.8em' }}>{data ? data.global.toFixed(2) : 'N/A'}</span>
      <span>
        {data?.global_national && <Comparison label={'NATIONAL'} reference={data.global_national} value={data.global} />}
        {data?.global_region && <Comparison label={'REGION'} reference={data.global_region} value={data.global} />}
        {data?.global_dept && <Comparison label={'DEPARTEMENT'} reference={data.global_dept} value={data.global} />}
      </span>
    </Flex>
  </Box>
}

const print = () => {
  window.print();
}

const Print = () => {
  return <div className='no-print' style={{ position: "fixed", bottom: "10px", right: "10px" }}><Button onClick={() => print()}>Print</Button></div>
}

export default function Home(props) {
  return (
    <StaticDataContext.Provider value={props}>
      <BrowserContextWrapper>
        <BrowserHome />
      </BrowserContextWrapper>
    </StaticDataContext.Provider>
  );
}

const { initialData } = {
  initialData: { "global": 92.72245788574219, "global_region": null, "global_dept": null, "global_national": null, "iris_code": null, "information_access": { "global": 87.01314544677734, "global_region": null, "global_dept": null, "global_national": null, "monoparental_families_percent": null, "single_person_percent": null, "number_of_public_service_per_citizen": null, "number_of_public_services": null }, "numeric_interfaces_access": { "global": 93.69023132324219, "global_region": null, "global_dept": null, "global_national": null, "high_speed_internet_access_percent": null, "mobile_network_availability_percent": null, "percent_of_poor_people": null, "available_median_salary": null }, "administrative_competencies": { "global": 87.732177734375, "global_region": null, "global_dept": null, "global_national": null, "unemployed_percent": null, "_15_29_percent": null }, "numeric_competencies": { "global": 101.94441223144531, "global_region": null, "global_dept": null, "global_national": null, "percent_of_65_plus_people": null, "percent_of_people_without_grade": null } },
};

function BrowserHome() {

  const [region, setRegion] = useState('');
  const [department, setDepartment] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const { innerWidth } = useWindow();

  useEffect(() => {
    setDepartment('');
  }, [region]);

  useEffect(() => {
    setCity('');
  }, [region, department]);

  useEffect(() => {
    setDistrict('');
  }, [region, department, city]);

  const regions = useRef(Object.keys(departments)).current;

  const callback = useCallback(() => autocompleteService.autocompleteCities({ query: '', department: department.split(' - ')[0] }), [department]);
  const { data: cities, status: citiesStatus } = usePaginatedQuery<string[]>(['cities', `${department}`], callback);

  const { data, status } = usePaginatedQuery([`indices`, `${region}-${department}-${city}-${district}`], () => {
    if (district) {
      return indexService.indexDistrict(cities[city].districts.find(d => d && d.designation && d.designation === district).code_iris);
    }
    if (city) {
      return indexService.indexCity(cities[city].code_insee);
    }
    if (department) {
      return indexService.indexDepartmental(department);
    }
    if (region) {
      return indexService.indexRegional(region)
    }
    return initialData;
  }, {initialData});




  const address = ['NATIONAL', region, department, city, district].filter(name => name !== '').join(' > ');
  return (
    <>

      <Head>
        <title>INR - indice global de fragilité numérique</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div style={{ margin: '0 10px' }}>
        <Image src='/logo-inr.webp' width={300} height={104} alt="logo INR, Institut du Numérique Responsable" />
        <h1>INDICE NATIONAL DE FRAGILITÉ NUMÉRIQUE</h1>
        <p>La fragilité numérique est identifiée sur des critères liés à l'accès au numérique et sur le niveau de compétences de chacun et chacun.</p>

        <p>L’indice de fragilité numérique des territoires a été produit dans le cadre de l’IncubO du SGAR Occitanie avec le concours de l’ANSA en partenariat avec la Mednum, grâce au soutien du Fond de transformation pour l’action publique.</p>
      </div>

      <Flex sx={{ flexDirection: innerWidth < MOBILE_WIDTH ? 'column' : 'row' }}>
        <Box width={innerWidth < MOBILE_WIDTH ? 1 : 1 / 4} px={2}>
          <RegionSelect onChange={setRegion} regions={regions} />
        </Box>
        {region && <Box width={innerWidth < MOBILE_WIDTH ? 1 : 1 / 4} px={2}>
          <DepartmentSelect onChange={setDepartment} departments={departments[region]} />
        </Box>}
        {region && department && <Box width={innerWidth < MOBILE_WIDTH ? 1 : 1 / 4} px={2}>
          <CitySelect department={department} region={region} onChange={setCity} cities={cities} citiesStatus={citiesStatus} />
        </Box>}
        {region && department && city && <Box width={innerWidth < MOBILE_WIDTH ? 1 : 1 / 4} px={2}>
          <NeighbourSelect city={city} department={department} region={region} onChange={setDistrict} districts={cities[city].districts} />
        </Box>}
      </Flex>

      <h3 style={{ margin: '10px 10px' }}>Vous regardez l'indice de fragilité numérique calculé au niveau : {address.toUpperCase()}</h3>

      <Box bg={'Lighter grey'} px={20} mx={10} mb={20} sx={{ height: '190px', display: 'flow-root' }}>
        <Flex sx={{ alignItems: 'flex-end' }}>
          <StatCard data={data} label='GLOBAL' />
        </Flex>
      </Box>

      <Flex sx={{ flexDirection: innerWidth < MOBILE_WIDTH ? 'column' : 'row' }} px={2}>
        <StatCard data={data?.information_access} label='ACCÈS À L’INFORMATION' />
        <StatCard data={data?.numeric_interfaces_access} label='ACCÈS AUX INTERFACES NUMÉRIQUES' />
      </Flex>
      <Flex sx={{ flexDirection: innerWidth < MOBILE_WIDTH ? 'column' : 'row' }} px={2}>
        <StatCard data={data?.numeric_competencies} label='CAPACITÉS D’USAGE DES INTERFACES NUMÉRIQUES' />
        <StatCard data={data?.administrative_competencies} label='COMPÉTENCES ADMINISTRATIVES' />
      </Flex>


      <CurrentEntityComparison
        region={region}
        department={department}
        city={city}
        district={district}
      />

      <div style={{ margin: '0 10px' }}>
        <h2>SOURCES DES DONNÉES</h2>

        <p>Les données utilisées pour construire cet indicateur de fragilité numérique proviennent de bases publiées en Open Data (data.gouv.fr, Insee ) :</p>

        <p>INSEE :</p>

        <ul>
          <li><a href="https://www.insee.fr/fr/statistiques/4228434" target="_blank">Population en 2016 Recensement de la population - Base infracommunale (IRIS)</a></li>
          <li><a href="https://www.insee.fr/fr/statistiques/4228428" target="_blank">Couples - Familles - Ménages en 2016 - Recensement de la population - Base infracommunale (IRIS)</a></li>
          <li><a href="https://www.insee.fr/fr/statistiques/4228430" target="_blank">Diplômes - Formation en 2016 - Recensement de la population - Base infracommunale (IRIS)</a></li>
          <li><a href="https://www.insee.fr/fr/statistiques/4190004" target="_blank">Revenus et pauvreté des ménages en 2016 - Dispositif Fichier localisé social et fiscal (Filosofi)</a></li>
          <li><a href="https://www.insee.fr/fr/statistiques/4217503" target="_blank">Revenus, pauvreté et niveau de vie en 2015 (IRIS) - Dispositif Fichier localisé social et fiscal (Filosofi)</a></li>
        </ul>

        <p>Data.Gouv.fr :</p>

        <ul>
          <li><a href="https://www.data.gouv.fr/fr/datasets/le-marche-du-haut-et-tres-haut-debit-fixe-deploiements/" target="_blank">Le marché du haut et très haut débit fixe (déploiements)</a></li>
          <li><a href="https://www.data.gouv.fr/fr/datasets/mon-reseau-mobile/" target="_blank">Mon réseau mobile</a></li>
        </ul>
      </div>

      <Print />
    </>
  );
}
