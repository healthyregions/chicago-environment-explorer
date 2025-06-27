import React, {useEffect, useState} from 'react';
import {NavLink, useHistory, useLocation} from "react-router-dom";

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
import {Chip} from "@mui/material";

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

  const history = useHistory();

  // Given a tag, "select" this tag in the UI
  // This will show as a URL query param and filter the list of posts
  const selectTag = (tag) => {
    if (!requestedTags?.includes(tag)) {
      console.log('Adding tag: ', tag);
      // Build up a query containing this tag and navigate to it
      const newTags = requestedTags?.concat(tag);
      const query = newTags?.map((tag) => `tag=${tag}`)?.join('&');
      console.log(query);
      const url = `/posts?${query}`;
      console.log(url);
      history.push(url);
    }
  }

  // Given a tag, "deselect" this tag in the UI
  // This will remove the URL query param and refilter the list of posts
  const deselectTag = (tag) => {
    if (requestedTags?.includes(tag)) {
      console.log('Removing tag: ', tag);
      // Build up a query without this tag and navigate to it
      const query = requestedTags?.filter(t => tag !== t)?.map((tag) => `tag=${tag}`)?.join('&');
      console.log(query);
      const url = `/posts?${query}`;
      console.log(url);
      history.push(url);
    }
  }

  return (
    <>
      <div>
        {
          allTags?.map((tag) =>
            requestedTags?.includes(tag)
              ? <Chip style={{marginRight: '3rem', cursor: 'pointer' }} label={`#${tag}`}
                      variant="outlined" onClick={() => deselectTag(tag)} />
              : <Chip style={{marginRight: '3rem', cursor: 'pointer' }} label={`#${tag}`}
                      onClick={() => selectTag(tag)} />
          )
        }
      </div>

       {!hideHeader && <>
           <Typography variant={'h1'}>News</Typography>
           <Divider style={{ marginBottom: 0, color: colors.forest }} />
       </>}

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
                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                   {
                                     post?.tags?.map((tag) =>
                                       <NavLink to={`/posts?tag=${tag}`}>#{tag}</NavLink>
                                     )
                                   }
                                 </div>
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

