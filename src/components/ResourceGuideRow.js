import React from 'react';
import styled from 'styled-components';
import Grid from "@mui/material/Grid";
import { colors } from '../config';

const GuideRow = styled(Grid)`
    img {
        max-width:100%;
        margin:1em auto 0 auto;
        display:block;
    }
    h2, h2 a {
        font-size:2rem;
        font-family: 'Lora', serif;
    }
    text-align:left;
    margin-bottom:2em;
    padding-bottom:2em;
    border-bottom:1px solid ${colors.forest};
`

export default function ResourceGuideRow({
    entry
}) {
    const {
        title,
        text,
        logo,
        image,
        logoAltText,
        imageAltText,
        link
    } = entry;
    return (<GuideRow container spacing={4}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <a href={link} target="_blank" rel="noopener noreferrer"><img src={logo} alt={logoAltText} loading="lazy" />
                <img src={image} alt={imageAltText} loading="lazy" />
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <h2>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {title}
                </a>
            </h2>
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
        </Grid>
    </GuideRow>)
}
