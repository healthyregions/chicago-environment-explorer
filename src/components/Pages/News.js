import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { NavBar, Footer } from '../../components';

const NewsPage = styled.div`
    background:white;
    text-align:center;

`

export default function News(){
    return (
       <NewsPage>
           <NavBar />
           <ContentContainer>

           <h1>Coming Soon!</h1>
                <h2>Please check back in a few.</h2>
                <p>
                    The elves are working.
                </p>

           </ContentContainer>
           <Footer/>
       </NewsPage>
    );
}
