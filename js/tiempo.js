// Obtener el archivo JSON.
async function fetchBiodiversidad() {
	try {
		const response = await fetch("./resources/json/narrativa/tiempoSteps.json")
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


// Variables para las animaciones
var stepInit = 0;

// Crear los mapas.
const biodiversidadMap_1 = new maplibregl.Map({
	container: "biodiversidadMapElm_1",
	style: "./resources/json/map_styles/narrativaMap_1.json",
	center: [-69.35067, 2.85314],
	zoom: 5,
	pitch: 0,
	bearing: 0,
	interactive: false,
	attributionControl: false
});

const biodiversidadMap_2 = new maplibregl.Map({
	container: "biodiversidadMapElm_2",
	style: "./resources/json/map_styles/narrativaMap_1.json",
	center: [-64.13079, 5.70012],
	zoom: 9.24,
	pitch: 0,
	bearing: 0,
	interactive: false,
	attributionControl: false
});


// Agregar sources, layers y animar.
biodiversidadMap_1.on('load', () => {
	biodiversidadMap_1.addSource('transformacionOrinoco_1', {
		type: 'geojson',
		data: './resources/geojson/narrativa/tiempo/transformacionOrinoco.geojson'
	});

	for (var i = 2; i <= 5; i++) {
		biodiversidadMap_1.addLayer({
			id: 'step_' + i + '_solid',
			type: 'line',
			filter: ['==', 'step', i],
			source: 'transformacionOrinoco_1',
			paint: {
				'line-color': ['get', 'color'],
				'line-width': 7,
				'line-opacity': (i === 2) ? 0.5 : 0
			}
		});
	}

	for (var i = 2; i <= 5; i++) {
		biodiversidadMap_1.addLayer({
			id: 'step_' + i + '_anim',
			type: 'line',
			filter: ['==', 'step', i],
			source: 'transformacionOrinoco_1',
			paint: {
				'line-color': ['get', 'color'],
				'line-width': 7,
				'line-opacity': (i === 2) ? 1 : 0
			}
		});
		enableLineAnim(biodiversidadMap_1, 'step_' + i + '_anim', 0.3, 8, 8, stepInit);
	}
});

biodiversidadMap_2.on('load', () => {
	biodiversidadMap_2.addSource('transformacionOrinoco_2', {
		type: 'geojson',
		data: './resources/geojson/narrativa/tiempo/transformacionOrinoco.geojson'
	});

	biodiversidadMap_2.addLayer({
		id: 'step_6_solid',
		type: 'line',
		filter: ['==', 'step', 6],
		source: 'transformacionOrinoco_2',
		paint: {
			'line-color': ['get', 'color'],
			'line-width': 7,
			'line-opacity': 0.5
		}
	});

	biodiversidadMap_2.addLayer({
		id: 'step_6_anim',
		type: 'line',
		filter: ['==', 'step', 6],
		source: 'transformacionOrinoco_2',
		paint: {
			'line-color': ['get', 'color'],
			'line-width': 7,
			'line-opacity': 1
		}
	});

	enableLineAnim(biodiversidadMap_2, 'step_6_anim', 0.1, 5, 5, stepInit);
});


// Cambiar el contenido del mapa 1.
const changeMap = (index) => {
	if (biodiversidadMap_1.getSource('transformacionOrinoco_1')) {
		switch(index) {
		case 2:
			for (var i = 2; i <= 5; i++) {
				biodiversidadMap_1.setPaintProperty('step_' + i + '_solid', 'line-opacity', (i === 2) ? 0.5 : 0);
				biodiversidadMap_1.setPaintProperty('step_' + i + '_anim', 'line-opacity', (i === 2) ? 1 : 0);
			}
			changeMapView(index, 0.36);
			break;
		case 3:
			for (var i = 2; i <= 5; i++) {
				biodiversidadMap_1.setPaintProperty('step_' + i + '_solid', 'line-opacity', (i === 3) ? 0.5 : 0);
				biodiversidadMap_1.setPaintProperty('step_' + i + '_anim', 'line-opacity', (i === 3) ? 1 : 0);
			}
			changeMapView(index, 0.36);
			break;
		case 4:
			for (var i = 2; i <= 5; i++) {
				biodiversidadMap_1.setPaintProperty('step_' + i + '_solid', 'line-opacity', (i === 4) ? 0.5 : 0);
				biodiversidadMap_1.setPaintProperty('step_' + i + '_anim', 'line-opacity', (i === 4) ? 1 : 0);
			}
			changeMapView(index, 0.8);
			break;
		case 5:
			for (var i = 2; i <= 5; i++) {
				biodiversidadMap_1.setPaintProperty('step_' + i + '_solid', 'line-opacity', (i === 5) ? 0.5 : 0);
				biodiversidadMap_1.setPaintProperty('step_' + i + '_anim', 'line-opacity', (i === 5) ? 1 : 0);
			}
			changeMapView(index, 0.8);
			break;
		}
	}
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
const enableLineAnim = (mapId, layerId, animSpeed, dashLength, gapLength, step) => {
	if (mapId.getLayer(layerId)) {
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
			t = (step - dashSteps) / gapSteps;
			a = 0;
			b = (1 - t) * gapLength;
			c = dashLength;
			d = t * gapLength;          
		}

		mapId.setPaintProperty(layerId, 'line-dasharray', [d, c, b, a]);
		requestAnimationFrame(() => enableLineAnim(mapId, layerId, animSpeed, dashLength, gapLength, step));
	}
}


// Instancia de tippy.js para tooltips.
tippy.delegate('.sectionContent', {
	target: ['#spanMioceno', '#spanCamino', '#spanBlancasNegras', '#spanEcosistemas'],
	content: (reference) => reference.dataset.tooltip,
	trigger: 'mouseenter focus',
	theme: 'colombia'
});