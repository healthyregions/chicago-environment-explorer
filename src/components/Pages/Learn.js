import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { Accordion, MemberGrid, NavBar, Footer } from '../../components';
import Grid from "@mui/material/Grid";
import { colors } from "../../config";
import { NavLink } from 'react-router-dom';



const LearnPage = styled.div`
    background:white;
`

const NavTitle = styled.h2`
    color: rgb(65, 182, 230) !important;
    font-size: 32px;
`;

export default function Learn (){
    return (
       <LearnPage>
           <NavBar />
           <ContentContainer>
               <h1>Learn</h1>
               <hr/>
                <p>Looking for inspiration or support in learning how to use ChiVes? Check out these
                    tutorials.
                </p>
               <iframe style={{ marginBottom: '3rem' }} src="https://depauledu-my.sharepoint.com/personal/ekoster1_depaul_edu/_layouts/15/embed.aspx?UniqueId=eddd6490-226f-4b7e-83bc-e8b5945ef8ab&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameBorder="0" scrolling="no" allowFullScreen title="Chives_tutorial_eng.mp4"></iframe>


                     <Grid container spacing={2} >
                        <Grid item xs={2}>
                            <NavLink to="/learn/mapping101">
                                <img
                                    className="photo"
                                    src={process.env.PUBLIC_URL + "/icons/noun-geospatial-analytics-6672680.png"}
                                    loading="lazy"
                                    width="150"
                                />
                            </NavLink>
                        </Grid>
                        <Grid item xs={9}>

                         <NavLink to="/learn/mapping101"><NavTitle>Mapping 101 <i> with ChiVes</i></NavTitle></NavLink>

                         <p>ChiVes uses maps to explore different aspects of Chicago’s neighborhoods, such as air pollution or traffic. In this activity, we will explore different map elements and how to understand them.

                            </p>

                        </Grid>
                    </Grid>

                    <br />
                    <Grid container spacing={2} >
                        <Grid item xs={2}>
                            <NavLink to="/learn/histogram">
                                <img
                                    className="photo"
                                    src={process.env.PUBLIC_URL + "/icons/noun-histogram-6696040.png"}
                                    loading="lazy"
                                    width="150"

                                />
                            </NavLink>
                        </Grid>
                        <Grid item xs={9}>

                         <NavLink to="/learn/histogram"><NavTitle><i> Activity:</i> Histogram</NavTitle></NavLink>

                         <p> Histogram filters are a feature in the ChiVes mapping tool used to visualize the distribution of different variables on the map. You can set the histogram to only show a range of values or a specific numeric value, which will change the map to fit the criteria that you set. This activity will review how to use the histogram filters, as well as how to form your own questions and use the histogram filters to investigate them.
                        </p>

                        </Grid>
                    </Grid>

                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <NavLink to="/learn/indexBuilder">
                                <img
                                    className="photo"
                                    src={process.env.PUBLIC_URL + "/icons/noun-switch-7088111.png"}
                                    loading="lazy"
                                    width="150"

                                />
                            </NavLink>
                        </Grid>
                        <Grid item xs={9}>

                            <NavLink to="/learn/indexBuilder"><NavTitle><i> Activity:</i> Index Builder</NavTitle></NavLink>

                         <p> The index builder is a ChiVes tool to examine the impact of multiple variables on a given community, or community area, at once. This activity will review how to use the index builder, as well as how to form your own questions and use the index builder to investigate them.
                        </p>

                        </Grid>
                    </Grid>



           </ContentContainer>
           <Footer/>
       </LearnPage>
    );
}
