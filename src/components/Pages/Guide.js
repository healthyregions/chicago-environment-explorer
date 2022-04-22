import React from 'react';
import styled from 'styled-components';
import ResourceList from '../../config/resources.json';
import { ContentContainer } from '../../styled_components';
import { ResourceGuideRow, NavBar, Footer } from '../../components';

const GuidePageContent = styled.div`
  width: 100%;
  margin: 0 auto;
    background:white;
    min-height:100vh;
    text-align:left
`;


const Guide = () => {

    return (

       <GuidePageContent>
             <NavBar/>
            <ContentContainer>
            <br/><br/>
                <h1>Resource Guide</h1>
                <hr/>
                {ResourceList.map((entry, index) => <ResourceGuideRow entry={entry} key={index}/>)}

            </ContentContainer>
                  <Footer/>
       </GuidePageContent>

    );
}
 
 
export default Guide;