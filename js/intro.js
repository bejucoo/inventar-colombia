const palabraTituloIntro = document.getElementById('intro_palabra');
const imagenIntro = document.getElementById('introImagen')

const scroller = scrollama();
scroller
.setup({
	step: ".introTituloStep",
})
.onStepEnter((response) => {
	palabraTituloIntro.innerHTML = response.element.id;
	imagenIntro.innerHTML = `<img style="width: 100%; height: 600px; object-fit: cover;" src="./resources/images/intro/intro_${response.index}.png">`
})
.onStepExit((response) => {
});