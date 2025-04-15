import React from 'react';

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";

// see example of this pattern:
// https://github.com/healthyregions/oeps/blob/main/explorer/pages/docs/%5Bmd%5D.js

const BlogPost = ({ post }) => {
    return (
       <>
           <NavLink to={'/posts'}>&lt; Back</NavLink>
           <h1>{post.title}</h1>
           <h4>{post.date}</h4>
           <hr/>
           {/* // the rest of the markdown */}
           <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]} />
       </>
    );
}

export default BlogPost;

