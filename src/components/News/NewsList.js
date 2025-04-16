import React from 'react';
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";

const NewsList = ({ posts }) => {
    return (
       <>
           <h1>News Posts</h1>
           {
               posts?.map(post => <div key={`news-slug-${post.slug}`}>
                   <hr/>
                   <Grid container spacing={2}>
                       <Grid item xs={12}>
                           <NavLink to={`/news/${post.slug}`}>
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

export default NewsList;

