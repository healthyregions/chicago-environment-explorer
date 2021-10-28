import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentContainer, Gutter } from '../../styled_components';
import { StaticNavbar, Footer, ContactForm } from '../';

const ContactPage = styled.div`
    background:white;
    h1 {
        display:inline-block;
        margin-right:20px;
    }
    a.social-icon {
        img {
            width: 30px;
        }
        display:inline-block;
        margin:5px 10px 0 0;
        opacity:0.6;
        transition:250ms all;
        &:hover {
            opacity:1;
        }
    }
`

const pressInfo = [
    // {
    //     'name': 'UChicago News:',
    //     'link': 'https://news.uchicago.edu/story/state-level-data-misses-growing-coronavirus-hot-spots-us-including-south',
    //     'text': 'State-level data misses growing coronavirus hot spots in the U.S., including in the South',
    //     'date': '(March 26)'
    // }
]


export default function Contact(){
    return (
       <ContactPage>
           <StaticNavbar/>
           <ContentContainer>
                <h1>Contact Us</h1>
                <a href="https://twitter.com/covid_atlas" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img src={`${process.env.PUBLIC_URL}/icons/twitter-icon-dark.png`} alt="Twitter Icon" />
                </a>
                <a href="https://github.com/GeoDaCenter/covid" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img src={`${process.env.PUBLIC_URL}/icons/github-icon-dark.png`} alt="Twitter Icon" />
                </a>
                <hr/>
                <p>
                    
                    Contact US COVID Atlas co-leads directly if you have any questions about the Atlas or have media inquiries:<br/>
                </p>
                
                <ContactForm />
                <p>
                    For additional inquiries, contact the US COVID Atlas team: Marynia Kolak (mkolak at uchicago.edu) or Qinyun Lin (qinyunlin at uchicago.edu)
                </p>
                <Gutter h={40}/>
                <h2>CITATION</h2>
                <hr/>
                <p>
                    Citation Here.
                </p>
                <Gutter h={40}/>
                <h2>MEDIA COVERAGE</h2>
                <hr/>
                {pressInfo.map(press => 
                    <p>
                        <b>{press.name} </b>
                        <a href={press.link} target="_blank" rel="noopener noreferrer">{press.text} </a>
                        {press.date}
                        <br/><br/>
                    </p>
                )}
           </ContentContainer>
           <Footer/>
       </ContactPage>
    );
}