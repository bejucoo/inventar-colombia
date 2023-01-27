var map = new maplibregl.Map({
    container: 'map',
    style: './resources/styles/index_map.json', // stylesheet location
    center: [-72.5, 4.6], // starting position [lng, lat]
    zoom: 6 // starting zoom
});