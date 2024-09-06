import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { Accordion, MemberGrid, NavBar, Footer } from '../../components';

const LearnPage = styled.div`
    background:white;
`


export default function 
(){
    return (
       <LearnPage>
           <NavBar showLearnSubpages={true} />
           <ContentContainer>
               <h1>Learn</h1>
               <hr/>
                <p>ChiVes is a <b>data collaborative</b> and <b>community mapping application</b> that brings data on Chicago's environment together at the
                neighborhood level. It's a partnership of researchers, community organizations, and civic groups. It's been used for teaching
                about the basics of mapping and spatial analysis, as well as learning about air quality patterns in Chicago.</p>
                <p>With ChiVes, we harmonize & standardize environmental data across dozens of sources to make it accessible for full exploration, alongside a growing list of resources on the Chicago Environment, cultivated by a community of curators.</p>
                <p>To cite the latest release of Chives (<i>Earth Day 2023 </i> Launch), use the following:</p>
                <ul>
                    <li>Dylan Halpern, Susan Paykin, James Keane, Sparshdeep Singh, Sarvagnya Vijay, Adam Cox, Mukesh Chugani, Winifred Curran, Michelle Stuhlmacher, & Marynia Kolak. (2023). Chives: A Chicago Environmental Justice Geospatial Dashboard (v2.0.0). Zenodo. <a href="https://doi.org/10.5281/zenodo.8212065">https://doi.org/10.5281/zenodo.8212065</a>.</li>
                </ul>
                <p>The next release is planned for August 2024. <a href="/contact">Contact</a> us with any questions, or post an issue on <a href="https://github.com/healthyregions/chicago-environment-explorer/issues">Github.</a></p>
                <hr/>
                <h2>Get Involved </h2>
                <p>Organizations and individuals can participate in<span translate="no"> ChiVes </span>in multiple ways:</p>
                <ul>
                    <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdu5zCJcvLXp8eY0p3jLuCWPKSuGHjrw2auO3BsD57ssH4_wA/viewform">Data Collaborative.</a> Integrate your data directly. Members agree that the final, integrated data will meet Collaborative standards. </li>
                    <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSd2gHSB7OKCKEBhB0weIM7ZsRBomVOAl7QhDHOeXu5B7ih_bQ/viewform">Resource Guide.</a> Share your web-based or print media resource on the Chicago environment. Resources must meet<span translate="no"> ChiVes </span>standards. </li>
                    <li><a href="https://github.com/healthyregions/chicago-environment-explorer">Web Development.</a> Developers and code-enthusiasts can fork the<span translate="no"> ChiVes </span>website, make changes, and submit for review.</li>
                </ul>
                <p>View our <a href="https://docs.google.com/document/d/12lwkCAXxI9eW4Mdf6gaeR6LCsaNI3E0E6xvi7dqXr9k/edit?usp=sharing">Standards and Submission Guidelines</a>. These guidelines are evaluated on a regular basis by members of the Data Collaborative.</p>
                <h2>Collective Contributors</h2>
                <p>The following individuals and organizations have added data to the<span translate="no"> ChiVes </span>data collective:</p>
                <ul>
                    <li><a href="https://www.chicagobotanic.org/research/staff/anderson">Elsa Anderson</a> & Sophie Taddeo, Negaunee Institute for Plant Conservation Science and Action, Chicago Botanic Gardens</li>
                    <li><a href="http://www.madeleinedaepp.com/">Madeleine Daepp</a>, Microsoft Research & the Eclipse Project</li>
                    <li>Anastasia (Stacy) Montgomery, <a href="https://www.earth.northwestern.edu/our-people/post-doctoral-fellows/sara-camilleri.html">Sara Camilleri</a> & <a href="https://www.earth.northwestern.edu/our-people/faculty/horton-daniel.html">Dan Horton</a>, Climate Change Research Group, Northwestern University </li>
                    <li> Multiple team members at the Department of Geography, DePaul University, led by <a href="https://las.depaul.edu/academics/geography/faculty/Pages/Michelle-Stuhlmacher.aspx">Michelle Stuhlmacher</a></li>
                    <li> Multiple team members at the <a href="https://healthyregions.org">Healthy Regions & Policies Lab,</a> University of Illinois at Urbana-Champaign, led by M. Kolak</li>
                </ul>
                <h3>Data Standards Refinement</h3>
                <p>We would like to extend special thanks to <a href="https://www.ladco.org/about-us/staff/zac-adelman/">Zac Adelman</a>, <a href="https://www.linkedin.com/in/amenakarim/">Amena Karim</a>, <a href="https://geosci.uchicago.edu/people/jim-franke/">Jim Franke</a>, Haynes Stephens, Tiffany Werner and <a href="https://www.linkedin.com/in/annedodge/">Anne Dodge</a> for their past work on the data collaborative team in the first release of Chives. We are also grateful to the <b>Nature Conservancy</b> and <b>Audubon Society</b> for their insights and support.
                </p>
                <h3>Application Co-Design</h3>
                <p>In the second release of Chives focused on expanding focus in <b>Environmental Justice Communities</b>, we are grateful to the following individuals and organizations who informed improvements in the mapping application and new index builder, as well as suggested new data and design concepts.</p>
                <ul>
                    <li>John Paul Jones, <a href="https://www.growgreater.org/">Grow Greater Englewood</a></li>
                    <li>Lonette Simms, Dulce Garduño, and Howard Ehrmann of the <a href="mailto:prncoalition@gmail.com">People's Response Network</a></li>
                    <li>Margarita Reina, Chicago Department of Public Health</li>
                    <li>Leadership, teachers, & students of <a href="https://www.institutochicago.org/">Instituto del Progreso Latino</a>, especially Karina Ayala-Bermejo, Maribel Arellano, Arturo Galan, and Evelyn Barragan</li>
                    <li>Claudia Galeno-Sanchez, <a href="https://www.workingfamilysolidarity.org/">Working Family Solidarity</a></li>
                </ul>
                <p>In addition, we thank Christian Diaz, Amena Karim, and students in Dr. Curran's DePaul's GIS course for their feedback. Finally,
                we are thankful for additional guidance by Rolando Favela in response to community needs.</p>
                <hr/>
                <h2>Active Project Team</h2>
                <p>This project is managed by the <a href="https://healthyregions.org/" target="_blank" rel="noopener noreferrer">Healthy Regions
                & Policies Lab</a> (HeRoP), housed at the Department of Geography & GIScience within the <b>University of Illinois at Urbana-Champaign</b>,
                in collaboration with the <a href="https://las.depaul.edu/academics/geography-gis/Pages/default.aspx" target="_blank" rel="noopener noreferrer">Department of Geography</a> at <b>DePaul University</b>. From 2022-2024, it is funded in part by NASA via a new initiative to support environmental justice communities in Chicago (read more <a href="https://depauliaonline.com/64087/special-issues/research-team-seeks-to-expand-access-to-environmental-data-in-chicago-nasa-grant-provides-funding-for-research-expansion-of-chives-database/">here</a> and <a href="https://ggis.illinois.edu/news/2022-09-19t152513/prof-kolak-depaul-researchers-receive-nasa-grant-data-driven-environmental"> here</a>).</p>


                <h2>Background</h2>
                <p>The original<span translate="no"> ChiVes </span>application built on multiple former projects from Healthy Regions & Policies Lab members, incorporating materials as well as lessons learned. Much of the data currently integrated within<span translate="no"> ChiVes </span>was gathered, calculated, and standardized from 2018-2021,
                when the HEROP Lab was housed at the Center for Spatial Data Science at the University of Chicago. The current application was refactored in 2022 by <a href="https://dylanhalpern.com/">Dylan Halpern</a>, adopting a new web architecture. Explore some of the original projects that inspired<span translate="no"> ChiVes </span>below:</p>

           </ContentContainer>
           <Footer/>
       </LearnPage>
    );
}
