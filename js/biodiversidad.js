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


// Instancia de Scrollama y funciones cuando se cargue el DOM y se cambie de step.
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
		changeMap(step.index);
	});
}


// Cambiar el contenido de los divs de texto e imagen.
const changeContent = (data, step) => {
	let divText = document.getElementById("biodiversidadTexto_" + data[step.element.id].div);
	let divAnim = document.getElementById("biodiversidadAnim_" + data[step.element.id].div);

	if (divText) {
		divText.innerHTML = data[step.element.id].text;
	}

	if (divAnim) {
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

let biodiversidadMap_2 = new maplibregl.Map({
	container: "biodiversidadMapElm_2",
	style: "./resources/json/map_styles/narrativaMap_1.json",
	center: [-64.13079, 5.70012],
	zoom: 9.24,
	pitch: 0,
	bearing: 0,
	interactive: false,
	attributionControl: false
});


// Agregar source y primeras layers al mapa.
biodiversidadMap_1.on('load', () => {
	biodiversidadMap_1.addSource('orinoco_1', {
		type: 'geojson',
		data: './resources/geojson/narrativa/biodiversidad/step_2.geojson'
	});

	biodiversidadMap_1.addLayer({
		type: 'line',
		source: 'orinoco_1',
		id: 'lineBack_1',
		paint: {
			'line-color': '#92a9a4',
			'line-width': 7,
			'line-opacity': 0.5
		},
		layout: {
			'line-cap': 'round'
		}
	});

	biodiversidadMap_1.addLayer({
		type: 'line',
		source: 'orinoco_1',
		id: 'lineAnim_1',
		paint: {
			'line-color': '#92a9a4',
			'line-width': 7,
			'line-opacity': 1
		},
		layout: {
			'line-cap': 'round'
		}
	});
	enableLineAnim(biodiversidadMap_1, 'lineAnim_1', 70);
});

// Agregar source y primeras layers al mapa.
biodiversidadMap_2.on('load', () => {
	biodiversidadMap_2.addSource('orinoco_2', {
		type: 'geojson',
		data: './resources/geojson/narrativa/biodiversidad/step_6.geojson'
	});

	biodiversidadMap_2.addLayer({
		type: 'line',
		source: 'orinoco_2',
		id: 'lineBack_2',
		paint: {
			'line-color': '#92a9a4',
			'line-width': 7,
			'line-opacity': 0.5
		},
		layout: {
			'line-cap': 'round'
		}
	});

	biodiversidadMap_2.addLayer({
		type: 'line',
		source: 'orinoco_2',
		id: 'lineAnim_2',
		paint: {
			'line-color': '#92a9a4',
			'line-width': 7,
			'line-opacity': 1
		},
		layout: {
			'line-cap': 'round'
		}
	});
	enableLineAnim(biodiversidadMap_2, 'lineAnim_2', 90);
});

// Cambiar el contenido del mapa.
const changeMap = (index) => {
	if (biodiversidadMap_1.getSource('orinoco_1')) {
		switch(index) {
		case 2:
			biodiversidadMap_1.setLayoutProperty('waterway_river', 'visibility', 'none');
			changeGeoJSON(index);
			changeMapView(index, 0.36);
			break;
		case 3:
			changeGeoJSON(index);
			changeMapView(index, 0.36);
			break;
		case 4:
			changeGeoJSON(index);
			changeMapView(index, 0.8);
			break;
		case 5:
			changeGeoJSON(index);
			changeMapView(index, 0.8);
			break;
		}

	}
}

// Cambiar el archivo geoJSON con los datos de las capas.
const changeGeoJSON = (index) => {
	biodiversidadMap_1.getSource('orinoco_1').setData('./resources/geojson/narrativa/biodiversidad/step_' + index + '.geojson');
}

// Cambiar el centro y el zoom del mapa.
const changeMapView = (index, vel) => {
	biodiversidadMap_1.flyTo({
		center: mapViews[index][0],
		zoom: mapViews[index][1],
		speed: vel
	});
}

// Centros y zooms para el mapa.
const mapViews = [
	[],
	[],
	[
		[-69.35067, 2.85314], 
		5
		],
	[
		[-66.2, 5.96424], 
		5.5
		],
	[
		[-66.2, 5.96424],
		5.5
		],
	[
		[-73.26332, 4.50225],
		10.5
		]
	];


// Iniciar animación de las lineas.
let intervalAnim;
function enableLineAnim(mapId, layerId, animStep) {
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
	intervalAnim = setInterval(() => {
		step = (step + 1) % dashArraySeq.length;
		mapId.setPaintProperty(layerId, 'line-dasharray', dashArraySeq[step]);
	}, animStep);
}

// Detener animación de las lineas.
function stopLineAnim() {
	clearInterval(intervalAnim);
	intervalAnim = null;
}

// Instancia de tippy.js para tooltips.
tippy.delegate('#biodiversidadTexto_2', {
	target: ['#spanMioceno', '#spanCamino'],
	content: (reference) => reference.dataset.tooltip,
	trigger: 'mouseenter focus',
	theme: 'colombia'
});