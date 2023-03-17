const introContent = document.getElementById("introTextoContenido");
const introImage = document.getElementById("introImagen")

fetch("./resources/json/intro/intro.json")
.then(response => response.json())
.then(data => scrollIntro(data))
.catch(error => console.error(error));

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
	introImage.innerHTML = `<img style="width: 100%; height: 600px; object-fit: cover;" src="./resources/images/intro/intro_${step.element.id}.png">`
}