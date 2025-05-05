import React, {useEffect, useState} from 'react';
import Neighborhood from "./Neighborhood";
import {ContentContainer} from "../../styled_components";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import {ImageList, ImageListItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import { colors } from '../../config';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MapMarkerPin from "./MapMarkerPin";


// This component handles and formats the map tooltip info regarding the clicked Blog Post.
// The props passed to this component should contain the hovered object (from deck, info.object by default),
// as well as a reference to the overlay that was clicked
const MapMarkerPopup = ({ sticker }) => {
    // Metadata from the CMS system
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(undefined);

    useEffect(() => {
        fetch('/content/posts.json')
          .then(response => response.json())
          .then(posts => {
              setPosts(posts);
              console.log("posts loaded:", posts);
          });
    }, []);

    useEffect(() => {
        if (sticker) {
            const post = posts.find((post) => sticker?.blog_slug === post?.slug);
            console.log("post found:", post);
            setPost(post);
        } else {
            setPost(undefined);
        }
    }, [posts, sticker]);

    return (
        <>
            {sticker && <>
                <ContentContainer>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <MapMarkerPin size={60} imgSrc={sticker?.icon} imgAlt={sticker?.title} />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant={'h6'}>{sticker?.title}</Typography>
                            <Typography variant={'overline'} color={colors.chicagoRed}>{sticker?.subtitle}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            {/* TODO: Truncate content if too long */}
                            <ReactMarkdown children={post?.content} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <a href={`/posts/${post?.slug}`} target={'_blank'}>Read more &rarr;</a>
                        </Grid>
                    </Grid>
                </ContentContainer>
            </>}
        </>
    )
}

export default MapMarkerPopup;
