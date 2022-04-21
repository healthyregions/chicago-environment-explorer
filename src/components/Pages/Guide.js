import React from 'react';
import styled from 'styled-components';

import { ContentContainer } from '../../styled_components';
import { NavBar, Footer } from '../';

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
            </ContentContainer>
            <Footer/>
       </GuidePage>
    );
}
 
 
export default Guide;