import React, {useState} from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../styled_components';
import { NavBar, Footer } from '../../components';
import Grid from "@mui/material/Grid";
import Carousel from "../Layout/Carousel/CarouselInner";
import {media} from "../Layout/Carousel/CarouselStyle";
import {ImageList, ImageListItem, Tab, Tabs} from "@mui/material";
import {Box} from "@mui/system";
import {TabContext, TabList, TabPanel} from "@material-ui/lab";



const NeighborhoodPage = styled.div`
    background:white;
`;

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

const CarouselContainer = styled.div`
  ${media.palm`
    width: 100%;
  `} ${media.desk`
    width: 50%;
  `}
`;

const Image = styled.img`
  width: 300px;
  height: 180px;
  border: solid black 2px;
`;

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

 /*const LabTabs = () => {

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}*/

const NeighborhoodImageStyleTabs = ({ nhImageList }) => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Carousel" value="1" />
          <Tab label="Standard"  value="2" />
          <Tab label="Woven"  value="3" />
          <Tab label="Quilted"  value="4" />
          <Tab label="Masonry"  value="5" />
        </TabList>
      </Box>

      <TabPanel value="1">
        <h4>Option A: Interactive Carousel from the Home page</h4>
        <NeighborhoodImageCarousel nhImageList={nhImageList} />
      </TabPanel>

      <TabPanel value="2">
        <h4>Option B: Material UI Standard ImageList</h4>
        <NeighborhoodImageList nhImageList={nhImageList} variant={'standard'} />
      </TabPanel>

      <TabPanel value="3">
        <h4>Option C: Material UI Woven ImageList</h4>
        <NeighborhoodImageList nhImageList={nhImageList} variant={'woven'} />
      </TabPanel>

      <TabPanel value="4">
        <h4>Option D: Material UI Quilted ImageList</h4>
        <NeighborhoodImageList nhImageList={nhImageList} variant={'quilted'} />
      </TabPanel>

      <TabPanel value="5">
        <h4>Option E: Material UI Masonry ImageList</h4>
        <NeighborhoodImageList nhImageList={nhImageList} variant={'masonry'} />
      </TabPanel>
    </TabContext>
  );
}

const NeighborhoodImageList = ({ nhImageList, variant }) =>
  <ImageList sx={{ width: 500, height: 450 }} variant={variant || 'standard'} cols={4} gap={8}>
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

const NeighborhoodImageCarousel = ({nhImageList}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <CarouselContainer>
      <Carousel
        selectedIndex={selectedIndex}
        onChange={i => setSelectedIndex(i)}
      >
        {nhImageList.map((item, i) => (
          <Image key={`showcase-image-${i}`} src={item.url} />
        ))}
      </Carousel>
    </CarouselContainer>
  );
}


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
          <NeighborhoodImageStyleTabs nhImageList={nhImageList} />
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
