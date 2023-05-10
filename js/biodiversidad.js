const biodiversidad_1 = document.getElementById("biodiversidadTexto_1");

// Obtener el archivo de los popups.
async function fetchIntro() {
	try {
		const response = await fetch("./resources/json/narrativa/biodiversidad.json")
		const data = await response.json();
		return data;
	} catch(error) {
		console.error(error); 
	}
}

// Ejecutar las funciones cuando se reciba la respuesta.
fetchIntro().then(data => scrollIntro(data));


const scrollIntro = (text) => {
	const scroller = scrollama();
	scroller
	.setup({
		step: ".biodiversidaStep"
	})
	.onStepEnter((response) => {
		changeIntroContent(text, response);
	});
}

const changeIntroContent = (text, step) => {
	biodiversidad_1.innerHTML = text[step.element.id].content;
}