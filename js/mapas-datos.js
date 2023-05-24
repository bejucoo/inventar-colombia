// Agregar un nuevo mapa de MapLibre GL JS.
let map = new maplibregl.Map({
	container: "mapasMapElm",
	style: "./resources/json/map_styles/indexMap.json",
	center: [-66.92588, 5.96424],
	zoom: 5.5,
	pitch: 0,
	bearing: 0,
	interactive: true,
	attributionControl: false
});