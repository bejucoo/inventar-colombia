var map = new maplibregl.Map({
    container: 'map',
    style: './resources/map_styles/index_map.json',
    center: [-67.55, 6.2],
    zoom: 10,
    pitch: 60,
    bearing: 61.69
});

map.scrollZoom.disable();

fetch("./resources/json/index_popups.json")
.then(function (response) {
  return response.json();
})
.then(function (data) {
  addIndexPopups(data);
  scrollToPoint(data);
});

function addIndexPopups(json){
    json.forEach(function(e){
        new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false,
            anchor: "center",
            className: e.class,
            maxWidth: e.maxWidth
        })
        .setLngLat(e.lnglat)
        .setHTML(e.html)
        .addTo(map);
    })
};

function scrollToPoint(json){
    const scroller = scrollama();
    scroller
    .setup({
        step: ".step",
    })
    .onStepEnter((response) => {
        map.flyTo({
            center: json[response.index].lnglat,
            zoom: json[response.index].zoom,
            pitch: json[response.index].pitch,
            bearing: json[response.index].bearing,
            curve: 0.24,
            speed: 0.24
        });
    })
    .onStepExit((response) => {
    });
};