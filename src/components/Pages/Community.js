import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import booleanWithin from "@turf/boolean-within";
import { quantileRank } from 'simple-statistics'
import { nicelyFormatNumber } from "../../utils";
import { loadDataAndBins } from "../../actions";

import {
  Gutter,
  NavBar,
  VariablePanel,
  Footer,
  Pm25Report,
  Table,
} from "../../components"; //  Scaleable, Draggable, InfoBox, TopPanel, Preloader,
import useFilterData from "../../hooks/useFilterData";
import useProcessData from "../../hooks/useProcessData";
import { defaultData } from "../../config";
import styled from "styled-components";

import { ContentContainer } from "../../styled_components";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, TextField, Button, ButtonGroup, Typography } from "@mui/material";
import TableComponent from "../Table";

const CommunityPage = styled.div`
  background: white;
  h3 {
    font-size:1.5rem;
    font-weight:bold;
    border-bottom:2px solid #e83f6f;
  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  opacity: ${({usingGeolocate}) => usingGeolocate ? 0.5 : 1};
  transition:250ms opacity;
  &:hover {
    opacity:1;
  }
`

const typeTranslation = {
  zip_code: "Zip Code",
  community: "Community",
  geoid: "Census Tract",
};

function titleCase(str) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

const getUniqueList = (features, cols) => {
  let returnList = [];
  let cacheList = [];
  for (let j = 0; j < cols.length; j++) {
    for (let i = 0; i < features.length; i++) {
      const entry = features[i].properties[cols[j]];
      if (!cacheList.includes(entry) && !!entry) {
        cacheList.push(entry);
        returnList.push({
          label: titleCase(entry),
          type: typeTranslation[cols[j]],
        });
      }
    }
  }
  return returnList;
};

const TypeSpan = styled.span`
  font-size: 0.5em;
  font-weight: bold;
  text-transform: uppercase;
  width: 10%;
`;

const metricsToParse = [
  {
    name: "population",
    accessor: (row) => row.properties.acs_population,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "asthma",
    accessor: (row) => row.properties.cities_asthma_prev,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "asthmaAgeAdj",
    accessor: (row) => row.properties.asthma_age_adj_rate,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "copd",
    accessor: (row) => row.properties.cities_copd_prev,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "density",
    accessor: (row) => row.properties.acs_population / (row.properties.aland),
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => (data.accumulated / data.values.length),
  },
  {
    name: "treeNumber",
    accessor: (row) => row.properties.trees_area,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "treeDensity",
    accessor: (row) => row.properties.trees_crown_den,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "floodSusceptibility",
    accessor: (row) => row.properties.urban_flood_suscep,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "heatIsland",
    accessor: (row) => row.properties.heatisl,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "pm25",
    accessor: (row) => row.properties.nn_q3_pm2_5,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "traffic",
    accessor: (row) => row.properties.logtraf,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  // econ
  {
    name: "hardship",
    accessor: (row) => row.properties.hardship,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "svi",
    accessor: (row) => row.properties.svi_percentile,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  // race
  {
    name: "White",
    accessor: (row) => [(+row.properties.pct_white * +row.properties.acs_population) || 0, +(row.properties.acs_population) || 0],
    accumulator: ([prevVal, prevPop], [val, pop]) => [prevVal + val, prevPop + pop],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
  {
    name: "Black or African American",
    accessor: (row) => [(+row.properties.pct_black * +row.properties.acs_population) || 0, +(row.properties.acs_population) || 0],
    accumulator: ([prevVal, prevPop], [val, pop]) => [prevVal + val, prevPop + pop],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
  {
    name: "Native American",
    accessor: (row) => [(+row.properties.pct_nativeam * +row.properties.acs_population) || 0, +(row.properties.acs_population) || 0],
    accumulator: ([prevVal, prevPop], [val, pop]) => [prevVal + val, prevPop + pop],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
  {
    name: "Asian",
    accessor: (row) => [(+row.properties.pct_asian * +row.properties.acs_population) || 0, +(row.properties.acs_population) || 0],
    accumulator: ([prevVal, prevPop], [val, pop]) => [prevVal + val, prevPop + pop],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
  {
    name: "All additional races and ethnicities",
    accessor: (row) => [(+row.properties.pct_other * +row.properties.acs_population) || 0, +(row.properties.acs_population) || 0],
    accumulator: ([prevVal, prevPop], [val, pop]) => [prevVal + val, prevPop + pop],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
];

const columnsToPresent = [
  {
    name: "Population",
    accessor: (row) => row.population.accumulated,
    vals: (row) => row.population.values,
  },
  {
    name: "Average Population Density (1,000s of people per square mile)",
    accessor: (row) => row.density.reduced,
    vals: (row) => row.density.values,
  },
  {
    name: "Average Air Pollution (PM2.5)",
    accessor: (row) => row.pm25.reduced,
    vals: (row) => row.pm25.values,
  },
  {
    name: "Average Traffic Volume",
    accessor: (row) => row.traffic.reduced,
    vals: (row) => row.traffic.values,
  },
  {
    name: "Number of Trees",
    accessor: (row) => row.treeNumber.accumulated,
    vals: (row) => row.treeNumber.values,
  },
  {
    name: "Average Tree Density",
    accessor: (row) => row.treeDensity.reduced,
    vals: (row) => row.treeDensity.values,
  },
  {
    name: "Average Heat Island Effect",
    accessor: (row) => row.heatIsland.reduced,
    vals: (row) => row.heatIsland.values,
  },
  {
    name: "Average Economic Hardship Index",
    accessor: (row) => row.hardship.reduced,
    vals: (row) => row.hardship.values,
  },
];

const reportColumns = [
  {
    Header: '',
    accessor: 'Label',
    width: 900
  },
  {
    Header: '',
    accessor: 'Value',
    width: 60
  },
  {
    Header: '',
    accessor: 'Description',
    width: 150
  },
]

const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const ColorSpan = styled.span`
  color: ${props => props.color || 'black'};
  background-color: ${props => props.backgroundColor || 'none'};
  padding: 0.25em;
`
const ReportSection = styled.section`
  h2 {
    font-size: 1.5rem;
    font-family: 'Lora',serif;
  }
  ul {
    list-style: none;
    padding-left:.5em;
    li {
      &::before {
        content: "-";
        padding-right:.5em;
      }
    }
  }
`;

const GeolocateSection = styled.section``;

function App() {
  // state mgmt
  const features = useSelector((state) => state.storedGeojson?.features) || [];
  const dispatch = useDispatch();
  // data loading
  const handleData = async () => {
    const data = await fetch(
      `${process.env.PUBLIC_URL}/geojson/${defaultData}`
    ).then((r) => r.json());
    dispatch(loadDataAndBins(data));
  };
  useEffect(() => {
    if (!(features && features.length)) {
      handleData();
    }
    // eslint-disable-next-line
  }, []);

  // local state
  const [currentLocation, setCurrentLocation] = useState({});
  const searchList = useMemo(() => {
    if (features && features.length) {
      return getUniqueList(features, ["community", "zip_code", "geoid"]);
    } else {
      return [];
    }
  }, [features && features.length]);

  // geolocation

  const [geolocateType, setGeolocateType] = useState("Zip Code");
  const [geolocatingStatus, setGeolocatingStatus] = useState({
    status: "passive",
    message: "",
  });
  const handleGeolocate = () => {
    if ("geolocation" in navigator) {
      console.log("Geolocaiton Available");
    } else {
      setGeolocatingStatus({
        status: "error",
        message: `Geolocation service not available`
      });
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const point = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [position.coords.longitude, position.coords.latitude],
          },
        };
        const intersectingFeature = features.find((feature) =>
          booleanWithin(point, feature)
        );

        if (intersectingFeature) {
          setGeolocatingStatus({
            status: "success",
            message: `Successfully located you at ${Math.round(1000 * position.coords.latitude) / 1000
              }, ${Math.round(1000 * position.coords.longitude) / 1000}`,
            data: intersectingFeature,
          });
          const locationInfo = {
            type: geolocateType,
            label:
              geolocateType === "Zip Code"
                ? intersectingFeature.properties.zip_code
                : geolocateType === "Community"
                  ? titleCase(intersectingFeature.properties.community)
                  : intersectingFeature.properties.geoid,
          };
          setCurrentLocation(locationInfo);
        } else {
          setGeolocatingStatus({
            status: "error",
            message: `Successfully located you, but outside of Chicago. Interested in a different area? Email us at [email...]`,
          });
        }
      },
      (error) => {
        console.log(error);
        setGeolocatingStatus({
          status: "error",
          message: error.message,
        });
      }
    );
  };
  useEffect(() => {
    if (geolocatingStatus.data) {
      const intersectingFeature = geolocatingStatus.data;
      setCurrentLocation({
        type: geolocateType,
        label:
          geolocateType === "Zip Code"
            ? intersectingFeature.properties.zip_code
            : geolocateType === "Community"
              ? titleCase(intersectingFeature.properties.community)
              : intersectingFeature.properties.geoid,
      });
    }
  }, [geolocateType]);
  // filter and summary data

  const filterFunc = useMemo(
    () =>
      currentLocation.type === "Zip Code"
        ? (f) => f.properties.zip_code === currentLocation.label
        : currentLocation.type === "Community"
          ? (f) => f.properties.community === currentLocation.label.toUpperCase()
          : (f) => f.properties.geoid === currentLocation.label,
    [JSON.stringify(currentLocation)]
  );

  const filteredFeatures = useFilterData({
    data: features,
    filterFunc,
    updateTrigger: currentLocation,
  });

  // summarize data
  const [summaries, summariesTimestamp] = useProcessData({
    data: features,
    metrics: metricsToParse,
    updateTrigger: features.length,
  });

  const [filteredSummaries, filteredSummariesTimestamp] = useProcessData({
    data: filteredFeatures,
    metrics: metricsToParse,
    updateTrigger: filteredFeatures.length && JSON.stringify(filteredFeatures),
  });

  const transposedData = columnsToPresent.map(
    ({ name, accessor, vals }, id) => ({
      name,
      id,
      chicago: accessor(summaries),
      [currentLocation.label]: accessor(filteredSummaries),
      chicagoVals: vals(summaries),
      [currentLocation.label + "vals"]: vals(filteredSummaries),
    })
  );

  const columns = [
    { accessor: "name", Header: "Measure", maxWidth: 50 },
    {
      accessor: "chicago",
      Header: "Chicago",
      width: 70,
      type: "number",
      Cell: ({ value }) => <>{nicelyFormatNumber(value)}</>,
    },
    {
      accessor: currentLocation.label,
      Header: currentLocation.label,
      width: 70,
      type: "number",
      Cell: ({ value }) => <>{nicelyFormatNumber(value)}</>,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'lastName') || ''
    //     }`,
    // },
  ];
  const dataReady =
    currentLocation?.label &&
    transposedData.length &&
    transposedData[0][currentLocation.label] !== undefined;

  // metadata helpers
  const ethnicMajority = ["White", "Black or African American", "Native American", "Asian", "All additional races and ethnicities"].find(raceEthnicity => filteredSummaries[raceEthnicity] ? filteredSummaries[raceEthnicity].reduced > 50 : false)
  const densityPercentile = dataReady && quantileRank(summaries.density.values, filteredSummaries.density.reduced)

  return (
    <CommunityPage>
      <NavBar />
      <ContentContainer>
        <h1>Community</h1>
        <h2>Alert! This page is a work in progress.</h2>
        <p>
          ChiVes community reports provide information and context about your
          community, zip code, or census tract. To start, search for your
          location or use your current location.
        </p>
        <Gutter height="2em" />
        <StyledAutocomplete
          disablePortal
          id="combo-box-demo"
          options={searchList}
          sx={{ width: "100%" }}
          usingGeolocate={geolocatingStatus.status === "success"}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for your community (zip code, community name, or census tract ID)"
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <TypeSpan>{option?.type}</TypeSpan> {option?.label}
            </Box>
          )}
          onChange={(e, value) => {
            !([null, undefined].includes(value)) && setCurrentLocation(value)
            !([null, undefined].includes(value)) && setGeolocatingStatus({
              status: "passive",
              message: "",
            })
          }}
        />
        <GeolocateSection>
          <Button
            variant="outlined"
            color={
              geolocatingStatus.status === "passive"
                ? "primary"
                : geolocatingStatus.status
            }
            style={{
              margin: "0em 2em  0 0 ",
            }}
            onClick={handleGeolocate}
          >
            Use my current location
          </Button>
          <ButtonGroup
            aria-label="outlined primary button group"
            style={{
              margin: "2em 1em  0 0 ",
            }}
          >
            {["Zip Code", "Community", "Census Tract"].map((type) => (
              <Button
                variant={geolocateType === type ? "contained" : "outlined"}
                onClick={() => setGeolocateType(type)}
                disabled={geolocatingStatus.status !== "success"}
              >
                {type}
              </Button>
            ))}
          </ButtonGroup>
          {["error", "success"].includes(geolocatingStatus.status) && (
            <Typography
              style={{
                color:
                  geolocatingStatus.status === "error"
                    ? "#d32f2f"
                    : "rgb(46, 125, 50)",
                margin: ".5em 0 0 0",
              }}
            >
              {geolocatingStatus.message}
            </Typography>
          )}
        </GeolocateSection>
        <Gutter height="2em" />
        {!!dataReady && (
          <>
            <ReportSection>
              {currentLocation.type === "Zip Code" && (
                <h2>
                  Your zip code:{" "}
                  <ColorSpan color={'#e83f6f'}>
                    {currentLocation.label}, part of{" "}
                    {filteredFeatures
                      .map((f) => titleCase(f.properties.community))
                      .filter(onlyUnique)
                      .join(", ")}
                    , and {filteredFeatures.length} census tracts.
                  </ColorSpan>
                </h2>
              )}
              {currentLocation.type === "Community" && (
                <h2>
                  Your community:{" "}                  
                  <ColorSpan color={'#e83f6f'}>
                    {currentLocation.label}, including zip codes{" "}
                    {filteredFeatures
                      .map((f) => f.properties.zip_code)
                      .filter(onlyUnique)
                      .join(", ")}
                    , and {filteredFeatures.length} census tracts.
                  </ColorSpan>
                </h2>
              )}
              {currentLocation.type === "Census Tract" && (
                <h2>
                  Your census tract:{" "}   
                  <ColorSpan color={'#e83f6f'}>
                    {currentLocation.label}, located in{" "}
                    {filteredFeatures
                      .map((f) => titleCase(f.properties.community))
                      .filter(onlyUnique)
                      .join(", ")}{" "}
                    and zip code{" "}
                    {filteredFeatures
                      .map((f) => f.properties.zip_code)
                      .filter(onlyUnique)
                      .join(", ")}
                    .
                  </ColorSpan>
                </h2>
              )}
              {/* <h3>
              Key indicators for environmental and air quality show us how
              healthy it is for people.{" "}
            </h3>
            <ul>
              <li>
                Air Quality PM2.5{" "}
                <Pm25Report value={filteredSummaries.pm25.reduced} />
              </li>
            </ul>

            <h3>
              Key outcomes show the (often unequal) impacts of environmental
              factors on health.
              <br />
              These outcomes relate to a number of factors, but the environment
              is a central part.
            </h3> */}
            </ReportSection>
            <ReportSection>
              <h3><ColorSpan color={'#e83f6f'}>
                Environmental Indicators in {currentLocation.label}
              </ColorSpan>
              </h3>
              <TableComponent
                columns={reportColumns}
                data={[{
                  Label: 'Average Air Polution (PM2.5)',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.pm25?.reduced !== undefined && filteredSummaries.pm25.reduced.toFixed(1)}</ColorSpan>,
                  Description: 'Presence of particulates in the air, smaller than 2.5 microns in size. Estimated during January through August over 2014-2018.'
                }, {
                  Label: 'Heat Island Effect',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.heatIsland?.reduced !== undefined && filteredSummaries.heatIsland.reduced.toFixed(1)}</ColorSpan>,
                  Description: 'The surface heat on a scale of 0-100, where 100 is the hottest in Chicago and 0 is the coldest.'
                }, {
                  Label: 'Urban Flood Susceptibility',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.floodSusceptibility?.reduced !== undefined && filteredSummaries.floodSusceptibility.reduced.toFixed(1)}</ColorSpan>,
                  Description: 'A FEMA index, where 0 is less susceptible and 10 is more susceptible.'
                }, {
                  Label: 'Average Traffic Volume',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.traffic?.reduced !== undefined && filteredSummaries.traffic.reduced.toFixed(1)}</ColorSpan>,
                  Description: 'The average daily traffic count per road segment over a year, scaled logarithmically.'
                }, {
                  Label: 'Tree Crown Density',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.treeDensity?.reduced !== undefined && filteredSummaries.treeDensity.reduced.toFixed(1)}</ColorSpan>,
                  Description: 'Percent of the area covered by trees.'
                }]}
                tableProps={{
                  style: {
                    fontSize: '1rem'
                  }
                }}
                rowProps={{
                  style: {
                    padding: '.5em',
                  }
                }}
              />
            </ReportSection>
            <Gutter height="2em" />
            <ReportSection>
              <h3><ColorSpan color={'#e83f6f'}>
                People living in {currentLocation.label}
              </ColorSpan>
              </h3>
              <TableComponent
                columns={reportColumns}
                data={[{
                  Label: 'Residents',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.population?.reduced !== undefined && Math.round(filteredSummaries.population.reduced).toLocaleString()}</ColorSpan>,
                }, {
                  Label: 'Population Density',
                  Value: <><ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.density?.reduced !== undefined && Math.round(filteredSummaries.density.reduced * 1e6).toLocaleString()}</ColorSpan> people per square kilometer</>,
                  Description: `
                  About the density of ${filteredSummaries?.density?.reduced !== undefined && Math.round(filteredSummaries.density.reduced * 2e4).toLocaleString()} people in 
                  a downtown city block. ${currentLocation.label} is denser than ${Math.round(densityPercentile * 100)}% of Chicago.`
                }, {
                  Label: 'Race and Ethnicity',
                  Value: ethnicMajority ? `Majority ${ethnicMajority}` : 'Diverse',
                  Description: `People in ${currentLocation.label} are made up of the following races and ethnicities: ${filteredSummaries['Black or African American'].reduced}% of residents are Black or African American, ${filteredSummaries['Native American'].reduced}% are Native American or Indigenous, ${filteredSummaries['Asian'].reduced}% are Asian, ${filteredSummaries['White'].reduced}% are White, and ${filteredSummaries['All additional races and ethnicities'].reduced}% of people come from additional races or ethnicities.`
                }]}
                tableProps={{
                  style: {
                    fontSize: '1rem'
                  }
                }}
                rowProps={{
                  style: {
                    padding: '.5em',
                  }
                }}
              />
            </ReportSection>
            <Gutter height="2em" />
            <ReportSection>
              <h3><ColorSpan color={'#e83f6f'}>
                Health Outcomes in {currentLocation.label}
              </ColorSpan>
              </h3>
              <TableComponent
                columns={reportColumns}
                data={[{
                  Label: 'Asthma Prevalence',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.asthma?.reduced !== undefined && filteredSummaries.asthma.reduced.toFixed(2)}</ColorSpan>,
                }, {
                  Label: 'Age Adjusted Asthma Rate',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.asthmaAgeAdj?.reduced !== undefined && filteredSummaries.asthmaAgeAdj.reduced.toFixed(2)}</ColorSpan>,
                }, {
                  Label: 'COPD Prevalence',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.copd?.reduced !== undefined && filteredSummaries.copd.reduced.toFixed(2)}</ColorSpan>,
                },]}
                tableProps={{
                  style: {
                    fontSize: '1rem'
                  }
                }}
                rowProps={{
                  style: {
                    padding: '.5em',
                  }
                }}
              />
            </ReportSection>
            <Gutter height="2em" />
            <ReportSection>
              <h3><ColorSpan color={'#e83f6f'}>
                Social and Economic Indicators in {currentLocation.label}
              </ColorSpan>
              </h3>
              <TableComponent
                columns={reportColumns}
                data={[{
                  Label: 'Economic Hardship Index',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.hardship?.reduced !== undefined && filteredSummaries?.hardship?.reduced.toFixed(2)}</ColorSpan>,
                }, {
                  Label: 'Social Vulnerability Index',
                  Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.svi?.reduced !== undefined && filteredSummaries.svi.reduced.toFixed(2)}</ColorSpan>,
                }]}
                tableProps={{
                  style: {
                    fontSize: '1rem'
                  }
                }}
                rowProps={{
                  style: {
                    padding: '.5em',
                  }
                }}
              />
            </ReportSection>
          </>
        )}
        {/* {!!dataReady && <Table columns={columns} data={transposedData} />} */}
      </ContentContainer>
      <Footer />
    </CommunityPage>
  );
}

export default App;
