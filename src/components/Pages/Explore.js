import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { Accordion, MemberGrid, NavBar, Footer } from '../../components';
import Grid from "@mui/material/Grid";
import { colors } from "../../config";
import { NavLink } from 'react-router-dom';



const ExplorePage = styled.div`
    background:white;
`

export default function Explore (){
    return (
       <ExplorePage>
           <NavBar />
           <ContentContainer>
               <h1>Explore</h1>
               <hr/>
                <p>Looking for inspiration or support in learning how to use ChiVes? Check out these
                    tutorials.
                </p>
                
 

                     <Grid container spacing={2} >
                        <Grid item xs={2}>
                            <NavLink to="/map">
                                <img
                                className="photo"
                                src={process.env.PUBLIC_URL + "/icons/tree-location.svg"}
                                alt="Wild Onion"
                                loading="lazy"
                                width="150"
                                />
                            </NavLink>
                        </Grid>
                        <Grid item xs={9}>

                         <h2> Neighborhood Map</h2>
                         
                         <p>Explore dimensions of the environment across Chicago in an interactive map. Data comes from collaborators across the city.

                            </p>

                        </Grid>
                    </Grid>

                    <br />
                    <Grid container spacing={2} >
                        <Grid item xs={2}>
                            <NavLink to="/indexBuilder">
                                <img
                                    className="photo"
                                    src={process.env.PUBLIC_URL + "/icons/noun-switch-7088111.png"}
                                    loading="lazy"
                                    width="150"

                                />
                            </NavLink>
                        </Grid>
                        <Grid item xs={9}>

                         <h2> Index Builder </h2>
                         
                         <p> The index builder is a ChiVes tool to examine the impact of multiple variables on a given community, or community area, at once.
                            </p>

                        </Grid>
                    </Grid>

                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <NavLink to="/community">
                                <img
                                    className="photo"
                                    src={process.env.PUBLIC_URL + "/icons/nature-book.png"}
                                    loading="lazy"
                                    width="150"
                                />
                            </NavLink>
                        </Grid>
                        <Grid item xs={9}>

                         <h2> My Community </h2>
                         
                         <p> Get a dynamic report about key indicators and environmental
                         metrics for your neighborhood. Search by your location.
                        </p>

                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <NavLink to="/guide">
                                <img
                                    className="photo"
                                    src={process.env.PUBLIC_URL + "/icons/resource_guide.png"}
                                    loading="lazy"
                                    width="150"
                                />
                            </NavLink>
                        </Grid>
                        <Grid item xs={9}>

                         <h2> Resource Guide </h2>
                         
                         <p> Find other maps, data, and resources about the Chicago
                environment from featured partners and a curated list of
                resources.
                        </p>

                        </Grid>
                    </Grid>
                        

                
           </ContentContainer>
           <Footer/>
       </ExplorePage>
    );
}
