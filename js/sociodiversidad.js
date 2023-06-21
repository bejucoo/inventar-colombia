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
			//changeContent(data, step);
		}
		
		//changeMap(step.index);
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


// Crear los mapas.
const sociodiversidadMap_1 = new maplibregl.Map({
	container: "sociodiversidadMapElm_1",
	style: "./resources/json/map_styles/narrativaMap_2.json",
	center: [-66.7, 5.61499],
	zoom: 5.5,
	pitch: 0,
	bearing: 0,
	interactive: true,
	attributionControl: false
});


// Agregar source, primeras layers y animar.
const addSource_Layers_Anim = (num, mapId, firstSource, animSpeed, dash, gap) => {
	mapId.addSource('orinoco_' + num, {
		type: 'geojson',
		data: './resources/geojson/narrativa/biodiversidad/' + firstSource + '.geojson'
	});

	mapId.addLayer({
		id: 'lineBack_' + num,
		type: 'line',
		source: 'orinoco_' + num,
		paint: {
			'line-color': ['get', 'color'],
			'line-width': 10,
			'line-opacity': 0.5
		}
	});

	mapId.addLayer({
		id: 'lineAnim_' + num,
		type: 'line',
		source: 'orinoco_' + num,
		paint: {
			'line-color': ['get', 'color'],
			'line-width': 10,
			'line-opacity': 1
		}
	});

	enableLineAnim(mapId, 'lineAnim_' + num, animSpeed, dash, gap);
}

sociodiversidadMap_1.on('load', () => {
	sociodiversidadMap_1.addSource('orinoco_1', {
		type: 'geojson',
		data: './resources/geojson/narrativa/sociodiversidad/HabitatsRibereñosOrinoco.geojson'
	});

	sociodiversidadMap_1.addLayer({
		id: 'lineAnim_1',
		type: 'line',
		source: 'orinoco_1',
		filter: ["==", ["geometry-type"], "MultiLineString"],
		filter: ["!=", "nombre", "Río Orinoco"],
		paint: {
			'line-color': [
				'match',
				['get', 'region'],
				'Amazónica',
				'#66496e',
				'Andina',
				'#b196b9',
				'Costera',
				'#b55845',
				'Guayanesa',
				'#d4978b',
				'Llanera',
				'#d98a30',
				'#92a9a4'
				],
			'line-width': 3,
			'line-opacity': 0.72
		}
	});

	sociodiversidadMap_1.addLayer({
		id: 'rioOrinoco',
		type: 'line',
		source: 'orinoco_1',
		filter: ["==", ["geometry-type"], "MultiLineString"],
		filter: ["==", "nombre", "Río Orinoco"],
		paint: {
			'line-color': '#92a9a4',
			'line-width': 3,
			'line-opacity': 0.72
		}
	});

	sociodiversidadMap_1.addLayer({
		id: "symbols",
		type: "symbol",
		source: "orinoco_1",
		filter: ["==", ["geometry-type"], "Point"],
		layout: {
			"symbol-placement": "point",
			"text-field": '{grupo}',
			"text-font": ["Cormorant Italic"],
			"text-size": 18,
			"text-anchor": "bottom",
		},
		paint: {
			"text-color": "#241d15",
			"text-halo-color": "#241d15",
			"text-halo-width": 0.05
		}
	});

	animRiver_1(0.0024);
});

// biodiversidadMap_2.on('load', () => {
// 	addSource_Layers_Anim(2, biodiversidadMap_2, 'step_6', 0.12, 2, 2);
// });


// Cambiar el contenido del mapa.
// const changeMap = (index) => {
// 	if (biodiversidadMap_1.getSource('orinoco_1')) {
// 		switch(index) {
// 		case 2:
// 			biodiversidadMap_1.setLayoutProperty('waterway_river', 'visibility', 'none');
// 			changeGeoJSON(index);
// 			changeMapView(index, 0.36);
// 			break;
// 		case 3:
// 			changeGeoJSON(index);
// 			changeMapView(index, 0.36);
// 			break;
// 		case 4:
// 			changeGeoJSON(index);
// 			changeMapView(index, 0.8);
// 			break;
// 		case 5:
// 			changeGeoJSON(index);
// 			changeMapView(index, 0.8);
// 			break;
// 		}

// 	}
// }


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


// Animación de las lineas.
var step = 0;
const enableLineAnim = (mapId, layerId, animSpeed, dashLength, gapLength) => {
	const dashSteps = 40 * dashLength / (gapLength + dashLength);
	const gapSteps = 40 - dashSteps;

	step = step + animSpeed;
	if (step >= 40) step = 0;

	var t, a, b, c, d;
	if (step < dashSteps) {
		t = step / dashSteps;
		a = (1 - t) * dashLength;
		b = gapLength;
		c = t * dashLength;
		d = 0;
	} else {
		t = (step - dashSteps) / (gapSteps);
		a = 0;
		b = (1 - t) * gapLength;
		c = dashLength;
		d = t * gapLength;          
	}

	mapId.setPaintProperty(layerId, 'line-dasharray', [d, c, b, a]);
	requestAnimationFrame(() => enableLineAnim(mapId, layerId, animSpeed, dashLength, gapLength));
}

const animRiver_1 = (animSpeed) => {
	step = step + animSpeed;
	//if (step >= 1) step = 0;

	sociodiversidadMap_1.setPaintProperty('lineAnim_1', 'line-width', Math.abs(Math.sin(step)* 3));
	requestAnimationFrame(() => animRiver_1(animSpeed));
}


// // Instancia de tippy.js para tooltips.
// tippy.delegate('#biodiversidadTexto_2', {
// 	target: ['#spanMioceno', '#spanCamino'],
// 	content: (reference) => reference.dataset.tooltip,
// 	trigger: 'mouseenter focus',
// 	theme: 'colombia'
// });