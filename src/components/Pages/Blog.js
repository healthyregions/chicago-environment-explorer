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
            console.log('FETCHING BLOGPOST:', postsUrl);
            try {
                fetch(postsUrl)
                    .then(r => r.json())
                    .then(results => {
                        setPosts(results);
                    });
            } catch (e) {
                setPosts([{ title: 'Error: failed to fetch blog posts' }]);
            }
        }
    });

    useEffect(() => {
        if (posts.length > 0 && slug) {
            const post = posts?.find(p => p.slug === slug);
            post ? setPost(post) : console.log(`Error: no post found with slug=${slug}`);
        } else {
            const errPost = {content: `## Error: no post found with slug=${slug}`};
            setPost(errPost);
        }
    }, [posts, slug])

    return (
       <>
           <NavBar />
           <ContentContainer>
               {
                   /* If we find a slug, attempt to render the Post that matches the slug */
                   slug && <BlogPost posts={posts} post={post} />
               }
               {
                   /* If we are not given a slug, render the list of Posts*/
                   !slug && <BlogList posts={posts} />
               }
           </ContentContainer>
           <Footer/>
       </>
    );
}

export default Blog;

