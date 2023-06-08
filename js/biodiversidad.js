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
			'line-color': '#92a9a4',
			'line-width': 10,
			'line-opacity': 0.5
		}
	});

	mapId.addLayer({
		id: 'lineAnim_' + num,
		type: 'line',
		source: 'orinoco_' + num,
		paint: {
			'line-color': '#92a9a4',
			'line-width': 10,
			'line-opacity': 1
		}
	});

	enableLineAnim(mapId, 'lineAnim_' + num, animSpeed, dash, gap);
}

biodiversidadMap_1.on('load', () => {
	addSource_Layers_Anim(1, biodiversidadMap_1, 'step_2', 0.1, 5, 5);
});

biodiversidadMap_2.on('load', () => {
	addSource_Layers_Anim(2, biodiversidadMap_2, 'step_6', 0.25, 2, 2);
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


// Instancia de tippy.js para tooltips.
tippy.delegate('#biodiversidadTexto_2', {
	target: ['#spanMioceno', '#spanCamino'],
	content: (reference) => reference.dataset.tooltip,
	trigger: 'mouseenter focus',
	theme: 'colombia'
});