import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { MemberGrid, NavBar, Footer } from '../../components';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import {FaChevronDown} from "@react-icons/all-files/fa/FaChevronDown";



const LearnMapping101Page = styled.div`
    background:white;
`

export default function LearnMapping101(){
    return (
       <LearnMapping101Page>
           <NavBar />
           <ContentContainer>
               <h1>Mapping 101 with ChiVes</h1>
               <hr/>

                <p>ChiVes uses maps to explore different aspects of Chicago’s neighborhoods, such as air pollution or traffic. In this activity, we will explore different map elements and how to understand them.  
                </p>

                <hr/>

                <h2>Approach</h2>
                <h3>Part One: Choropleths and Legends
                </h3>
                <p>There are many different kinds of maps, but ChiVes primarily uses choropleths to display its data. Choropleths use colors to show different values of data. The legend assigns each color a specific data value. 
                </p>
                <p>Let's look at this map of traffic volume. 
                </p>

                <br />* Image * <br />

                <p>Here is the legend for the map. Based on this legend, what is this map telling you?
                </p>

                <p>The numbers below the colors in the legend show that darker shaded areas have higher traffic volume scores (closer to 6.8), while lighter colored areas have a lower traffic volume score (closer to 2.9). In this map, darker colors indicate a higher value, and this is a common visualization method. Other maps may use a different color scheme, symbols, or graphs to convey information. Remember, always look at the legend to know which colors refer to which values.  
                </p>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<FaChevronDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    <Typography><b>Comprehension question: </b> 
                    Which areas have high values and which areas have low values? </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Answer (non exhaustive): High value areas include Near South Side, Forest Glen, South Deering, and Jefferson Park. Low value areas include Humboldt Park, Hermosa, Montclare, West Pullman, Gage Park, Clearing, and South Lawndale.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br /> <br />

                <h3>Part Two: Data Descriptions 
                </h3>

                <p>When reading a map, it is important to learn about the data presented in the map so you can understand what the map is showing. 
                </p>

                <p>Each of the maps in ChiVes will have a window on the left side of the screen. This window will tell you a bit more about the variable you are looking at, and how it was collected. Every data description in ChiVes will highlight who created the map (the data contributor), where the data came from (the data source), and when the data was collected (the data year). This activity will primarily focus on the data description section, but ChiVes also has a page dedicated to metadata. Metadata is often called “data about data”; it gives more detailed descriptions of data processing and calculation. 
                </p>

                <p>Let’s look at the data description for traffic volume score. 
                </p>

                <br />* Image * <br />

                <p>Based on this description, we know that this traffic data is from 2019. The data originally came from the Illinois Department of Transportation and the Center for Spatial Data Science performed calculations to determine the traffic volume score. We also know that this data is based on annual average daily traffic counts. 
                </p>

                <p>Based on this, we can conclude that the map is showing us a general picture of traffic values in 2019. This map does not show us exact traffic at any given time or on a particular road, and it is important to remember that traffic patterns may have changed since 2019.
                </p>

                <p>If you want to learn more about a particular variable click on the i for a brief summary, or visit the metadata page for a more detailed explanation.
                </p>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<FaChevronDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    <Typography><b>Comprehension question: </b> 
                    Use the data description to figure out  what AADT stands for. </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Answer: Annual Average Daily Traffic (Counts) 
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br /> <br />


                <h3>Part Three:  Other ways to explore ChiVes
                </h3>

                <p>ChiVes maps can show one variable at a time, such as our example with traffic score. They can also show a variable in different ways, or multiple variables at the same time.  For more information about how to display a variable in different ways, visit our Histogram activity. 
                </p>

                <p>ChiVes maps can show multiple variables as a single choropleth, or index. For more information about this, visit our Index Builder activity. 
                </p>

                <p>Another way you can see multiple variables at the same time is by layering them with the data overlay feature, found on the left side of the screen beneath the data description. You can select overlays such as wards, community areas, and industrial areas. 
                </p>

                * Image * 
                <br />
                <br />

                <p>The following data overlay options are available in ChiVes: 
                </p>

                * Image * 
                <br />
                <br />

                <p> Here is an example of how to display multiple variables, using “% Children” as our base map and “Public Housing”  as our data overlay. The green dots represent public housing locations, while the choropleth underneath represents % children.  
                </p>

                * Image * 
                <br />
                <br />

                <Accordion>
                    <AccordionSummary
                    expandIcon={<FaChevronDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    <Typography><b>Comprehension question: </b> 
                    Do you notice any patterns between these two variables?  </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Answer: There are many ways to answer and interpret this map. High concentrations of % children and public housing areas are seen in the northwest and southeast sides.   
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br /> <br />

                <hr /><br />
                
                <h2>Do It Yourself: Practicing Mapping Skills </h2>

                <p>Understanding maps and their story is important to understanding different areas of the world and your own community. It can also improve your critical thinking skills and understanding of data as a whole. Here is a quick activity to help you practice. 
                </p>
                
                <ol>
                    <li>Select a variable that interests you. 
                    </li>
                        <ul>
                        <li>Analyze the legend for your map. How does the color ramp change with the data values? 
                        </li>
                        <li>What areas of the map show high (or low) values of your selected variable?
                        </li>
                        </ul>
                    <li>Read the data description of the variable you selected. 
                    </li>
                        <ul>
                        <li>Who created the data you are looking at? What is the source? When was the data published?
                        </li>
                        <li>Is the data you are viewing raw data? Was it modeled, or had some other calculation performed on it for visualization?  
                        </li>
                        <li>What are the possible limitations of your data? For example, is your variable limited to a certain year or period of time? 
                        </li>
                        </ul>
                    <li>Add another variable to your map with the data overlay.
                    </li>
                        <ul>
                        <li>Are there any connections between your variable and the overlay? How might they be related or different? 
                        </li>
                        <li>Are there any spatial patterns in the variables? For example, are there high concentrations of one variable and not the other, or both at the same time? 
                        </li>
                        <li>Try adjusting your data with the histogram filters, or using the custom index builder. What changed? Are there any new patterns? 
                        </li>
                        </ul>
                </ol>

                <hr />
                <br /><br />
                <h2> Additional Resources 
                </h2>

                <p> If you are interested in learning more about mapping and geographic concepts, here are some additional resources to explore! 
                </p>

                <ul>
                    <li>The UCGIS Book of Knowledge provides content on cartography, remote sensing, environmental science, and more. </li>
                    <li>GeographyRealm’s What is a Map? Provides a basic overview of other important map elements such as projections and a history of maps. 
                    .</li>
                </ul>

                

                <br />
        <hr />
        <br />
        <p> This activity was written by <b>Erin Koster </b> (DePaul University) in 2024. </p>


           </ContentContainer>



           <Footer/>
       </LearnMapping101Page>
    );
}
