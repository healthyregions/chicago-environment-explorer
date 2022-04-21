import React from 'react';
import styled from 'styled-components';
import { ContentContainer, Gutter } from '../../styled_components';
import { Accordion, MemberGrid, NavBar, Footer } from '../../components';
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
// import { colors } from "../config";

// const Accordion = styled(MuiAccordion)`
//     &.MuiPaper-elevation1 {
//         box-shadow:none;
//         border:1px solid ${colors.white};
//         transition:250ms border;
//         &.Mui-expanded {
//             border:1px solid ${colors.lightgray};
//             box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
//         }
//     }
// `

// const AccordionSummary = styled(MuiAccordionSummary)`
// `

// const AccordionDetails = styled(MuiAccordionDetails)`
// `


const AboutPage = styled.div`
    background:white;
`
const BioSection = styled.div`
    padding:40px 0;
    // text-align:center;
    h3 {
        margin:2em 0 1em 0;
    }
`
const projectTeam = [
    {
        name: 'Marynia Kolak, MS, MFA, PhD',
        link: 'https://makosak.github.io/',
        img: `mk.jpg`,
        affiliation: '(CSDS)',
        title: 'Research Lead'
    },
    {
        name:'Dylan Halpern, MCP',
        link:'https://dylanhalpern.com/',
        img: `dylan.png`,
        affiliation:'(CSDS)',
        title:'Research & Visualization Lead',
    },
        {
        name:'Susan Paykin',
        link:'https://www.linkedin.com/in/susanpaykin/',
        img: `SusanPaykin.jpg`,
        affiliation:'(CSDS)',
        title:'Research & Community Management',
    }
]


// // Past contributors
const contributors = [
    {
        name: 'Isaac Kamber',
        link: 'https://www.linkedin.com/in/isaac-kamber/',
        img: `isaac.png`,
        affiliation: '(CSDS)',
        title: 'Senior Research Assistant'
    },
    {
        name:'Lorenz Menendez',
        link:'https://www.linkedin.com/in/lorenzmenendez/',
        img: `Menendez_Lorenz.jpeg`,
        affiliation:'(CSDS)',
        title: 'Senior Research Assistant'
    },
    {
        name:'James Keane',
        link:'https://www.linkedin.com/in/james-keane-678863b7/',
        img: `JamesKeane.jpg`,
        affiliation:'(CSDS)',
        title: 'Senior Research Assistant'
    }
]

// // Community Partners contributors
// const communityPartners = [


// ]


// ... other constants
const accordionContent = [
    {
        label: "West Humboldt Park Resource Map (2017)",
        content: <p>The project was developed as a friendly collaboration out of the West Humboldt Park Health Coalition, a collective of community organizations, local businesses, health, and academic partners. Staff from West Humboldt Park Development Council, Our Lady of Angels, and the Northwestern Memorial Community Services group outlined the need and drove the concept. Lead developers are Marynia Kolak and Michael Steptoe. Student interns who've worked on this include Rachel Weisz (Northwestern University) and Gentry Nissen (Arizona State University).</p>
    },

        {
        label: "The US Covid Atlas (2020)",
        content: "Description."
    },

        {
        label: "Opioid Environment Policy Scan (2021)",
        content: "Description."
    },

        {
        label: "Diversitree (2021)",
        content: "Description."
    },

        {
        label: "Respiratory Association Collaboration (2021)",
        content:"Description."
    },

        {
        label: "Chicago Tree Tool (2022)",
        content: (<p>
                    Before <i>ChiVes</i>, HeRoP worked in joint partnership with the Chicago Department of Public Health to develop the <b> <a href="https://abc7chicago.com/chicago-trees-climate-change-tree-planting-lidar-scanner/11202738/?fbclid=IwAR0UxJhaeu_vMfES7H0owokO4y2ASs3uzZAGCYrWzfMpwS4rUiAB7kULLi0">Community Tree Equity Tool </a></b> as 
                    an extension of  ongoing work on understanding <a href="https://herop.ssd.uchicago.edu/research/open-airq/" target="_blank" rel="noopener noreferrer">air quality in Chicago</a>. The Tree Tool Research Pilot was developed using 
                     <a href="https://carto.com/" target="_blank" rel="noopener noreferrer"> Carto</a> to facilitate rapid development and prototyping. This tool followed years of iterative process and design and dozens
                     of previous dashboard iterations, highlighting the winding process of agile application development. The final tool went through dozens of additional
                     rounds of refinement and editing across multiple city and community stakeholders.
                     <br/><br/> 

                    In the Research Pilot Stage, The HeRoP team was led by Marynia Kolak, MS, MFA, PhD (Associate Director of Health Informatics) and supported by 
                    research assistants Isaac Kamber, Lorenz Menendez, Yuming Liu, and Jizhou Wang, with previous analytic work by graduate 
                    student Haowen Shang, and ongoing collaboration with Center for Spatial Data Science Academic Director, Luc Anselin, PhD, Executive Director,    
                    Julia Koschinsky, PhD, as well as Raed Mansour, MS and Dave Graham at the Chicago Department of Public Health. Dozens of additional, invaluable 
                    public, private, and community stakeholders impacted the success of the Tree Tool application: follow the City of Chicago for more details coming soon!
                    <br/><br/> 
                    This work was part of a Partnership for Healthy Cities, a global network of cities committed to saving lives by preventing noncommunicable diseases (NCDs) and injuries, supported by Bloomberg Philanthropies in partnership with the World Health Organization and Vital Strategies.

                </p>)
    }


]

export default function About(){
    return (
       <AboutPage>
           <NavBar />
           <ContentContainer>
               <h1>About </h1>
               <hr/>

               <p>

               ChiVes is a <b>data collaborative</b> and <b>community mapping application</b> that brings data on Chicago’s environment together at the neighborhood level. It’s a partnership of researchers, community organizations, and civic groups. 
                Organizations and individuals can participate in ChiVes in multiple ways:

                <br/><br/>
                <li> <a href="https://docs.google.com/forms/d/e/1FAIpQLSdu5zCJcvLXp8eY0p3jLuCWPKSuGHjrw2auO3BsD57ssH4_wA/viewform">Data Collaborative.</a> Integrate your data directly. Members agree that the final, integrated data will meet Collaborative standards. </li>


                <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSd2gHSB7OKCKEBhB0weIM7ZsRBomVOAl7QhDHOeXu5B7ih_bQ/viewform">Resource Guide.</a> Share your web-based or print media resource on the Chicago environment. Resources must meet ChiVes standards. </li>


                <li><a href="https://github.com/GeoDaCenter/chicago-environment-explorer">Web Development.</a> Developers and code-enthusiasts can fork the ChiVes website, make changes, and submit for review.</li>
                 
                <br/>
                Standards and Submission Guidelines are published <a href="https://docs.google.com/document/d/12lwkCAXxI9eW4Mdf6gaeR6LCsaNI3E0E6xvi7dqXr9k/edit?usp=sharing">here</a>. They are evaluated on a regular basis by the data collaborative.  
                </p>
                <br/><br/>

               <h2>Data Collaborative Members </h2>

               <p>

               The Data Collaborative provides insight, direction, and relavent environmental data to the Chicago community. The group advises on ChiVes data standards and needs,
               and includes the following members (* indicates Current Leadership):
                <br/><br/>
                <li>  <a href="https://www.ladco.org/about-us/staff/zac-adelman/">Zac Adelman</a>, Lake Michigan Air Directors Consortium </li>
                <li> <a href="https://www.chicagobotanic.org/research/staff/anderson">Elsa Anderson</a> & <a href="https://www.chicagobotanic.org/research/staff/taddeo">Sophie Taddeo</a>, Chicago Botanic Gardens </li>
                <li> <a href="http://www.madeleinedaepp.com/">Madeleine Daepp</a>, Microsoft Research </li>
                <li> <a href="https://elpc.org/team/tiffany-werner/">Tiffany Werner</a>, Environmental Law & Policy Center </li>
                <li> <a href="https://www.linkedin.com/in/annedodge/">Anne Dodge</a>, Mansueto Institute, University of Chicago </li>
                <li> <a href="https://geosci.uchicago.edu/people/jim-franke/">Jim Franke</a> & <a href="https://geosci.uchicago.edu/people/haynes-stephens/">Haynes Stephens</a>, Department of Geophysical Sciences, University of Chicago </li>
                <li> <a href="https://sites.northwestern.edu/danethan/anastasia-montgomery-bio/">Anastasia (Stacy) Montgomery</a>, <a href="https://www.earth.northwestern.edu/our-people/post-doctoral-fellows/sara-camilleri.html">Sara Camilleri</a> & <a href="https://www.earth.northwestern.edu/our-people/faculty/horton-daniel.html">Dan Horton</a>, Climate Change Research Group, Northwestern University </li>
                <li> <a href="https://las.depaul.edu/academics/geography/faculty/Pages/Michelle-Stuhlmacher.aspx">Michelle Stuhlmacher</a>, Department of Geography, DePaul University </li>
                <li> <a href="https://www.linkedin.com/in/james-keane-678863b7/">James Keane</a>, *Dylan Halpern, *Marynia Kolak, *Susan Paykin, Healthy Regions & Policies Lab, Center for Spatial Data Science, University of Chicago </li>
                <br/>
                We are also grateful to the <b>Nature Conservancy</b>, <b>Audobon Society</b>, and <b>Field Museum</b> for their insights and support.
                <br/><br/>
                Finally, a major thank you goes to <a href="https://www.linkedin.com/in/isaac-kamber/">Isaac Kamber</a> and 
                <a href="https://www.linkedin.com/in/lorenzmenendez/">Lorenz Menendez</a>, now alumni of University of Chicago, who developed multiple measures
                for this application as a core component of their Research Assistantships from 2019-2021.
                                </p> <br/><br/>

               <h1> 
                   A HeRoP Project  
                </h1>
                <hr/>
                <p>

               This project is brought to you by the <a href="https://herop.ssd.uchicago.edu/"> Health Regions & Policies Lab (HeRoP)</a> at the Center for Spatial Data Science at the University
                    of Chicago. HeRoP integrates innovative GIScience, public health, and statistical approaches to explore, understand, and promote healthy regions and policies.
                    Our group is dedicated to Open Science and open source methodology & applications. We are committed to research translation for policy & public use. 
                    We’re interested in how place drives, interacts with, and influences health for different people, in different ways. 
                    To explore this further, we look at neighborhoods as complex systems with spatial signals that help decode their stories.
                </p>
                <br/><br/>


               <h2>Project Leadership </h2>

               <p> Marynia, Dylan, and Susan lead the ChiVes project in the current release.  </p><br/>

                                   <MemberGrid 
                        members={projectTeam}
                        columns={{
                            md: 3,
                        }}
                        />


                <p> The ChiVes application builds on multiple former projects via HeRoP members. Explore them below: 
                </p><br/>


                <Accordion entries={accordionContent} initialTab={-1} />




           </ContentContainer>
           <Footer/>
       </AboutPage>
    );
}