import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import booleanWithin from "@turf/boolean-within";
import { nicelyFormatNumber } from "../../utils";
import { loadDataAndBins } from "../../actions";

import {
  Gutter,
  StaticNavbar,
  VariablePanel,
  Footer,
  Pm25Report,
  Table,
} from "../../components"; //  Scaleable, Draggable, InfoBox, TopPanel, Preloader,
import useFilterData from "../../hooks/useFilterData";
import useProcessData from "../../hooks/useProcessData";
import { defaultData } from "../../config"; // colorScales, fixedScales, dataPresets, variablePresets, colors,
import styled from "styled-components";

import { ContentContainer } from "../../styled_components";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, TextField, Button, ButtonGroup, Typography } from "@mui/material";

const CommunityPage = styled.div`
  background: white;
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
    name: "density",
    accessor: (row) => row.properties.acs_population / row.properties.aland,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => (data.accumulated / data.values.length) * 1000,
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
    name: "hardship",
    accessor: (row) => row.properties.hardship,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length,
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

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const ReportSection = styled.section`
  h2 {
    font-size: 1.5rem;
    span {
      color: #e83f6f;
    }
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
      console.log("Available");
    } else {
      console.log("Not Available");
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
  console.log(filteredSummaries);
  return (
    <CommunityPage>
      <StaticNavbar />
      <ContentContainer>
        <h1>Community</h1>
        <p>
          ChiVes community reports provide information and context about your
          community, zip code, or census tract. To start, search for your
          location or use your current location.
        </p>
        <Gutter height="2em" />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={searchList}
          sx={{ width: "100%" }}
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
              <TypeSpan>{option.type}</TypeSpan> {option.label}
            </Box>
          )}
          onChange={(e, value) => setCurrentLocation(value)}
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
          <ReportSection>
            {currentLocation.type === "Zip Code" && (
              <h2>
                Your zip code:{" "}
                <span>
                  {currentLocation.label}, part of{" "}
                  {filteredFeatures
                    .map((f) => titleCase(f.properties.community))
                    .filter(onlyUnique)
                    .join(", ")}
                  , and {filteredFeatures.length} census tracts.
                </span>
              </h2>
            )}
            {currentLocation.type === "Community" && (
              <h2>
                Your community:{" "}
                <span>
                  {currentLocation.label}, including zip codes{" "}
                  {filteredFeatures
                    .map((f) => f.properties.zip_code)
                    .filter(onlyUnique)
                    .join(", ")}
                  , and {filteredFeatures.length} census tracts.
                </span>
              </h2>
            )}
            {currentLocation.type === "Census Tract" && (
              <h2>
                Your census tract:{" "}
                <span>
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
                </span>
              </h2>
            )}
            <h3>
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
            </h3>
          </ReportSection>
        )}
        {!!dataReady && <Table columns={columns} data={transposedData} />}
      </ContentContainer>
      <Footer />
    </CommunityPage>
  );
}

export default App;
