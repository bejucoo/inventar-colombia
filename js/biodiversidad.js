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


// Agregar capa al mapa.
biodiversidadMap_1.on('load', () => {
	orinoco_1.features[0].geometry.coordinates.splice(0, orinoco_1.features[0].geometry.coordinates.length, ...orinocoPasado)

	biodiversidadMap_1.addSource('line', {
		type: 'geojson',
		data: orinoco_1
	});

	biodiversidadMap_1.addLayer({
		type: 'line',
		source: 'line',
		id: 'lineBack',
		paint: {
			'line-color': '#92a9a4',
			'line-width': 8,
			'line-opacity': 1
		}
	});

	biodiversidadMap_1.addLayer({
		type: 'line',
		source: 'line',
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
	if (biodiversidadMap_1.getSource('line') != null) {
		if (index === 2) {
			biodiversidadMap_1.setLayoutProperty('waterway_river', 'visibility', 'none');
			orinoco_1.features[0].geometry.coordinates.splice(0, orinoco_1.features[0].geometry.coordinates.length, ...orinocoPasado);
			biodiversidadMap_1.getSource('line').setData(orinoco_1);
			biodiversidadMap_1.flyTo({
				center: [-69.35067, 2.85314],
				zoom: 5,
				speed: 0.36
			});
		} else if(index === 3){
			biodiversidadMap_1.setLayoutProperty('waterway_river', 'visibility', 'visible');
			orinoco_1.features[0].geometry.coordinates.splice(0, orinoco_1.features[0].geometry.coordinates.length, ...orinocoActual);
			biodiversidadMap_1.getSource('line').setData(orinoco_1);
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
	target: '#spanMioceno',
	content: 'Las ciencias de la tierra que estudian el pasado histórico físico son la geomorfología, paleontología, biogeografía...',
	trigger: 'mouseenter focus',
	theme: 'colombia'
});


// geoJSON 1
var orinoco_1 = {
	"type": "FeatureCollection",
	"features": [
	{
		"type": "Feature",
		"properties": {
		},
		"geometry": {
			"coordinates": [],
			"type": "LineString"
		}
	}
	]
}


// Coordenadas
const orinocoPasado = [
	[
		-75.19968283319523,
		-3.886219261126925
		],
	[
		-74.9484014109866,
		-3.688493283819284
		],
	[
		-74.40506857696597,
		-3.101279635302319
		],
	[
		-73.62248754911755,
		-2.131761486347031
		],
	[
		-73.09209458619458,
		-0.980147125755181
		],
	[
		-72.73164558452945,
		0.16569020097598752
		],
	[
		-72.26453925923332,
		1.6900842981533515
		],
	[
		-71.80620785423568,
		2.9092269985251136
		],
	[
		-71.24469686214324,
		4.4752486941487035
		],
	[
		-70.73020245788072,
		5.973755168280505
		],
	[
		-70.17854311943657,
		7.3286330025006805
		],
	[
		-69.86140499684961,
		8.543071875632819
		],
	[
		-69.5877619092154,
		9.812780823529224
		],
	[
		-69.45483861656513,
		10.53539768112499
		],
	[
		-69.47141142224703,
		10.98202276381133
		],
	[
		-69.55418565474847,
		11.55
		]
	];

const orinocoActual = [
	[
		-72.67119333154248,
		4.320556061579026
		],
	[
		-72.50574486896961,
		4.32387792132441
		],
	[
		-71.9652302134551,
		4.515862235761631
		],
	[
		-71.42989905029086,
		4.796085618554727
		],
	[
		-71.00281725085085,
		5.061242488062305
		],
	[
		-70.64731365536834,
		5.35781506633225
		],
	[
		-70.33916405044602,
		5.619004438614567
		],
	[
		-69.827535004319,
		5.936556091110035
		],
	[
		-69.15883244810948,
		6.040453647230635
		],
	[
		-68.38022964731401,
		6.0875642653340805
		],
	[
		-67.44691556542925,
		6.39051858948514
		],
	[
		-67.42444384792111,
		6.4128744311547905
		],
	[
		-67.32342363732917,
		6.792900868411991
		],
	[
		-67.22219869250611,
		7.0501542634184915
		],
	[
		-67.04189925142879,
		7.352418800388122
		],
	[
		-66.86128354160428,
		7.565352887398987
		],
	[
		-66.51078602878198,
		7.80099180225929
		],
	[
		-65.79718801326513,
		7.947144280617692
		],
	[
		-64.85515215867642,
		7.800912340825235
		],
	[
		-64.79826482588572,
		7.7896471157027065
		],
	[
		-64.04053945113739,
		7.9815166368729535
		],
	[
		-63.57617646380592,
		8.185615223116372
		],
	[
		-63.33033860685491,
		8.322153541840919
		],
	[
		-63.01327287427955,
		8.45932916649258
		],
	[
		-62.730741639724414,
		8.539936941840523
		],
	[
		-62.38893412210919,
		8.575379597375232
		],
	[
		-61.99853201864218,
		8.576885468213533
		],
	[
		-61.581109835756365,
		8.590104262207063
		],
	[
		-61.2551806900336,
		8.64909840979513
		],
	[
		-61.03510716981714,
		8.730906776215619
		],
	[
		-60.788548009129045,
		8.9
		]

	];