import React from 'react';
import styled from 'styled-components';
import { ContentContainer, Gutter } from '../../styled_components';
import { StaticNavbar, Footer, } from '../'; 
import { colors } from '../../config';

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
                
                <h2>CURRENT RELEASE</h2>

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

                </p>
                
                                <Gutter h={20}/>

               
            </ContentContainer>
            <Footer/>
       </DataPage>
    );
}