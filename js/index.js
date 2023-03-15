// Agregar un nuevo mapa de MapLibre GL JS.
var map = new maplibregl.Map({
    container: "indexMapElm",
    style: "./resources/json/map_styles/index_map.json",
    center: [-67.30, 3.95],
    zoom: 10,
    pitch: 60,
    bearing: -124,
    interactive: false,
    attributionControl: false
});


// Obtener el archivo de los popups y ejecutar las funciones.
fetch("./resources/json/index/index_popups.json")
.then(function(response) {
  return response.json();
})
.then(function(data) {
  addIndexPopups(data);
  scrollToPoint(data);
})
.catch(function(error) {
    console.log(error);
});


// Agregar los popups al mapa.
function addIndexPopups(json) {
    json.forEach(function(e) {
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


// Ir a cada popup y dibujar o quitar el ícono de scroll según la posición del scroll 
function scrollToPoint(json) {
    const scrollIcon = document.getElementById("scrollAnim");
    var scrollIconHidden = false;

    const scroller = scrollama();
    scroller
    .setup({
        step: ".indexMapStep",
    })
    .onStepEnter(function(response) {
        map.flyTo({
            center: json[response.index].lnglat,
            zoom: json[response.index].zoom,
            pitch: json[response.index].pitch,
            bearing: json[response.index].bearing,
            curve: 0.24,
            speed: 0.12
        });

        if (response.index != 0) {
            scrollIconHidden = true;
            scrollIcon.classList.add("hidden");
        } else {
            scrollIconHidden = false;
            scrollIcon.classList.remove("hidden");
        }
    });
};