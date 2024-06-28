import React, { useEffect, useMemo, useState } from "react";
import booleanWithin from "@turf/boolean-within";
import { quantileRank } from "simple-statistics";
// import { nicelyFormatNumber } from "../../utils";
import { colors } from "../../config";
import bbox from "@turf/bbox";

import {
  Gutter,
  NavBar,
  // VariablePanel,
  Footer,
  // Pm25Report,
  // Table,
  PolarSpeciesPlot,
} from "../../components"; //  Scaleable, Draggable, InfoBox, TopPanel, Preloader,
import useFilterData from "../../hooks/useFilterData";
import useProcessData from "../../hooks/useProcessData";
import styled from "styled-components";

import { ContentContainer } from "../../styled_components";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Box,
  TextField,
  Button,
  ButtonGroup,
  Typography,
  Grid,
} from "@mui/material";
import TableComponent from "../Layout/Table";
import { MapSection } from "../../components";
import { fitBounds } from "@math.gl/web-mercator";
import { useChivesData } from "../../hooks/useChivesData";

const CommunityPage = styled.div`
  background: white;
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 2px solid #e83f6f;
  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  opacity: ${({ usingGeolocate }) => (usingGeolocate ? 0.5 : 1)};
  transition: 250ms opacity;
  &:hover {
    opacity: 1;
  }
`;

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
      let entryList = [];
      if (!!entry && entry.constructor === Array) {
        for (let k = 0; k < entry.length; k++) {
          entryList.push(entry[k]);
        }
      } else {
        entryList.push(entry);
      }
      for (let k = 0; k < entryList.length; k++) {
        if (!cacheList.includes(entryList[k]) && !!entryList[k]) {
          cacheList.push(entryList[k]);
          returnList.push({
            label: titleCase(entryList[k]),
            type: typeTranslation[cols[j]],
          });
        }
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
    reducer: (data) => data.accumulated,
  },
  {
    name: "asthmaEdVisits",
    accessor: (row) => row.properties.asthma_5yr_avg,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "asthmaAgeAdj",
    accessor: (row) => row.properties.asthma_age_adj_rate,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  // {
  //   name: "copd",
  //   accessor: (row) => row.properties.cities_copd_prev,
  //   accumulator: (prev, curr) => prev + curr,
  //   reducer: (data) => data.accumulated / data.values.length,
  // },
  {
    name: "density",
    accessor: (row) => row.properties.acs_population / row.properties.aland,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
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
  {
    name: "simpson",
    accessor: (row) => row.properties.simpson,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  {
    name: "ndvi",
    accessor: (row) => row.properties.ndvi,
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
    accessor: (row) => row.properties.svi_pecentile, // TODO: fix typo across all data
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
  },
  // race
  {
    name: "White",
    accessor: (row) => [
      +row.properties.pct_white * +row.properties.acs_population || 0,
      +row.properties.acs_population || 0,
    ],
    accumulator: ([prevVal, prevPop], [val, pop]) => [
      prevVal + val,
      prevPop + pop,
    ],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
  {
    name: "Black or African American",
    accessor: (row) => [
      +row.properties.pct_black * +row.properties.acs_population || 0,
      +row.properties.acs_population || 0,
    ],
    accumulator: ([prevVal, prevPop], [val, pop]) => [
      prevVal + val,
      prevPop + pop,
    ],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
  {
    name: "Native American",
    accessor: (row) => [
      +row.properties.pct_nativeam * +row.properties.acs_population || 0,
      +row.properties.acs_population || 0,
    ],
    accumulator: ([prevVal, prevPop], [val, pop]) => [
      prevVal + val,
      prevPop + pop,
    ],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
  {
    name: "Asian",
    accessor: (row) => [
      +row.properties.pct_asian * +row.properties.acs_population || 0,
      +row.properties.acs_population || 0,
    ],
    accumulator: ([prevVal, prevPop], [val, pop]) => [
      prevVal + val,
      prevPop + pop,
    ],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
  {
    name: "Pacific Islander",
    accessor: (row) => [
      +row.properties.pct_pacis * +row.properties.acs_population || 0,
      +row.properties.acs_population || 0,
    ],
    accumulator: ([prevVal, prevPop], [val, pop]) => [
      prevVal + val,
      prevPop + pop,
    ],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
  {
    name: "All additional races",
    accessor: (row) => [
      +row.properties.pct_other * +row.properties.acs_population || 0,
      +row.properties.acs_population || 0,
    ],
    accumulator: ([prevVal, prevPop], [val, pop]) => [
      prevVal + val,
      prevPop + pop,
    ],
    reducer: (data) => (data.accumulated[0] / data.accumulated[1]).toFixed(2),
    defaultAccumulated: [0, 0],
  },
  {
    name: "Latinx",
    accessor: (row) => [
      +row.properties.pct_hisp * +row.properties.acs_population || 0,
      +row.properties.acs_population || 0,
    ],
    accumulator: ([prevVal, prevPop], [val, pop]) => [
      prevVal + val,
      prevPop + pop,
    ],
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
  {
    name: "Average Plant Biodiversity",
    accessor: (row) => row.simpson.reduced,
    vals: (row) => row.simpson.values,
  },
  {
    name: "Average Vegetation Index (NDVI)",
    accessor: (row) => row.ndvi.reduced,
    vals: (row) => row.ndvi.values,
  },
];

const reportColumns = [
  {
    Header: "",
    accessor: "Label",
    width: 900,
  },
  {
    Header: "",
    accessor: "Value",
    width: 120,
  },
  {
    Header: "",
    accessor: "Description",
    width: 150,
  },
];

const defaultBounds = fitBounds({
  width: window.innerWidth / 2,
  height: 400,
  bounds: [
    [-87.971649, 41.609282],
    [-87.521896, 42.040624],
  ],
});

const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const ColorSpan = styled.span`
  color: ${(props) => props.color || "black"};
  background-color: ${(props) => props.backgroundColor || "none"};
  padding: 0.25em;
`;
const ReportSection = styled.section`
  h2 {
    font-size: 1.5rem;
    font-family: "Lora", serif;
  }
  ul {
    list-style: none;
    padding-left: 0.5em;
    li {
      &::before {
        content: "-";
        padding-right: 0.5em;
      }
    }
  }
`;

const StyledButton = styled(Button)`
  border-color: black;
  color: black;
  &.MuiButton-containedPrimary {
    background: ${colors.forest};
    color: white;
  }
  &.Mui-disabled {
    background: none;
    color: #ddd;
    border: 1px solid #ddd;
  }
`;

const GeolocateSection = styled.section``;

function App() {
  const { features } = useChivesData();

  // local state
  const [currentLocation, setCurrentLocation] = useState({});
  const searchList = useMemo(() => {
    if (features && features.length) {
      return getUniqueList(features, ["community", "zip_code", "geoid"]);
    } else {
      return [];
    } // eslint-disable-next-line
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
        message: `Geolocation service not available`,
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
            message: `Successfully located you at ${
              Math.round(1000 * position.coords.latitude) / 1000
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
  const [speciesPlotInfo, setSpeciesPlotInfo] = useState({
    geoid: 0,
    open: false,
  });

  const handleSpeciesPlot = (geoid) => {
    setSpeciesPlotInfo({
      open: true,
      geoid: +geoid,
    });
  };
  const handleSetOpen = (bool) => {
    setSpeciesPlotInfo((prev) => ({
      ...prev,
      open: bool,
    }));
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
    // eslint-disable-next-line
  }, [geolocateType]);
  // filter and summary data

  const filterFunc = useMemo(
    () =>
      currentLocation.type === "Zip Code"
        ? (f) => f.properties.zip_code.includes(currentLocation.label)
        : currentLocation.type === "Community"
        ? (f) => f.properties.community === currentLocation.label.toUpperCase()
        : (f) => f.properties.geoid === currentLocation.label,
    // eslint-disable-next-line
    [JSON.stringify(currentLocation)]
  );

  const filteredFeatures = useFilterData({
    data: features,
    filterFunc,
    updateTrigger: currentLocation,
  });
  const currGeoids = filteredFeatures.map((f) => +f.properties.geoid);

  // summarize data
  const [summaries] = useProcessData({
    //summariesTimestamp
    data: features,
    metrics: metricsToParse,
    updateTrigger: features.length,
  });

  const [filteredSummaries] = useProcessData({
    //filteredSummariesTimestamp
    data: filteredFeatures,
    metrics: metricsToParse,
    updateTrigger: filteredFeatures.length && JSON.stringify(currGeoids),
  });

  const filteredViewport = useMemo(() => {
    const bounds = bbox({
      type: "FeatureCollection",
      features: filteredFeatures,
    });
    if (bounds[0] === Infinity) {
      return defaultBounds;
    }
    const viewport = fitBounds({
      width: window.innerWidth / 2,
      height: 400,
      bounds: [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      padding: 20,
    });
    return {
      ...viewport,
      pitch: 0,
      bearing: 0,
    };
  }, [filteredFeatures.length && JSON.stringify(currGeoids)]); // eslint-disable-line

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

  const dataReady =
    currentLocation?.label &&
    transposedData.length &&
    transposedData[0][currentLocation.label] !== undefined;

  // metadata helpers
  const racialMajority = [
    "White",
    "Black or African American",
    "Native American",
    "Asian",
    "Pacific Islander",
    "All additional races",
  ].find((raceEthnicity) =>
    filteredSummaries[raceEthnicity]
      ? filteredSummaries[raceEthnicity].reduced > 50
      : false
  );

  const ethnicMajority =
    filteredSummaries["Latinx"].reduced > 50
      ? "Hispanic/Latinx"
      : "Not Hispanic/Latinx";

  const densityPercentile =
    dataReady &&
    quantileRank(summaries.density.values, filteredSummaries.density.reduced);
  // const ageAdjAsthmaPct = dataReady && quantileRank(summaries.asthmaAgeAdj.values, filteredSummaries.asthmaAgeAdj.reduced)
  const hardshipPercentile =
    dataReady &&
    quantileRank(summaries.hardship.values, filteredSummaries.hardship.reduced);

  return (
    <CommunityPage>
      <NavBar />
      <ContentContainer>
        <h1>Community</h1>
        <p>
         <span translate="no"> ChiVes </span>community reports provide information and context about your
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
            ![null, undefined].includes(value) && setCurrentLocation(value);
            ![null, undefined].includes(value) &&
              setGeolocatingStatus({
                status: "passive",
                message: "",
              });
          }}
        />
        <GeolocateSection>
          <StyledButton
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
          </StyledButton>
          <ButtonGroup
            aria-label="outlined primary button group"
            style={{
              margin: "2em 1em  0 0 ",
            }}
          >
            {["Zip Code", "Community", "Census Tract"].map((type) => (
              <StyledButton
                key={type}
                variant={geolocateType === type ? "contained" : "outlined"}
                onClick={() => setGeolocateType(type)}
                disabled={geolocatingStatus.status !== "success"}
              >
                {type}
              </StyledButton>
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <ReportSection>
                {currentLocation.type === "Zip Code" && (
                  <h2>
                    Your zip code:{" "}
                    <ColorSpan color={"#e83f6f"}>
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
                    <ColorSpan color={"#e83f6f"}>
                      {currentLocation.label}, including zip codes{" "}
                      {filteredFeatures
                        .flatMap((f) => {
                          return f.properties.zip_code;
                        })
                        .filter(onlyUnique)
                        .join(", ")}
                      , and {filteredFeatures.length} census tracts.
                    </ColorSpan>
                  </h2>
                )}
                {currentLocation.type === "Census Tract" && (
                  <h2>
                    Your census tract:{" "}
                    <ColorSpan color={"#e83f6f"}>
                      {currentLocation.label}, located in{" "}
                      {filteredFeatures
                        .map((f) => titleCase(f.properties.community))
                        .filter(onlyUnique)
                        .join(", ")}{" "}
                      and zip code{" "}
                      {filteredFeatures
                        .flatMap((f) => f.properties.zip_code)
                        .filter(onlyUnique)
                        .join(", ")}
                      .
                    </ColorSpan>
                  </h2>
                )}
              </ReportSection>
            </Grid>
            <Grid item xs={12} md={12} lg={7} xl={7}>
              <ReportSection>
                <h3>
                  <ColorSpan color={"#e83f6f"}>
                    Environmental Indicators in {currentLocation.label}
                  </ColorSpan>
                </h3>
                <TableComponent
                  columns={reportColumns}
                  data={[
                    {
                      Label: "Average Air Polution (PM2.5)",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.pm25?.reduced !== undefined &&
                            filteredSummaries.pm25.reduced.toFixed(1)}
                        </ColorSpan>
                      ),
                      Description:
                        "Presence of particulates in the air, smaller than 2.5 microns in size. Estimated during January through August over 2014-2018.",
                    },
                    {
                      Label: "Heat Island Effect",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.heatIsland?.reduced !==
                            undefined &&
                            filteredSummaries.heatIsland.reduced.toFixed(1)}
                        </ColorSpan>
                      ),
                      Description:
                        "The surface heat on a scale of 0-100, where 100 is the hottest in Chicago and 0 is the coldest.",
                    },
                    {
                      Label: "Urban Flood Susceptibility",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.floodSusceptibility?.reduced !==
                            undefined &&
                            filteredSummaries.floodSusceptibility.reduced.toFixed(
                              1
                            )}
                        </ColorSpan>
                      ),
                      Description:
                        "A FEMA index, where 0 is less susceptible and 10 is more susceptible.",
                    },
                    {
                      Label: "Average Traffic Volume",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.traffic?.reduced !== undefined &&
                            filteredSummaries.traffic.reduced.toFixed(1)}
                        </ColorSpan>
                      ),
                      Description:
                        "The average daily traffic count per road segment over a year, scaled logarithmically.",
                    },
                    {
                      Label: "Tree Crown Density",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.treeDensity?.reduced !==
                            undefined &&
                            filteredSummaries.treeDensity.reduced.toFixed(1)}
                        </ColorSpan>
                      ),
                      Description: "Percent of the area covered by trees.",
                    },
                    {
                      Label: "Average Plant Biodiversity",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.simpson?.reduced !== undefined &&
                            filteredSummaries.simpson.reduced.toFixed(1)}
                        </ColorSpan>
                      ),
                      Description:
                        "Ranging from 0 to 1, a number representing the average diversity of plants observed by volunteers in your area.",
                    },
                    {
                      Label: "Average Vegetation Index (NDVI)",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.ndvi?.reduced !== undefined &&
                            filteredSummaries.ndvi.reduced.toFixed(3)}
                        </ColorSpan>
                      ),
                      Description:
                        "From -1 to 1, a number representing the average coverage of vegetation seen from satellites.",
                    },
                  ]}
                  tableProps={{
                    style: {
                      fontSize: "1rem",
                    },
                  }}
                  rowProps={{
                    style: {
                      padding: ".5em",
                    },
                  }}
                />
              </ReportSection>
              <Gutter height="2em" />
              <ReportSection>
                <h3>
                  <ColorSpan color={"#e83f6f"}>
                    People living in {currentLocation.label}
                  </ColorSpan>
                </h3>
                <TableComponent
                  columns={reportColumns}
                  data={[
                    {
                      Label: "Residents",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.population?.reduced !== undefined
                            ? Math.round(
                                filteredSummaries.population.reduced
                              ).toLocaleString()
                            : "No Data"}
                        </ColorSpan>
                      ),
                      Description: "The number of people living in the area.",
                    },
                    {
                      Label: "Population Density",
                      Value: (
                        <>
                          <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                            {filteredSummaries?.density?.reduced !== undefined
                              ? Math.round(
                                  filteredSummaries.density.reduced * 1e6
                                ).toLocaleString()
                              : "No Data"}
                          </ColorSpan>{" "}
                          people per square kilometer
                        </>
                      ),
                      Description: `
                  About the density of ${
                    filteredSummaries?.density?.reduced !== undefined
                      ? Math.round(
                          filteredSummaries.density.reduced * 2e4
                        ).toLocaleString()
                      : "No Data"
                  } people in 
                  a downtown city block. ${
                    currentLocation.label
                  } is denser than ${Math.round(
                        densityPercentile * 100
                      )}% of Chicago.`,
                    },
                    {
                      Label: "Self-Identified Race",
                      Value: racialMajority
                        ? `Majority ${racialMajority}`
                        : "Diverse",
                      Description: `People in ${currentLocation.label} are of the following races: ${filteredSummaries["Black or African American"].reduced}% of residents are Black or African American, ${filteredSummaries["Native American"].reduced}% are Native American or Indigenous, ${filteredSummaries["Asian"].reduced}% are Asian, ${filteredSummaries["White"].reduced}% are White, ${filteredSummaries["Pacific Islander"].reduced}% are Native Hawaiian or Other Pacific Islander, and ${filteredSummaries["All additional races"].reduced}% of people come from additional races.`,
                    },
                    {
                      Label: "Ethnicity",
                      Value: `Majority ${ethnicMajority}`,
                      Description: `${filteredSummaries["Latinx"].reduced}% of residents in ${currentLocation.label} identify themselves as Hispanic/Latinx.`,
                    },
                  ]}
                  tableProps={{
                    style: {
                      fontSize: "1rem",
                    },
                  }}
                  rowProps={{
                    style: {
                      padding: ".5em",
                    },
                  }}
                />
              </ReportSection>
              <Gutter height="2em" />
              <ReportSection>
                <h3>
                  <ColorSpan color={"#e83f6f"}>
                    Health Outcomes in {currentLocation.label}
                  </ColorSpan>
                </h3>
                <TableComponent
                  columns={reportColumns}
                  data={[
                    {
                      Label: "Childhood Asthma ED Visits",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.asthmaEdVisits?.reduced !==
                          undefined
                            ? filteredSummaries.asthmaEdVisits.reduced.toFixed(
                                2
                              )
                            : "No Data"}
                        </ColorSpan>
                      ),
                      Description: `The number of childhood emergency room visits between 2013 and 2017.`,
                    },
                    {
                      Label: "Childhood Asthma Rate",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.asthmaAgeAdj?.reduced !==
                          undefined
                            ? filteredSummaries.asthmaAgeAdj.reduced.toFixed(2)
                            : "No Data"}
                        </ColorSpan>
                      ),
                      Description:
                        "The rate of childhood emergency room visits for asthma per 10,000 people.",
                    },
                    // {
                    //   Label: 'COPD Prevalence',
                    //   Value: <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>{filteredSummaries?.copd?.reduced !== undefined ? filteredSummaries.copd.reduced.toFixed(2) : "No Data"}</ColorSpan>,
                    //   Description: 'The percentage of people who have COPD.'
                    // },
                  ]}
                  tableProps={{
                    style: {
                      fontSize: "1rem",
                    },
                  }}
                  rowProps={{
                    style: {
                      padding: ".5em",
                    },
                  }}
                />
              </ReportSection>
              <Gutter height="2em" />
              <ReportSection>
                <h3>
                  <ColorSpan color={"#e83f6f"}>
                    Social and Economic Indicators in {currentLocation.label}
                  </ColorSpan>
                </h3>
                <TableComponent
                  columns={reportColumns}
                  data={[
                    {
                      Label: "Economic Hardship Index",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.hardship?.reduced !== undefined
                            ? filteredSummaries?.hardship?.reduced.toFixed(2)
                            : "No Data"}
                        </ColorSpan>
                      ),
                      Description: `An index the reflects a combination of unemployment, dependency, and education, income, crowded housing, and poverty for people living here. In ${
                        currentLocation.label
                      }, this is higher than ${Math.round(
                        hardshipPercentile * 100
                      )}% of all Chicago.`,
                    },
                    {
                      Label: "Social Vulnerability Index",
                      Value: (
                        <ColorSpan backgroundColor={"rgba(0,0,0,0.1)"}>
                          {filteredSummaries?.svi?.reduced !== undefined
                            ? filteredSummaries.svi.reduced.toFixed(2)
                            : "No Data"}
                        </ColorSpan>
                      ),
                      Description:
                        "A national index of overall social vulnerability.",
                    },
                  ]}
                  tableProps={{
                    style: {
                      fontSize: "1rem",
                    },
                  }}
                  rowProps={{
                    style: {
                      padding: ".5em",
                    },
                  }}
                />
              </ReportSection>
            </Grid>
            <Grid item xs={12} md={12} lg={5} xl={5}>
              <div style={{ position: "relative", width: "100%", height: 400 }}>
                <MapSection bounds={filteredViewport} geoids={currGeoids} />
              </div>
              <Gutter h={40} />
              {currGeoids.length && (
                <ReportSection>
                  <p>
                    <b>Species in census tracts near you</b>
                    <br />
                    Click to see species tree
                  </p>
                  {currGeoids.map((geoid, i) => (
                    <StyledButton
                      onClick={() => handleSpeciesPlot(geoid)}
                      variant="outlined"
                      style={{
                        margin: ".5em .5em 0 0",
                        fontFamily: '"Lato", sans-serif',
                      }}
                    >
                      {geoid}
                    </StyledButton>
                  ))}
                </ReportSection>
              )}
            </Grid>
          </Grid>
        )}
        <PolarSpeciesPlot
          geoid={speciesPlotInfo.geoid}
          open={speciesPlotInfo.open}
          setOpen={handleSetOpen}
        />
      </ContentContainer>
      <Footer />
    </CommunityPage>
  );
}

export default App;
