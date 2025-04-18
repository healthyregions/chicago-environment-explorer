import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, NavLink, useLocation} from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { colors } from '../../config';
import { Box } from '@mui/system';
import { setPanelState } from '../../actions';
import * as SVG from '../../config/svg';

const SubNav = styled.li`
  padding: 0 1.5rem;
  a {
    color: ${colors.chicagoBlue} !important;
    &.active {
      color: #3D6017 !important;
    }
  }
  &:first-child {
    border-top: 1px solid ${colors.lightgray};
  }
`;

const NavItems = styled.ul`
  margin-top:.25em;
  margin-bottom:1em;
  background:none;
  list-style:none;
  line-height:2;
  font-size:1rem;
  transition: 250ms all;
  li a, button {
    &.active {
      color: #3D6017;
    }
    text-decoration:none;
    font-family:"Roboto", sans-serif;
    color: #267FA4;
    transition:250ms all;
    cursor: pointer;
    text-transform:none;
    padding:0.5em 0;
    svg { 
      width:1em;
      height:1em;
      margin:0 .5em 0 0;
      @media (max-width:600px){
        width:20px;
        height:20px;
        margin:5px;
      }
      fill:${colors.chicagoBlue};
      transform:rotate(0deg);
      transition:500ms all;
      .cls-1 {
        fill:none;
        stroke-width:6px;
        stroke:${colors.chicagoBlue};
      }
    }
    &:hover {
      color: ${colors.green};
        svg {
          fill: ${colors.green};
        .cls-1 {
          stroke:${colors.green};
        }
      }
    }
  }
`

const NavContainer = styled.div`
  position:fixed;
  top:.5em;
  left:.5em;
  z-index:500;
  button {
    padding-top: 5px;
    padding-right: 15px;
    padding-bottom: 5px;
    padding-left: 15px;
    border: 1px solid #97DB4F;
  }
`
const SvgLogoContainer = styled.svg`
  height:2.5em;
  margin-right:.5em;
  width:2.5em;
  circle {
    transition:2000ms all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
`
const initialSizing = [
  { r: 12.5, cx: 77.2, cy: 21.2, fill: colors.green },
  { r: 20.5, cx: 85.2, cy: 61.6, fill: colors.green },
  { r: 16.2, cx: 40.9, cy: 90.1, fill: colors.green },
  { r: 24, cx: 33.3, cy: 41, fill: colors.green },
]

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function SvgLogo({
  colors
}) {
  const [svgSizing, setSvgSizing] = useState(initialSizing)

  useEffect(() => {
    const interval = setInterval(() => {
      setSvgSizing(prev => [
        { ...prev[1], r: Math.random() * 15 + 5, fill: getRandom(colors) },
        { ...prev[2], r: Math.random() * 15 + 5, fill: getRandom(colors) },
        { ...prev[3], r: Math.random() * 15 + 5, fill: getRandom(colors) },
        { ...prev[0], r: Math.random() * 15 + 5, fill: getRandom(colors) }
      ])
    }, 2000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <SvgLogoContainer version="1.1" x="0px" y="0px" viewBox="0 0 115 115" >
    <circle r={svgSizing[0].r} cx={svgSizing[0].cx} cy={svgSizing[0].cy} fill={svgSizing[0].fill} />
    <circle r={svgSizing[1].r} cx={svgSizing[1].cx} cy={svgSizing[1].cy} fill={svgSizing[1].fill} />
    <circle r={svgSizing[2].r} cx={svgSizing[2].cx} cy={svgSizing[2].cy} fill={svgSizing[2].fill} />
    <circle r={svgSizing[3].r} cx={svgSizing[3].cx} cy={svgSizing[3].cy} fill={svgSizing[3].fill} />
  </SvgLogoContainer>
}

const NavInner = styled(Box)`
  padding:1em;

`
const LogoButtonContainer = styled(Button)`  
  background: rgba( 255, 255, 255, 0.85 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.85 );
  backdrop-filter: blur( 20px );
  -webkit-backdrop-filter: blur( 20px );
  box-shadow: 2px 0px 5px ${colors.gray}44;
  transform:translateX(3px);
  border-radius:0;
  border:1px solid ${colors.green};
`

export default function Nav({
  showMapControls = false,
  bounds,
  setViewState
}) {

  const dispatch = useDispatch();
  const panelState = useSelector(state => state.panelState);
  const handleOpenClose = (panel) => dispatch(setPanelState({ [panel]: panelState[panel] ? false : true }))

  // const handleGeolocate = async () => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //       setViewport({
  //           longitude: position.coords.longitude,
  //           latitude: position.coords.latitude,
  //           zoom: 14,
  //           transitionDuration: 1000,
  //           transitionInterpolator: new FlyToInterpolator()
  //       })
  //   })
  // }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'Close Menu' : 'Open Menu';
  const loc = useLocation();

  return (
    <NavContainer>
      <LogoButtonContainer aria-describedby={id} variant="outlined" onClick={handleClick} title={id} color="success">
        <SvgLogo colors={[colors.green, colors.chicagoBlue, colors.skyblue, colors.chicagoDarkBlue, colors.chicagoRed]}></SvgLogo>
        <Typography><span style={{fontWeight:"bold", color:"#2e7d32"}} translate="no"> ChiVes</span></Typography>
        {SVG.hamburger}
      </LogoButtonContainer>
      <Popover
        id="nav-container"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className="menu-popover"
      >
        <NavInner>
          {!!showMapControls && <>
            <Typography>Map Controls</Typography>
            <NavItems>
              <li><Button href="#" onClick={() => handleOpenClose('variables')}>{SVG.settings} Variables Panel</Button></li>
              <li><Button href="#" onClick={() => handleOpenClose('info')}>{SVG.report}Data View</Button></li>
              {/* <li><a onClick={() => setViewState({
                ...bounds,
                bearing:0,
                pitch:0
              })}>{SVG.compass}Recenter Map</a></li>
              {/* <li><a onClick={handleGeolocate}>{SVG.locate}Find my location</a></li> */}
            </NavItems>
          </>}
          {/* <Typography>Pages</Typography> */}
          <NavItems>
            <li><Link to="/" className={loc.pathname === '/' ? 'active' : 'inactive'}>Home</Link></li>

            <li><NavLink to="/about">About</NavLink></li>
            <NavItems>
              <SubNav><NavLink to="/team">Team</NavLink></SubNav>
              <SubNav><NavLink to="/data">Data</NavLink></SubNav>
              <SubNav><NavLink to="/posts">News</NavLink></SubNav>
            </NavItems>

            <li><NavLink to="/explore">Explore</NavLink></li>
            <NavItems>
              <SubNav><NavLink to="/map">Map</NavLink></SubNav>
              <SubNav><NavLink to="/builder">Index Builder</NavLink></SubNav>
              <SubNav><NavLink to="/community">My Community</NavLink></SubNav>
              <SubNav><NavLink to="/guide">Resource Guide</NavLink></SubNav>
            </NavItems>

            <li><Link to="/learn" className={loc.pathname === '/learn' ? 'active' : 'inactive'}>Learn</Link></li>
            <NavItems>
              <SubNav><NavLink to="/learn/mapping101">Mapping 101</NavLink></SubNav>
              <SubNav><NavLink to="/learn/histogram">Histogram Filter</NavLink></SubNav>
              <SubNav><NavLink to="/learn/indexBuilder">Index Builder</NavLink></SubNav>
            </NavItems>

            <li><NavLink to="/contact">Contact</NavLink></li>
          </NavItems>
        </NavInner>
      </Popover>
    </NavContainer>
  );
}
