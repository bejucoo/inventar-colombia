const biodiversidadText_1 = document.getElementById("biodiversidadTexto_1");
const biodiversidadAnim_1 = document.getElementById("biodiversidadAnim_1");

// Obtener el archivo de los popups.
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

// Crear la isntancia de scrollama y llamar una función cuando se cambie de step.
const scrollBiodiversidad = (data) => {
	const scroller = scrollama();
	scroller
	.setup({
		step: ".biodiversidadStep"
	})
	.onStepEnter((response) => {
		changeContent(data, response);
	});
}

const changeContent = (data, step) => {
	biodiversidadText_1.innerHTML = data[step.element.id].text;
	biodiversidadAnim_1.innerHTML = data[step.element.id].img;
}