import React from "react";
import styled from "styled-components";
// import { NavLink } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { colors } from "../../config";

const FooterContainer = styled.footer`
  width: 100%;
  background: ${colors.forest};
  p {
    color: ${colors.black};
    font-size: 1rem;
  }
  h6 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: 1rem;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${colors.black};
    text-align:left;
  }
  a {
    text-decoration: none;
    color: ${colors.black};
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
  img {
    margin-bottom: 10px;
    @media (max-width: 960px) {
      max-width: 50%;
      display: block;
      margin: 40px auto;
    }
  }
  img.logo {
    margin: 0 auto 2rem 0;
    display: block;

    width: 18rem;
    height: 4rem;
    @media (max-width: 900px) {
      margin: 2rem auto;
      max-width: 35%;
    }
    &.depaul {
      margin: auto 4rem;
      width: 8rem;
      height: 8rem;
    }
  }
  hr {
    margin: 20px 0;
    color:white;
    border-bottom:1px solid white;
  }
  h6 {
    color: white;
    font-size: 2rem;
    font-family: "Lora", serif;
  }
  ul li a {
    color: white;
    text-decoration: underline;
  }
`;
const FooterContent = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 2rem 0;
  a, a img {
    display: inline-block;
    width:90%;
  }
`;

const LinkLists = styled(Grid)`
  width: 100%;
  ul {
    list-style: none;
    li {
      line-height: 1.5;
      color: white;
      font-weight: bold;
    }
  }
  .copyright {
    text-align: center;
    font-family: "Roboto", sans-serif;
    color: ${colors.white};
    font-size: 13px;
  }
  @media (max-width: 960px) {
    text-align: center;
  }
`;

const Footer = (props) => {
  return (
    <FooterContainer>
      <FooterContent>
        <LinkLists container spacing={0}>
          <Grid item xs={12}>
            <h6 translate="no">ChiVes</h6>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/map">Map</Link>
                  </li>
                  <li>
                    <Link to="/data">Data</Link>
                  </li>
                  <li>
                    <Link to="/community">My Community</Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={6}>
                <ul>
                  <li>
                    <Link to="/guide">Resource Guide</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} justifyContent="center" alignItems="center">
            <Grid container padding={0} spacing={0} justifyContent="flex-end" alignItems="flex-end">
              <Grid item md={2} xs={0}></Grid>
              <Grid item md={5} xs={7}>
                <a
                    href="https://www.healthyregions.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <img
                      className="logo"
                      src={`${process.env.PUBLIC_URL}/herop_light_logo.png`}
                      alt="Healthy Regions & Policies Lab"
                  />
                </a>
              </Grid>
              <Grid item md={5} xs={5}>
                <a
                    href="https://las.depaul.edu/academics/geography/Pages/default.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <img
                      className="logo depaul"
                      src={`${process.env.PUBLIC_URL}/depaul_light_logo_alt.png`}
                      alt="DePaul University"
                  />
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <p className="copyright" style={{marginTop: "20px"}}>
              Copyright<span translate="no"> ChiVes </span>Contributors, Healthy Regions & Policies Lab
              <br />
              Website Licensed GPL, Data Licensed CC NC Attribution
            </p>
          </Grid>
        </LinkLists>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
