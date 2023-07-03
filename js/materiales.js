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
		document.readyState === 'loading' ? console.log('Cargando') : changeContent(data, step);
		//changeMap(step.index);
	});
}


// // Crear el mapa.
// const pobladoresMap_1 = new maplibregl.Map({
// 	container: 'pobladoresMapElm_1',
// 	style: './resources/json/map_styles/narrativaMap_2.json',
// 	center: [-66.7, 6.61499],
// 	zoom: 5.9,
// 	pitch: 0,
// 	bearing: 0,
// 	interactive: true,
// 	attributionControl: false
// });


// Regiones y actividades para crear diferentes capas en el mapa.
const regiones = ['Andina', 'Amazónica', 'Guayanesa', 'Llanera', 'Costera'];
const actividades = ['pescadores', 'recolectores', 'cazadores', 'cultivadores'];


// // Agregar sources, layers y animar.
// pobladoresMap_1.on('load', () => {
// 	pobladoresMap_1.addSource('habitatsOrinoco', {
// 		type: 'geojson',
// 		data: './resources/geojson/narrativa/habitatsRibereñosOrinoco.geojson'
// 	});

// 	// Tributarios animados
// 	pobladoresMap_1.addLayer({
// 		id: 'tributariosAnimados',
// 		source: 'habitatsOrinoco',
// 		type: 'line',
// 		filter: ['==', ['geometry-type'], 'LineString'],
// 		filter: ['!=', 'nombre', 'Río Orinoco'],
// 		layout: {
// 			'visibility': 'visible'
// 		},
// 		paint: {
// 			'line-color': ['match', ['get', 'region'],
// 				'Amazónica', '#66496e',
// 				'Andina', '#b196b9',
// 				'Costera', '#b55845',
// 				'Guayanesa', '#d4978b',
// 				'Llanera', '#d98a30',
// 				'#92a9a4'
// 				],
// 			'line-opacity': 1,
// 			'line-width': 2,
// 			'line-width-transition': { 
// 				duration: 5000, 
// 				delay: 0
// 			}
// 		}
// 	});

// 	// Río Orinoco
// 	pobladoresMap_1.addLayer({
// 		id: 'orinoco',
// 		type: 'line',
// 		source: 'habitatsOrinoco',
// 		filter: ['==', ['geometry-type'], 'LineString'],
// 		filter: ['==', 'nombre', 'Río Orinoco'],
// 		layout: {
// 			'visibility': 'visible'
// 		},
// 		paint: {
// 			'line-color': '#92a9a4',
// 			'line-opacity': 1,
// 			'line-width': 5,
// 			'line-width-transition': { 
// 				duration: 2000, 
// 				delay: 0
// 			}
// 		}
// 	});

// 	// Imágenes para íconos.
// 	actividades.forEach(e => {
// 		pobladoresMap_1.loadImage('./resources/images/narrativa/pobladores/' + e + '.png', (error, img) => {
// 			if (error) throw error;
// 			pobladoresMap_1.addImage(e, img);
// 		})
// 	});

// 	// Etiquetas es íconos.
// 	pobladoresMap_1.addLayer({
// 		id: 'labels',
// 		source: 'habitatsOrinoco',
// 		type: 'symbol',
// 		filter: ['==', ['geometry-type'], 'Point'],
// 		layout: {
// 			'visibility': 'visible',
// 			'symbol-placement': 'point',
// 			'text-field': '{nombre}',
// 			'text-font': ['Cormorant Italic'],
// 			'text-size': 18,
// 			'text-anchor': 'bottom',
// 			'icon-image': ['match', ['get', 'actividad'],
// 				'Recolectores', 'recolectores',
// 				'Pescadores', 'pescadores',
// 				'Cazadores', 'cazadores',
// 				'Cultivadores', 'cultivadores',
// 				'pescadores'
// 				],
// 			'icon-size': 0.05,
// 			'icon-anchor': 'center',
// 			'icon-offset': [0, -600],
// 			'icon-allow-overlap': true,
// 			'icon-overlap': 'always'
// 		},
// 		paint: {
// 			'text-color': '#241d15',
// 			'text-halo-color': '#241d15',
// 			'text-halo-width': 0.1,
// 			'text-opacity': 1,
// 			'icon-opacity': 0,
// 		}
// 	});

// 	enableLineAnim(pobladoresMap_1, 'tributariosAnimados', 0.1, 4, 4);
// 	enableLineAnim(pobladoresMap_1, 'orinoco', 0.1, 6, 6);
// });


// Cambiar el contenido de los divs de texto.
const changeContent = (data, step) => {
	let divTxt = document.getElementById('materialesTxt_' + data[step.element.id].div);
	if (divTxt) divTxt.innerHTML = data[step.element.id].text;
}


// Cambiar el contenido del mapa
const changeMap = (index) => {
	if (pobladoresMap_1.getSource('habitatsOrinoco')) {
		switch(index) {
		case 0:
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