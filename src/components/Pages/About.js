import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { Accordion, MemberGrid, NavBar, Footer } from '../../components';

const AboutPage = styled.div`
    background:white;
`
// const BioSection = styled.div`
//     padding:40px 0;
//     // text-align:center;
//     h3 {
//         margin:2em 0 1em 0;
//     }
// `
const projectTeam = [
    {
        name: 'Marc Astacio-Palmer',
        link: 'https://www.linkedin.com/in/marcastacio/',
        org: 'Illinois',
        img: `marc-astacio.webp`,
        affiliation: '(HEROP)',
        title: 'Research Coordinator, 2023-2024'
    },
    {
        name: 'José Alavez',
        link: 'https://www.linkedin.com/in/jose-j-alavez-098b1239/',
        org: 'Illinois',
        img: `jose.png`,
        affiliation: '(HEROP)',
        title: 'Postdoctoral Scholar, 2023-2024'
    },
    {
        name: 'Karina Ayala-Bermejo',
        link: 'https://www.institutochicago.org/apps/pages/index.jsp?uREC_ID=372458&type=d&pREC_ID=837883',
        org: 'Instituto del Progreso Latino',
        img: `karina.jpg`,
        affiliation: '(HEROP)',
        title: 'Community Partner, 2023-2024'
    },
    {
        name: 'Adam Cox',
        link: 'https://www.linkedin.com/in/mradamcox/',
        org: 'Illinois',
        img: `adam_cox.jpg`,
        affiliation: '(HEROP)',
        title: 'Research Software Engineer, 2023-2024'
    },
    {
        name: 'Winifred Curran',
        link: 'https://www.linkedin.com/in/winifred-curran-6026525',
        org: 'DePaul',
        img: `curran.jpg`,
        affiliation: '(DePaul)',
        title: 'NASA Co-Lead, 2022-2024'
    },
    {
        name: 'Howard Ehrman',
        link: null,
        org: 'Peoples Response Network',
        img: `avatar.png`,
        affiliation: null,
        title: 'Community Partner, 2024'
    },
    {
        name: 'Marynia Kolak',
        link: 'https://www.linkedin.com/in/maryniakolak',
        org: 'Illinois',
        img: `marynia.jpeg`,
        affiliation: '(HEROP)',
        title: 'Project PI, 2018-2022; NASA Co-Lead, 2022-2024'
    },
    {
        name: 'Erin Koster',
        link: null,
        org: 'DePaul',
        img: `koster.jpeg`,
        affiliation: '(HEROP)',
        title: 'NASA Research Assistant, 2024'
    },
    {
        name: 'Shubham Kumar',
        link: 'https://www.linkedin.com/in/shubhamk008/',
        org: 'Illinois',
        img: `shubham.jpeg`,
        affiliation: '(HEROP)',
        title: 'UI/UX Audit, 2023-2024'
    },
    {
        name: 'Sara Lambert',
        link: 'https://www.linkedin.com/in/sara-lambert-b4602b8a/',
        org: 'NCSA, Illinois',
        img: `sara.png`,
        affiliation: '(HEROP)',
        title: 'Sr Research Software Engineer, Front-End, 2024'
    },
    {
        name: 'Claudia Galeno Sanchez',
        link: null,
        org: 'Working Family Solidarity',
        img: `claudia.jpg`,
        affiliation: '(HEROP)',
        title: 'Community Partner, 2023-2024'
    },
    {
        name: 'Salise Sepulveda',
        link: null,
        org: 'DePaul',
        img: `avatar.png`,
        affiliation: '(HEROP)',
        title: 'NASA Research Assistant, 2024'
    },
    {
        name: 'Lonette Sims',
        link: 'mailto:prncoalition@gmail.com',
        org: 'Peoples Response Network',
        img: `lonette.jpg`,
        affiliation: '(HEROP)',
        title: 'Community Partner, 2023-2024'
    },
    {
        name: 'Michelle Stuhlmacher',
        link: 'https://www.linkedin.com/in/michellestuhlmacher',
        org: 'DePaul',
        img: `stuhlmacher.jpg`,
        affiliation: '(DePaul)',
        title: 'NASA Project PI, 2022-2024'
    }
]


const pastTeam = [

    {
        name: 'Dajoin Williams',
        link: 'https://www.linkedin.com/in/dajoinwilliams',
        org: 'DePaul',
        img: `dajoin.jpeg`,
        affiliation: '(HEROP)',
        title: 'NASA Research Assistant, 2023-2024'
    },
    {
        name: 'Chris Impellizeri',
        link: 'https://www.linkedin.com/in/christopher-impellizeri-a91194242/',
        org: 'DePaul',
        img: `chris.jpg`,
        affiliation: '(HEROP)',
        title: 'NASA Research Assistant, 2023-2024'
    },
    {
        name: 'Jack Vincent Lia',
        link: null,
        org: 'Illinois',
        img: `jack.jpg`,
        affiliation: '(HEROP)',
        title: 'NASA Research Assistant: Data Integration, Spring 2024'
    },
    {
        name: 'Mukesh Chugani',
        link: 'https://www.linkedin.com/in/mukesh-chugani',
        org: 'Illinois',
        img: `mukesh.webp`,
        affiliation: '(HEROP)',
        title: 'Research Software Engineer, Front-End, Fall 2023'
    },
    {
        name: 'Sparshdeep Singh',
        link: 'https://www.linkedin.com/in/sparshdeep-singh-08a07b221',
        org: 'Illinois',
        img: `sparshdeepsingh.jpg`,
        affiliation: '(HEROP)',
        title: 'Student Developer, Data Integration, Spring 2023'
    }, {
        name: 'Sarvagnya Vijay',
        link: 'https://www.linkedin.com/in/sarvagnya-vijay-54640421b',
        org: 'Illinois',
        img: `sarvagnya_vijay.jpg`,
        affiliation: '(HEROP)',
        title: 'Student Developer, Data Integration, Spring 2023'
    },
    {
        name:'Isaac Rand',
        link: 'https://www.linkedin.com/in/isaac-rand-760990185',
        org: 'UChicago',
        img: `isaac.jpeg`,
        affiliation:'(HEROP)',
        title:'Data Integration, 2021-2022',
    },
    {
        name:'Dylan Halpern',
        link:'https://dylanhalpern.com/',
        org: 'UChicago',
        img: `dylan.png`,
        affiliation:'(HEROP)',
        title:'Core Data Engineer & Developer, 2021-2022',
    },
        {
        name:'Susan Paykin',
        link:'https://www.linkedin.com/in/susanpaykin/',
        org: 'UChicago',
        img: `SPaykin.jpg`,
        affiliation:'(HEROP)',
        title:'Community Engagement, 2021-2022',
    },
    {
        name: 'James Keane',
        link: 'https://www.linkedin.com/in/james-keane-678863b7/',
        org: 'UChicago',
        img: 'keane.jpeg',
        affiliation: '(HEROP)',
        title: 'Data Visualization, 2021-2022',
    },
    {
        name: 'Isaac Kamber',
        link: 'https://www.linkedin.com/in/isaac-kamber/',
        org: 'UChicago',
        img: `isaac.png`,
        affiliation: '(HEROP)',
        title: 'Data Integration, 2018-2021'
    },
    {
        name:'Lorenz Menendez',
        link:'https://www.linkedin.com/in/lorenzmenendez/',
        org: 'UChicago',
        img: `Menendez_Lorenz.jpeg`,
        affiliation:'(HEROP)',
        title: 'Data Integration, 2018-2021'
    }

]

// ... other constants
const accordionContent = [
    {
        label: "West Humboldt Park Resource Map (2017)",
        content: (<>
                    <p>The West Humboldt Park Resource map was a community-engaged resource map highlighting assets in the neighborhood for a variety of organizations, people, and needs. It incorporated modern geospatial analytics to integrate data from multiple partners in a low-tech, easy to access way.
                    </p>
                    <p>The project was developed as a friendly collaboration out of the West Humboldt Park Health Coalition, a collective of community organizations, local businesses, health, and academic partners. Staff from West Humboldt Park Development Council, Our Lady of Angels, and the Northwestern Memorial Community Services group outlined the need and drove the concept. Lead developers are Marynia Kolak and Michael Steptoe. Student interns who have worked on this include Rachel Weisz (Northwestern University) and Gentry Nissen (Arizona State University). <a href="https://www.researchgate.net/profile/Marynia-Kolak/publication/336436397_Extending_Volunteered_Geographic_Information_VGI_with_Geospatial_Software_as_a_Service_Participatory_Asset_Mapping_Infrastructures_for_Urban_Health/links/5f4970d892851c6cfdf5af2a/Extending-Volunteered-Geographic-Information-VGI-with-Geospatial-Software-as-a-Service-Participatory-Asset-Mapping-Infrastructures-for-Urban-Health.pdf"> Learn more</a>.</p>
                </>)
        },

        {
        label: "US Covid Atlas (2020)",
        content: <p>
            The US Covid Atlas is a visualization tool led by HeRoP and the Center for Spatial Data Science that connects COVID case data with community indicaotrs across the United States from the beginning of the pandemic until today. The Atlas works to understand, archive, and represent the often unequal impact of the COVID-19 pandemic in the United States. <a href="https://uscovidatlas.org/">Learn more</a>.
        </p>
    },

        {
        label: "Opioid Environment Policy Scan (2021)",
        content: <p>The Opioid Environment Policy Scan (OEPS) is an open-source data warehouse to help characterize the multi-dimensional risk environment impacting opioid use and health outcomes across the United States. The OEPS provides access to data at multiple spatial scales - from U.S. states down to Census tracts - and is designed to support research seeking to study environments impacting and impacted by opioid use and opioid use disorder (OUD), inform public policy, and reduce harm in communities nationwide.
            This project was developed as part of the Lab's work with Justice Community Opioid Innovation Network (JCOIN), an NIH-HEAL Initiative, as part of the Methodology and Advanced Analytics Resource Center (MAARC). <a href="https://oeps.healthyregions.org/">Learn more</a>.
            </p>
    },

        {
        label: "Diversitree (2021)",
        content: <p>
            Diversitree is an MIT Senseable Cities Lab project that use tree inventory data to measure street tree diversity in eight global cities, comparing the city center with the outer areas of the city. Dylan Halpern helped develop and lead this project when he worked at Senseable. <a href="https://senseable.mit.edu/diversitree/">Learn more</a>.
        </p>
    },

        {
        label: "Respiratory Health Association Collaboration (2020)",
        content: <p>
            The Respiratory Health Association (RHA) is a nonprofit organization that provides respiratory care services to the general public. HeRoP partnered with the RHA, along with te support of the Joyce Foundation, Chicago Transit Authority (CTA), and Chicago Department of Public Health,
            to develop a web map application to help communities understand the health implications of the electrification of CTA buses. <a href="https://resphealth.org/wp-content/uploads/2020/09/CTA-Electrification-Health-Benefits-Report.pdf">Learn more</a>.
        </p>
    },

        {
        label: "Chicago Tree Tool (2022)",
        content: (<>
                    <p>
                    Before<i translate="no"> ChiVes</i>, HeRoP worked in joint partnership with the Chicago Department of Public Health to develop the <b> <a href="https://abc7chicago.com/chicago-trees-climate-change-tree-planting-lidar-scanner/11202738/?fbclid=IwAR0UxJhaeu_vMfES7H0owokO4y2ASs3uzZAGCYrWzfMpwS4rUiAB7kULLi0">Community Tree Equity Tool</a></b> as
                    an extension of ongoing work on understanding <a href="https://healthyregions.org/research/open-airq/" target="_blank" rel="noopener noreferrer">air quality in Chicago</a>. The Tree Tool Research Pilot was developed using 
                     <a href="https://carto.com/" target="_blank" rel="noopener noreferrer">Carto</a> to facilitate rapid development and prototyping. This tool followed years of iterative process and design and dozens of previous dashboard iterations, highlighting the winding process of agile application development. The final tool went through dozens of additional rounds of refinement and editing across multiple city and community stakeholders.
                    </p>
                    <p>In the Research Pilot Stage, The HeRoP team was led by Marynia Kolak, MS, MFA, PhD (Associate Director of Health Informatics) and supported by research assistants Isaac Kamber, Lorenz Menendez, Yuming Liu, and Jizhou Wang, with previous analytic work by graduate
                    student Haowen Shang, and ongoing collaboration with Center for Spatial Data Science Academic Director, Luc Anselin, PhD, Executive Director, Julia Koschinsky, PhD, as well as Raed Mansour, MS and Dave Graham at the Chicago Department of Public Health. Dozens of additional, invaluable public, private, and community stakeholders impacted the success of the Tree Tool application: follow the City of Chicago for more details coming soon!
                    </p>
                    <p>
                    This work was part of a Partnership for Healthy Cities, a global network of cities committed to saving lives by preventing noncommunicable diseases (NCDs) and injuries, supported by Bloomberg Philanthropies in partnership with the World Health Organization and Vital Strategies.
                    </p>
                </>
                )
    }
]

export default function About(){
    return (
       <AboutPage>
           <NavBar />
           <ContentContainer>
               <h1>About</h1>
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
                <p>This project is managed by the <a href="https://healthyregions.org/" target="_blank">Healthy Regions 
                & Policies Lab</a> (HeRoP), housed at the Department of Geography & GIScience within the <b>University of Illinois at Urbana-Champaign</b>, 
                in collaboration with the <a href="https://las.depaul.edu/academics/geography-gis/Pages/default.aspx" target="_blank">Department of Geography</a> at <b>DePaul University</b>. From 2022-2024, it is funded in part by NASA via a new initiative to support environmental justice communities in Chicago (read more <a href="https://depauliaonline.com/64087/special-issues/research-team-seeks-to-expand-access-to-environmental-data-in-chicago-nasa-grant-provides-funding-for-research-expansion-of-chives-database/">here</a> and <a href="https://ggis.illinois.edu/news/2022-09-19t152513/prof-kolak-depaul-researchers-receive-nasa-grant-data-driven-environmental"> here</a>).</p>
                <MemberGrid
                    members={projectTeam}
                    columns={{
                        md: 4
                    }}
                />
                <hr/>
                <h2>Past Project Team</h2>
                <MemberGrid
                    members={pastTeam}
                    columns={{
                        md: 4
                }}
                />
                <hr/>
                <h2>Background</h2>
                <p>The original<span translate="no"> ChiVes </span>application built on multiple former projects from Healthy Regions & Policies Lab members, incorporating materials as well as lessons learned. Much of the data currently integrated within<span translate="no"> ChiVes </span>was gathered, calculated, and standardized from 2018-2021,
                when the HEROP Lab was housed at the Center for Spatial Data Science at the University of Chicago. The current application was refactored in 2022 by <a href="https://dylanhalpern.com/">Dylan Halpern</a>, adopting a new web architecture. Explore some of the original projects that inspired<span translate="no"> ChiVes </span>below:</p>
                <Accordion entries={accordionContent} initialTab={-1} />
           </ContentContainer>
           <Footer/>
       </AboutPage>
    );
}
