import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { MemberGrid, NavBar, Footer } from '../../components';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import {FaChevronDown} from "@react-icons/all-files/fa/FaChevronDown";


const LearnPage = styled.div`
    background:white;
`

export default function LearnIndexBuilderPage(){
    return (
       <LearnIndexBuilderPage>
           <NavBar />
           <ContentContainer>
               <h1>Activity: Index Builder</h1>
               <hr/>
                <p>The index builder is a ChiVes tool to examine the impact of multiple variables on a given community, or community area, at once. This activity will review how to use the index builder, as well as how to form your own questions and use the index builder to investigate them.</p>
                <h3>Let’s begin with a a scenario.</h3>
                <p>Imagine you live in a neighborhood that is surrounded by factories and busy roads. You notice the air in your neighborhood seems different from other places; it often looks hazy or smells strange and seems to be hotter than surrounding neighborhoods. 
                </p>
                <p>You know that planting trees can help cool an area by providing shade and releasing moisture, and they can improve air quality by absorbing pollutants and releasing oxygen in return. Maybe planting trees could help with the heat and air pollution in your community too! 
                </p>
                <p>However, you want to plant trees in areas where they will have the most positive impact. To do this, you will need to use and understand data to identify the areas that would benefit most from new trees.   
                </p>
                <p><b>Your question:</b> In Chicago, where should trees be planted to reduce heat and improve air quality?
                </p>

                <hr/>

                <h2>Approach</h2>
                <h3>Step 1: Locate the index builder on the Chives website
                </h3>
                <p>The index builder is located in the main menu, shown here in the red box. 
                </p>
                <br />
                * Image * 
                <br />
                <br />

                <h3>Step 2: Identify variables of interest
                </h3>

                <p>You can select variables that are relevant to a particular question, or simply variables that interest you to see how they interact! In this example, we will use 1) modeled particulate matter (PM2.5), 2) the heat index (maximum), and 3) tree crown density.
                </p>

                <p>These variables are relevant to our question because planting trees can help improve air quality and cool neighborhoods. Particulate matter (PM 2.5) measures the amount of tiny particles like dirt and smoke in the air and is one type of air pollution. The maximum heat index measures temperature based on how the human body feels it, using afternoon readings when temperatures are highest. We’re including tree crown density because we want to prioritize planting trees in areas where there is currently less tree cover.
                </p>

                <p>If you want to learn more about a particular variable click on the i for a brief summary, or visit the metadata page for a more detailed explanation.
                </p>


                * Image * 
                <br />
                <br />

                * Image * 
                <br />
                <br />

                <h3>Step 3:  Select the weights of your variables
                </h3>

                <p>The weight of each variable determines its level of importance. A variable that is considered more important should be weighted higher than less important variables. In this example, our tree crown density variable is weighted higher than our other variables so that areas with very little tree cover are emphasized more in our final map showing priority areas for tree planting.
                </p>


                * Image * 
                <br />
                <br />

                <h3>Step 4: View and interpret your results!
                </h3>

                <p>Once you have selected your variables, the index builder will create a custom index based on your variables and weights. No matter which variables you select, the index builder will automatically organize on a scale from zero to one, with higher (and visually darker) values reflecting areas of high vulnerability. For our example, this means values closer to one: have low tree canopy, high particulate matter (PM 2.5), and a high maximum heat index. 
                </p>


                * Image * 
                <br />
                <br />

                <p>You can also explore your custom index in different ways! Clicking on the download button allows you to export your index as a table (.csv) or as an image (.png). You can also click on individual census tracts, even the one you live in, to see the exact index value of the area.
                </p>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<FaChevronDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    <Typography><b>Comprehension question: </b> Which community areas have the highest values?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Answer (non-exhaustive): Garfield Ridge, Clearing, Archer Heights, West Lawn, Bridgeport, Lower West Side, and West Elsdon.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br /><br />
                <h2>Do It Yourself</h2>
                <h3> How to use the index builder to answer your community environmental justice questions
                </h3>

                <p> We’ve gone through one example, but there are many different ways to use the index builder to explore Chicago’s natural and social environment. For example, you could: 
                </p>

                <ul>
                    <li>Explore different variables to find out which environmental issues your community is most at risk for.</li>
                    <li>Identify an environmental problem in your community and use the index builder to see how related factors interact with it.</li>
                    <li>Start with a question that interests you (like in the example above) and use the index builder's data to help answer it or further your investigation.</li>

                </ul>

                <p> Here are a few more examples of variable combinations to answer questions: </p>

                <ul>
                    <li>Reducing poverty by targeting early education resources: economic hardship index (20%),  % children (40%), percentage four-year degree or higher (40%)</li>
                    <li>Correlation between housing affordability and green space inequity: Housing burdened (33%), NDVI (33%), Median rent (33%)
                    </li>
                    <li>Targeting cancer treatment and health services: cancer rate (33%), lung cancer rate (33%),  adult asthma rate (33%) 
                    </li>
                </ul>

                <hr/>
                <br/>

                <h2>Independent Practice </h2>
                <h3>Forming a Question and Using the Index Builder on Your Own</h3>

                <p> We’ve gone through one example, but there are many different ways to use the index builder to explore Chicago’s natural and social environment. For example, you could: 
                </p>

                <ol>
                    <li>Forming a question:.</li>
                        <ul>
                        <li>Are there any environmental or health concerns in your community, or another area of interest?
                        </li>
                        <li>What do you think should be done about this problem?
                        </li>
                        <li>How can data inform your question, or the solution? 
                        </li>
                        </ul>
                    <li>Using the index builder:
                    </li>
                        <ul>
                        <li>What variables are relevant to your question?
                        </li>
                        <li>Which of these variables is most important in your problem (i.e. how should the variables be weighted? Is one more important than the other, are they equally important, etc.). 
                        </li>
                        </ul>
                    <li>Interpreting your results:</li>
                        <ul>
                        <li>In your custom index, which areas are most vulnerable? Which areas are the least vulnerable?
                        </li>
                        <li>In your areas of interest, consider how other factors may inform this data and your potential solution. For example, is one of your areas historically impacted by redlining? What is the cultural and demographic makeup of your area of interest? Are there any policies or community-based movements working to address this issue already?
                        </li>
                        <li>How can you use your custom index data to inform a solution, policy, or further investigation? 
                        </li>
                        </ul>
                </ol>
                <br />
        <hr />
        <br />
        <p> This activity was written by <b>Erin Koster </b> (DePaul University) in 2024. </p>







           </ContentContainer>
           <Footer/>
       </LearnIndexBuilderPage>
    );
}

