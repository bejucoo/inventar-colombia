const menuDiv = document.getElementById("menuDiv");
let menuOpen = false;

// Al hacer click, abrir o cerrar el menú y difuminar el contenido de la página.
menuDiv.addEventListener("click", () => {
	let contentDiv = document.body.children[1];
	if (!menuOpen) {
		menuOpen = true;
		menuDiv.classList.add("active");
		contentDiv.classList.remove("non_blurred");
		contentDiv.classList.add("blurred");
	} else {
		menuOpen = false;
		menuDiv.classList.remove("active");
		contentDiv.classList.add("non_blurred");
		contentDiv.classList.remove("blurred");
	}
});