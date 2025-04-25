import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { NavBar, Footer } from '../../components';
import Grid from "@mui/material/Grid";
import {ImageList, ImageListItem} from "@mui/material";



const NeighborhoodPage = styled.div`
    background:white;
`;


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

const NeighborhoodComponent = ({
  nhName = defaultNeighborhoodName,
  nhMarkdownContents = defaultMarkdownContents,
  nhResourceLinks = defaultResourceLinks,
  nhLogoUrl = defaultLogoUrl,
  nhImageList = defaultImageList
}) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <ImageList sx={{ width: 500, height: 450 }} variant="woven" cols={3} gap={8}>
            {nhImageList.map((item) => (
              <ImageListItem key={item.url}>
                <img
                  srcSet={`${item.url}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.url}?w=161&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={2} direction={'row'}>
          <img src={nhLogoUrl} alt={nhName} />
          <br/>
          <br/>
          <br/>
          <a href={'#'} target={'_blank'}>Read more &rarr;</a>
        </Grid>
        <Grid item xs={4}>
          <p>{nhMarkdownContents}</p>
          {
            nhResourceLinks?.length > 0 && <p>
              <span>Resources:</span>
              {
                nhResourceLinks.map(resource =>
                  <div><a href={resource.url}>{resource.title}</a></div>
                )
              }
            </p>
          }
        </Grid>
      </Grid>
    </>
  );
};

export default function Neighborhood() {

  return (
    <NeighborhoodPage>
      <NavBar />
      <ContentContainer>
        <NeighborhoodComponent neighborhoodName={'Pilsen'} />
      </ContentContainer>
      <Footer/>
    </NeighborhoodPage>
  );
}
