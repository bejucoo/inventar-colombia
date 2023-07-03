// Obtener el archivo JSON de pasos.
async function fetchSteps() {
	try {
		const response = await fetch('./resources/json/narrativa/tiempoSteps.json')
		const data = await response.json();
		return data;
	} catch(error) {
		console.error(error);
	}
}


// Ejecutar las funciones cuando se reciba la respuesta.
fetchSteps().then(data => scrollSteps(data));


// Iniciar Scrollama y ejecutar funciones cuando se cargue el DOM y se entre en cada paso.
const scrollSteps = (data) => {
	const scroller = scrollama();
	scroller
	.setup({
		step: '.narrativaStep'
	})
	.onStepEnter((step) => {
		document.readyState === 'loading' ? console.log('Cargando') : changeContent(data, step);		
		changeMap(step.index);
	});
}


// Crear los mapas.
const tiempoMap_1 = new maplibregl.Map({
	container: 'tiempoMapElm_1',
	style: './resources/json/map_styles/narrativaMap_1.json',
	center: [-69.35067, 2.85314],
	zoom: 5,
	pitch: 0,
	bearing: 0,
	interactive: false,
	attributionControl: false
});

const tiempoMap_2 = new maplibregl.Map({
	container: 'tiempoMapElm_2',
	style: './resources/json/map_styles/narrativaMap_1.json',
	center: [-64.13079, 5.70012],
	zoom: 9.24,
	pitch: 0,
	bearing: 0,
	interactive: false,
	attributionControl: false
});


// Agregar sources, layers y animar.
tiempoMap_1.on('load', () => {
	tiempoMap_1.addSource('transformacionOrinoco_1', {
		type: 'geojson',
		data: './resources/geojson/narrativa/transformacionOrinoco.geojson'
	});

	tiempoMap_1.addLayer({
		id: 'stepSolid',
		type: 'line',
		source: 'transformacionOrinoco_1',
		paint: {
			'line-color': ['get', 'color'],
			'line-width': 7,
			'line-opacity': ['match', ['get', 'step'], 2, 0.5, 0]
			}
	});

	tiempoMap_1.addLayer({
		id: 'stepAnim',
		type: 'line',
		source: 'transformacionOrinoco_1',
		paint: {
			'line-color': ['get', 'color'],
			'line-width': 7,
			'line-opacity': ['match', ['get', 'step'], 2, 1, 0]
		}
	});
		
	enableLineAnim(tiempoMap_1, 'stepAnim', 0.3, 8, 8, stepInit);
});


tiempoMap_2.on('load', () => {
	tiempoMap_2.addSource('transformacionOrinoco_2', {
		type: 'geojson',
		data: './resources/geojson/narrativa/transformacionOrinoco.geojson'
	});

	tiempoMap_2.addLayer({
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

	tiempoMap_2.addLayer({
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

	enableLineAnim(tiempoMap_2, 'step_6_anim', 0.1, 5, 5, stepInit);
});


// Cambiar el contenido de los divs de texto e imagen.
const changeContent = (data, step) => {
	let divTxt = document.getElementById('tiempoTxt_' + data[step.element.id].div);
	let divImg = document.getElementById('tiempoImg_' + data[step.element.id].div);

	if (divTxt) divTxt.innerHTML = data[step.element.id].text;
	if (divImg) divImg.innerHTML = data[step.element.id].img;
}


// Cambiar el contenido del mapa 1.
const changeMap = (index) => {
	if (tiempoMap_1.getSource('transformacionOrinoco_1')) {
		switch(index) {
		case 2:
			tiempoMap_1.setPaintProperty('stepSolid', 'line-opacity', ['match', ['get', 'step'], 2, 0.5, 0]);
			tiempoMap_1.setPaintProperty('stepAnim', 'line-opacity', ['match', ['get', 'step'], 2, 1, 0]);
			changeMapView(0, 0.36);
			break;
		case 3:
			tiempoMap_1.setPaintProperty('stepSolid', 'line-opacity', ['match', ['get', 'step'], 3, 0.5, 0]);
			tiempoMap_1.setPaintProperty('stepAnim', 'line-opacity', ['match', ['get', 'step'], 3, 1, 0]);
			changeMapView(1, 0.36);
			break;
		case 4:
			tiempoMap_1.setPaintProperty('stepSolid', 'line-opacity', ['match', ['get', 'step'], 4, 0.5, 0]);
			tiempoMap_1.setPaintProperty('stepAnim', 'line-opacity', ['match', ['get', 'step'], 4, 1, 0]);
			changeMapView(2, 0.8);
			break;
		case 5:
			tiempoMap_1.setPaintProperty('stepSolid', 'line-opacity', ['match', ['get', 'step'], 5, 0.5, 0]);
			tiempoMap_1.setPaintProperty('stepAnim', 'line-opacity', ['match', ['get', 'step'], 5, 1, 0]);
			changeMapView(3, 0.8);
			break;
		}
	}
}


// Cambiar el centro y el zoom del mapa 1.
const changeMapView = (index, vel) => {
	tiempoMap_1.flyTo({
		center: mapViews[index][0],
		zoom: mapViews[index][1],
		speed: vel
	});
}


// Centros y zooms para el mapa 1.
const mapViews = [
	[
		[-69.35067, 2.85314], 5
	],
	[
		[-66.2, 5.96424], 5.5
	],
	[
		[-66.2, 5.96424], 5.5
	],
	[
		[-73.26332, 4.50225], 10.5
	]
];


// Variable para las animaciones.
var stepInit = 0;


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


// Iniciar tippy.js para tooltips.
tippy.delegate('.sectionContent', {
	target: ['#spanMioceno', '#spanCamino', '#spanBlancasNegras', '#spanEcosistemas'],
	content: (reference) => reference.dataset.tooltip,
	trigger: 'mouseenter focus',
	theme: 'colombia'
});