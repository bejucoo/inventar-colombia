const menuDiv = document.getElementById('sectionMenu');
var menuToggle = false;

menuDiv.addEventListener('click', function(){
	if (!menuToggle) {
		menuToggle = true;
		menuDiv.classList.add('active');
		console.log(menuToggle);
	} else {
		menuToggle = false
		menuDiv.classList.remove('active')
		console.log(menuToggle);	
	}
});