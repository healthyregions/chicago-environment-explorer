import React, { useState } from 'react';
import { useEffect } from 'react';
import { ContentContainer } from '../../styled_components';
import { NavBar, Footer } from '..';

import { useParams } from "react-router-dom";
import BlogList from "../Blog/BlogList";
import BlogPost from "../Blog/BlogPost";


// see example of this pattern:
// https://github.com/healthyregions/oeps/blob/main/explorer/pages/docs/%5Bmd%5D.js

const Blog = ({}) => {
    const { slug } = useParams();
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);

    const postsUrl = `/content/posts.json`;
    useEffect(() => {
        if (posts.length === 0) {
            console.log(`FETCHING BLOGPOST: ${postsUrl}`);
            try {
                fetch(postsUrl)
                    .then(r => r.json())
                    .then(results => {
                        setPosts(results);
                    });
            } catch (e) {
                const errPost = { title: 'error fetching blog posts' };
                setPosts([errPost]);
                setPost(errPost);
            }
        }
    });

    useEffect(() => {
        setPost(slug ? posts.find(p => p.slug === slug) : undefined);
    }, [posts, slug])

    return (
       <>
           <NavBar />
           <ContentContainer>
               {!post && <BlogList posts={posts} />}
               {!!post && <BlogPost posts={posts} post={post} />}
           </ContentContainer>
           <Footer/>
       </>
    );
}

export default Blog;

