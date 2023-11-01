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
import Histogram from '../Charts/Histogram';
import { Gutter } from '../Layout/Gutter';
// import NeighborhoodCounts from './NeighborhoodCounts';
import { setPanelState } from '../../actions';
import { colors } from '../../config';
import { report } from '../../config/svg';

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
    max-width:100%;
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
    h3, .h3 {
      font-size:150%;
      display:block;
      margin:0;
      padding:0 0 15px 0 !important;
      font-weight:bold;
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
    h3.sectionHeader {
      margin:0;
      padding:0 !important;
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

const EnvironmentalColumnsToChart = [
  {
    'column':'trees_crown_den',
    'name':'Tree Canopy Coverage %',
    'color':colors.green,
    'preset':'',
  },
  {
    'column':'heatisl',
    'name':'Temperature Percentile',
    'color':colors.orange,
    'preset':'',
  },
  // {
  //   'column':'topline_median',
  //   'name':'PM2.5 Weekly Median',
  //   'color':colors.yellow,
  //   'preset':'',
  // },
  {
    'column':'nn_q3_pm2_5',
    'name':'Summer PM2.5',
    'color':colors.chicagoRed,
    'preset':'',
  },
  {
    'column':'urban_flood_suscep',
    'name':'Urban Flood Susceptibility',
    'color':colors.chicagoBlue,
    'preset':'',
  },
  {
    'column':'ndvi',
    'name':'Vegetation Index (NDVI)',
    'color':colors.forest,
    'preset':'',
  },
  {
    'column':'simpson',
    'name':'Plant Biodiversity (Simpson)',
    'color':colors.green,
    'preset':'',
  }
]
const SocialColumnsToChart = [
  {
    'column':'svi_pecentile',
    'name':'Social Vulnerability',
    'color':colors.teal,
    'preset':'',
  },
  {
    'column':'hardship',
    'name':'Economic Hardship Index',
    'color':colors.yellow,
    'preset':'',
  },
  {
    'column':'asthma_age_adj_rate',
    'name':'Childhood Asthma Rate',
    'color':colors.chicagoDarkBlue,
    'preset':'',
  },
  {
    'column':'logtraf',
    'name': 'Traffic Volume',
    'color':colors.purple,
    'preset':'',
  },
]

const RaceColumnsToChart = [
  {
    'column':'pct_asian',
    'name':'% Identified as Asian',
    'color':colors.pink,
    'preset':'',
  },
  {
    'column':'pct_black',
    'name':'% Identified as Black/African American',
    'color':colors.lightblue,
    'preset':'',
  },
  {
    'column':'pct_nativeam',
    'name':'% Identified as Native American/Indigenous',
    'color':colors.strongOrange,
    'preset':'',
  },
  {
    'column':'pct_pacis',
    'name':'% Identified as Native Hawaiian/Other Pacific Islander',
    'color':colors.blue,
    'preset':'',
  },
  {
    'column':'pct_white',
    'name':'% Identified as White',
    'color':colors.paleyellow,
    'preset':'',
  },
  {
    'column':'pct_other',
    'name':'% Identified as other races',
    'color':colors.green,
    'preset':'',
  },
]

const EthnicityColumnsToChart = [
  {
    'column':'pct_hisp',
    'name':'% Identified as Hispanic/Latinx',
    'color':colors.orange,
    'preset':'',
  },
]

const AgeColumnsToChart = [
  {
    'column':'percentage_seniors',
    'name':'% Seniors',
    'color':colors.skyblue,
    'preset':'',
  },
  {
    'column':'percentage_children',
    'name':'% Children',
    'color':colors.gray,
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
                        <div className="h3">{selectionData.treeCoverage.toFixed(1)}%</div>
                    </div>
                    <p>Heat Island Percentile</p>
                    <div className="numberChartContainer">
                        <div className='h3'>{selectionData.heatIsland.toFixed(1)}</div>
                    </div>
                    <p>Averaged over {selectionData.sums.count} census tracts</p>
                    {/* <NeighborhoodCounts 
                      counts={selectionData.communityCounts}
                      activeCommunities={filterValues.community}
                    /> */}
                </ReportSection>
                <Gutter height="1em" />
                <h2>Filters</h2>
                <br/>
                <p style={{padding:0}}>
                  These charts show the distribution of variables in the tracts on your screen. Adjust the sliders to filter the map.
                </p>
                <Gutter height="1em" />                
                <h3 className="sectionHeader">Environmental</h3>
                {
                  EnvironmentalColumnsToChart.map(({name, column, color}, i) => 
                    <Histogram 
                      name={name} 
                      column={column}
                      histCounts={selectionData.histCounts[column]} 
                      density={selectionData.densities[column]} 
                      range={ranges[column]} 
                      color={color}
                      key={`distribution-${i}`}
                    />
                  )
                }
                <Gutter height="1em" />
                <h3 className="sectionHeader">Socio-Economic</h3>
                {
                  SocialColumnsToChart.map(({name, column, color}, i) => 
                    <Histogram 
                      name={name} 
                      column={column}
                      histCounts={selectionData.histCounts[column]} 
                      density={selectionData.densities[column]} 
                      range={ranges[column]} 
                      color={color}
                      key={`distribution-2-${i}`}
                    />
                  )
                }
                <Gutter height="1em" />
                <h3 className="sectionHeader">Race</h3>
                {
                  RaceColumnsToChart.map(({name, column, color}, i) => 
                    <Histogram 
                      name={name} 
                      column={column}
                      histCounts={selectionData.histCounts[column]} 
                      density={selectionData.densities[column]} 
                      range={ranges[column]} 
                      color={color}
                      key={`distribution-3-${i}`}
                    />
                  )
                }
                <Gutter height="1em" />
                <h3 className="sectionHeader">Ethnicity</h3>
                {
                  EthnicityColumnsToChart.map(({name, column, color}, i) => 
                    <Histogram 
                      name={name} 
                      column={column}
                      histCounts={selectionData.histCounts[column]} 
                      density={selectionData.densities[column]} 
                      range={ranges[column]} 
                      color={color}
                      key={`distribution-4-${i}`}
                    />
                  )
                }
                <Gutter height="1em" />
                <h3 className="sectionHeader">Age Demographics</h3>
                {
                  AgeColumnsToChart.map(({name, column, color}, i) => 
                    <Histogram 
                      name={name} 
                      column={column}
                      histCounts={selectionData.histCounts[column]} 
                      density={selectionData.densities[column]} 
                      range={ranges[column]} 
                      color={color}
                      key={`distribution-5-${i}`}
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