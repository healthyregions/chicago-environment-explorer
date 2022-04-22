const BASE_URL = process.env.PUBLIC_URL
export const SHOWCASE_ITEMS = [
    {
        text: 'PM2.5',
        image: BASE_URL + '/img/showcase/pm25.jpg',
        icon: BASE_URL + '/img/showcase/icons/pm25.png',
        explainerText:"This approximation of PM2.5 air pollution, or particulate matter sized 2.5 microns or smaller, comes from a predictive model using ground and satellite sensors. Check out the summer average, and look forward to new datasets in coming months!"
    },
    {
        text: 'Vegetation',
        image: BASE_URL + '/img/showcase/ndvi2.png',
        icon: BASE_URL + '/img/showcase/icons/ndvi.png',
        explainerText:"How green is your community? The Vegetation Index, measured from satellite data, gives a measure of the abundance of vegetation for every tract in the City. Freshly made from DePaul University. Zoom in all the way to see individual trees!"
    },
    {
        text: 'Biodiversity',
        image: BASE_URL + '/img/showcase/biodiversity.jpg',
        icon: BASE_URL + '/img/showcase/icons/biodiversity.png',
        explainerText:"The Botanic Gardens just released this dataset on Community Sampled Plant Diversity. Check out the biodiversity in your neighborhood, and then contribute to the data by adding plant species yourself!"
    },
    {
        text: 'Traffic',
        image: BASE_URL + '/img/showcase/traffic.png',
        icon: BASE_URL + '/img/showcase/icons/traffic.png',
        explainerText:"How bad is traffic in your area? We developed a score of traffic volume based on traffic estimates form the Illinois Department of Transportation. Zoom into the map, tile (using your control key), and explore!"
    },
    {
        text: 'Redlining',
        image: BASE_URL + '/img/showcase/redlining.png',
        icon: BASE_URL + '/img/showcase/icons/redlining.png',
        explainerText:"A legacy of redlining and racialized deinvestment is a part of Chicago's history. Overlay historic redlining areas to see how communities today may have been shaped from the past."
    },
    {
        text: 'Asthma',
        image: BASE_URL + '/img/showcase/asthma.png',
        icon: BASE_URL + '/img/showcase/icons/asthma.png',
        explainerText:"We connect community level health data from multiple sources to give an insight into health outcomes that may be associated with the physical environment. Explore multiple measures at once and adjust filters in real time."
    }
]