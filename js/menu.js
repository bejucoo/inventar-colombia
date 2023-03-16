// Elementos del menú (contenido y toggle).
const menuDiv = document.getElementById("menuDiv");
const menuToggleDiv = document.getElementById("menuToggle")
let menuOpen = false;

// Al hacer click, abrir o cerrar el menú.
menuDiv.addEventListener("click", () => {
	if (!menuOpen) {
		menuOpen = true;
		menuDiv.classList.add("active");
	} else {
		menuOpen = false;
		menuDiv.classList.remove("active");
	}
});