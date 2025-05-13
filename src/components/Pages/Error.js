import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { NavBar, Footer } from '../../components';
import { useLocation } from 'react-router-dom';



const ErrorPage = styled.div`
    background:white;
`

export default function
(){
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
     <ErrorPage>
         <NavBar />
         <ContentContainer>
           <h2>Uh-oh...</h2>
           <p>It appears you might be lost.</p>
           <p>We couldn't find the page you requested: <strong><i>{currentRoute}</i></strong></p>

           <a href='#' onClick={() => window.history.back()}>Back to ChiVes</a>
         </ContentContainer>
         <Footer/>
     </ErrorPage>
  );
}
