import React, {useEffect, useState} from 'react';
import { ContentContainer } from '../../styled_components';
import { NavBar, Footer } from '../index';
import Grid from "@mui/material/Grid";
import {NavLink} from "react-router-dom";



// see example of this pattern:
// https://github.com/healthyregions/oeps/blob/main/explorer/pages/docs/%5Bmd%5D.js

const BlogList = ({ posts }) => {
    return (
       <>
           <h1>News Posts</h1>
           {
               posts?.map(post => <div key={`post-slug-${post.slug}`}>
                   <hr/>
                   <Grid container spacing={2}>
                       <Grid item xs={12}>
                           <NavLink to={`/posts/${post.slug}`}>
                               <h2>{post.title}</h2>
                               <h4>{post.date}</h4>
                           </NavLink>
                       </Grid>
                   </Grid>
               </div>)
           }
       </>
    );
}

export default BlogList;

