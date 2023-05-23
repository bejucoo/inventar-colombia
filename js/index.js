// Agregar un nuevo mapa de MapLibre GL JS.
let map = new maplibregl.Map({
	container: "mapElm",
	style: "./resources/json/map_styles/indexMap.json",
	center: [-67.20, 3.95],
	zoom: 10,
	pitch: 60,
	bearing: -124,
	interactive: false,
	attributionControl: false
});


// Obtener el archivo de los popups y ejecutar las funciones.
async function fetchPopups() {
	try {
		const response = await fetch("./resources/json/index/index_popups.json")
		const data = await response.json();
		return data;
	} catch(error) {
		console.error(error); 
	}
}

// Ejecutar las funciones cuando se reciba la respuesta.
fetchPopups().then(data => {
	addIndexPopups(data);
	scrollToPoint(data);
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


// Ir a cada popup y dibujar o quitar el ícono de scroll según la posición del scroll 
const scrollToPoint = (json) => {
	const scrollIcon = document.getElementById("scrollAnim");
	let scrollIconHidden = false;
	const scroller = scrollama();

	scroller
	.setup({
		step: ".indexMapStep",
	})
	.onStepEnter(response => {
		map.flyTo({
			center: json[response.index].lnglat,
			zoom: json[response.index].zoom,
			pitch: json[response.index].pitch,
			bearing: json[response.index].bearing,
			curve: 0.24,
			speed: 0.15
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
const dotInit = document.getElementById("controlLink_0");
dotInit.classList.add("active");

const mapControl = document.querySelectorAll(".controlLink");
mapControl.forEach(e => e.addEventListener("click", event => setActiveDot(event.target.id.substr(-1))));

const setActiveDot = (id) => {
	let mapControl = document.getElementById("indexMapControl");
	let oldActive = mapControl.getElementsByClassName('active'); 
	let newActive = mapControl.querySelector(`#controlLink_${id}`);

	oldActive[0].classList.remove("active");
	newActive.classList.add("active");
}