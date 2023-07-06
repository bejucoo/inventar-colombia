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
materialesMap_1.on('load', async() => {
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
		filter: ['!', ['has', 'intercambio']],
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

	// Lineas flechas
	materialesMap_1.addLayer({
		id: 'lineasFlujo',
		source: 'habitatsOrinoco',
		type: 'line',
		filter: ['==', ['geometry-type'], 'LineString'],
		filter: ['has', 'intercambio'],
		layout: {
			'visibility': 'visible',
		},
		paint: {
			'line-color': "#d98a30",
			'line-opacity': 0,
			'line-width': 4,
			'line-width-transition': { 
				duration: 5000, 
				delay: 0
			}
		}
	});

	// Flechas
	materialesMap_1.addImage('arrow-head', await arrowHeadImage("#484848"));

	materialesMap_1.addLayer({
		id: "flechas",
		type: "symbol",
		filter: ['==', ['geometry-type'], 'LineString'],
		filter: ['has', 'intercambio'],
		source: "habitatsOrinoco",
		layout: {
			"visibility": "visible",
			"symbol-placement": "line",
			"icon-image": "arrow-head",
			"icon-rotate": 180,
			"icon-overlap": "always"
		},
		paint: {
			"icon-opacity": 0
		}
	});

	// Labels nombres.
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

function arrowHeadImage(color) {
	const param = {"color": color, "size": 34, "rotation": 90};
	const data = `<svg width='${param.size}' height='${param.size}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' version='1.1'><polygon fill='${param.color}' stroke='gray' stroke-width='1' points='20,90 50,10 80,90 50,70' transform='rotate(${param.rotation} 50 50)'/></svg>`;
	return new Promise((resolve) => {
		const img = new Image(param.size, param.size);
		img.src = "data:image/svg+xml;base64," + btoa(data);
		img.onload = () => resolve(createImageBitmap(img));
	});
}


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
			changeMapView(0, 0.3)
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-width', ['match', ['get', 'nombre'], ['Río Cinaruco', 'Río Negro', 'Río Cataniapo', 'Río Sipapo', 'Río Mariusa'], 4, 1]);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-color', ['match', ['get', 'nombre'], ['Río Cinaruco', 'Río Negro', 'Río Cataniapo', 'Río Sipapo', 'Río Mariusa'], "#eac862", "#92a9a4"]);
			materialesMap_1.setPaintProperty('labels', 'text-opacity', ['match', ['get', 'nombre'], ['Río Cinaruco', 'Río Negro', 'Río Cataniapo', 'Río Sipapo', 'Río Mariusa'], 1, 0]);
			materialesMap_1.setPaintProperty('lineasFlujo', 'line-opacity', ['match', ['get', 'intercambio'], 'ceramica', 1, 0]);
			materialesMap_1.setPaintProperty('flechas', 'icon-opacity', ['match', ['get', 'intercambio'], 'ceramica', 1, 0]);
			break;
		case 1:
			changeMapView(1, 0.8);
			break;
		case 2:
			changeMapView(2, 0.8);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-width', ['match', ['get', 'nombre'], ['Río Cinaruco', 'Río Negro', 'Río Cataniapo', 'Río Sipapo', 'Río Mariusa'], 4, 1]);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-color', ['match', ['get', 'nombre'], ['Río Cinaruco', 'Río Negro', 'Río Cataniapo', 'Río Sipapo', 'Río Mariusa'], "#eac862", "#92a9a4"]);
			materialesMap_1.setPaintProperty('labels', 'text-opacity', ['match', ['get', 'nombre'], ['Río Cinaruco', 'Río Negro', 'Río Cataniapo', 'Río Sipapo', 'Río Mariusa'], 1, 0]);
			materialesMap_1.setPaintProperty('lineasFlujo', 'line-opacity', ['match', ['get', 'intercambio'], 'ceramica', 1, 0]);
			materialesMap_1.setPaintProperty('flechas', 'icon-opacity', ['match', ['get', 'intercambio'], 'ceramica', 1, 0]);
			break;
		case 3:
			changeMapView(0, 0.8);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-width', ['match', ['get', 'nombre'], ['Río Portuguesa', 'Río Guanipa', 'Río Casanare', 'Río Ariari', 'Río Duda'], 4, 1]);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-color', ['match', ['get', 'nombre'], ['Río Portuguesa', 'Río Guanipa', 'Río Casanare', 'Río Ariari', 'Río Duda'], "#eac862", "#92a9a4"]);
			materialesMap_1.setPaintProperty('labels', 'text-opacity', ['match', ['get', 'nombre'], ['Río Portuguesa', 'Río Guanipa', 'Río Casanare', 'Río Ariari', 'Río Duda', 'Laguna de Tota'], 1, 0]);
			materialesMap_1.setPaintProperty('lineasFlujo', 'line-opacity', ['match', ['get', 'intercambio'], 'algodon', 1, 0]);
			materialesMap_1.setPaintProperty('flechas', 'icon-opacity', ['match', ['get', 'intercambio'], 'algodon', 1, 0]);
			break;
		case 4:
			changeMapView(3, 0.8);
			break;
		case 5:
			changeMapView(4, 0.8);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-width', ['match', ['get', 'nombre'], ['Río Portuguesa', 'Río Guanipa', 'Río Casanare', 'Río Ariari', 'Río Duda'], 4, 1]);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-color', ['match', ['get', 'nombre'], ['Río Portuguesa', 'Río Guanipa', 'Río Casanare', 'Río Ariari', 'Río Duda'], "#eac862", "#92a9a4"]);
			materialesMap_1.setPaintProperty('labels', 'text-opacity', ['match', ['get', 'nombre'], ['Río Portuguesa', 'Río Guanipa', 'Río Casanare', 'Río Ariari', 'Río Duda', 'Laguna de Tota'], 1, 0]);
			materialesMap_1.setPaintProperty('lineasFlujo', 'line-opacity', ['match', ['get', 'intercambio'], 'algodon', 1, 0]);
			materialesMap_1.setPaintProperty('flechas', 'icon-opacity', ['match', ['get', 'intercambio'], 'algodon', 1, 0]);
			break;
		case 6:
			changeMapView(0, 0.8);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-width', ['match', ['get', 'nombre'], ['Río Limo', 'Río Apure', 'Río Arauca', 'Río Capanaparo', 'Río Casanare', 'Río Meta', 'Río Upía', 'Río Guaviare'], 4, 1]);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-color', ['match', ['get', 'nombre'], ['Río Limo', 'Río Apure', 'Río Arauca', 'Río Capanaparo', 'Río Casanare', 'Río Meta', 'Río Upía', 'Río Guaviare'], "#eac862", "#92a9a4"]);
			materialesMap_1.setPaintProperty('labels', 'text-opacity', ['match', ['get', 'nombre'], ['Río Limo', 'Río Apure', 'Río Arauca', 'Río Capanaparo', 'Río Casanare', 'Río Meta', 'Río Upía', 'Río Guaviare'], 1, 0]);
			materialesMap_1.setPaintProperty('lineasFlujo', 'line-opacity', ['match', ['get', 'intercambio'], 'quiripa', 1, 0]);
			materialesMap_1.setPaintProperty('flechas', 'icon-opacity', ['match', ['get', 'intercambio'], 'quiripa', 1, 0]);
			break;
		case 7:
			changeMapView(0, 0.8);
			break;
		case 8:
			changeMapView(5, 0.8);
			break;
		case 9:
			changeMapView(6, 0.8);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-width', ['match', ['get', 'nombre'], ['Río Limo', 'Río Apure', 'Río Arauca', 'Río Capanaparo', 'Río Casanare', 'Río Meta', 'Río Upía', 'Río Guaviare'], 4, 1]);
			materialesMap_1.setPaintProperty('tributariosAnimados', 'line-color', ['match', ['get', 'nombre'], ['Río Limo', 'Río Apure', 'Río Arauca', 'Río Capanaparo', 'Río Casanare', 'Río Meta', 'Río Upía', 'Río Guaviare'], "#eac862", "#92a9a4"]);
			materialesMap_1.setPaintProperty('labels', 'text-opacity', ['match', ['get', 'nombre'], ['Río Limo', 'Río Apure', 'Río Arauca', 'Río Capanaparo', 'Río Casanare', 'Río Meta', 'Río Upía', 'Río Guaviare'], 1, 0]);
			materialesMap_1.setPaintProperty('lineasFlujo', 'line-opacity', ['match', ['get', 'intercambio'], 'quiripa', 1, 0]);
			materialesMap_1.setPaintProperty('flechas', 'icon-opacity', ['match', ['get', 'intercambio'], 'quiripa', 1, 0]);
			break;
		case 10:
			changeMapView(0, 0.8);
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
	materialesMap_1.flyTo({
		center: mapViews[index][0],
		zoom: mapViews[index][1],
		speed: vel
	});
}


// Centros y zooms para el mapa.
const mapViews = [
	[
		[-66.7, 5.61499], 5.8
		],
	[
		[-68.34478, 6.45987], 8
		],
	[
		[-67.23140, 5.57416], 9 
		],
	[
		[-72.92327, 5.54615], 6.5
		],
	[
		[-63.76068, 9.05238], 8
		],
	[
		[-69.87530, 5.26663], 7
		],
	[
		[-69.00180, 7.68865], 7
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


// Iniciar tippy.js para tooltips.
tippy.delegate('.sectionContent', {
	target: ['#spanExcavaciones'],
	content: (reference) => reference.dataset.tooltip,
	trigger: 'mouseenter click',
	theme: 'colombia',
	allowHTML: true
});