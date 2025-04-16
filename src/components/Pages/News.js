import React, { useState } from 'react';
import { useEffect } from 'react';
import { ContentContainer } from '../../styled_components';
import { NavBar, Footer } from '..';

import { useParams } from "react-router-dom";
import NewsList from "../News/NewsList";
import NewsPost from "../News/NewsPost";


// see example of this pattern:
// https://github.com/healthyregions/oeps/blob/main/explorer/pages/docs/%5Bmd%5D.js

const NewsPage = ({}) => {
    const { slug } = useParams();
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({});

    useEffect(() => {
        if (posts.length === 0) {
            try {
                fetch('/content/posts.json')
                    .then(r => r.json())
                    .then(results => setPosts(results));
            } catch (e) {
                setPosts([{ title: 'Error: failed to fetch news posts' }]);
            }
        }
    });

    useEffect(() => {
        if (posts.length > 0 && slug) {
            const post = posts?.find(p => {
                !p?.slug && console.warn('WARNING: post contained an empty slug:', p);
                return p?.slug === slug;
            });
            if (post && post.published) {
                setPost(post);
            } else if (!post) {
                setPost({content: `## Error: no post found with slug=${slug}`});
            } else if (!post.published) {
                setPost({content: `## Error: post with slug=${slug} has not yet been published`});
            } else {
                setPost({content: `## Error: post with slug=${slug} is an an unknown state. Please contact your administrator.`});
            }
        } else {
            setPost({content: `## Error: no post found with slug=${slug}`});
        }
    }, [posts, slug])

    return (
       <>
           <NavBar />
           <ContentContainer>
               {
                   /* If we find a slug, attempt to render the Post that matches the slug */
                   slug && <NewsPost posts={posts} post={post} />
               }
               {
                   /* If we are not given a slug, render the list of Posts*/
                   !slug && <NewsList posts={posts} />
               }
           </ContentContainer>
           <Footer/>
       </>
    );
}

export default NewsPage;

