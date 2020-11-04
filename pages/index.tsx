import { useState } from "react";
import { useQuery } from "react-query";
import { Box, Flex } from "rebass";
import CitySelect from "../components/CitySelect";
import DepartmentSelect from "../components/DepartmentSelect";
import NeighbourSelect from "../components/NeighbourSelect";
import RegionSelect from "../components/RegionSelect";

export default function Home({ initialData }) {
  const [region, setRegion] = useState('');
  const [department, setDepartment] = useState('');
  const [city, setCity] = useState('');
  const [neighbour, setNeighbour] = useState('');

  const { data, status } = useQuery(`${region}-${department}-${city}-${neighbour}`, () => { }, {
    initialData
  });

  console.log(data)
  return (
    <>
      <Flex>
        <Box width={!region ? 1 : !department ? 1 / 2 : !city ? 1 / 3 : 1 / 4} mx={2}>
          <RegionSelect onChange={setRegion} />
        </Box>
        <Box width={!department ? 1 / 2 : !city ? 1 / 3 : 1 / 4} mx={2} sx={{ visibility: region ? undefined : 'hidden' }}>
          <DepartmentSelect region={region} onChange={setDepartment} />
        </Box>
        <Box width={!city ? 1 / 3 : 1 / 4} mx={2} sx={{ visibility: region && department ? undefined : 'hidden' }}>
          <CitySelect department={department} region={region} onChange={setCity} />
        </Box>
        <Box width={!city ? 1 / 3 : 1 / 4} mx={2} sx={{ visibility: region && department && city ? undefined : 'hidden' }}>
          <NeighbourSelect city={city} department={department} region={region} onChange={setNeighbour} />
        </Box>
      </Flex>

      <Box >
        <h2 style={{fontSize: `2.2em`}}><span style={{fontSize: `3em`}}>150</span> <span style={{fontSize: `1.8em`}}>indice global de fragilite numérique</span></h2>
      </Box>
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
