import React from 'react';

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import { colors } from "../../config";
import { FaArrowCircleLeft } from "@react-icons/all-files/fa/FaArrowCircleLeft";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';

// see example of this pattern:
// https://github.com/healthyregions/oeps/blob/main/explorer/pages/docs/%5Bmd%5D.js

const BlogPost = ({ posts, post }) => {
    return (
       <>
           <NavLink to={'/blog'} style={{ color: colors.forest }}>
               <FaArrowCircleLeft style={{ verticalAlign: 'middle', marginRight: '1rem', color: colors.forest, cursor: 'pointer' }} /> Back
           </NavLink>

           <Grid container spacing={0}>
               <Grid item xs={12}>
                   <Typography variant={'h4'}>{post.title}</Typography>
                   <Typography variant={'subtitle2'} style={{ color: colors.darkgray }}>{post.date}</Typography>
               </Grid>
           </Grid>

           <Divider style={{ color: colors.forest }} />

           {/* // the rest of the markdown */}
           <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]} />
       </>
    );
}

export default BlogPost;

