// Obtener el archivo JSON de pasos.
async function fetchSteps() {
	try {
		const response = await fetch('./resources/json/narrativa/materialesSteps.json')
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
		console.log(step);
		document.readyState === 'loading' ? console.log('Cargando') : changeContent(data, step);
		changeMap(step.index);
	});
}


// Crear el mapa.
const materialesMap_1 = new maplibregl.Map({
	container: 'materialesMapElm_1',
	style: './resources/json/map_styles/narrativaMap_2.json',
	center: [-66.7, 5.61499],
	zoom: 5.8,
	pitch: 0,
	bearing: 0,
	interactive: true,
	attributionControl: false
});


// Regiones y actividades para crear diferentes capas en el mapa.
const regiones = ['Andina', 'Amazónica', 'Guayanesa', 'Llanera', 'Costera'];
const actividades = ['pescadores', 'recolectores', 'cazadores', 'cultivadores'];


// Agregar sources, layers y animar.
materialesMap_1.on('load', () => {
	materialesMap_1.addSource('habitatsOrinoco', {
		type: 'geojson',
		data: './resources/geojson/narrativa/habitatsRibereñosOrinoco_Intercambio.geojson'
	});

	// Tributarios animados
	materialesMap_1.addLayer({
		id: 'tributariosAnimados',
		source: 'habitatsOrinoco',
		type: 'line',
		filter: ['==', ['geometry-type'], 'LineString'],
		filter: ['!=', 'nombre', 'Río Orinoco'],
		filter: ['!=', ['get', 'intercambio'], 'ceramica'],
		layout: {
			'visibility': 'visible'
		},
		paint: {
			'line-color': "#92a9a4",
			'line-opacity': 1,
			'line-width': 2,
			'line-width-transition': { 
				duration: 5000, 
				delay: 0
			}
		}
	});

	// Río Orinoco
	materialesMap_1.addLayer({
		id: 'orinoco',
		type: 'line',
		source: 'habitatsOrinoco',
		filter: ['==', ['geometry-type'], 'LineString'],
		filter: ['==', 'nombre', 'Río Orinoco'],
		layout: {
			'visibility': 'visible'
		},
		paint: {
			'line-color': '#92a9a4',
			'line-opacity': 1,
			'line-width': 3,
			'line-width-transition': { 
				duration: 2000, 
				delay: 0
			}
		}
	});

	// Flechas
	materialesMap_1.addLayer({
		id: 'flechas',
		source: 'habitatsOrinoco',
		type: 'line',
		filter: ['==', ['geometry-type'], 'LineString'],
		filter: ['==', ['get', 'intercambio'], 'ceramica'],
		layout: {
			'visibility': 'visible'
		},
		paint: {
			'line-color': "#d98a30",
			'line-opacity': 0,
			'line-width': 5,
			'line-width-transition': { 
				duration: 5000, 
				delay: 0
			}
		}
	});

	// Etiquetas.
	materialesMap_1.addLayer({
		id: 'labels',
		source: 'habitatsOrinoco',
		type: 'symbol',
		filter: ['==', ['geometry-type'], 'Point'],
		layout: {
			'visibility': 'visible',
			'symbol-placement': 'point',
			'text-field': '{nombre} | {grupo}',
			'text-font': ['Cormorant Italic'],
			'text-size': 20,
			'text-anchor': 'bottom',
			'text-overlap': 'always'
		},
		paint: {
			'text-color': '#241d15',
			'text-halo-color': '#241d15',
			'text-halo-width': 0.1,
			'text-opacity': 0
		}
	});

	enableLineAnim(materialesMap_1, 'tributariosAnimados', 0.1, 4, 4);
	enableLineAnim(materialesMap_1, 'orinoco', 0.1, 6, 6);
});


// Cambiar el contenido de los divs de texto.
const changeContent = (data, step) => {
	let divTxt = document.getElementById('materialesTxt_' + data[step.element.id].div);
	if (divTxt) divTxt.innerHTML = data[step.element.id].text;
}


// Cambiar el contenido del mapa
const changeMap = (index) => {
	if (materialesMap_1.getSource('habitatsOrinoco')) {
		switch(index) {
		case 0:
			console.log('000')
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-width', ['match', ['get', 'nombre'], ['Río Cinaruco', 'Río Negro', 'Río Cataniapo', 'Río Sipapo', 'Río Mariusa'], 4, 1]);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-color', ['match', ['get', 'nombre'], ['Río Cinaruco', 'Río Negro', 'Río Cataniapo', 'Río Sipapo', 'Río Mariusa'], "#eac862", "#92a9a4"]);
			materialesMap_1.setPaintProperty('flechas', 'line-opacity', 1);
			materialesMap_1.setPaintProperty('labels', 'text-opacity', ['match', ['get', 'nombre'], ['Río Cinaruco', 'Río Negro', 'Río Cataniapo', 'Río Sipapo', 'Río Mariusa'], 1, 0]);
			break;
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			break;
		case 5:
			break;
		case 6:
			break;
		case 7:
			break;
		case 8:
			break;
		case 9:
			break;
		case 10:
			break;
		case 11:
			break;
		case 12:
			break;
		}
	}
}


// Cambiar el centro y el zoom del mapa.
const changeMapView = (index, vel) => {
	pobladoresMap_1.flyTo({
		center: mapViews[index][0],
		zoom: mapViews[index][1],
		speed: vel
	});
}


// Centros y zooms para el mapa.
const mapViews = [
	[
		[-66.7, 6.61499], 5.9
	],
	[
		[-71.12313, 4.87724], 6.5
	],
	[
		[-69.52653, 3.58252], 6.5
	],
	[
		[-63.86517, 6.03455], 6.5
	],
	[
		[-66.19598, 8.44916], 6.2
	],
	[
		[-68.75561, 6.83224], 6.8
	],
	[
		[-68.14159, 7.16971], 7.5
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