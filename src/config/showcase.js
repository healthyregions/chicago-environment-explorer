const BASE_URL = process.env.PUBLIC_URL
export const SHOWCASE_ITEMS = [
    {
        text: 'PM2.5',
        image: BASE_URL + '/img/showcase/pm25.jpg',
        icon: BASE_URL + '/img/showcase/icons/pm25.png',
        explainerText:"PM2.5 is a measure of..."
    },
    {
        text: 'Vegetation',
        image: BASE_URL + '/img/showcase/ndvi.jpg',
        icon: BASE_URL + '/img/showcase/icons/ndvi.png',
        explainerText:"Vegetation index, or NDVI, is a measure of..."
    },
    {
        text: 'Biodiversity',
        image: BASE_URL + '/img/showcase/biodiversity.jpg',
        icon: BASE_URL + '/img/showcase/icons/biodiversity.png',
        explainerText:"Biodiversity data..."
    }
]