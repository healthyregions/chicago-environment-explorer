import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import Grid from "@mui/material/Grid";

import { Geocoder, Showcase, NavBar, Footer } from "../../components";
import { colors } from "../../config";
import { Gutter } from "../../styled_components";
import logoList from '../../config/logos.json';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const PeoplesResponsePage = styled.div`
  h1 {
    font-family: "Lora", serif;
    font-size: 4rem;
    font-weight: 300;
    text-align: left;
    color: ${colors.black};
    width: 80vw;
    max-width: 940px;
    margin: 0 0 40px 0;
    @media (max-width:1024px) {
      font-size:3rem;
    }
    @media (max-width:768px){
      font-size:2rem;
    }
  }
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }
  hr {
    max-width: 1140px;
    margin: 6em auto;
    border: 0;
    border-top: 1px solid ${colors.darkgray};
  }
  p {
    font-family: "Roboto";
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${colors.darkgray};
  }
  a {
    color: ${colors.chicagoBlue};
  }

  .photo2 {
    width: 100%;
    @media (max-width: 960px) {
      max-height: 40vh;
      width: auto;
      margin: 0 auto;
      display: block;
    }
  }
  .logoScrollText {
    font-size:2rem;
    color:black;
    font-family:"Lora", serif;
    padding-bottom:2rem;
  }
`;

const PeoplesResponsePageContent = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Hero = styled.div`
  width: 100%;
  max-width: 1140px;
  text-align: center;
  color: ${colors.lightgray};
  margin: 0 auto;
  padding: 50px 10px 0 10px;
  p {
    font-family: "Roboto";
    font-weight: 300;
    font-size: 1.25rem;
    font-stretch: normal;
    text-align: left;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: normal;
    padding: 2rem 0;
  }
  #button-cta {
    font-family: "Lora", serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1.75px;
    line-height: 5;
    text-align: center;
    background-color: #ffffff;
    color: ${colors.darkgray};
    padding: 1rem 1.5rem;
    margin: 1rem;
    // border-radius: .3rem;
    text-decoration: none;
  }

  #button-search {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1.75px;
    text-align: center;
    text-transform: uppercase;
    background-color: ${colors.darkgray};
    color: #ffffff;
    padding: 1rem 1.5rem;
    text-decoration: none;
    line-height: 2.5;
  }

  .small-text {
    font-size: 0.75rem;
    a {
      font-size: 0.75rem;
      color: ${colors.orange};
      text-decoration: none;
    }
  }
  video {
    margin-bottom: 20px;
    width: 100%;
    max-width: 600px;
  }
  .map-caption {
    font-size: 0.9rem;
    text-align: left;
  }
`;

const ShowCaseContainer = styled.div`
  background: ${colors.gray}10;
  padding:0 0 3em 0;
  p {
    max-width:80ch;
    margin:0 auto;
  }
`

const ThreeUpGrid = styled(Grid)`
  padding: 2em 0;
  margin: 1em 0;
  h2 {
    color: ${colors.darkgray};
    text-align: left;
    font-size: 2rem;
    font-family: "Lora", serif;
    margin: 0 0 0.5rem 0.5rem;
    padding: 0;
  }
  p {
    color: ${colors.light};
    font-family: "Roboto", sans-serif;
    text-align: left;
    line-height: 1.1;
    margin: 0.5rem 0 0 0;
    padding: 0;
    font-size: 1rem;
    max-width: 95%;
  }
  img {
    width: 80%;
    max-width: 10em;
    display: block;
  }
  a {
    padding: 0.5rem 1rem;
    text-decoration: none;
    background: ${colors.forest};
    color: white;
    border-radius: 0.3rem;
    margin: 0.5rem 1rem 0 0;
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
    display: table;
    box-shadow: 5px 5px 20px ${colors.forest}55;
    transition: 250ms all;
    @media (max-width: 900px){
      margin:1rem auto 2rem auto;
      text-align:center;
    }
    &:hover {
      background: ${colors.fuschia};
      box-shadow: 5px 10px 20px ${colors.forest}88;
    }
  }
`;

const GeocoderContainer = styled(Grid)`
  background: ${colors.gray}10;
  padding: 0 2rem;
  margin: 4rem 0;
  p {
    max-width: 95%;
  }
`;

const ContributersContainer = styled.div`
  position:relative;
  overflow:hidden;
  height:5rem;
  margin:6rem 0 3rem 0;
  pointer-events:none;
  img {
    height:5rem;
    display:inline;
    margin:0 2rem;
    float:left;
  }
`

const slide = keyframes`
  from {
    left:0;
  }

  to {
    left:-140%;
  }
`;
const ContributersContainerInner = styled.div`
  width:auto;
  position:absolute;
  animation: ${slide} 30s linear infinite;
`

export default function PeoplesResponse() {
  const handleGeocoder = useCallback((location) => {
    if (location.center !== undefined) {
      let url = "";

      if (`${window.location.href}`.includes("index")) {
        url += `${window.location.href}`.split("index")[0];
      } else {
        url += window.location.href;
      }
      url += `map?lat=${location.center[1]}&lon=${location.center[0]}`;
      window.location.href = url;
    }
  }, []);

  return (
    <PeoplesResponsePage>
      <NavBar />
      <PeoplesResponsePageContent>
        <Hero>
          <h1>Uncover the nature of Chicago's environment.</h1>
          <p>
            Chicago's urban environment has profound impacts on the health of
            communities and individuals. A handful of key metrics―tree cover,
            air pollution estimates, heat island effects, traffic volumes, and
            social vulnerability index― help to reveal where in the city people
            face particular challenges as we work towards a healthier Chicago.
          </p>

          <ThreeUpGrid container spacing={0}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <img
                    className="photo"
                    src={process.env.PUBLIC_URL + "/icons/nature-book.png"}
                    alt="Wild Onion"
                    loading="lazy"
                  />
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                  <h2>Community <br /> Report</h2>
                </Grid>
              </Grid>
              <p>
                Get a dynamic report about key indicators and environmental
                metrics for your neighborhood. Search by your location.{" "}
              </p>
              <Link to="/community">Find Your Community</Link>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <img
                    className="photo"
                    src={process.env.PUBLIC_URL + "/icons/tree-location.svg"}
                    alt="Wild Onion"
                    loading="lazy"
                  />
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                  <h2>Neighborhood <br /> Map</h2>
                </Grid>
              </Grid>

              <p>
                Explore dimensions of the environment across Chicago in an
                interactive map. Data comes from collaborators across the city!
              </p>
              <Link to="/map">Start Mapping</Link>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <img
                    className="photo"
                    src={process.env.PUBLIC_URL + "/icons/resource_guide.png"}
                    alt="Wild Onion"
                    loading="lazy"
                  />
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                  <h2>
                    Resource <br />
                    Guide
                  </h2>
                </Grid>
              </Grid>
              <p>
                {" "}
                Find other maps, data, and resources about the Chicago
                environment from featured partners and a curated list of
                resources.{" "}
              </p>
              <Link to="/guide">Learn More</Link>
            </Grid>
          </ThreeUpGrid>

          <GeocoderContainer container spacing={0} alignItems="center">
            <Grid item xs={12} sm={12} md={6}>
              <p>
                <i>
                  Got somewhere you want to explore? Search for an address to
                  navigate directly to your neighborhood.
                </i>
              </p>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Geocoder
                id="Geocoder"
                placeholder={"Find your location - eg. 1155 E 60th Street"}
                API_KEY={MAPBOX_ACCESS_TOKEN}
                onChange={handleGeocoder}
              />
            </Grid>
          </GeocoderContainer>
          </Hero>
          <ShowCaseContainer>
            <Showcase />
          </ShowCaseContainer>
          <Hero>
          <Gutter h={60} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img
                className="photo2"
                src={process.env.PUBLIC_URL + "/img/onion.png"}
                alt="Wild Onion"
                loading="lazy"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <br />
              <br />
              <p>
               <span translate="no"> ChiVes </span>is a data collaborative and community mapping application
                that brings data on Chicago’s environment together at the
                neighborhood level.
                <br />
                <br />
                Like the{" "}
                <a href="https://www.illinoiswildflowers.info/woodland/plants/wild_leek.htm">
                  wild onion
                </a>{" "}
                that Chicago was named for, data about the city's environment
                should be tasty and plentiful. By <i>tasty</i>, we mean easily
                accessible and ready to use and explore. By <i>plentiful</i>, we
                mean the data should extend across multiple dimensions of the
                city's landscape, and be updated regularly.
                <br />
                <br />
                We <a href="/data">harmonize & standardize</a> environmental
                data across dozens of sources to make it accessible for full
                exploration, alongside a growing list of resources on the
                Chicago Environment, cultivated by a community of curators.
                <br />
                <br />
                Have data to add? A mapping resource to share or recommend?
                Please <a href="/about">contribute</a> !
              </p>
              <h5>
                Image of <i>Wild Onion, Allium acuminatum </i> by Margaret
                Neilson Armstrong (1913) via
                <br />
                Creative Commons CC0 1.0 Universal Public Domain Dedication.
              </h5>
            </Grid>
          </Grid>
          <LogoScroll logoList={logoList} />
          <h2 className="logoScrollText">Thanks to<span translate="no"> ChiVes </span>Contributors!</h2>
        </Hero>
      </PeoplesResponsePageContent>
      <Gutter h={60} />
      <Footer />
    </PeoplesResponsePage>
  );
}


function LogoScroll({ logoList, autoscroll = true }) {
  return (
    <ContributersContainer>
      <ContributersContainerInner>
        {logoList.map(({ ImagePath }, i) =>
          <img key={`logo-scroll-1-${i}`} src={process.env.PUBLIC_URL + ImagePath} alt="" loading="lazy" />
        )}
        {logoList.map(({ ImagePath }, i) =>
          <img key={`logo-scroll-2-${i}`} src={process.env.PUBLIC_URL + ImagePath} alt="" loading="lazy" />
        )}
      </ContributersContainerInner>
    </ContributersContainer>
  )
}
