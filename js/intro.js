const introContent = document.getElementById("introTextoContenido");
const introImage = document.getElementById("introImagen")

fetch("./resources/json/intro/intro.json")
.then(function(response) {
	return response.json();
})
.then(function(data) {
	scrollIntro(data);
})
.catch(function(error) {
	console.log(error);
});

function scrollIntro(text) {
	const scroller = scrollama();

	scroller
	.setup({
		step: ".introTituloStep"
	})
	.onStepEnter(function(response) {
		changeIntroContent(text, response);
		console.log(response);
	});
}

function changeIntroContent(text, step) {
	introContent.innerHTML = text[step.element.id].content;
	introImage.innerHTML = `<img style="width: 100%; height: 600px; object-fit: cover;" src="./resources/images/intro/intro_${step.element.id}.png">`
}