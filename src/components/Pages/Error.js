import React from 'react';
import styled from 'styled-components';

import { ContentContainer } from '../../styled_components';
import { NavBar, Footer } from '../';

const ErrorPage = styled.div`
  background:white;
  min-height:100vh;
  text-align:center;
  img.errorImg {
    padding:60px;
  }
`

const Error = () => {

  return (
    <ErrorPage >
      <NavBar/>
      <ContentContainer>
        <h1>Error 404</h1>
        <h2>We can't get you where you're going.</h2>
        <p>
          Sorry, we can't find the page you're looking for. It may have moved or recently changed.
          <br/><br/>
          Please use the navigation bar or footer.
        </p>
      </ContentContainer>
      <Footer/>
    </ErrorPage>
  );
}

export default Error;
