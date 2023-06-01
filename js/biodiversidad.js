// Obtener el archivo JSON.
async function fetchBiodiversidad() {
	try {
		const response = await fetch("./resources/json/narrativa/biodiversidad/biodiversidadAnim.json")
		const data = await response.json();
		return data;
	} catch(error) {
		console.error(error);
	}
}


// Ejecutar las funciones cuando se reciba la respuesta.
fetchBiodiversidad().then(data => scrollBiodiversidad(data));


// Crear la instancia de Scrollama y llamar la función chageContent cuando se halla cargado el DOM y se cambie de step.
const scrollBiodiversidad = (data) => {
	const scroller = scrollama();
	scroller
	.setup({
		step: ".biodiversidadStep"
	})
	.onStepEnter((step) => {
		if (document.readyState === "loading") {
			console.log("Cargando");
		} else {
			changeContent(data, step);
		}
		changeMap_1(step.index);
	});
}


// Función para cambiar el contenido de los divs de texto e imagen.
const changeContent = (data, step) => {
	let divText = document.getElementById("biodiversidadTexto_" + data[step.element.id].div);
	let divAnim = document.getElementById("biodiversidadAnim_" + data[step.element.id].div);

	if (divText != null) {
		divText.innerHTML = data[step.element.id].text;
	}

	if (divAnim != null) {
		divAnim.innerHTML = data[step.element.id].img;
	}
}


// Crear el mapa.
let biodiversidadMap_1 = new maplibregl.Map({
	container: "biodiversidadMapElm_1",
	style: "./resources/json/map_styles/narrativaMap_1.json",
	center: [-69.35067, 2.85314],
	zoom: 5,
	pitch: 0,
	bearing: 0,
	interactive: false,
	attributionControl: false
});

biodiversidadMap_1.on('error', function() {
	console.error('Ocurrió un error con la instancia de MapLibre');
});


// Agregar capa al mapa.
biodiversidadMap_1.on('load', () => {
	biodiversidadMap_1.addSource('orinoco_1', {
		type: 'geojson',
		data: './resources/geojson/narrativa/biodiversidad/orinoco_1.geojson'
	});

	biodiversidadMap_1.addLayer({
		type: 'line',
		source: 'orinoco_1',
		id: 'lineBack',
		paint: {
			'line-color': '#92a9a4',
			'line-width': 8,
			'line-opacity': 1
		}
	});

	biodiversidadMap_1.addLayer({
		type: 'line',
		source: 'orinoco_1',
		id: 'lineAnim',
		paint: {
			'line-color': '#bccac7',
			'line-width': 8,
			'line-opacity': 1
		}
	});

	enableLineAnimation('lineAnim');
});


// Cambios en mapas.
const changeMap_1 = (index) => {
	if (biodiversidadMap_1.getSource('orinoco_1') != null) {
		if (index === 2) {
			biodiversidadMap_1.setLayoutProperty('waterway_river', 'visibility', 'none');
			biodiversidadMap_1.getSource('orinoco_1').setData('./resources/geojson/narrativa/biodiversidad/orinoco_1.geojson');
			biodiversidadMap_1.flyTo({
				center: [-69.35067, 2.85314],
				zoom: 5,
				speed: 0.36
			});
		} else if(index === 3){
			biodiversidadMap_1.setLayoutProperty('waterway_river', 'visibility', 'visible');
			biodiversidadMap_1.getSource('orinoco_1').setData('./resources/geojson/narrativa/biodiversidad/orinoco_2.geojson');
			biodiversidadMap_1.flyTo({
				center: [-66.2, 5.96424],
				zoom: 6,
				speed: 0.36
			});
		} else {
			return;
		}
	}
}


// Animación de las lineas.
var animationStep = 72;
function enableLineAnimation(layerId) {
	var step = 0;
	let dashArraySeq = [
		[0, 4, 3],
		[1, 4, 2],
		[2, 4, 1],
		[3, 4, 0],
		[0, 1, 3, 3],
		[0, 2, 3, 2],
		[0, 3, 3, 1]
		];
	setInterval(() => {
		step = (step + 1) % dashArraySeq.length;
		biodiversidadMap_1.setPaintProperty(layerId, 'line-dasharray', dashArraySeq[step]);
	}, animationStep);
}


tippy.delegate('#biodiversidadTexto_2', {
	target: ['#spanMioceno', '#spanCamino'],
	content: (reference) => reference.dataset.tooltip,
	trigger: 'mouseenter focus',
	theme: 'colombia'
});