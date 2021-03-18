// // This components formats the data for the selected geography
// // and displays it in the right side panel.

// // Import main libraries
// import React, {useState} from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// // Import helper libraries
// import styled from 'styled-components';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

// // Import config and sub-components
// import Tooltip from './tooltip';
// import { setPanelState } from '../actions';
// import {dataFn, colLookup} from '../utils';
// import { colors } from '../config';
// import { report } from '../config/svg';

// //// Styled components CSS
// // Main container for entire panel
// const DataPanelContainer = styled.div`
//   display: ${props => props.dataLength === 0 ? 'none' : 'initial'};
//   position:fixed;
//   min-width:250px;
//   right:0;
//   top:50px;
//   overflow-x:visible;
//   height:calc(100vh - 50px);
//   background-color: ${colors.gray}fa;
//   box-shadow: -2px 0px 5px rgba(0,0,0,0.7);
//   padding:20px;
//   box-sizing: border-box;
//   transition:250ms all;
//   font: 'Lato', sans-serif;
//   color: white;
//   font-size:100%;
//   padding:0;
//   z-index:5;
//   transform: translateX(100%);
//   h4 {
//     margin:10px 0;
//   }
//   &.open {
//     transform:none;
//   }
//   @media (max-width:1024px) {
//     min-width:50vw;
//   }  
//   @media (max-width:600px) {
//     width:100%;
//     left:0;
//     transform:translateX(-100%);
//     z-index:51;
//     &.open {
//       transform:none;
//     }
//     display: ${props => (props.otherPanels || props.dataLength === 0) ? 'none' : 'initial'};
//   }
//   button#showHideRight {
//     position:absolute;    
//     right:calc(100% - 20px);
//     top:20px;
//     width:40px;
//     height:40px;
//     padding:0;
//     margin:0;
//     background-color: ${colors.gray};
//     box-shadow: 0px 0px 6px rgba(0,0,0,1);
//     outline:none;
//     border:none;
//     cursor: pointer;
//     transition:500ms all;
//     svg {
//       width:15px;
//       height:15px;
//       margin:12.5px 0 0 0;
//       @media (max-width:600px){
//         width:20px;
//         height:20px;
//         margin:5px;
//       }
//       fill:white;
//       transform:rotate(180deg);
//       transition:500ms all;
//     }
//     :after {
//       opacity:0;
//       font-weight:bold;
//       color:white;
//       position: relative;
//       top:-17px;
//       transition:500ms all;
//       content: 'Report';
//       right:50px;
//       z-index:4;
//     }  
//     &.hidden {
//       right:100%;
//       svg {
//         transform:rotate(0deg);
//       }
//       :after {
//         opacity:1;
//       }
//     }
//     @media (max-width:768px){
//       top:120px;
//     }
//     @media (max-width:600px) {
//       left:100%;
//       width:30px;
//       height:30px;
//       top:180px;
//       &.hidden svg {
//         transform:rotate(0deg);
//       }
//       :after {
//         display:none;
//       }
//       &.active {
//         left:90%;
//       }
//       &.active svg {
//         transform:rotate(90deg);
//       }
//     }
//   }
  

//   div {
//     div {
//       p {
//         line-height:1.5;
//         margin:0;
//         display:inline-block;
//       }
//     }
//   }
//   h2 {
//     padding:15px 0 5px 0;
//     margin:0;
//     display:inline-block;
//     max-width:200px;
//   }
//   h6, p {
//     padding:0 0 15px 0;
//     margin:0;
//     max-width:30ch;
//     a {
//       color:${colors.yellow};
//       text-decoration:none;
//     }
//   }
//   .extraPadding {
//     padding-bottom:20vh;
//   }
//   p {
//     padding-right:10px;
//   }
// `
// // Scrollable Wrapper for main report information
// const ReportWrapper = styled.div`
//   height:100vh;
//   overflow-y:scroll;
// `

// // Inner container for report content
// const ReportContainer = styled.div`
//     padding:5px 0 0 30px;
//     box-sizing:border-box;
//     overflow-x:visible;
//     // Multi-column layout (NYI)
//     // display:flex;
//     // flex-direction:column;
//     // flex-wrap:wrap;
//     // width:500px;
//     // columns:${props => props.cols} 250px;
//     // column-gap:10px;
//     // display:inline-block;
//     h3 {
//       font-size:${props => props.expanded ? '150%' : '100%'};
//       display:${props => props.expanded ? 'block' : 'inline'};
//       margin:${props => props.expanded ? '0': '0 15px 0 0'};
//       padding:${props => props.expanded ? '0 0 15px 0 !important': '0'};
//       &:before {
//         content: ': ';
//         display: ${props => props.expanded ? 'none' : 'initial'};
//       }
//       &:after {
//         content:" ";
//         white-space:pre;
//         height:0;
//         display: ${props => props.expanded ? 'none' : 'block'};
//       }
//     }
//     div.numberChartContainer {
//       width:100%;
//       display:${props => props.expanded ? 'flex' : 'inline'};
//       align-items: center;
//     }
//     div.numberContainer {
//       display:${props => props.expanded ? 'flex' : 'inline'};
//     }
//     .bigOnly {
//       display: ${props => props.expanded ? 'initial' : 'none'};
//     }
    
// `

// // Subsection of report
// const ReportSection = styled.span`
//     padding-right:20px;
//     box-sizing:border-box;
//     // width:100%;
//     // display:inline-block;
//     padding: 0;
//     margin: 0;
// `

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

// // DataPanel Function Component
// const DataPanel = () => {

//   const dispatch = useDispatch();

//   const storedData = useSelector(state => state.storedData);
//   // name of current data set
//   const currentData = useSelector(state => state.currentData);
//   // current date and index
//   const currDateIndex = useSelector(state => state.dataParams.nIndex);
//   const dates = useSelector(state => state.dates);
//   const selectionKeys = useSelector(state => state.selectionKeys);
//   const selectionIndex = useSelector(state => state.selectionIndex);
//   // panels open/close state
//   const panelState = useSelector(state => state.panelState);
//   //column names
//   const cols = useSelector(state => state.cols);
//   const [expanded, setExpanded] = useState(true)

//   // Set expanded or contracted view
//   const handleExpandContract = (event) => setExpanded(event.target.value)

//   return (
//     <DataPanelContainer className={panelState.info ? 'open' : ''} id="data-panel"  otherPanels={panelState.variables} dataLength={selectionKeys.length}> 
//       <ExpandSelect>
//         <Select
//           labelId="expand-view-label"
//           id="expand-view"
//           value={null}
//           onChange={handleExpandContract}
//         >
//           <MenuItem value={true}>Expanded</MenuItem>
//           <MenuItem value={false}>Compact</MenuItem>
//         </Select>
//       </ExpandSelect>
//       <ReportWrapper>
//         <ReportContainer>
//         </ReportContainer>
//       </ReportWrapper>
//     </DataPanelContainer>
//   );
// }

// export default DataPanel;