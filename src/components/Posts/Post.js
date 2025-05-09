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

const Image = styled.img`
  width: 9rem;
  border: solid lightgray 1px;
`;

const BlogPostImageList = ({ imageList }) =>
  <ImageList variant={'woven'} cols={4} gap={0} sx={{ paddingBottom:'2rem', overflowY: 'hidden' }}>
    {/* TODO: this may need a more complex media configuration - need a real test case to know what to target! */}
    {imageList?.map((url) => url.replace('../..', '', 1)).map((url) => (
      <ImageListItem key={url}>
        <Image
          srcSet={url}
          src={url}
          alt={url}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>;

const Post = ({ post }) => <>
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

  { post?.imageList?.length > 0 && <BlogPostImageList imageList={post.imageList} /> }

  {/* // the rest of the markdown */}
  <div className="post-content">
    <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]}/>
  </div>
  </>

export default Post;

