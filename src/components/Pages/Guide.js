import React from 'react';
import styled from 'styled-components';
import ResourceList from '../../config/resources.json';
import { ContentContainer } from '../../styled_components';
import { ResourceGuideRow, NavBar, Footer } from '../../components';

const GuidePage = styled.div`
    background:white;
    min-height:100vh;
    text-align:center;
`

const Guide = () => {

    return (
       <GuidePage>
            <NavBar/>
            <ContentContainer>
                <h1>Resource Guide</h1>
                
                <h2>Test.</h2>
                <p>
                    Test
                </p>
                {ResourceList.map((entry, index) => <ResourceGuideRow entry={entry} key={index}/>)}
            </ContentContainer>
            <Footer/>
       </GuidePage>
    );
}
 
 
export default Guide;