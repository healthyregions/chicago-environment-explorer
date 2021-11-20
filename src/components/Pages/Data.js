import React from 'react';
import styled from 'styled-components';
import { ContentContainer, Gutter } from '../../styled_components';
import { StaticNavbar, Footer, Table } from '../'; 
import { colors } from '../../config';
import { NavLink } from 'react-router-dom';


const DataPage = styled.div`
    background:white;
`

const BlockIndent = styled.p`
    margin-left:1rem;
    padding-left:1rem;
    border-left:2px solid ${colors.lightgray}
`

const SectionTitle = styled.h3`
    margin: 40px 0 10px 0;
    &:nth-of-type(1){
        margin:10px 0;
    }
`

const Hero = styled.div`
    width:100%;
    max-width:1140px;
    text-align:center;
    color: ${colors.lightgray};
    margin:0 auto;
    padding:50px 10px 0 10px;
    p {
        
        font-family: 'Lora', sans-serif;
        font-size: 1.25rem;
        font-stretch: normal;
        text-align:left;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        padding:2rem 0;
    }

    #button-search{
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1.75px;
        line-height:5;
        text-align: center;
        text-transform:uppercase;
        background-color: ${colors.darkgray};
        color: #FFFFFF;
        padding: 1rem 1.5rem;
        margin:1rem;
        // border-radius: .3rem;
        text-decoration:none;
    }

`

const variables = [{
    name: "cid",
    description: "Dataset identification code"
},
{
    name: "geoid",
    description: "Full FIPS code"
},
{
    name: "tracte",
    description: "6-digit tract FIPS code"
},
{
    name: "treesN ",
    description: "Total number of trees (represented as unique polygons) by tract. Derived from polygon data digitized as trees from Lidar raw sonar data, originally processed by the Spatial Analysis Laboratory, made available through the Regional Trees Initiative and U.S. Forest Service, and finally cleaned, processed, and aggregated to census tract scale by the Health Regions & Policies Lab. "
},
{
    name: "treeCrDn",
    description: "Percentage of total census tract area covered by tree polygons (with each polygon representing the tree crown, or maximum tree crown width). Derived from polygon data digitized as trees from Lidar raw sonar data, originally processed by the Spatial Analysis Laboratory, made available through the Regional Trees Initiative and U.S. Forest Service, and finally cleaned, processed, and aggregated to census tract scale by the Health Regions & Policies Lab. "
},
{
    name: "svi",
    description: "Social Vulnerability Index via CDC using 2018 ACS 5-year data."
},
{
    name: "hardship",
    description: "Economic Hardship Index, calculated using 2018 ACS 5-year data using standard approach using six components (unemployment, dependency, education, income, crowded housing, poverty) by Center for Spatial Data Science."
},
{
    name: "floodSusc",
    description: "Urban flood susceptibility index, via FEMA."
},
{
    name: "heatIsl",
    description: "Measure of land surface temperature to approximate the heat island effect. 1km grid raw data aggregated to census tract scale using average of grid values. Values close to 1 represent grid cells that have high summer temperatures relative to all other cells in the Chicago area; values closer to 0 represent lower values. Derived from mean Land Surface Temperature (LST) collected by NASA’s MODIS satellite (MOD11 dataset)."
},
{
    name: "logTraf",
},
{
    name: "pm25NN",
    description: "Average PM 2.5 estimates during summer (Jun-Aug) from 2014-2018, calculated using a neural network model via Center for Spatial Data Science."
},
{
    name: "asthmaAv",
    description: "Number of Emergency Dept. asthma visits (age 0-18) between 2013-2018, calculated at the zip code and shared via the Chicago Health Atlas."
},
{
    name: "asthmaAdj",
    description: "Age adjusted rate of Emergency Dept. asthma visits (age 0-18) between 2013-2018, calculated at the zip code and shared via the Chicago Health Atlas."
},
{
    name: "totPopE",
    description: "total population, ACS 2018 5-year estimate via OEPS"
},
{
    name: "whiteP",
    description: "Percentage of population with race identified as white alone"
},
{
    name: "blackP",
    description: "Percentage of population with race identified as Black or African American alone"
},
{
    name: "amIndP",
    description: "Percentage of population with race identified as Native American or Alaska Native alone"
},
{
    name: "asianP",
    description: "Percentage of population with race identified as Asian alone"
},
{
    name: "hispP",
    description: "Percentage of population with ethnicity identified as of Hispanic or Latinx origin"
},
{
    name: "otherP",
    description: "Percentage of population with race not mentioned in any of the options above (includes two race or more races)"
},
{
    name: "childrnP",
    description: "Percentage of population under the age of 18."
},
{
    name: "over65P",
    description: "Percentage of population over the age of 65."
},
{
    name: "zip_code",
    description: "intersecting Zip Code area"
},
{
    name: "commarea_n",
    description: "Community Area Number	"
},
{
    name: "community",
    description: "Community Area Name"
}]

const NewTabLink = ({link, text}) => <a href={link} target="_blank" rel="noopener noreferrer">{text}</a>
const dataSources = [
    {
      "Variable": "Tree & Crown Density",
      "Documentation": <NewTabLink link="https://docs.google.com/document/d/1ukkNO3ZJKxfKgVLOuj8XCJPzwH-4hIHouSC66pbk-fc/edit" text="Metadata Document"/>,
      "Original Source": "Chicago Region Trees Initiative / U.S. Forest Service/SAL",
      "Year Used": 2010,
      "Scale": "tree crown polygon aggregated to census tract",
      "Visualization style": "Layer, Widget"
    },
    {
      "Variable": "Summer PM 2.5 estimates",
      "Documentation": <NewTabLink link="https://docs.google.com/document/d/1wuNC4LvfiuO6DifGMrLe-Ytrx6XOsTV22xhlV1cscvk/edit" text="Metadata Document"/>,
      "Original Source": <NewTabLink link="https://herop.ssd.uchicago.edu/" text="CSDS"/>,
      "Year Used": "2014-2018",
      "Scale": "1-km master, to census tract",
      "Visualization style": "Layer"
    },
    {
      "Variable": "Urban Heat Island",
      "Documentation": <NewTabLink link="https://docs.google.com/document/d/1yYZcITEFqNQPha7C3z8JrM_4uG9wxGD2CXNdURYHRRI/edit" text="Metadata Document"/>,
      "Original Source": <NewTabLink link="https://search.earthdata.nasa.gov/search?p=C203669662-LPDAAC_ECS!C203669661-LPDAAC_ECS!C203669662-LPDAAC_ECS&pg[1][v]=t&pg[1][qt]=2019-05-01T00%3A00%3A00.000Z%2C2019-09-30T23%3A59%3A59.999Z&pg[2][v]=t&pg[2][qt]=2019-05-01T00%3A00%3A00.000Z%2C2019-09-30T23%3A59%3A59.999Z&q=temperature&sp=-87.8720475%2C41.8336478&m=41.446933791115896!-100.71922302246094!4!1!0!0%2C2&qt=2015-05-01T00%3A00%3A00.000Z%2C2020-09-15T23%3A59%3A59.999Z%2C121%2C259&fst0=Land%20Surface" text="NASA"/>,
      "Year Used": 2018,
      "Scale": "1-km master, to census tract",
      "Visualization style": "Layer, Widget"
    },
    {
      "Variable": "Traffic Volume",
      "Documentation": <NewTabLink link="https://docs.google.com/document/d/1moWRkLednXJouFSef-zqemBfRwMcjABp6JYWICAnRZY/edit" text="Metadata Document"/>,
      "Original Source": <NewTabLink link="http://apps.dot.illinois.gov/gist2/" text="IDOT"/>,
      "Year Used": 2019,
      "Scale": "street segment to census tract",
      "Visualization style": "Layer"
    },
    {
      "Variable": "Urban Flood Susceptibility",
      "Documentation": <NewTabLink link="https://datahub.cmap.illinois.gov/dataset/on-to-2050-layer-flood-susceptibility-index" text="Metadata Document"/>,
      "Original Source": <NewTabLink link="https://www.cmap.illinois.gov/programs/water/stormwater/flood-index" text="CMAP"/>,
      "Year Used": 2017,
      "Scale": "area, to census tract",
      "Visualization style": "Widget"
    },
    {
      "Variable": "Economic Hardship Index",
      "Documentation": <NewTabLink link="" text="Metadata Document"/>,
      "Original Source": <><NewTabLink link="https://data.census.gov" text="ACS"/> via <NewTabLink link="https://herop.ssd.uchicago.edu/" text="CSDS"/></>,
      "Year Used": "2018 \n5-yr ave",
      "Scale": "Census tract",
      "Visualization style": "Widget"
    },
    {
      "Variable": "Population, Race & Ethnicity",
      "Documentation": <NewTabLink link="https://oeps.ssd.uchicago.edu/docs/Race_Ethnicity_2018" text="Metadata Document"/>,
      "Original Source": <><NewTabLink link="https://data.census.gov" text="ACS"/> via <NewTabLink link="https://oeps.ssd.uchicago.edu/" text="OEPS"/></>,
      "Year Used": "2018 \n5-yr ave",
      "Scale": "census tract",
      "Visualization style": "Widget"
    },
    {
      "Variable": "SVI Index",
      "Documentation": <NewTabLink link="https://docs.google.com/document/d/1mj7xu5YS2TNJnDvTfm-A93k9jW5c-jb6UKKJDpdpq7E/edit" text="Metadata Document"/>,
      "Original Source": <NewTabLink link="https://svi.cdc.gov/data-and-tools-download.html" text="CDC"/>,
      "Year Used": 2018,
      "Scale": "census tract",
      "Visualization style": "Layer"
    },
    {
      "Variable": "Juvenile ED Asthma visits",
      "Documentation": <NewTabLink link="https://docs.google.com/document/d/15230PqfXfvJi6FF4jVgeV5t-gDtyTgphljpyWBii_8c/edit?usp=sharing" text="Metadata Document"/>,
      "Original Source": <NewTabLink link="https://www.chicagohealthatlas.org/indicators/asthma-ed-visits-%280-18-years%29" text="Chicago Health Atlas"/>,
      "Year Used": 2017,
      "Scale": "ZCTA(5-digit zip) to census tract",
      "Visualization style": "Layer"
    },
    {
      "Variable": "Parks & Forest Preserves",
      "Documentation": <NewTabLink link="https://docs.google.com/document/d/1LkdGyma1LjmOhJq6jlTFfquwl43WQEAYM9l7stLeLQU/edit" text="Metadata Document"/>,
      "Original Source": "OSM/Mapbox",
      "Year Used": 2020,
      "Scale": "actual boundaries",
      "Visualization style": "Basemap Layer: light green"
    },
    {
      "Variable": "Tree Data",
      "Documentation": <NewTabLink link="https://docs.google.com/document/d/19JLOKUT-m01alcPHgkSUw3dVAeX_-2i7ZV7OC3pI7ug/edit" text="Metadata Document"/>,
      "Original Source": "Chicago Region Trees Initiative / U.S. Forest Service/SAL",
      "Year Used": 2010,
      "Scale": "individual trees",
      "Visualization style": "Basemap Layer: dark green"
    },
    {
      "Variable": "Building Footprints",
      "Documentation": <NewTabLink link="https://docs.google.com/document/d/18_aTstPmCDGK8iZmzzoy_X6XvAUB-nKumQ5U5fordC4/edit" text="Metadata Document"/>,
      "Original Source": "OSM/Mapbox",
      "Year Used": 2020,
      "Scale": "individual buildings",
      "Visualization style": "Basemap Layer: dark gray boundary @high zoom levels"
    }
]

const columns = [{
    Header: 'Variable',
    accessor: 'Variable',
  },
  {
    Header: 'Documentation',
    accessor: 'Documentation',
  },
  {
    Header: 'Original Source',
    accessor: 'Original Source',
  },
  {
    Header: 'Year Used',
    accessor: 'Year Used',
  },
  {
    Header: 'Scale',
    accessor: 'Scale',
  },
  {
    Header: 'Visualization style',
    accessor: 'Visualization style',
  }]

export default function Data(){
    return (
       <DataPage>
           <StaticNavbar/>
           <ContentContainer>
                <h1>Data</h1>
                <Gutter h={10}/>
                <p>
                    The <i>ChiVes</i> uses harmonized, standardized environmental data at the census tract scale including tree canopy characteristics, surface temperature, logged traffic volume, urban flood susceptibility, social vulnerability, hardship, modeled fine particulate matter estimates, and more in Chicago, IL around 2018 (data ranges from 2010-2018).
                </p>
                <Gutter h={20}/>

                <Hero>

                <h2> CURRENT RELEASE (11.18.2021)</h2>

                <a href={`${process.env.PUBLIC_URL}/geojson/chiEnvExpl.csv`} id="button-search" download>CSV</a>
                <a href="https://github.com/GeoDaCenter/chicago-environment-explorer/blob/main/docs/geojson" id="button-search">SHP</a>
                <a href="https://github.com/GeoDaCenter/chicago-environment-explorer/blob/main/docs/geojson/chiEnvExpl.geojson" id="button-search">GEOJSON</a>

                </Hero>
                
                {/* <h3>Data Dictionary</h3>

                <p>

                    <li> <b>cid: </b>Dataset identification code
                        </li>
                    <li> <b>geoid: </b>Full FIPS code
                                            </li>
                    <li> <b>tracte: </b>6-digit tract FIPS code
                                            </li>
                    <li> <b>treesN: </b>Total number of trees (represented as unique polygons) by tract. Derived from polygon data digitized as trees from Lidar raw sonar data, originally processed by the Spatial Analysis Laboratory, made available through the Regional Trees Initiative and U.S. Forest Service, and finally cleaned, processed, and aggregated to census tract scale by the Health Regions & Policies Lab. 
                                            </li>
                    <li> <b>treeCrDn: </b>Percentage of total census tract area covered by tree polygons (with each polygon representing the tree crown, or maximum tree crown width). Derived from polygon data digitized as trees from Lidar raw sonar data, originally processed by the Spatial Analysis Laboratory, made available through the Regional Trees Initiative and U.S. Forest Service, and finally cleaned, processed, and aggregated to census tract scale by the Health Regions & Policies Lab. 
                                            </li>
                    <li> <b>svi: </b>Social Vulnerability Index via CDC using 2018 ACS 5-year data.
                                            </li>
                    <li> <b>hardship: </b>Economic Hardship Index, calculated using 2018 ACS 5-year data using standard approach using six components (unemployment, dependency, education, income, crowded housing, poverty) by Center for Spatial Data Science.
                                            </li>
                    <li> <b>floodSusc: </b>Urban flood susceptibility index, via FEMA.
                                            </li>
                    <li> <b>heatIsl: </b>Measure of land surface temperature to approximate the heat island effect. 1km grid raw data aggregated to census tract scale using average of grid values. Values close to 1 represent grid cells that have high summer temperatures relative to all other cells in the Chicago area; values closer to 0 represent lower values. Derived from mean Land Surface Temperature (LST) collected by NASA’s MODIS satellite (MOD11 dataset).
                                            </li>
                    <li> <b>logTraf: </b>Logged traffic volume, using street segment volume from IDOT.
                                            </li>
                    <li> <b>pm25NN: </b>Average PM 2.5 estimates during summer (Jun-Aug) from 2014-2018, calculated using a neural network model via Center for Spatial Data Science.
                                            </li>
                    <li> <b>asthmaAv: </b>Number of Emergency Dept. asthma visits (age 0-18) between 2013-2018, calculated at the zip code and shared via the Chicago Health Atlas.
                                            </li>
                    <li> <b>asthmaAdj: </b>Age adjusted rate of Emergency Dept. asthma visits (age 0-18) between 2013-2018, calculated at the zip code and shared via the Chicago Health Atlas.
                                            </li>
                    <li> <b>totPopE: </b>total population, ACS 2018 5-year estimate via OEPS
                                            </li>
                    <li> <b>whiteP: </b>Percentage of population with race identified as white alone
                                            </li>
                    <li> <b>blackP: </b>Percentage of population with race identified as Black or African American alone
                                            </li>
                    <li> <b>amIndP: </b>Percentage of population with race identified as Native American or Alaska Native alone
                                            </li>
                    <li> <b>asianP: </b>Percentage of population with race identified as Asian alone
                                            </li>
                    <li> <b>hispP: </b>Percentage of population with ethnicity identified as of Hispanic or Latinx origin
                                            </li>
                    <li> <b>otherP: </b>Percentage of population with race not mentioned in any of the options above (includes two race or more races)
                                            </li>
                    <li> <b>childrnP: </b>Percentage of population under the age of 18.
                                            </li>
                    <li> <b>over65P: </b>Percentage of population over the age of 65.
                                            </li>
                    <li> <b>zip_code: </b>intersecting Zip Code area
                                            </li>
                    <li> <b>commarea_n: </b>Community Area Number   
                                            </li>
                    <li> <b>community: </b>Community Area Name
                                            </li>

                </p> */}
                
                                <Gutter h={20}/>

                <h2>Data Dictionary</h2>
                <p>
                  <ul>
                    {variables.map(({name, description}) => <li><b>{name}:</b> {description}</li>)}
                  </ul>
                </p>
                <Gutter h={40}/>
                <h2>Data Documentation</h2>
                <Table columns={columns} data={dataSources} />
               
            </ContentContainer>
            <Footer/>
       </DataPage>
    );
}