import React from 'react';
import styled from 'styled-components';
import ResourceList from '../../config/resources.json';
import { ContentContainer } from '../../styled_components';
import { Gutter, ResourceGuideRow, NavBar, Footer } from '../../components';

const GuidePageContent = styled.div`
    width: 100%;
    margin: 0 auto;
    background:white;
    min-height:100vh;
    text-align:left;
`;

const Guide = () => {
    return (
        <GuidePageContent>
            <NavBar />
            <ContentContainer>
                <Gutter height={40}/>
                <h1>Resource Guide</h1>
                <hr />
                <p>
                    The resource guide provides information about relevant websites, toolkits, 
                    and related items that relate to the Chicago environment at a local scale.
                    The Guide includes information from featured partners, as well as a 
                    curated list of additional resources discovered & recommended.
                    <Gutter height={20}/>
                    Resources are included that are:
                    <Gutter height={20}/>
                    <ul>
                        <li>
                            <b>Complete. </b> Each resource entry should include the resource name,
                             website or media attachment, short description of resource &amp; source, and featured image.
                        </li>
                        <li>
                            <b>Relevant. </b> The resource includes information about Chicago's 
                            environment at a local scale.
                        </li>
                        <li>
                            <b>Transparent.</b> Funding sources for the resource provided must be 
                            disclosed during submission.
                        </li>
                        <li>
                            <b>Equitable. </b> Resources should be accessible for community members 
                            and not cost prohibitive. Free and/or open resources will be prioritized.
                        </li>
                    </ul>
                    <Gutter height={20}/>
                    Add or recommend a resource by submitting the official <a href="https://docs.google.com/forms/d/e/1FAIpQLSd2gHSB7OKCKEBhB0weIM7ZsRBomVOAl7QhDHOeXu5B7ih_bQ/viewform?usp=sf_link" target='_blank' rel="noopener noreferrer">Resource Guide Form.</a>
                    <Gutter height={20}/>
                </p>
                <Gutter height={60}/>
                {ResourceList.map((entry, index) => <ResourceGuideRow entry={entry} key={index} />)}
            </ContentContainer>
            <Footer />
        </GuidePageContent>
    );
}

export default Guide;