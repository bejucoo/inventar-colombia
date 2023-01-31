var map = new maplibregl.Map({
    container: 'map',
    style: './resources/styles/index_map.json',
    center: [-69.2, 5.2],
    zoom: 7
});

var popup1 = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "index_popup main bg_white",
    maxWidth: "none"
})
    .setLngLat([-69.2, 5.2])
    .setHTML(
        "<h1><i>Inventar Colombia</i></h1><h4><i>Una mirada desde el Orinoco</i></h4>"
    )
    .addTo(map);

var popup2 = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "index_popup sub bg_red",
    maxWidth: "180px"
})
    .setLngLat([-66.6, 4.1])
    .setHTML(
        "<img src='./resources/images/index_siglo_XIII.png'><h1><i>El Siglo XVIII</h1></i><h2><a href='#'>Ir a sección</a></h2>"
    )
    .addTo(map);