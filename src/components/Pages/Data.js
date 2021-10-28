import React from 'react';
import styled from 'styled-components';
import { ContentContainer, Gutter } from '../../styled_components';
import { StaticNavbar, Footer, } from '../'; 
import { colors } from '../../config';

const DataPage = styled.div`
    background:white;
`

const BlockIndent = styled.p`
    margin-left:1rem;
    padding-left:1rem;
    border-left:2px solid ${colors.lightgray}
`

const SectionTitle = styled.h3`
    margin: 40px 0 10px 0;
    &:nth-of-type(1){
        margin:10px 0;
    }
`
 
export default function Data(){
    return (
       <DataPage>
           <StaticNavbar/>
           <ContentContainer>
                <h1>Data</h1>
                <Gutter h={10}/>
                <p>
                    Below is a high-level description of the currently available datasets in the Chicago Environment Explorer.
                </p>
                <Gutter h={10}/>
                
                <h2>CURRENT RELEASE</h2>
                <p>
                    Data Information here...
                </p>
               
            </ContentContainer>
            <Footer/>
       </DataPage>
    );
}