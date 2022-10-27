import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Import helper libraries
import styled from 'styled-components';
// import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import withStyles from '@mui/styles/withStyles';

import DensityChart from './DensityChart';
import { applyFilterValues, removeFilterValues } from '../../actions';
import { colors } from '../../config';

const HistogramContainer = styled.div`
  position:relative;
  margin:1rem 0 0 0;
  h4 {
    font-size:1rem;
    margin:0;
    padding:0;
  }
  border-bottom:1px solid ${colors.gray}55;
`

const ChartContainer = styled.div`
  display:block;
  width:calc(100% - 1em);
  margin:20px auto 0 auto;
  height:125px;
  cursor:crosshair !important;
  .recharts-cartesian-axis-tick {    
    font-size: .55rem;
    font-family: Roboto, sans-serif;
  }
`

// const AxisContainer = styled.div`
//   display:flex;
//   padding:0 15px 0 5px;
//   span {
//     flex:1;
//     text-align:center;
//   }
//   span:nth-of-type(1){
//     text-align:left;
//   }
//   span:nth-of-type(3){
//     text-align:right;
//   }
// `

const ClearButton = styled.button`
  background:none;
  border:none;
  border-bottom:1px solid ${colors.darkgray};
  position:absolute;
  top:1rem;
  right:1rem;
  text-transform:uppercase;
  font-size:0.5rem;
  padding:0.25rem;
  font-weight:bold;
  cursor:pointer;
  box-shadow: 0px 0px 0px ${colors.gray}00;
  transition:250ms all;
  &:hover {
    box-shadow: 2px 2px 3px ${colors.gray}44;
  }
`


function StyledThumb(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

const StyledSlider = withStyles({
  root: {
    color: colors.cartoColors.gray,
    height: 0,
    padding: '0 25px 0 15px',
    marginLeft:'0px',
    width:'calc(100% - 42px)',
    boxSizing: 'border-box',
    transform: 'translateY(-55px)'
  },
  thumb: {
    height: 95,
    width: 1,
    borderLeft: '6px solid rgba(0,0,0,0)',
    borderRight: '6px solid rgba(0,0,0,0)',
    backgroundColor: '#787878',
    border: '1px solid currentColor',
    marginTop: -35,
    marginLeft: 10,
    boxShadow: '#00000044 0 2px 2px',
    borderRadius:0,
    '&:focus, &:hover, &$active': {
      boxShadow: '#000 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
    '& :after': {
      display:'none',
      content: 'xxx'
    }
  },
  active: {},
  track: {
    display:'none',
  },
  rail: {
    display:'none',
  },
})(Slider);

const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export default function Histogram({
  name,
  column,
  histCounts,
  density,
  range,
  color
}){
  
  const [filterIsActive, setFilterIsActive] = useState(false);
  const dispatch = useDispatch();

  const setFilterValues = debounce((e, newValues) => {
    dispatch(applyFilterValues(column, newValues))
  }, 250)

  const resetFilter = () => {
    dispatch(removeFilterValues(column))
    setFilterIsActive(false)
  }
  
  return (
    <HistogramContainer>
      <h4>{name}</h4>
      {filterIsActive && <ClearButton onClick={() => resetFilter()}>clear</ClearButton>}
      
      <ChartContainer onClick={() => setFilterIsActive(true)}>
        <DensityChart 
          data={density}
          // density={density} 
          xAxis={'max'} 
          dataKey={'density'} 
          color={color}
        />
      </ChartContainer>

      {filterIsActive && <StyledSlider
        ThumbComponent={StyledThumb}
        onChange={setFilterValues}
        // getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[range.min, range.max]}
        min={range.min}
        max={range.max}
        step={(range.max-range.min)/10}
      />}

    </HistogramContainer>
  )
}