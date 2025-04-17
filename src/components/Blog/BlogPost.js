import React from 'react';

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import { colors } from "../../config";
import { FaArrowCircleLeft } from "@react-icons/all-files/fa/FaArrowCircleLeft";

// see example of this pattern:
// https://github.com/healthyregions/oeps/blob/main/explorer/pages/docs/%5Bmd%5D.js

const BlogPost = ({ posts, post }) => {
    return (
       <>
           <NavLink to={'/blog'} style={{ color: 'rgb(61, 96, 23)' }}>
               <FaArrowCircleLeft style={{ verticalAlign: 'middle', marginRight: '1rem', color: colors.forest, cursor: 'pointer' }} /> Back
           </NavLink>
           <h1>{post.title}</h1>
           <h4>{post.date}</h4>
           <hr/>
           {/* // the rest of the markdown */}
           <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]} />
       </>
    );
}

export default BlogPost;

