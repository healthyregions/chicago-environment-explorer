import React from 'react';
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {colors} from "../../config";
import Divider from "@mui/material/Divider";

const PostList = ({ posts, limit, hideHeader }) => {
    return (
       <>
           {!hideHeader && <>
               <Typography variant={'h1'}>News</Typography>
               <Divider style={{ marginBottom: 0, color: colors.forest }} />
           </>}

           <TableContainer>
               <Table aria-label="simple table">
                   <TableBody>
                       {
                           posts?.slice(0, limit)?.map(post => <TableRow
                                   key={`news-slug-${post.slug}`}
                                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                               >
                               <TableCell component="th" scope="row">
                                   <NavLink to={`/posts/${post.slug}`}>
                                       <div item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                           <Typography className={'post-title'} variant={'h5'} >{post.title}</Typography>
                                           <Typography variant={'subtitle2'} style={{ color: colors.darkgray }}>{post.date}</Typography>
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

export default PostList;

