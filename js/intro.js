// Obtener el archivo de los popups y ejecutar las funciones.
async function fetchSteps() {
	try {
		const response = await fetch("./resources/json/intro/intro.json")
		const data = await response.json();
		return data;
	} catch(error) {
		console.error(error); 
	}
}

// Ejecutar las funciones cuando se reciba la respuesta.
fetchSteps().then(data => scrollSteps(data));


const scrollSteps = (data) => {
	const scroller = scrollama();

	scroller
	.setup({
		step: ".introStep"
	})
	.onStepEnter(response => changeIntroContent(data, response));
}

const changeIntroContent = (data, step) => {
	const introContent = document.getElementById("introTexto");
	const introImage = document.getElementById("introImagen");

	introContent.innerHTML = data[step.element.id].text;
	introImage.innerHTML = data[step.element.id].image;
}