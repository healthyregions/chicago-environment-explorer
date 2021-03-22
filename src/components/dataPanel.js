// This components formats the data for the selected geography
// and displays it in the right side panel.

// Import main libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import helper libraries
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

// Import config and sub-components
import Tooltip from './tooltip';
import BarChart from './BarChart';
import Histogram from './Histogram';
import NeighborhoodCounts from './NeighborhoodCounts';
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
  right:0;
  top:50px;
  overflow-x:visible;
  height:calc(100vh - 50px);
  background-color: ${colors.ivory};
  box-shadow: 2px 0px 5px ${colors.gray}44;
  padding:20px;
  box-sizing: border-box;
  transition:250ms all;
  font: 'Montserrat', sans-serif;
  color:${colors.black};
  font-size:100%;
  padding:0;
  z-index:5;
  transform: translateX(100%);
  h4, h1 {
    font-family: 'Lora', serif;
    margin:10px 0;
  }
  &.open {
    transform:none;
  }
  @media (max-width:1024px) {
    min-width:50vw;
  }  
  @media (max-width:600px) {
    width:100%;
    left:0;
    transform:translateX(-100%);
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
    background-color: ${colors.ivory};
    box-shadow: 2px 0px 5px ${colors.gray}88;
    outline:none;
    border:none;
    border-radius:20px;
    cursor: pointer;
    transition:500ms all;
    svg {
      width:15px;
      height:15px;
      margin:12.5px 0 0 0;
      @media (max-width:600px){
        width:20px;
        height:20px;
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
      left:100%;
      width:30px;
      height:30px;
      top:180px;
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

// Toggle styling for condensed and expanded drop down
const ExpandSelect = styled(FormControl)`
  outline:none;
  border:none;
  position:absolute !important;
  right:25px;
  top:15px;
  div.MuiInputBase-root:before {
    display:none !important;
  }
  div.MuiInputBase-root:after {
    display:none !important;
  }
  svg {
    path {
      fill:white;
    }
  }
`

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

const columnsToChart = [
  {
    'column':'trees_crown_den',
    'name':'Percent Canopy Coverage',
    'color':colors.cartoColors.green,
    'preset':'',
  },
  {
    'column':'heatisl',
    'name':'Temperature Percentile',
    'color':colors.cartoColors.gold,
    'preset':'',
  },
  {
    'column':'nn_q3_pm2_5',
    'name':'Summer PM2.5',
    'color':colors.cartoColors.gray,
    'preset':'',
  },
  {
    'column':'logtraf',
    'name': 'Traffic Volume',
    'color':colors.cartoColors.slate,
    'preset':'',
  },
  {
    'column':'urban_flood_suscep',
    'name':'Urban Flood Susceptibility',
    'color':colors.cartoColors.sky,
    'preset':'',
  },
  {
    'column':'svi_pecentile',
    'name':'Social Vulnerability',
    'color':colors.cartoColors.pink,
    'preset':'',
  },
  {
    'column':'asthma_age_adj_rate',
    'name':'Asthma Cases per 10,000 Residents',
    'color':colors.cartoColors.gold,
    'preset':'',
  },
  {
    'column':'hardship',
    'name':'Economic Hardship Index',
    'color':colors.cartoColors.spring,
    'preset':'',
  },
]

// DataPanel Function Component
const DataPanel = () => {

  const dispatch = useDispatch();
  const selectionData = useSelector(state => state.selectionData);
  const panelState = useSelector(state => state.panelState);
  const ranges = useSelector(state => state.ranges);
  const filterValues = useSelector(state => state.filterValues);

  // handles panel open/close
  const handleOpenClose = () => dispatch(setPanelState({info:panelState.info ? false : true}))

  return (
    <DataPanelContainer className={panelState.info ? 'open' : ''} id="data-panel"  otherPanels={panelState.variables}> 
    {selectionData.success && 
        <ReportWrapper>
            <ReportContainer>
                <h1>Current View</h1>
                <ReportSection>
                    <p>Population</p>
                    <div className="numberChartContainer">
                        <h3>{selectionData.totalPop.toLocaleString('en')}</h3>
                    </div>
                    <p>Tree Count</p>
                    <div className="numberChartContainer">
                        <h3>{selectionData.totalTrees.toLocaleString('en')}</h3>
                    </div>
                    <p>Tracts Selected: {selectionData.sums.count}</p>
                    <NeighborhoodCounts 
                      counts={selectionData.communityCounts}
                      activeCommunities={filterValues.community}
                    />
                </ReportSection>
                {
                  columnsToChart.map(row => 
                    <Histogram 
                      name={row.name} 
                      column={row.column}
                      histCounts={selectionData.histCounts[row.column]} 
                      range={ranges[row.column]} 
                      color={row.color}
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