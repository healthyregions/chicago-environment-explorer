import React from 'react';
import styled from 'styled-components';
// import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import { colors } from '../config';


const FooterContainer = styled.footer`
    width:100%;
    background: ${colors.forest};
    p {
        color:${colors.black};
        font-size:1rem;
    }
    h6 {
        margin-top: 0;
        margin-bottom: 12px;
        font-size:1rem;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: ${colors.black};
    }
    a {
        text-decoration:none;
        color:${colors.black};
        opacity:0.8;
        &:hover {
            opacity:1;
        }
    }   
    img {
        margin-bottom:10px;
        @media (max-width: 960px) {
            max-width:50%;
            display:block;
            margin:40px auto;
        }
    }
    img.logo {
        margin:0 auto;
        display:block;
    }
    hr.footerHr {
        margin:20px 0;
    }
`
const FooterContent = styled.div`
    width:100%;
    max-width:1140px;
    margin:0 auto;
`

const LinkLists = styled(Grid)`
    width:100%;
    padding:50px;
    ul {
        list-style:none;
        li {
            line-height:1.5;
            color:${colors.darkgray};
            font-weight:bold;
        }
    }
    h6.copyright {
        text-align:center;
        font-size:1.5rem;
        font-family:'Lora', serif;
        padding:0 0 2rem 0;
        color:${colors.darkgray};
        font-weight:bold;
    }
    @media (max-width: 960px) {
        text-align:center;
    }
    
`

const Footer = ( props ) => {
    return (
        <FooterContainer>
            <FooterContent>
                <LinkLists container spacing={1}>
                    <Grid item xs={12}>
                        <h6 className="copyright">
                        </h6>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <a href="https://spatial.uchicago.edu/content/spatial-research-csds" target="_blank" rel="noopener noreferrer">
                            <img className="logo" src={`${process.env.PUBLIC_URL}/csds-university-wordmark-white.png`} width="75%;" alt="Center for Spatial Data Science logo" />
                        </a>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <a href="https://voices.uchicago.edu/herop/" target="_blank" rel="noopener noreferrer">
                            <img className="logo" src={`${process.env.PUBLIC_URL}/herop_light_logo.png`} width="50%;" alt="Center for Spatial Data Science logo" />
                        </a>
                    </Grid>

                    
                </LinkLists>
            </FooterContent>
        </FooterContainer>
    )
}

export default Footer