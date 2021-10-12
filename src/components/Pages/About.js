import React from 'react';
import styled from 'styled-components';
import { ContentContainer, Gutter } from '../../styled_components';
import Grid from '@material-ui/core/Grid';
import { StaticNavbar, Footer } from '../../components';

const AboutPage = styled.div`
    background:white;
`
const BioSection = styled.div`
    padding:40px 0;
    text-align:center;
    img {
        width:100%;
        max-width:200px;
        display:block;
        // border-radius:50%;
        margin:40px auto 10px auto;
    }
    p.affiliation {
        display:inline;
    } 
    p {
        max-width: 400px;
        margin:0 auto;
    }
`

const leadershipInfo = [
    {
        name: 'Marynia Kolak, MS, MFA, PhD',
        link: 'https://makosak.github.io/',
        img: `${process.env.PUBLIC_URL}/people/mk.jpg`,
        affiliation: '(CSDS)',
        title: 'Assistant Director for Health Informatics, Health Geographer, GIScientist'
    }
]


const coreTeamInfo = [
    {
        name:'Dylan Halpern, MCP',
        link:'https://dylanhalpern.com/',
        img: `${process.env.PUBLIC_URL}/people/dylan.png`,
        affiliation:'(CSDS)',
        title:'Principal Software Engineer',
    },
]

const coalitionDesignInfo = []
const coalitionPartnersInfo = []
const contributorsInfo = []

const formatBio = (person) => 
    <Grid item xs={12} md={4}>
        <img src={person.img} alt={`${person.name}`} />
        <p>
            {person.link ? 
                <a href={person.link} target="noopener noreferrer">{person.name}</a>
                :
                person.name
            }
            {person.affiliation && ` ${person.affiliation}`}
        </p>
        <p>
            {person.title}
        </p>
    </Grid>

const about = () => {
    return (
       <AboutPage>
           <StaticNavbar/>
           <ContentContainer>
               <h1>About Us</h1>
               <hr/>
               <h2>
                   Description Here.
                </h2>
                <p>
                    Additional Description As Needed.
                </p>
                <BioSection>
                    <h3>Leadership</h3>
                    <Grid container spacing={1} justify="center">
                        {leadershipInfo.map(person => formatBio(person))}
                    </Grid>
                    <Gutter h={60}/>
                    <h3>Core Team</h3>
                    <Grid container spacing={1} justify="center">
                        {coreTeamInfo.map(person => formatBio(person))}
                    </Grid>
                    <Gutter h={60}/>
                    <h3>Coalition Design &amp; Communications Team</h3>
                    <Grid container spacing={1} justify="center">
                        {coalitionDesignInfo.map(person => formatBio(person))}
                    </Grid>
                    <Gutter h={60}/>
                    <h3>Coalition Partners</h3>
                    <Grid container spacing={1} justify="center">
                        {coalitionPartnersInfo.map(person => formatBio(person))}
                    </Grid>
                    <Gutter h={60}/>
                    <h3>Contributors</h3>
                    <Grid container spacing={1} justify="center">
                        {contributorsInfo.map(person => formatBio(person))}
                    </Grid>
                </BioSection>
           </ContentContainer>
           <Footer/>
       </AboutPage>
    );
}
 
export default about;