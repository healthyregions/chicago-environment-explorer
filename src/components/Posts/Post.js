import React, {useState} from 'react';

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import { colors } from "../../config";
import { FaArrowCircleLeft } from "@react-icons/all-files/fa/FaArrowCircleLeft";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import {Dialog, IconButton, ImageList, ImageListItem} from "@mui/material";
import styled from "styled-components";
import {FaTimes} from "@react-icons/all-files/fa/FaTimes";
import TagsDisplay from "./TagsDisplay";


// see example of this pattern:
// https://github.com/healthyregions/oeps/blob/main/explorer/pages/docs/%5Bmd%5D.js

const Image = styled.img`
  width: 9rem;
  border: solid lightgray 1px;
`;

const PullRightPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`

const BlogPostImageList = ({ imageList }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  return (
    <>
      <Dialog open={imagePreviewUrl}>
        <PullRightPanel>
          <IconButton onClick={() => setImagePreviewUrl(null)}>
            <FaTimes/>
          </IconButton>
        </PullRightPanel>
        <img src={imagePreviewUrl} />
      </Dialog>
      <ImageList variant={'masonry'} cols={6} gap={0} sx={{ paddingBottom: '2rem', overflowY: 'hidden' }} >
        {/* TODO: this may need a more complex media configuration - need a real test case to know what to target! */}
        {imageList?.map((url) => url.replace('../..', '', 1)).map((url) => (
          <ImageListItem key={url}>
            <Image
              srcSet={url}
              src={url}
              alt={url}
              loading="lazy"
              style={{ cursor: 'pointer' }}
              onClick={() => setImagePreviewUrl(url)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

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

  <TagsDisplay tags={post?.tags}></TagsDisplay>

  <Divider style={{ color: colors.forest }} />

  { post?.imageList?.length > 0 && <BlogPostImageList imageList={post.imageList} /> }

  {/* // the rest of the markdown */}
  <div className="post-content">
    <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]}/>
  </div>
  </>

export default Post;

