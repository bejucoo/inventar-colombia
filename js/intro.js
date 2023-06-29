const introContent = document.getElementById("introTextoContenido");
const introImage = document.getElementById("introImagen")

// Obtener el archivo de los popups y ejecutar las funciones.
async function fetchIntro() {
	try {
		const response = await fetch("./resources/json/intro/intro.json")
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
		step: ".introTituloStep"
	})
	.onStepEnter(response => changeIntroContent(text, response));
}

const changeIntroContent = (text, step) => {
	introContent.innerHTML = text[step.element.id].content;
	introImage.innerHTML = `<img class="centered w100" src="./resources/images/intro/intro_${step.element.id}.png">`
}