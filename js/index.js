// Agregar un nuevo mapa de MapLibre GL JS.
var map = new maplibregl.Map({
    container: 'indexMapElm',
    style: './resources/json/map_styles/index_map.json',
    center: [-67.38, 3.95],
    zoom: 10,
    pitch: 60,
    bearing: -49.77
});


// Desactivar el zoom por scroll, el paneo por drag y el zoom por rotación.
map.scrollZoom.disable();
map.dragPan.disable();
map.touchZoomRotate.disable();


// Obtener el archivo de los popups y ejecutar las funciones.
fetch("./resources/json/index/index_popups.json")
.then(function(response) {
  return response.json();
})
.then(function(data) {
  addIndexPopups(data);
  scrollToPoint(data);
})
.catch(function(e) {
    console.log('Error al cargar archivo JSON de los popups:', e);
});


// Agregar los popups al mapa.
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


// Ir a cada popup según la posición del scroll.
function scrollToPoint(json){
    const scroller = scrollama();
    scroller
    .setup({
        step: ".indexMapStep",
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