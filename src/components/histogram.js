import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import helper libraries
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import BarChart from './BarChart';
import { applyFilterValues, removeFilterValues } from '../actions';
import { colors } from '../config';

const HistogramContainer = styled.div`
  position:relative;
  margin:2rem 0 0 0;
  h4 {
    font-size:1rem;
    margin:0;
  }
`

const ChartContainer = styled.div`
  display:block;
  width:calc(100% - 1em);
  margin:0 auto;
  height:75px;
  cursor:crosshair !important;
`

const AxisContainer = styled.div`
  display:flex;
  padding:0 15px 0 5px;
  span {
    flex:1;
    text-align:center;
  }
  span:nth-of-type(1){
    text-align:left;
  }
  span:nth-of-type(3){
    text-align:right;
  }
`

const ClearButton = styled.button`
  background:none;
  border:none;
  border-bottom:1px solid ${colors.darkgray};
  position:absolute;
  top:0;
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
    width:'calc(100% - 30px)',
    boxSizing: 'border-box',
    transform: 'translateY(-55px)'
  },
  thumb: {
    height: 56,
    width: 15,
    backgroundColor: '#343434',
    border: '1px solid currentColor',
    marginTop: -30,
    marginLeft: 0,
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

export default function Histogram(props){
  
  const [filterIsActive, setFilterIsActive] = useState(false);
  const dispatch = useDispatch();

  const setFilterValues = debounce((e, newValues) => {
    dispatch(applyFilterValues(props.column, newValues))
  }, 250)

  const resetFilter = () => {
    dispatch(removeFilterValues(props.column))
    setFilterIsActive(false)
  }

  return (
    <HistogramContainer>
      <h4>{props.name}</h4>
      {filterIsActive && <ClearButton onClick={() => resetFilter()}>clear</ClearButton>}
      
      <ChartContainer onClick={() => setFilterIsActive(true)}>
        <BarChart 
          data={props.histCounts} 
          xAxis={'max'} 
          dataKey={'count'} 
          color={props.color}
        />
      </ChartContainer>

      <AxisContainer>
        <span>{props.range.min}</span>
        {
          props.range.histogramBins.map((val, idx) => idx === 4 ? <span>{Math.round(val*10)/10}</span> : '')
        }
        <span>{props.range.max}</span>
      </AxisContainer>

      {filterIsActive && <StyledSlider
        ThumbComponent={StyledThumb}
        onChange={setFilterValues}
        // getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[props.range.min, props.range.max]}
        min={props.range.min}
        max={props.range.max}
        step={(props.range.max-props.range.min)/10}
      />}

    </HistogramContainer>
  )
}