var map = new maplibregl.Map({
    container: 'map',
    style: './resources/map_styles/index_map.json',
    center: [-69.2, 5.2],
    zoom: 7.4,
    minZoom: 7
});

var popupImgStyle = document.createElement("style");
document.head.append(popupImgStyle);

fetch("./resources/json/index_popups.json")
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  addIndexPopups(data);
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

        if (e.id === "titulo"){
            return;
        } else {
            popupImgStyle.innerHTML += '#' + e.id + '_image {position: absolute;  display: none;pointer-events: none;z-index: 100000;}'

            const popupImg = document.createElement("div");
            popupImg.id = e.id + '_image';
            popupImg.innerHTML = '<img src="./resources/images/index/' + e.id + '.jpg">'
            document.body.appendChild(popupImg);
        } 
    })
}

let popupImgShown = false;

function getElmtImage(elmt) {
  return document.querySelector('#' + elmt.id + '_image');
}

function followMouse(e) {
    const image = getElmtImage(e.srcElement);
    image.style.left = e.x + 'px';
    image.style.top = e.y + 'px';
}

function showImage(elmt) {
    const image = getElmtImage(elmt);
    if (!popupImgShown) {
        popupImgShown = true;
        image.style.display = "block";
        document.addEventListener("mousemove", followMouse);
    }
}

function hideImage(elmt) {
    const image = getElmtImage(elmt);
    popupImgShown = false;
    image.style.display = "none";
    document.removeEventListener("mousemove", followMouse);
}

document.getElementById('centerMap').addEventListener('click', function(){
    map.flyTo({
        center: [-69.2, 5.2],
        zoom: 7.4, 
    })
})