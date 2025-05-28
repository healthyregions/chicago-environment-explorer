import React, {useEffect, useState} from 'react';
import {ContentContainer} from "../../styled_components";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { colors } from '../../config';
import remarkGfm from "remark-gfm";
import MapMarkerPin from "./MapMarkerPin";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
`;
const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
`;
const PopupTitle = styled.h2`
    font-family: Roboto,sans-serif !important;
    font-size: 2rem !important;
    margin-bottom: 0 !important;
`;
const PopupSubtitle = styled.h4`
    font-family: Roboto,sans-serif !important;
    font-size: 1rem !important;
    color: ${colors.chicagoRed} !important;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
`;
const PopupBody = styled.p`
    font-family: Lora,sans-serif !important;
    font-size: 1rem !important;
    letter-spacing: 0 !important;
    p {
        line-height: 1.25;
    }
`;

// This component handles and formats the map tooltip info regarding the clicked Blog Post.
// The props passed to this component should contain the hovered object (from deck, info.object by default),
// as well as a reference to the overlay that was clicked
const MapMarkerPopup = ({ sticker, truncLength = 50 }) => {
    // Metadata from the CMS system
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(undefined);

    /** Fetch posts from CMS */
    useEffect(() => {
        fetch('/content/posts.json')
          .then(response => response.json())
          .then(posts => {
              setPosts(posts);
          });
    }, []);

    /** Find our desired post */
    useEffect(() => {
        if (sticker) {
            const post = posts.find((post) => sticker?.blog_slug === post?.slug);
            setPost(post);
        } else {
            setPost(undefined);
        }
    }, [posts, sticker]);

    /** Truncate post length, if necessary */
    const [truncatedMd, setTruncatedMd] = useState('');
    useEffect(() =>  {
        // Split post content into words and coompare this to truncLength
        const segments = post?.content?.split(" ");
        if (segments?.length > truncLength) {
            // Only use the first truncLength # of words
            const truncatedText = segments?.slice(0, truncLength)?.join(" ");
            // Ensure that truncated text always ends with ellipses
            const suffix = truncatedText?.endsWith('.') ? '..' : '...';
            setTruncatedMd(`${truncatedText}${suffix}`);
        } else {
            // If post contents are shorter than our configured truncLength, then show full post content
            setTruncatedMd(post?.content);
        }
    }, [post]);

    return (
        <>
            {sticker && <>
                <ContentContainer style={{ padding: '2em 1em' }}>
                    <FlexRow className={'flex-row'}>
                        <MapMarkerPin size={60} imgSrc={sticker?.logo} imgAlt={sticker?.title} />
                        <FlexCol>
                            <PopupTitle>{sticker?.title}</PopupTitle>
                            <PopupSubtitle>{sticker?.subtitle}</PopupSubtitle>
                        </FlexCol>
                    </FlexRow>

                    <PopupBody>
                        <ReactMarkdown children={truncatedMd} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                        <a className={'read-more'} href={`/posts/${post?.slug}`} target={'_blank'}>Read more &rarr;</a>
                    </PopupBody>
                </ContentContainer>
            </>}
        </>
    )
}

export default MapMarkerPopup;
