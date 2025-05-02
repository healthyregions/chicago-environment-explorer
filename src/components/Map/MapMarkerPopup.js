import React, {useEffect, useState} from 'react';
import Neighborhood from "./Neighborhood";
import {ContentContainer} from "../../styled_components";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import {ImageList, ImageListItem} from "@mui/material";


// TODO: Source these from CMS?
const defaultImageList = [
    {
        url: '/img/logos/25thWard.png',
        title: '25thWard',
    },
    {
        url: '/img/logos/audubon.png',
        title: 'Audubon',
    },
    {
        url: '/img/logos/botanic.jpg',
        title: 'Botanic',
    },
    {
        url: '/img/logos/csds.jpg',
        title: 'CSDS',
    },
    {
        url: '/img/logos/depaul.png',
        title: 'Depaul',
    },
    {
        url: '/img/logos/depaul2.png',
        title: 'Depaul2',
    },
    {
        url: '/img/logos/ggis.png',
        title: 'GGIS',
    },
    {
        url: '/img/logos/grow-greater.png',
        title: 'GrowGreater',
    },
    {
        url: '/img/logos/herop.png',
        title: 'HEROP',
    },
    {
        url: '/img/logos/illini.png',
        title: 'ILLINI',
    },
    {
        url: '/img/logos/instituto.png',
        title: 'Instituto',
    },
    {
        url: '/img/logos/MEV.png',
        title: 'MEV',
    },
    {
        url: '/img/logos/ms.png',
        title: 'MS',
    },
    {
        url: '/img/logos/NASA_logo.png',
        title: 'NASA',
    },
];


const Image = styled.img`
  width: 9rem;
  border: solid lightgray 1px;
`;

// TODO: Fetch these from Post metadata (CMS)
const defaultNeighborhoodName = 'Pilsen';
const defaultMarkdownContents = 'Bordering the Chicago River, the Lower West Side neighborhood offers\n' +
  '            a combination of diverse areas including the Chicago Arts District in\n' +
  '            East Pilsen. It’s home to the National Museum of Mexican Art at Harrison\n' +
  '            Park and the Mana Contemporary Gallery. Popular eateries range from\n' +
  '            Mexican to Italian, while hip Pilsen Yards ...';
const defaultResourceLinks = [
    { title: 'Link one comes here that is text only', url: '#' },
    { title: 'Link two comes here that is text only over here', url: '#' },
    { title: 'Link three comes here', url: '#' },
]
const defaultLogoUrl = '/img/logos/neighborhoods/Pilsen.png';



const NeighborhoodImageList = ({ nhImageList }) =>
  <ImageList variant={'woven'} cols={4} gap={0} sx={{ paddingBottom:'2rem', overflowY: 'hidden' }}>
      {nhImageList.map((item) => (
        <ImageListItem key={item.url}>
            <Image
              srcSet={`${item.url}?w=161&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.url}?w=161&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
        </ImageListItem>
      ))}
  </ImageList>


const MapMarkerPin = ({ sticker }) =>
  <>
      <img src={sticker?.logo} alt={sticker?.title} />
      <br/>
      <br/>
      <br/>
      <a href={`/posts/${sticker?.blog_slug}`} target={'_blank'}>Read more &rarr;</a>
  </>


// This component handles and formats the map tooltip info regarding the clicked Blog Post.
// The props passed to this component should contain the hovered object (from deck, info.object by default),
// as well as a reference to the overlay that was clicked
const MapMarkerPopup = ({ sticker }) => {
    // Metadata from the CMS system
    const [postMetadata, setPostMetadata] = useState(undefined);

    useEffect(async () => {
        if (!postMetadata) {
            try {
                const postsResponse = await fetch('/content/posts.json');
                const posts = postsResponse.json();
                const post = posts.find((post) => sticker?.blog_slug === post.slug);
                console.log("post found:", post);
                setPostMetadata(post);
            } catch (e) {
                setPostMetadata([{ title: `Error: failed to fetch news post metadata - ${sticker?.blog_slug}` }]);
            }
        }
    });

    return (
        <>
            <h2>{sticker?.title}</h2>
            {sticker && <div style={{ overflowY: 'scroll', maxHeight: '55vh' }}>
                <ContentContainer>
                    {/* TODO: Refactor - Move this to the blog post
                      <Grid container>
                        <Grid item xs={12}>
                          <NeighborhoodImageList nhImageList={nhImageList} />
                        </Grid>
                      </Grid>*/}

                    <Grid container spacing={4}>
                        <Grid item xs={3} direction={'row'}>
                            <MapMarkerPin sticker={sticker} />
                        </Grid>

                        <Grid item xs={9}>
                            {/* TODO: Truncate content if too long */}
                            <p>{postMetadata.content}</p>
                        </Grid>
                    </Grid>
                </ContentContainer>
            </div>}
        </>
    )
}

export default MapMarkerPopup;
