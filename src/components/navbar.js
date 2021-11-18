import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../config';

const NavItems = styled.ul`
  @media (max-width:1024px){
    display:none !important;
  }
`

const NavContainer = styled.div`
  display: flex;
  width: auto; 
  height: 50px; 
  position: absolute; 
  top: 0px; 
  left: 0px;
  z-index:999;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 1.75px;
  font-weight: 400;
  font-stretch: normal;

  a {
    color: gray;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    text-decoration: none;
    transition:250ms all;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 20px;
    a {
      font-family: 'Roboto', serif;
      font-weight:bold;
      letter-spacing: initial;
      color:${colors.black};
    }
  }

  ul {
    list-style: none;
    display: flex;
    height: 100%;
    margin: 0px;
  }

  li {
    display: flex;
    align-items: center;
  }

  li:hover a {
    color: ${colors.green};
  }
  
  @media only screen and (max-width: 600px) {
    ul{
      display: none;
    }
  }

`

const NavBar = () => {
    return (
        <NavContainer>
            <div className="nav-logo">
              <img src={`${process.env.PUBLIC_URL}/logo.png`} style={{height: '30px', paddingRight: '5px'}} alt="Chicago Environment Explorer" /><a href="/">Chives Explorer</a>
            </div>
          <NavItems> 
            <li><NavLink to="/data">DATA</NavLink></li>
            <li><NavLink to="/about">ABOUT</NavLink></li>
            <li><NavLink to="/contact">CONTACT</NavLink></li>
          </NavItems>
        </NavContainer>
    )
}

export default NavBar