import React from 'react';

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import { colors } from "../../config";
import { FaArrowCircleLeft } from "@react-icons/all-files/fa/FaArrowCircleLeft";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import {ImageList, ImageListItem} from "@mui/material";
import styled from "styled-components";

// see example of this pattern:
// https://github.com/healthyregions/oeps/blob/main/explorer/pages/docs/%5Bmd%5D.js

// TODO: Source these from CMS?
const defaultImageList = [
  {
    url: '/img/logos/25thWard.png',
    title: '25thWard',
  },
  {
    url: '/img/logos/audubon.png',
    title: 'Audubon',
  },
  {
    url: '/img/logos/botanic.jpg',
    title: 'Botanic',
  },
  {
    url: '/img/logos/csds.jpg',
    title: 'CSDS',
  },
  {
    url: '/img/logos/depaul.png',
    title: 'Depaul',
  },
  {
    url: '/img/logos/depaul2.png',
    title: 'Depaul2',
  },
  {
    url: '/img/logos/ggis.png',
    title: 'GGIS',
  },
  {
    url: '/img/logos/grow-greater.png',
    title: 'GrowGreater',
  },
  {
    url: '/img/logos/herop.png',
    title: 'HEROP',
  },
  {
    url: '/img/logos/illini.png',
    title: 'ILLINI',
  },
  {
    url: '/img/logos/instituto.png',
    title: 'Instituto',
  },
  {
    url: '/img/logos/MEV.png',
    title: 'MEV',
  },
  {
    url: '/img/logos/ms.png',
    title: 'MS',
  },
  {
    url: '/img/logos/NASA_logo.png',
    title: 'NASA',
  },
];


const Image = styled.img`
  width: 9rem;
  border: solid lightgray 1px;
`;


const NeighborhoodImageList = ({ nhImageList }) =>
  <ImageList variant={'woven'} cols={4} gap={0} sx={{ paddingBottom:'2rem', overflowY: 'hidden' }}>
    {nhImageList.map((item) => (
      <ImageListItem key={item.url}>
        <Image
          srcSet={`${item.url}?w=161&fit=crop&auto=format&dpr=2 2x`}
          src={`${item.url}?w=161&fit=crop&auto=format`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>

const Post = ({ post }) => {
    return (
       <>
           <NavLink to={'/posts'} style={{ color: colors.forest }}>
               <FaArrowCircleLeft style={{ verticalAlign: 'middle', marginRight: '1rem', color: colors.forest, cursor: 'pointer' }} /> Back
           </NavLink>

           <Grid container spacing={0}>
               <Grid item xs={12}>
                   <Typography variant={'h4'}>{post.title}</Typography>
                   <Typography variant={'subtitle2'} style={{ color: colors.darkgray }}>{post.date}</Typography>
               </Grid>
           </Grid>

           <Divider style={{ color: colors.forest }} />

           <NeighborhoodImageList nhImageList={defaultImageList} />

           {/* // the rest of the markdown */}
           <div className="post-content">
               <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]}/>
           </div>
       </>
    );
}

export default Post;

