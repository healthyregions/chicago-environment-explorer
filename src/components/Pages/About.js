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
    }
]


// // Past contributors
const contributors = [
    {
        name: 'Isaac Kamber',
        link: '',
        img: `isaac.png`,
        affiliation: '(CSDS)',
        title: 'Senior Research Assistant'
    },
    {
        name:'Lorenz Menendez',
        link:'',
        img: `Menendez_Lorenz.jpeg`,
        affiliation:'(CSDS)',
        title: 'Senior Research Assistant'
    },
    {
        name:'James Keane',
        link:'',
        img: ``,
        affiliation:'(CSDS)',
        title: 'Senior Research Assistant'
    },
    {
        name:'James Keane',
        link:'',
        img: ``,
        affiliation:'(CSDS)',
        title: 'Senior Research Assistant'
    }
]

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
                Standards and Submission Guidelines are published <a href="https://docs.google.com/document/d/12lwkCAXxI9eW4Mdf6gaeR6LCsaNI3E0E6xvi7dqXr9k/edit?usp=sharing">here</a>. They are evaluated on a regular basis by the data collaborative.  
                </p>
                <br/><br/>

               <h2>Data Collaborative Members </h2>

               <p>

               The Data Collaborative provides insight, direction, and relavent environmental data to the Chicago community. The group advises on ChiVes data standards and needs,
               and includes the following members (and *current leadership):
                <br/><br/>
                <li> Zac Adelman,  Lake Michigan Air Directors Consortium </li>
                <li> Elsa Anderson & Sophie Taddeo, Chicago Botanic Gardens </li>
                <li> Madeleine Daepp, Microsoft Research </li>
                <li> Tiffany Davis, Environmental Law & Policy Center </li>
                <li> Anne Dodge, Mansuetto Institute, University of Chicago </li>
                <li> Jim Franke, Haynes Stephens, Dept of Geophysical Sciences, University of Chicago </li>
                <li> James Keane, *Dylan Halpern, *Marynia Kolak, Healthy Regions & Policies Lab, University of Chicago </li>
                <li> Anastasia Montgomery, Sara Camilleri & Dan Horton, Climate Change Research Group, Northwestern University </li>
                <li> Michelle Stuhlmacher, Dept of Geography, DePaul University </li>
                <br/>
                We are also grateful to the Nature Conservancy, the Audobon Society, and the Field Museum for their insights and support.
                </p> 

                <BioSection>
                    <h3>Project Leadership</h3>
                    <MemberGrid 
                        members={projectTeam}
                        columns={{
                            md: 3,
                        }}
                        />

                    <h3>Current Data Contributors</h3>
                    <MemberGrid 
                        members={contributors}
                        columns={{
                            md: 3,
                        }}
                        />
                    <Gutter h={10}/>
                    
                    
                </BioSection>

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

                <p> The ChiVes application builds on multiple former projects via HeRoP members. Explore them below: 
                </p><br/>

                <h4> West Humboldt Park Resource Map (2017)  </h4> <br/>
                <p>
                The project was developed as a friendly collaboration out of the Wests Humboldt Park Health Coalition, a collective of community organizations, local businesses, health, and academic partners.
                Staff from West Humboldt Park Development Council, Our Lady of Angels, and the Northwestern Memorial Community Services group outlined the need and drove the concept. Lead developers are Marynia Kolak and Michael Steptoe. Student interns who've worked on this include Rachel Weisz (Northwestern University) and Gentry Nissen (Arizona State University).
                </p>

               <br/><br/>


                <h4> The US Covid Atlas (2020) </h4> <br/>
                <p>
                    Add description.                </p>

               <br/><br/>



                <h4> Opioid Environment Policy Scan (2021) </h4> <br/>
                <p>
                    Add description.                </p>

               <br/><br/>


                <h4> Diversitree (2021) </h4> <br/>
                <p>
                    Using open-source data on global tree inventories, <a href="https://senseable.mit.edu/diversitree/">Diversitree </a> examines (1) the diversity of species, genera, and family of urban street trees in eight cities internationally; (2) how they score on diversity benchmarks and indices; and (3) the diversity variation inside and outside of cities’ centers. This project came from the MIT Sensable Cities lab. Check out the publication at: Galle, N., Halpern, D., Nitoslawski, S., Duarte, F., Ratti, C. & Pilla, F. (2021). Mapping the diversity of street tree inventories across eight cities internationally using open data. Urban Forestry and Urban Greening.
                </p>

               <br/><br/>


                <h4> Chicago Tree Tool (2022) </h4> <br/>
                <p>
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

                </p>

               <br/><br/>


           </ContentContainer>
           <Footer/>
       </AboutPage>
    );
}