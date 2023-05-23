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


// Función para cambiar el mapa.
let map = new maplibregl.Map({
	container: "mapElm",
	style: "./resources/json/map_styles/narrativaMap_1.json",
	center: [-69.35067, 2.85314],
	zoom: 5,
	pitch: 0,
	bearing: 0,
	interactive: false,
	attributionControl: false
});	

map.on('load', () => {
	map.addSource('line', {
		type: 'geojson',
		data: orinocoAntes
	});

	map.addLayer({
		type: 'line',
		source: 'line',
		id: 'line-background',
		paint: {
			'line-color': '#92a9a4',
			'line-width': 10,
			'line-opacity': 1
		}
	});

	enableLineAnimation('line-background');
});

var animationStep = 60;
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
      map.setPaintProperty(layerId, 'line-dasharray', dashArraySeq[step]);
    }, animationStep);
}

const orinocoAntes = {
	"type": "FeatureCollection",
	"features": [
	{
		"id": "30be350e5d2871b42caa08572908051f",
		"type": "Feature",
		"properties": {
		},
		"geometry": {
			"coordinates": [
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
					12.049758374865505
					]
				],
			"type": "LineString"
		}
	}
	]
}