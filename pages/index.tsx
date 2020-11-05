import { useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import { Box, Flex } from "rebass";
import CitySelect from "../components/CitySelect";
import DepartmentSelect from "../components/DepartmentSelect";
import NeighbourSelect from "../components/NeighbourSelect";
import RegionSelect from "../components/RegionSelect";
import Head from 'next/head'
import Comparison from '../components/presentational/Comparison';
import Button from "../components/presentational/Button";
import Image from "next/image";
import ComparisonTable from '../components/ScoreComparison';

const MOBILE_WIDTH = 1310;

const StatCard = ({ windowWidth, label, data }) => {
  return <Box bg={'Lighter grey'} px={20} mx={windowWidth < MOBILE_WIDTH ? 0 : 10} width={windowWidth < MOBILE_WIDTH ? 1 : 1 / 2} mb={10} sx={{ height: '190px' }}>
    <h3>{label}</h3>
    <Flex sx={{ alignItems: 'flex-end' }}>
      <span style={{ fontSize: `8em`, lineHeight: '0.8em' }}>{data.global}</span>
      <span>
        {data.globalNational && <Comparison label={'NATIONAL'} reference={data.globalNational} value={data.global} />}
        {data.globalRegion && <Comparison label={'REGION'} reference={data.globalRegion} value={data.global} />}
        {data.globalDept && <Comparison label={'DEPARTEMENT'} reference={data.globalDept} value={data.global} />}
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

export default function Home({ initialData }) {
  const [region, setRegion] = useState('');
  const [department, setDepartment] = useState('');
  const [city, setCity] = useState('');
  const [neighbour, setNeighbour] = useState('');
  const [windowWidth, setWindowWidth] = useState(0);

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const { data, status } = useQuery(`${region}-${department}-${city}-${neighbour}`, () => initialData, {
    initialData
  });

  const address = ['NATIONAL', region, department, city, neighbour].filter(name => name !== '').join(' > ');
  return (
    <>
      <Head>
        <title>INR - indice global de fragilité numérique</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div style={{ margin: '0 10px' }}>
      <Image src='/logo-inr.webp' width={300} height={104} alt="logo INR, Institut du Numérique Responsable"/>
        <h1>INDICE NATIONAL DE FRAGILITÉ NUMÉRIQUE</h1>
        <p>La fragilité numérique est identifiée sur des critères liés à l'accès au numérique et sur le niveau de compétences de chacun et chacun.</p>

        <p>L’indice de fragilité numérique des territoires a été produit dans le cadre de l’IncubO du SGAR Occitanie avec le concours de l’ANSA en partenariat avec la Mednum, grâce au soutien du Fond de transformation pour l’action publique.</p>
      </div>

      <Flex sx={{ flexDirection: windowWidth < MOBILE_WIDTH ? 'column' : 'row' }}>
        <Box width={windowWidth < MOBILE_WIDTH ? 1 : 1 / 4} px={2}>
          <RegionSelect onChange={setRegion} />
        </Box>
        {region && <Box width={windowWidth < MOBILE_WIDTH ? 1 : 1 / 4} px={2}>
          <DepartmentSelect region={region} onChange={setDepartment} />
        </Box>}
        {region && department && <Box width={windowWidth < MOBILE_WIDTH ? 1 : 1 / 4} px={2}>
          <CitySelect department={department} region={region} onChange={setCity} />
        </Box>}
        {region && department && city && <Box width={windowWidth < MOBILE_WIDTH ? 1 : 1 / 4} px={2}>
          <NeighbourSelect city={city} department={department} region={region} onChange={setNeighbour} />
        </Box>}
      </Flex>

      <h3 style={{ margin: '10px 10px' }}>Vous regardez l'indice de fragilité numérique calculé au niveau : {address.toUpperCase()}</h3>

      <Box bg={'Lighter grey'} px={20} mx={10} mb={20} sx={{ height: '190px', display: 'flow-root' }}>
        <h3>GLOBAL</h3>
        <Flex sx={{ alignItems: 'flex-end' }}>
          <span style={{ fontSize: `8em`, lineHeight: '0.8em' }}>{data.global}</span>
          <span style={{ fontSize: `5em`, lineHeight: '0.8em' }}>
            POINTS
          </span>
        </Flex>
      </Box>

      <Flex sx={{ flexDirection: windowWidth < MOBILE_WIDTH ? 'column' : 'row' }} px={2}>
        <StatCard data={data.informationAccess} label='ACCÈS À L’INFORMATION' windowWidth={windowWidth} />
        <StatCard data={data.numericInterfacesAccess} label='ACCÈS AUX INTERFACES NUMÉRIQUES' windowWidth={windowWidth} />
      </Flex>
      <Flex sx={{ flexDirection: windowWidth < MOBILE_WIDTH ? 'column' : 'row' }} px={2}>
        <StatCard data={data.numericCompetencies} label='CAPACITÉS D’USAGE DES INTERFACES NUMÉRIQUES' windowWidth={windowWidth} />
        <StatCard data={data.administrativeCompetencies} label='COMPÉTENCES ADMINISTRATIVES' windowWidth={windowWidth} />
      </Flex>


      <ComparisonTable/>

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

export const getStaticProps = () => {
  return {
    props: {
      initialData: {
        global: 145,
        "informationAccess": {
          "global": 150,
          "globalNational": 130,
          "globalRegion": 170,
          "globalDept": 154,
          "monoparentalFamiliesPercent": 0.25,
          "singlePersonPercent": 0.25,
          "numberOfPublicServicePerCitizen": 0.25,
          "numberOfPublicServices": 0
        },
        "numericInterfacesAccess": {
          "global": 140,
          "highSpeedInternetAccessPercent": 1,
          "mobileNetworkAvailabilityPercent": 0.98,
          "percentOfPoorPeople": 0.19,
          "availableMedianSalary": 20243.00
        },
        "administrativeCompetencies": {
          "global": 120,
          "unemployedPercent": 0.16,
          "15-29Percent": 0.13
        },
        "numericCompetencies": {
          "global": 130,
          "percentOf65+People": 0.17,
          "percentOfPeopleWithoutGrade": 0.16
        }
      }
    }
  }
}
