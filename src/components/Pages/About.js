import React from 'react';
import styled from 'styled-components';
import { ContentContainer, Gutter } from '../../styled_components';
import { MemberGrid, StaticNavbar, Footer } from '../../components';

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
        title: 'HeRoP Lab Founding Director'
    },
    {
        name:'Dylan Halpern, MCP',
        link:'https://dylanhalpern.com/',
        img: `dylan.png`,
        affiliation:'(CSDS)',
        title:'Sr. Principal Software Engineer',
    },
        {
        name: 'Isaac Kamber',
        link: 'https://makosak.github.io/',
        img: `isaac.png`,
        affiliation: '(CSDS)',
        title: 'Senior Research Assistant'
    },
    {
        name:'Lorenz Menendez',
        link:'https://dylanhalpern.com/',
        img: `Menendez_Lorenz.jpeg`,
        affiliation:'(CSDS)',
        title: 'Senior Research Assistant'
    },
]

// // Past contributors
// const contributors = [

// ]

// // Community Partners contributors
// const communityPartners = [


// ]

export default function About(){
    return (
       <AboutPage>
           <StaticNavbar/>
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
                Standards for each option are published <a href="https://docs.google.com/document/d/12lwkCAXxI9eW4Mdf6gaeR6LCsaNI3E0E6xvi7dqXr9k/edit?usp=sharing">here</a>. They are evaluated on a regular basis by the data collaborative.  
                </p>
                <br/><br/>

               <h2>Data Collaborative Members </h2>

               <p>

               The Data Collaborative provides insight, direction, and relavent environmental data to the Chicago community. The group advises on ChiVes data standards and needs,
               and includes the following members:
                <br/><br/>
                <li> Zac Adelman,  Lake Michigan Air Directors Consortium </li>
                <li> Elsa Anderson & Sophie Taddeo, Chicago Botanic Gardens </li>
                <li> Madeleine Daepp, Microsoft Research </li>
                <li> Tiffany Davis, Environmental Law & Policy Center </li>
                <li> Anne Dodge, Mansuetto Institute, University of Chicago </li>
                <li> Jim Franke, Haynes Stephens, Dept of Geophysical Sciences, University of Chicago </li>
                <li> James Keane, Dylan Halpern, Marynia Kolak, Healthy Regions & Policies Lab, University of Chicago </li>
                <li> Anastasia Montgomery, Sara Camilleri & Dan Horton, Climate Change Research Group, Northwestern University </li>
                <li> Michelle Stuhlmacher, Dept of Geography, DePaul University </li>
                <br/>
                We are also grateful to the Nature Conservancy, the Audobon Society, and the Field Museum for their insights and support.

                
                </p> 
                <br/><br/>


               <h2>
                   A HeRoP Project  
                </h2>
                <p>

               This project is brought to you by the <a href="https://herop.ssd.uchicago.edu/"> Health Regions & Policies Lab (HeRoP)</a> at the Center for Spatial Data Science at the University
                    of Chicago. HeRoP integrates innovative GIScience, public health, and statistical approaches to explore, understand, and promote healthy regions and policies.
                    Our group is dedicated to Open Science and open source methodology & applications. We are committed to research translation for policy & public use. 
                    Each project has both a research and applied component, like the <a href="http://uscovidatlas.org/">US Covid Atlas</a> and the <a href="https://oeps.ssd.uchicago.edu/">Opioid Environment Policy Scan</a>. 
                    We’re interested in how place drives, interacts with, and influences health for different people, in different ways. 
                    To explore this further, we look at neighborhoods as complex systems with spatial signals that help decode their stories.
                </p>
                <br/><br/>

               <h2>
                   Background: the Community Tree Tool Research Pilot
                </h2>

                <p>
                    Before <i>ChiVes</i>, HeRoP worked in joint partnership with the Chicago Department of Public Health to develop the <b> <a href="https://abc7chicago.com/chicago-trees-climate-change-tree-planting-lidar-scanner/11202738/?fbclid=IwAR0UxJhaeu_vMfES7H0owokO4y2ASs3uzZAGCYrWzfMpwS4rUiAB7kULLi0">Community Tree Equity Tool </a></b> as 
                    an extension of our ongoing work on understanding <a href="https://herop.ssd.uchicago.edu/research/open-airq/" target="_blank" rel="noopener noreferrer">air quality in Chicago</a>. The Tree Tool Research Pilot was developed using 
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

                </p>

               <br/><br/>
<h2>
                   ChiVes: An OpenSource, Interactive Platform for Coalition Building
                </h2>
                <p>
                    After the completion of the research pilot, HeRoP refactored the data into a fresh, newly customized web mapping application. This
                    facilitates more open, flexible, and free design and allows the community to collaborate more directly, in line with HeRoP's mission. New 
                    data will be added regularly, and existing datasets will be updated as needed. Community groups can request new data, which will be included 
                    if in line with our core mission and within the lab's capabilities. We will launch a new resource page curating environmental mapping resources in Chicago in early 2022, in collaboration with community partners.

                </p>


                <BioSection>
                    <h3>ChiVes Project Team</h3>
                    <MemberGrid 
                        members={projectTeam}
                        columns={{
                            md: 3,
                        }}
                        />
                     The team is currently co-led by Marynia & Dylan. Isaac and Lorenz were integral in data wrangling and processing for the core content on the application. 
                    <Gutter h={10}/>
                    
                    
                </BioSection>
           </ContentContainer>
           <Footer/>
       </AboutPage>
    );
}