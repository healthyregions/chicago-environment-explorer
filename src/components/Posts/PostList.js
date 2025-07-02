import React, {useEffect, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";

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
import TagsList from "./TagsList";
import TagsDisplay from "./TagsDisplay";

const PostList = ({ posts, limit, hideHeader }) => {
  // Tags allow users to filter the list of Posts - collect all existing tags here
  const [ allTags, setAllTags ] = useState([]);

  // User can specify a list of tags a URL query string parameter
  //   e.g. ?tags=events&tags=community  =>     tag = [ events, community ]
  const { search } = useLocation();
  const [ requestedTags, setRequestedTags ] = useState([]);

  // Filtered posts are stored here
  const [ filteredPosts, setFilteredPosts ] = useState([]);

  // Read existing tags from posts.json - use this to render the list of tags in the UI
  // If new tags/categories are added later, they will automatically appear here
  useEffect(() => {
    const unique = posts?.map(post => post.tags)?.flat()?.filter((tag, i, arr) => arr?.indexOf(tag) === i);
    console.log("Unique Tags found: ", unique);
    setAllTags(unique);
  }, [setAllTags, posts]);

  // Filter for only posts that contain one or more of our querystring tags
  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    console.log("Search params: ", searchParams);
    const tagsRaw = searchParams.getAll("tag");
    const tags = typeof(tagsRaw) === 'string' ? [tagsRaw] : tagsRaw;
    console.log("Tags parsed: ", tags);
    setRequestedTags(tags);

    if (!search) {
      console.log("No tags - showing all posts: ", posts);
      setFilteredPosts(posts);
      return
    }
    const filtered = posts?.filter(post => tags?.some(tag => post?.tags?.includes(tag)));
    console.log("Filtered Posts found: ", filtered);
    setFilteredPosts(filtered);
  }, [setFilteredPosts, setRequestedTags, search, posts]);


  return (
    <>

       {!hideHeader && <>
           <Typography variant={'h1'}>News</Typography>
       </>}

      <TagsList tags={allTags} selection={requestedTags}></TagsList>
      <Divider style={{ marginBottom: 0, color: colors.forest }} />

       <TableContainer>
           <Table aria-label="simple table">
               <TableBody>
                   {
                     filteredPosts?.slice(0, limit)?.map(post => <TableRow
                             key={`news-slug-${post.slug}`}
                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                         >
                         <TableCell component="th" scope="row">
                             <NavLink to={`/posts/${post.slug}`}>
                                 <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                     <Typography className={'post-title'} variant={'h5'} >{post.title}</Typography>
                                     <Typography variant={'subtitle2'} style={{ color: colors.darkgray }}>{post.date}</Typography>
                                 </div>
                                 <ReactMarkdown children={post.tagline} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                               <TagsDisplay tags={post?.tags}></TagsDisplay>
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

