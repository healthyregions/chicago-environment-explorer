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
        title: 'Assistant Director for Health Informatics, Health Geographer, GIScientist'
    },
    {
        name:'Dylan Halpern, MCP',
        link:'https://dylanhalpern.com/',
        img: `dylan.png`,
        affiliation:'(CSDS)',
        title:'Principal Software Engineer',
    },
]

// Past contributors
const contributors = [
]

// Community Partners contributors
const communityPartners = [
]


export default function About(){
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
                    <h3>Project Team</h3>
                    <MemberGrid 
                        members={projectTeam}
                        columns={{
                            md: 6,
                        }}
                        />
                    <Gutter h={60}/>
                    <h3>Contributors</h3>
                    <MemberGrid 
                        members={contributors}
                        columns={{
                            md: 6,
                        }}
                        />
                    <Gutter h={60}/>
                    <h3>Community Partners</h3>
                    <MemberGrid 
                        members={communityPartners}
                        columns={{
                            md: 6,
                        }}
                        />
                </BioSection>
           </ContentContainer>
           <Footer/>
       </AboutPage>
    );
}