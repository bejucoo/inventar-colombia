// Agregar un nuevo mapa de MapLibre GL JS.
var map = new maplibregl.Map({
    container: "indexMapElm",
    style: "./resources/json/map_styles/index_map.json",
    center: [-67.20, 3.95],
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
            speed: 0.24
        });

        if (response.index != 0) {
            scrollIconHidden = true;
            scrollIcon.classList.add("hidden");
        } else {
            scrollIconHidden = false;
            scrollIcon.classList.remove("hidden");
        }

        setActiveDot(response.index)
    });
};


// Activar o desactivar el punto correspondiente al popup actual.
const dotInicio = document.getElementById("controlLink_0");
dotInicio.classList.add("active");

const mapControl = document.querySelectorAll(".controlLink");
mapControl.forEach(function(e){
    e.addEventListener("click", function(event){
        setActiveDot(event.target.id.substr(-1))
    })
});

function setActiveDot(id) {
    let mapControl = document.getElementById("indexMapControl");
    let oldActive = mapControl.getElementsByClassName('active'); 
    let newActive = mapControl.querySelector(`#controlLink_${id}`);

    oldActive[0].classList.remove("active");
    newActive.classList.add("active");
}