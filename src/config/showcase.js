import { combineMeans } from "simple-statistics"

const BASE_URL = process.env.PUBLIC_URL
export const SHOWCASE_ITEMS = [
    {
        text: 'Heat',
        image: BASE_URL + '/img/showcase/heat.png',
        icon: BASE_URL + '/img/showcase/icons/H.png',
        explainerText:"Extreme heat is a major challenge for health and well-being, and is dangerous when access to cool spaces is limited. We include several heat measures, including this heat index that takes into account humidity, generated in 2023 with data collected by community residents."
    },
    {
        text: 'Resources',
        image: BASE_URL + '/img/showcase/cooling.png',
        icon: BASE_URL + '/img/showcase/icons/GB.png',
        explainerText:"To combat extreme heat, residents can access cooling centers, including community centers and libraries, across the city. In the latest version of Chives, a number of new resources have been added to explore alongside the data in the map, with more to come."
    },
    {
        text: 'PM2.5',
        image: BASE_URL + '/img/showcase/pm25.jpg',
        icon: BASE_URL + '/img/showcase/icons/pm25.png',
        explainerText:"Approximations of PM2.5 air pollution, or particulate matter sized 2.5 microns or smaller, can vary across modeling approaches. Check out the summer average, and compare with other datasets from research teams!"
    },
    {
        text: 'Vegetation',
        image: BASE_URL + '/img/showcase/ndvi2.jpg',
        icon: BASE_URL + '/img/showcase/icons/ndvi.png',
        explainerText:"How green is your community? The Vegetation Index, measured from satellite data, gives a measure of the abundance of vegetation for every tract in the City. Freshly made from DePaul University. Zoom in all the way to see individual trees."
    },
    {
        text: 'Biodiversity',
        image: BASE_URL + '/img/showcase/biodiversity.jpg',
        icon: BASE_URL + '/img/showcase/icons/biodiversity.png',
        explainerText:"The Botanic Gardens just released this dataset on Community Sampled Plant Diversity. Check out the biodiversity in your neighborhood, and then contribute to the data by adding plant species yourself!"
    },
    {
        text: 'Traffic',
        image: BASE_URL + '/img/showcase/traffic.jpg',
        icon: BASE_URL + '/img/showcase/icons/traffic.png',
        explainerText:"How bad is traffic in your area? We developed a score of traffic volume based on traffic estimates from the Illinois Department of Transportation. Zoom into the map tile (using your control key) to explore and assess local patterns."
    },
    {
        text: 'Redlining',
        image: BASE_URL + '/img/showcase/redlining.jpg',
        icon: BASE_URL + '/img/showcase/icons/redlining.png',
        explainerText:"A legacy of redlining and racialized deinvestment is a part of Chicago's history. Overlay historic redlining areas to see how communities today may have been shaped from the past, or try an updated redlining variable on the map."
    },
    {
        text: 'Asthma',
        image: BASE_URL + '/img/showcase/asthma.jpg',
        icon: BASE_URL + '/img/showcase/icons/asthma.png',
        explainerText:"We connect community level health data from multiple sources to give an insight into health outcomes that may be associated with the physical environment. Explore multiple measures at once and adjust filters in real time."
    }
]