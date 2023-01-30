var map = new maplibregl.Map({
    container: 'map',
    style: './resources/styles/index_map_1.json', // stylesheet location
    center: [-69.2, 5.2], // starting position [lng, lat]
    zoom: 7 // starting zoom
});

var popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false
})
.setLngLat([-69.2, 5.2])
.setHTML(
    "<h1>Inventar Colombia</h1><h2>Una mirada desde el Orinoco</h2><a href='#'>LINK</a>"
    )
.addTo(map);