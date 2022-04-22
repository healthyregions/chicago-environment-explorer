import React from 'react';
import styled from 'styled-components';
import { ContentContainer, Gutter } from '../../styled_components';
import { NavBar, Footer, Table } from '../';
import { colors } from '../../config';
import dataSources from '../../config/variables.json';
import dataColumns from '../../config/columns.json';
import baseLayers from '../../config/baseLayers.json';

const DataPage = styled.div`
    background:white;

`

// const TableStyle  = styled.div`
//     a {
//         font-family: 'Lora', sans-serif;
//         font-size: 13px;
//         font-stretch: normal;
//         text-align:left;
//         font-style: normal;
//         line-height: 1.6;
//         letter-spacing: normal;
//         padding:2rem 0;
//     }

// `

const Hero = styled.div`
    width:100%;
    max-width:1140px;
    text-align:center;
    color: ${colors.lightgray};
    margin:0 auto;
    padding:50px 10px 0 10px;
        a {
        font-family: 'Lora', sans-serif;
        font-size: 13px;
        font-stretch: normal;
        text-align:left;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        padding:2rem 0;
    }
    p, .license-description a {
        
        font-family: 'Lora', sans-serif;
        font-size: 1.25rem;
        font-stretch: normal;
        text-align:left;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        padding:2rem 0;
        &.license-description {
            text-align: center;
        }
    }
    #button-search{
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1.75px;
        line-height:5;
        text-align: center;
        background-color: ${colors.forest};
        color: #FFFFFF;
        padding: 1rem 1.5rem;
        margin:1rem;
        // border-radius: .3rem;
        text-decoration:none;
    }
`
const NewTabLink = ({ link, text }) => <a href={link} target="_blank" rel="noopener noreferrer">{text}</a>

const columns = [
    {
        Header: 'Variable',
        accessor: 'Variable Name',
    },
    {
        Header: "Contributor",
        accessor: "Added By"
    },
    {
        Header: 'Documentation',
        accessor: f => <NewTabLink link={f['Metadata Doc']} text="Metadata" />,
    },
    {
        Header: 'Data Source(s)',
        accessor: f => <span dangerouslySetInnerHTML={{ __html: f['Data Source(s)'] }} />,
    },
    {
        Header: 'Data Year',
        accessor: 'Data Year',
    },
    {
        Header: 'Original Scale',
        accessor: 'Original Scale',
    }
]

export default function Data() {
    return (
        <DataPage>
            <NavBar />
            <ContentContainer>
                <h1>Data</h1>
                <Gutter h={10} />
                <p>
                    <i>ChiVes</i> uses harmonized, standardized environmental data at the census tract scale including tree canopy characteristics,
                    surface temperature, logged traffic volume, urban flood susceptibility, social vulnerability, hardship, modeled fine particulate
                    matter estimates, and more in Chicago, IL around 2018 (data ranges from 2010-2018).
                    Read more on our <a href="/About">About</a> page.
                    <br /><br />

                    Data is added and updated through a collaborative partnership of researchers, community organizations, and civic groups. Organizations
                    and individuals can participate in <i>ChiVes</i> in multiple ways:

                    <br /><br />
                    <li> <a href="https://docs.google.com/forms/d/e/1FAIpQLSdu5zCJcvLXp8eY0p3jLuCWPKSuGHjrw2auO3BsD57ssH4_wA/viewform">Data Collaborative.</a> Integrate
                        your data directly. Members agree that the final, integrated data will meet Collaborative standards. </li>


                    <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSd2gHSB7OKCKEBhB0weIM7ZsRBomVOAl7QhDHOeXu5B7ih_bQ/viewform">Resource Guide.</a> Share your
                        web-based or print media resource on the Chicago environment. Resources must meet ChiVes standards. </li>


                    <li><a href="https://github.com/GeoDaCenter/chicago-environment-explorer">Web Development.</a> Developers and code-enthusiasts can fork the ChiVes
                        website, make changes, and submit for review.</li>

                    <br />
                    View our <a href="https://docs.google.com/document/d/12lwkCAXxI9eW4Mdf6gaeR6LCsaNI3E0E6xvi7dqXr9k/edit?usp=sharing">Standards and Submission
                        Guidelines</a>. These guidelines are evaluated on a regular basis by members of the Data Collaborative.
                    <br /><br />
                    Download the latest version of our data here:
                    <br />
                </p>

                <Hero>
                    <h2> Current Data Release (4-22-2022)</h2>
                    <a href={`${process.env.PUBLIC_URL}/shp/chives-data.zip`} id="button-search" download>ShapeFile</a>
                    <a href={`${process.env.PUBLIC_URL}/geojson/chives-data.geojson`} id="button-search" download>GeoJSON</a>
                    <a href={`${process.env.PUBLIC_URL}/csv/chives-data.csv`} id="button-search" download>CSV / Excel</a>
                    <p className="license-description">
                        This data is licensed under a <a href="https://creativecommons.org/licenses/by-nc/2.0/" target='_blank' rel="noopener noreferrer">Creative Commons Attribution Non-Commercial license.</a>
                        <br /><br />
                        {/* Cite this data as <i>ChiVes Data Contributors</i> */}
                    </p>
                </Hero>

                <Gutter h={20} />
                <h2>Data Dictionary</h2>
                <ul>
                    {dataColumns.map(({ Column, Description },i) => <li key={i}><p><b>{Column}:</b> {Description}</p></li>)}
                </ul>
                <Gutter h={40} />
                <h2>Map Variables and Data Sources</h2>
                <h3>
                    This table highlights the map variables and contributors,
                    as well as the data methodology documentation and sources.
                    All map data are harmonized to the census tract scale.
                </h3>


                
                    <Gutter h={20} />
                    <Table columns={columns} data={dataSources} />
                    <Gutter h={40} />
               
                    

                <h2>Basemap Layers and Data</h2>
                <h3>The variables below are represented in the map as base layers.</h3>
                <Gutter h={20} />
                <Table columns={columns} data={baseLayers} />
            </ContentContainer>
            <Footer />
        </DataPage >
    );
}