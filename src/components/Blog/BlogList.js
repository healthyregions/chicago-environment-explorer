import React from 'react';
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const BlogList = ({ posts }) => {
    return (
       <>
           <h1>Blog</h1>
           <hr/>

           <TableContainer component={Paper}>
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
                                       <Typography variant={'body2'} >{post.tagline}</Typography>
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

