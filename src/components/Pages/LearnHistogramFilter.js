import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { MemberGrid, NavBar, Footer } from '../../components';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import {FaChevronDown} from "@react-icons/all-files/fa/FaChevronDown";

const LearnHistogramFilterPage = styled.div`
    background:white;
`
export default function LearnHistogramFilter(){
    return (
       <LearnHistogramFilterPage>
           <NavBar />
           <ContentContainer>
               <h1>Activity: Histogram Filter</h1>
               <hr/>

               <p>Histogram filters are a feature in the ChiVes mapping tool used to visualize the distribution of different variables on the map. You can set the histogram to only show a range of values or a specific numeric value, which will change the map to fit the criteria that you set. This activity will review how to use the histogram filters, as well as how to form your own questions and use the histogram filters to investigate them. 
               </p>

               <h3>Let’s begin with a scenario.
               </h3>

               <p>A resolution was passed in IL legislature, <b>HJR23</b>, that calls for widening of I-55 particularly through Chicago’s South side & South Suburbs.
               </p>

               <p>You’re concerned that the increase in traffic volume and construction could pose additional environmental challenges on an already burdened community. But, you need to look at the data to investigate further & make a case.
               </p>

               <p>Some potential questions to investigate are:
               </p>

               <ul>
                <li>What does traffic volume look like in Chicago?
                    <ul><li>How does it compare alongside highways?</li></ul> </li>
                <li>How do these places coincide with air pollution in Chicago?
                    <ul><li> If not, what are the neighborhood assets that may be protective? </li></ul> </li>
               <li>How do these places coincide with social vulnerability? 
                    <ul><li>What about populations especially vulnerable to increases in pollution?</li></ul> </li>
               </ul>

               <hr />
               <br />
               <h2> Approach</h2>

               <h3>Step 1: Locate the Histogram Filters on the Chives website
               </h3>
               
               <p>The histogram filters are located in the mapping section. We get to this section on the home screen by clicking “Start Mapping”. The histogram filters will then be located on the right section of the screen.
               </p>

               IMAGE  <br /><br />

               <h3>Step 2: Select Your Primary Map
               </h3>

               <p>You can select the primary variable on your map by going to the left section of the screen and clicking the box titled “Variable”. This then opens a drop down menu of different variables to choose from.
               </p>

               IMAGE  <br /><br />

               <p>Given that our main concern is traffic volume, this will be our primary variable. We will find this by scrolling within the drop down menu and clicking “Traffic Volume Score”. 
               </p>

               <p>You can learn all about what this variable means by reading the data description located in the box on the left side of the screen.
               </p>

               <p>Viewing the map, what do we notice about neighborhoods located alongside highways?
               </p>

               <h3>Step 3: Filter the Histograms
               </h3>

               <p>Our earlier questions involved additional air pollution and social vulnerability. We could easily add this to our map using the histogram filters located on the right side of the screen. We can scroll through the options to see what variables best fit what we are looking for. 
               </p>

               <p>For our example, we will use particulate matter (PM 2.5) which measures the amount of tiny particles like dirt and smoke in the air and is one type of air pollution. We will also use the social vulnerability which is a measurement of various factors (such as poverty, lack of access to transportation, and crowded housing) that show who in society is most vulnerable.
               </p>

               <p>To begin filtering, we click on the left slider of the histogram graph and move it toward our desired location. We also do the same with the right slider on the histogram filter graph so that we can set a more specific criteria.
               </p>

               IMAGE  <br /><br />

               <p>How do we want to filter the PM 2.5 histogram? How do we want to filter social vulnerability? What happens if we do a low value? What is most fitting to our problem?
               </p>

               <p>Lets create a map with different filters to see how they differ.
               </p>

               <p>We will first start off with creating a map showing high PM 2.5 and social vulnerability. To do this, I am going to move the left slide of the histogram toward the right, this is where the higher values are located and as we can see is also where most of the data is located.
               </p>

               <p>The value for our Summer PM 2.5 will be at the highest available values, filtered between 10.02 to 11.9 The values for Social Vulnerability will also be at the highest values, filtered between 84.04 to 99.8.
               </p>

               IMAGE  <br /><br />

               <p>What do you notice? How does this relate to the traffic volume?
               </p>

               <p>Now, let's create a map with low PM 2.5 and social vulnerability. These are the exact parameters I set for my filters.
               </p>

               <p>The value for our Summer PM 2.5 will be at the lowest available values, filtered between 2.51 to 10.02. The values for Social Vulnerability will also be at the lowest values, filtered between the farthest spot on the left to 21.01.
               </p>

               IMAGE  <br /><br />

                <p>What do you notice? How does this differ from the previous map?
                </p>

                <h3>Step 4: View and interpret your results!
                </h3>

                <p>Once you have filtered all of your variables accordingly, take a look at the map you have created.                </p>

                <p>Some initial questions to help understand what the data means are:
                </p>

                <ul>
                    <li>What areas stand out to you? Are they along the I-55 or near it?
                    </li>
                    <li>What communities seem to be predominantly impacted?
                    </li>
                    <li>Could you filter any additional variables to continue your investigation?
                    </li>
                    <li>What do you think your map is showing?
                    </li>
                    <li>How do you think the passing of HJR23 will further impact these communities?
                    </li>
                    <li>Can you find any variables that may show any benefits of widening the I-55?
                    </li>
                    <ul>
                        <li>If yes, what are they and why?
                        </li>
                        <li>If not, do you have any suggestions of mitigating the damage?
                        </li>
                    </ul>
                </ul>
                <br />
                <hr />
                <br />
                <h2>Do It Yourself</h2>
                <h3> Answer Community Environmental Justice Questions
                </h3>

                <p> We’ve gone through one example, but there are many different ways to use the index builder to explore Chicago’s natural and social environment. For example, you could: 
                </p>

                <ul>
                    <li>Explore different variables to find out which environmental issues your community is most at risk for.</li>
                    <li>Identify an environmental problem in your community and use the index builder to see how related factors interact with it.</li>
                    <li>Start with a question that interests you (like in the example above) and use the index builder's data to help answer it or further your investigation.</li>

                </ul>

                <p> Here are a few more examples of variable combinations to answer questions: </p>

                <h3>Examples to Explore</h3>
                <ol>
                    <li>Forming a question:.</li>
                        <ul>
                        <li>Set your primary map to Heat Index, now use the histogram filters like Tree Canopy Cover %, Social Vulnerability, and Childhood Asthma Rate to see the relationship between these variables.

                            <li>What do you see as you go through these examples? </li>
                            <li>What are you setting your filters to?</li>
                            <li>Would you add or get rid of any variables?</li>
                        </li>
                        </ul>
                        <li>Set your primary map to Displacement Pressure, now use the histogram filters like % Seniors, % Children, and Economic Hardship Index to see the relationship between these variables.</li>
                        <ul>
                            <li>What do you see as you go through these examples?  </li>
                            <li>What are you setting your filters to?</li>
                            <li>Would you add or get rid of any variables?</li>
                            <li>Try filtering by race and ethnicity. How does your map look? Do you see any differences?</li>
                        </ul>
                </ol>
                <br/>

                <hr/>
                <br/>
                <h2>Independent Practice </h2>
                <h3>Making a Question and Using the Histogram Filters </h3>

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
                        <li>Which of these variables is most important in your problem (i.e. what is the variable for your primary map? How will you decide where to put the slider on the histogram?, etc.). 
                        </li>
                        </ul>
                    <li>Interpreting your results:</li>
                        <ul>
                        <li>In your map, what are the initial findings you notice? How do you map begin to change as you apply the filters?
                        </li>
                        <li>In your areas of interest, consider how other factors may inform this data and your potential solution. For example, is one of your areas historically impacted by redlining? What is the cultural and demographic makeup of your area of interest? Are there any policies or community-based movements working to address this issue already?
                        </li>
                        <li>How can you use your customized map to inform a solution, policy, or be used in additional investigations?
                        </li>
                        </ul>
                </ol>
                <br />
        <hr />
        <br />
        <p> This activity was written by <b>Salise Sepulveda</b> (DePaul University) in 2024. </p>


           </ContentContainer>
           <Footer/>
       </LearnHistogramFilterPage>
    );
}
