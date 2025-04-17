import React from 'react';
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const BlogList = ({ posts }) => {
    return (
       <>
           <h1>Blog</h1>
           <hr/>

           <TableContainer>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                   <TableBody>
                       {
                           posts?.map(post => <TableRow
                                   key={`news-slug-${post.slug}`}
                                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                               >
                               <TableCell component="th" scope="row">
                                   <NavLink to={`/blog/${post.slug}`}>
                                       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                           <Typography variant={'h5'} noGutter >{post.title}</Typography>
                                           <Typography variant={'subtitle1'}>{post.date}</Typography>
                                       </div>
                                       <ReactMarkdown children={post.tagline} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                                   </NavLink>
                               </TableCell>
                           </TableRow>)
                       }
                   </TableBody>
               </Table>
           </TableContainer>
       </>
    );
}

export default BlogList;

