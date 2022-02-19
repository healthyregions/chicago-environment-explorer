import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';

// Import helper libraries
import styled from 'styled-components';
// import { withStyles, makeStyles } from '@mui/material/styles';

import { applyFilterValues, removeFilterValues, removeFilterEntry } from '../actions';
import { colors } from '../config';
// import * as _ from 'lodash';

const CountsContainer = styled.div`
  position:relative;
`

const TagButton = styled.button`
    background:${colors.white};
    border:1px solid ${colors.chicagoBlue};
    text-transform:capitalize;
    margin:2px;
    padding:5px;
    // border-radius:1rem;
    font-size:13px;
    font-family:'Lora', serif;
    cursor:pointer;
    transition:250ms all;
    &:hover {
        background:${colors.chicagoLightBlue};
    }
    span {
        font-weight:bold;
        padding-left:5px;
    }
    &.active {
        background:${colors.chicagoBlue};
    }
`


const ClearButton = styled.button`
  background:none;
  border:none;
  border-bottom:1px solid ${colors.darkgray};
  position:absolute;
  bottom:0;
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

const sort = (obj) => {
    let sortable = [];
    for (var property in obj) {
        sortable.push([property, obj[property]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortable;
}

const Tags = (props) => {
    const dispatch = useDispatch();
    let tagButtons = [];
    const neighborhoodsList = sort(props.counts);
    const numberOfTags = neighborhoodsList.length < props.numberOfTags ? neighborhoodsList.length : props.numberOfTags
    const activeCommunities = props.activeCommunities || [];
    for (let i=0; i<numberOfTags; i++){
        tagButtons.push(
            <TagButton
                className={activeCommunities.includes(neighborhoodsList[i][0]) ? 'active' : ''}
                onClick={activeCommunities.includes(neighborhoodsList[i][0]) ? 
                        () => dispatch(removeFilterEntry('community', neighborhoodsList[i][0])) 
                    :
                        () => dispatch(applyFilterValues('community', neighborhoodsList[i][0])) 
                }
            >
                {neighborhoodsList[i][0].toLocaleLowerCase()} 
                <span>{neighborhoodsList[i][1]}</span>
            </TagButton>)
    }
    return tagButtons
}

export default function NeighborhoodCounts(props){
    const [tagCount, setTagCount] = useState(5)
    const dispatch = useDispatch();
    const resetFilter = () => {
        dispatch(removeFilterValues('community'));
        setTagCount(5)
    }

    return (
        <CountsContainer>
            <Tags 
                counts={props.counts} 
                numberOfTags={tagCount} 
                activeCommunities={props.activeCommunities}
            />
            {
                Object.keys(props.counts).length > tagCount && 
                    <TagButton onClick={() => setTagCount(prev => prev+5)}>...</TagButton>
            }
            {
                (props.activeCommunities !== undefined || tagCount > 5) && 
                    <ClearButton onClick={() => resetFilter()}>clear</ClearButton>
            }
        </CountsContainer>
  )
}