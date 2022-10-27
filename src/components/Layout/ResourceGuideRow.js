import React from 'react';
import styled from 'styled-components';
import Grid from "@mui/material/Grid";
import { colors } from '../../config';

const GuideRow = styled(Grid)`
    img {
        max-width:100%;
        margin:1em auto 0 auto;
        display:block;
    }
    h2, h2 a {
        font-size:2rem;
        font-family: 'Lora', serif;
        line-height: 2rem;
    }

    p {
        font-family: Roboto;
        font-weight: 300;
        &.date {
        }
        &.verified { 
            color: ${colors.forest};
            img {
                max-height:.85rem;
                display:inline-block;
                margin:1em .5em 0 0;
            }
        }
    }
    a {
     color: ${colors.chicagoBlue};
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
        link,
        dateAdded,
        verified
    } = entry;
    return (<GuideRow container spacing={4}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <a href={link} target="_blank" rel="noopener noreferrer"><img src={logo} alt={logoAltText} loading="lazy" />

            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <h2>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {title}
                </a>
            </h2>
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
            <p className=".">
                Resourced added in {dateAdded}.
            </p>
            {!!verified && <p className="verified">
                <img src={`${process.env.PUBLIC_URL}/icons/verified.png`} alt="" />
                This resource has been verified.
            </p>}

        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <h2>
                <img src={image} alt={imageAltText} loading="lazy" />
            </h2>
        </Grid>
    </GuideRow>)
}
