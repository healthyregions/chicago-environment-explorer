import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

// Import helper libraries
import styled from 'styled-components';
// import FormControl from '@mui/material/FormControl';
import Slider, { SliderThumb } from '@mui/material/Slider';
import withStyles from '@mui/styles/withStyles';

import DensityChart from './DensityChart';
import { applyFilterValues, removeFilterValues } from '../../actions';
import {colors, variablePresets} from '../../config';
import PropTypes from "prop-types";
import clsx from "clsx";
import {IconButton} from "@mui/material";
import {FaQuestionCircle} from "@react-icons/all-files/fa/FaQuestionCircle";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";

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

const ResetButton = styled.button`
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

  const { children, className, ...other } = props;
  const thumbNumberClassName = other["data-index"] === 0 ? "first-thumb" : "second-thumb";

  return (
    <SliderThumb {...other} className={clsx(className, thumbNumberClassName)}>
      {children}
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </SliderThumb>
  );
}

StyledThumb.propTypes = {
  children: PropTypes.node
};

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
    width: 2,
    pointerEvents: "auto!important",
    // borderLeft: '6px solid rgba(0,0,0,0)',
    // borderRight: '6px solid rgba(0,0,0,0)',
    backgroundColor: 'transparent',
    border: '1px solid currentColor',
    borderLeft: '2px dotted #767676',
    position: 'absolute',
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
    '&::after': {
      // display:'none',
      position: 'absolute',
      content: '""',
      width: 0,
      height: 0,
      borderWidth: '10px 10px 0 0',
      borderColor: '#767676 transparent transparent transparent',
      transform: 'translateX(-20%) translateY(-2%)',
      top: 0,
      right: 0,
      borderStyle: 'solid',
      borderRadius: 0,
    },
    '&.second-thumb::after': {
      borderWidth: '10px 0 10px 10px',
      transform: 'translateX(-100%)',
    },
    '&.Mui-focusVisible': {
      boxShadow: 'none',
    },
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

  const dispatch = useDispatch();
  const minDistanceBetweenThumbs = (range.max-range.min)/11;
  const [sliderValue, setSliderValue] = useState([range.min, range.max]);

  const valueChangeHandler = (e, newValues, activeThumb) => {
    if (activeThumb === 0) {
      setSliderValue([Math.min(newValues[0], sliderValue[1] - minDistanceBetweenThumbs), sliderValue[1]]);
    }
    else {
      setSliderValue([sliderValue[0], Math.max(newValues[1], sliderValue[0] + minDistanceBetweenThumbs)]);
    }
  };

  const filterChart = useMemo(
    () => debounce((newValues) => dispatch(applyFilterValues(column, newValues)), 250),
    []
  );

  useEffect(
    () => filterChart(sliderValue),
    [sliderValue]
  );

  const resetFilter = () => {
    dispatch(removeFilterValues(column));
    setSliderValue([range.min, range.max]);
  }

  const [popoverAnchorEl, setPopoverAncherEl] = React.useState(null);
  const isPopoverOpen = Boolean(popoverAnchorEl)
  const popoverId = isPopoverOpen ? 'simple-popover' : undefined;

  const handleInfoOpen = (evt) => {
    setPopoverAncherEl(evt.currentTarget);
  };

  const handleInfoClose = () => {
    setPopoverAncherEl(null);
  };

  const getVariableDescription = (column) => {
    return Object.values(variablePresets).find((variable) => variable.Column === column)?.Description
  }

  const description = getVariableDescription(column);

  return (
    <HistogramContainer>
      <h4>
        {name}
        {description && <IconButton aria-label={name + ' additional info'}
                    onClick={handleInfoOpen}
                    style={{ marginLeft: '0.5rem', color: 'rgb(185, 209, 159)' }}
                    size={'small'}>
          <FaInfoCircle />
        </IconButton>}
      </h4>

      <Popover
          id={popoverId}
          style={{ maxWidth: '75vw' }}
          open={isPopoverOpen}
          anchorEl={popoverAnchorEl}
          onClose={handleInfoClose}
          anchorPosition={'left'}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
      >
        <Typography sx={{ p: 2 }}
                    dangerouslySetInnerHTML={{ __html: description }}></Typography>
      </Popover>

      <ResetButton  style={{ marginTop: '1rem' }}
                    onClick={() => resetFilter()}>reset</ResetButton>

      <ChartContainer>
        <DensityChart
          data={density}
          // density={density}
          xAxis={'max'}
          dataKey={'density'}
          color={color}
        />
      </ChartContainer>

      <StyledSlider
        // ThumbComponent={StyledThumb}
        components={{ Thumb: StyledThumb }}
        onChange={valueChangeHandler}
        // getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        value={sliderValue}
        defaultValue={[range.min, range.max]}
        min={range.min}
        max={range.max}
        step={(range.max-range.min)/100}
        disableSwap
      />

    </HistogramContainer>
  )
}
