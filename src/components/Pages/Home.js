import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

import { StaticNavbar, Footer } from '../../components';
import { colors } from '../../config';
import { Gutter } from '../../styled_components';

const HomePage = styled.div`
    h1 {    
        font-family: 'Lora', serif;
        font-size: 4rem;
        font-weight: 300;
        text-align: left;
        color: ${colors.black};
        width: 80vw;
        max-width: 940px;
        margin: 0 0 40px 0;
    }
    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
        margin-bottom: .5rem;
        font-weight: 500;
        line-height: 1.2;
    }
    hr {
        max-width:1140px;
        margin:6em auto;
        border: 0;
        border-top: 1px solid ${colors.darkgray};
    } 
    p {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: ${colors.darkgray};
    }
`

const HomePageContent = styled.div`
    width:100%;
    margin:0 auto;
`

const Hero = styled.div`
    width:100%;
    max-width:1140px;
    text-align:center;
    color: ${colors.lightgray};
    margin:0 auto;
    padding:50px 10px 0 10px;
    p {
        
        font-family: 'Lora', sans-serif;
        font-size: 1.25rem;
        font-stretch: normal;
        text-align:left;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        padding:2rem 0;
    }
    #button-cta {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1.75px;
        line-height:5;
        text-align: center;
        text-transform:uppercase;
        background-color: ${colors.chicagoBlue};
        color: #0d0d0d;
        padding: 1rem 1.5rem;
        margin:1rem;
        // border-radius: .3rem;
        text-decoration:none;
    }
    .small-text {
        font-size:0.75rem;
        a {
            font-size:0.75rem;
            color:${colors.orange};
            text-decoration:none;
        }
    }
    video {
        margin-bottom:20px;
        width:100%;
        max-width:600px;
    }
    .map-caption {
        font-size:0.9rem;
        text-align:left;

    }

`

export default function Home(){
    return (
       <HomePage>
           <StaticNavbar/>
           <HomePageContent>
                <Hero>
                    <h1>Uncover the nature of Chicago's environment.</h1>
                    <p>
                        Chicago's urban environment has profound impacts on the health of communities and individuals. 
                        A handful of key metrics―tree cover, PM2 estimates, heat island effects, traffic volumes, and social vulnerability index―
                        help to reveal where in the city people face particular challenges as we work towards a healthier Chicago.
                        <br/><br/>

                        This visualization Tool for Tree Site Selection &amp; Environment Exploration was created in partnership with CDPH and UChicago's Center for Spatial Data Science, funded by the Partnership for Healthy Cities.

                    </p>
                    <NavLink to="/map" id="button-cta">Explore Chicago's Environment</NavLink>
                </Hero>
           </HomePageContent>
           <Footer signUp={false} />
       </HomePage>
    );
}