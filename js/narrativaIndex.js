// Agregar un nuevo mapa de MapLibre GL JS.
let map = new maplibregl.Map({
	container: "narrativaIndexMapElm",
	style: "./resources/json/map_styles/indexMap.json",
	center: [-66.52336, 6.34132],
	zoom: 8,
	pitch: 60,
	bearing: 150,
	interactive: false,
	attributionControl: false
});


// Obtener el archivo de los popups y ejecutar las funciones.
async function fetchPopups() {
	try {
		const response = await fetch("./resources/json/narrativa/narrativaIndex_popups.json");
		const data = await response.json();
		return data;
	} catch(error) {
		console.error(error); 
	}
}

// Ejecutar las funciones cuando se reciba la respuesta.
fetchPopups().then(data => {
	addIndexPopups(data);
});


// Agregar los popups al mapa.
const addIndexPopups = (json) => {
	json.forEach(e => {
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