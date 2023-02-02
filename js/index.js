var map = new maplibregl.Map({
    container: 'map',
    style: './resources/map_styles/index_map.json',
    center: [-69.2, 5.2],
    zoom: 7.4,
    minZoom: 7
}); 

var xml_popups = new XMLHttpRequest();

xml_popups.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var popups_arr = JSON.parse(this.responseText);
        addIndexPopups(popups_arr)
    }
};

xml_popups.open("GET", "./resources/json/index_popups.json"); 
xml_popups.send();

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
}

let attached = false;
let imageContainer = document.querySelector("#image1");


function getElmtImage(elmt) {
  return elmt.querySelector("img");
}

function followMouse(event) {
    imageContainer.style.left = event.x + 10 + 'px';
    imageContainer.style.top = event.y + 10 + 'px';
}

function showImage(elmt) {
    const image = getElmtImage(elmt)
    if (!attached) {
        attached = true;
        imageContainer.style.display = "block";
        document.addEventListener("mousemove", followMouse);
    }
}

function hideImage(elmt) {
    const image = getElmtImage(elmt)
    attached = false;
    imageContainer.style.display = "none";
    document.removeEventListener("mousemove", followMouse);
}
