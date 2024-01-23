import React from 'react';
import styled from 'styled-components';
import { ContentContainer, Gutter } from '../../styled_components';
import { NavBar, Footer, ContactForm } from '../';

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

// const pressInfo = [
//     // {
//     //     'name': 'UChicago News:',
//     //     'link': 'https://news.uchicago.edu/story/state-level-data-misses-growing-coronavirus-hot-spots-us-including-south',
//     //     'text': 'State-level data misses growing coronavirus hot spots in the U.S., including in the South',
//     //     'date': '(March 26)'
//     // }
// ]


export default function Contact(){
    return (
       <ContactPage>
           <NavBar/>
           <ContentContainer>
                <h1>Contact Us</h1>
                <a href="https://twitter.com/healthyregions" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img src={`${process.env.PUBLIC_URL}/icons/twitter-icon-dark.png`} alt="Twitter Icon" />
                </a>
                <a href="https://github.com/GeoDaCenter/chicago-environment-explorer" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img src={`${process.env.PUBLIC_URL}/icons/github-icon-dark.png`} alt="Twitter Icon" />
                </a>
                <hr/>
                <p>
                    Contact the <i translate="no">ChiVes</i> leadership team directly through this form if you have any questions about the project or media inquiries.
                </p>
                
                <ContactForm />
                <Gutter h={40}/>

           </ContentContainer>
           <Footer/>
       </ContactPage>
    );
}