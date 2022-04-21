// This components formats the data for the selected geography
// and displays it in the right side panel.

// Import main libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import helper libraries
import styled from 'styled-components';
// import FormControl from '@mui/material/FormControl';
// import Slider from '@mui/material/Slider';
// import { withStyles, makeStyles } from '@mui/material/styles';

// Import config and sub-components
// import Tooltip from './tooltip';
// import BarChart from './BarChart';
import Histogram from './histogram';
import { Gutter } from './Gutter';
// import NeighborhoodCounts from './NeighborhoodCounts';
import { setPanelState } from '../actions';
import { colors } from '../config';
import { report } from '../config/svg';

//// Styled components CSS
// Main container for entire panel
const DataPanelContainer = styled.div`
  display: ${props => props.dataLength === 0 ? 'none' : 'initial'};
  position:fixed;
  min-width:250px;
  width:15%;
  right:0.5em;
  top:0.5em;
  overflow-x:visible;
  height:calc(100vh - 1em);
  background: rgba( 255, 255, 255, 0.85 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.85 );
  backdrop-filter: blur( 20px );
  -webkit-backdrop-filter: blur( 20px );
  box-shadow: 2px 0px 5px ${colors.gray}44;
  border:1px solid ${colors.green};
  padding:20px;
  box-sizing: border-box;
  transition:250ms all;
  font: 'Roboto', sans-serif;
  color:${colors.black};
  font-size:100%;
  padding:0;
  z-index:5;
  transform: translateX(calc(100% + .5em));
  h4, h1 {
    font-family: 'Roboto', sans-serif;
    margin:10px 0;
  }
  p {
    font-family: 'Lora', serif;
  }
  &.open {
    transform:none;
  }
  @media (max-width:1024px) {
    min-width:50vw;
  }  
  @media (max-width:600px) {
    width:calc(100% - 1em);
    top:calc(1em + 45px);
    height:calc(100% - 6em);
    left:.75em;
    padding-top:2em;
    transform:translateX(calc(-100% - 1em));
    z-index:51;
    &.open {
      transform:none;
    }
    display: ${props => (props.otherPanels || props.dataLength === 0) ? 'none' : 'initial'};
  }
  button#showHideRight {
    position:absolute;    
    right:calc(100% - 20px);
    top:20px;
    width:40px;
    height:40px;
    padding:0;
    margin:0;
    background-color: ${colors.white};
    box-shadow: 2px 0px 5px ${colors.gray}88;
    border:1px solid ${colors.green};
    // border-radius:20px;
    cursor: pointer;
    transition:500ms all;
    svg {
      width:15px;
      height:15px;
      margin:12.5px 0 0 0;
      @media (max-width:600px){
        margin:5px;
      }
      fill:${colors.gray};
      transform:rotate(180deg);
      transition:500ms all;
    }
    :after {
      opacity:0;
      font-weight:bold;
      color:${colors.gray};
      position: relative;
      top:-17px;
      transition:500ms all;
      content: 'Report';
      right:50px;
      z-index:4;
    }  
    &.hidden {
      right:105%;
      svg {
        transform:rotate(0deg);
      }
      :after {
        opacity:1;
      }
    }
    @media (max-width:768px){
      top:120px;
    }
    @media (max-width:600px) {
      left:calc(100% + 4.5em);
      width:3em;
      height:3em;
      top:0;
      &.hidden svg {
        transform:rotate(0deg);
      }
      :after {
        display:none;
      }
      &.active {
        left:90%;
      }
      &.active svg {
        transform:rotate(90deg);
      }
    }
  }

  
  

  div {
    div {
      p {
        line-height:1.5;
        margin:0;
        display:inline-block;
      }
    }
  }
  h2 {
    padding:15px 0 5px 0;
    margin:0;
    display:inline-block;
    max-width:200px;
  }
  h6, p {
    padding:0 0 15px 0;
    margin:0;
    max-width:30ch;
    a {
      color:${colors.yellow};
      text-decoration:none;
    }
  }
  .extraPadding {
    padding-bottom:20vh;
  }
  p {
    padding-right:10px;
  }
`
// Scrollable Wrapper for main report information
const ReportWrapper = styled.div`
  height:100vh;
  overflow-y:scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${colors.white};
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: url('${process.env.PUBLIC_URL}/icons/grip.png'), ${colors.gray}55;
    background-position: center center;
    background-repeat: no-repeat, no-repeat;
    background-size: 50%, 100%; 
    transition:125ms all;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: url('${process.env.PUBLIC_URL}/icons/grip.png'), ${colors.darkgray}99;
    background-position: center center;
    background-repeat: no-repeat, no-repeat;
    background-size: 50%, 100%; 
  }
`

// Inner container for report content
const ReportContainer = styled.div`
    padding:5px 0 200px 30px;
    box-sizing:border-box;
    overflow-x:visible;
    // Multi-column layout (NYI)
    // display:flex;
    // flex-direction:column;
    // flex-wrap:wrap;
    // width:500px;
    // columns:${props => props.cols} 250px;
    // column-gap:10px;
    // display:inline-block;
    h3 {
      font-size:150%;
      display:block;
      margin:0;
      padding:0 0 15px 0 !important;
      &:before {
        content: ': ';
        display: none;
      }
      &:after {
        content:" ";
        white-space:pre;
        height:0;
        display:none;
      }
    }
    div.numberChartContainer {
      width:100%;
      display:flex;
      align-items: center;
    }
    div.numberContainer {
      display:flex;
    }
    .bigOnly {
      display:initial;
    }
    
`

// Subsection of report
const ReportSection = styled.span`
    padding-right:20px;
    box-sizing:border-box;
    // width:100%;
    // display:inline-block;
    padding: 0;
    margin: 0;
`

// // Toggle styling for condensed and expanded drop down
// const ExpandSelect = styled(FormControl)`
//   outline:none;
//   border:none;
//   position:absolute !important;
//   right:25px;
//   top:15px;
//   div.MuiInputBase-root:before {
//     display:none !important;
//   }
//   div.MuiInputBase-root:after {
//     display:none !important;
//   }
//   svg {
//     path {
//       fill:white;
//     }
//   }
// `

// function AirbnbThumbComponent(props) {
//   return (
//     <span {...props}>
//       <span className="bar" />
//       <span className="bar" />
//       <span className="bar" />
//     </span>
//   );
// }

const columnsToChart = [
  {
    'column':'trees_crown_den',
    'name':'Percent Canopy Coverage',
    'color':colors.green,
    'preset':'',
  },
  {
    'column':'heatisl',
    'name':'Temperature Percentile',
    'color':colors.orange,
    'preset':'',
  },
  {
    'column':'nn_q3_pm2_5',
    'name':'Summer PM2.5',
    'color':colors.chicagoRed,
    'preset':'',
  },
  {
    'column':'logtraf',
    'name': 'Traffic Volume',
    'color':colors.purple,
    'preset':'',
  },
  {
    'column':'urban_flood_suscep',
    'name':'Urban Flood Susceptibility',
    'color':colors.chicagoBlue,
    'preset':'',
  },
  {
    'column':'svi_pecentile',
    'name':'Social Vulnerability',
    'color':colors.teal,
    'preset':'',
  },
  {
    'column':'asthma_age_adj_rate',
    'name':'Asthma Cases per 10,000 Residents',
    'color':colors.chicagoDarkBlue,
    'preset':'',
  },
  {
    'column':'hardship',
    'name':'Economic Hardship Index',
    'color':colors.yellow,
    'preset':'',
  },
]

// DataPanel Function Component
const DataPanel = () => {

  const dispatch = useDispatch();
  const selectionData = useSelector(state => state.selectionData);
  const panelState = useSelector(state => state.panelState);
  const ranges = useSelector(state => state.ranges);
  // const filterValues = useSelector(state => state.filterValues);

  // handles panel open/close
  const handleOpenClose = () => dispatch(setPanelState({info:panelState.info ? false : true}))

  return (
    <DataPanelContainer className={panelState.info ? 'open' : ''} id="data-panel"  otherPanels={panelState.variables}> 
    {selectionData.success && 
        <ReportWrapper>
            <ReportContainer>
                <h1>Current View</h1>
                <ReportSection>
                    <p>Tree Canopy Coverage</p>
                    <div className="numberChartContainer">
                        <h3>{selectionData.treeCoverage.toFixed(1)}%</h3>
                    </div>
                    <p>Heat Island Percentile</p>
                    <div className="numberChartContainer">
                        <h3>{selectionData.heatIsland.toFixed(1)}</h3>
                    </div>
                    <p>Averaged over {selectionData.sums.count} census tracts</p>
                    {/* <NeighborhoodCounts 
                      counts={selectionData.communityCounts}
                      activeCommunities={filterValues.community}
                    /> */}
                </ReportSection>
                <Gutter height="1em" />
                <h2>Distributions</h2>
                <br/>
                <p style={{padding:0}}>Click charts to filter the map</p>
                {
                  columnsToChart.map(({name, column, color}) => 
                    <Histogram 
                      name={name} 
                      column={column}
                      histCounts={selectionData.histCounts[column]} 
                      density={selectionData.densities[column]} 
                      range={ranges[column]} 
                      color={color}
                    />
                  )
                }
            </ReportContainer>
        </ReportWrapper>
    }
      
      <button onClick={handleOpenClose} id="showHideRight" className={panelState.info ? 'active' : 'hidden'}>{report}</button>
    </DataPanelContainer>
  );
}

export default DataPanel;