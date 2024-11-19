import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { MemberGrid, NavBar, Footer } from '../../components';

const TeamPage = styled.div`
    background:white;
`
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
    name: 'Maribel Arellano',
    link: 'https://www.ijla.org/',
    org: 'Instituto Justice and Leadership Academy',
    img: `avatar.png`,
    affiliation: null,
    title: 'Community Partner, 2023-2024'
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
        name: 'Evelyn Barragan',
        link: 'https://www.ijla.org/',
        org: 'Instituto Justice and Leadership Academy',
        img: `avatar.png`,
        affiliation: null,
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
        name: 'Howard Ehrman',
        link: null,
        org: 'Peoples Response Network',
        img: `avatar.png`,
        affiliation: null,
        title: 'Community Partner, 2024'
    },
    {
        name: 'Arturo Galan',
        link: 'https://www.ijla.org/',
        org: 'Instituto Justice and Leadership Academy',
        img: `avatar.png`,
        affiliation: null,
        title: 'Community Partner, 2023-2024'
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
        name: 'Shubham Kumar',
        link: 'https://www.linkedin.com/in/shubhamk008/',
        org: 'Illinois',
        img: `shubham.jpeg`,
        affiliation: '(HEROP)',
        title: 'Research Product Designer, 2023-2024'
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
        link: 'https://www.womenforgreenspaces.org',
        org: 'Mujeres por Espacios Verdes',
        img: `claudia.jpg`,
        affiliation: '(HEROP)',
        title: 'Community Partner, 2023-2024'
    },
    {
        name: 'Lonette Sims',
        link: 'mailto:prncoalition@gmail.com',
        org: 'Peoples Response Network',
        img: `lonette.jpg`,
        affiliation: '(HEROP)',
        title: 'Community Partner, 2023-2024'
    },
]


const pastTeam = [
    {
        name: 'Winifred Curran',
        link: 'https://www.linkedin.com/in/winifred-curran-6026525',
        org: 'DePaul',
        img: `curran.jpg`,
        affiliation: '(DePaul)',
        title: 'NASA Co-Lead, 2022-2024'
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
        name: 'Salise Sepulveda',
        link: null,
        org: 'DePaul',
        img: `salise.jpeg`,
        affiliation: '(HEROP)',
        title: 'NASA Research Assistant, 2024'
    },
    {
        name: 'Michelle Stuhlmacher',
        link: 'https://www.linkedin.com/in/michellestuhlmacher',
        org: 'DePaul',
        img: `stuhlmacher.jpg`,
        affiliation: '(DePaul)',
        title: 'NASA Project PI, 2022-2024'
    },
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

export default function Team (){
    return (
       <TeamPage>
           <NavBar />
           <ContentContainer>
               <h1>Team</h1>
                < hr/>

                <h2>Active Project Team</h2>
                <p>This project is managed by the <a href="https://healthyregions.org/" target="_blank" rel="noopener noreferrer">Healthy Regions
                & Policies Lab</a> (HeRoP), housed at the Department of Geography & GIScience within the <b>University of Illinois at Urbana-Champaign</b>.
                The team continues to collaborate with community partners and residents to improve design, accessibility, and translation, charting the future
                of ChiVes as a growing collaborative.
                </p>
                <br />
                <MemberGrid
                    members={projectTeam}
                    columns={{
                        md: 4
                    }}
                />
                <hr/>
                <h2>Past Project Team</h2>
                <p>
                From 2022-2024, ChiVes was funded in part by NASA via a new initiative to support environmental justice communities in Chicago, in collaboration with the <a href="https://las.depaul.edu/academics/geography-gis/Pages/default.aspx" target="_blank" rel="noopener noreferrer">Department of Geography</a> at <b>DePaul University</b> (read more <a href="https://depauliaonline.com/64087/special-issues/research-team-seeks-to-expand-access-to-environmental-data-in-chicago-nasa-grant-provides-funding-for-research-expansion-of-chives-database/">here</a> and <a href="https://ggis.illinois.edu/news/2022-09-19t152513/prof-kolak-depaul-researchers-receive-nasa-grant-data-driven-environmental"> here</a>).
                Prior to that, ChiVes emerged as a project from HEROP lab members at the University of Chicago.</p>
                <br />
                <MemberGrid
                    members={pastTeam}
                    columns={{
                        md: 4
                }}
                />
                <hr/>

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

           </ContentContainer>
           <Footer/>
       </TeamPage>
    );
}
