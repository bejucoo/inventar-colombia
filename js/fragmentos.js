// Obtener el archivo de los fragmentos y ejecutar las funciones.
fetch("./resources/json/fragmentos/fragmentos.json")
.then(function(response) {
  return response.json();
})
.then(function(fragmentos) {
  openInstructions();
  addFullText();
  addCategoryCheck(flatCategories(fragmentos));
  filterJSON(fragmentos);
})
.catch(function(error) {
  console.log(error);
});


// Abrir y cerrar instrucciones.
function openInstructions() {
  const openButton = document.getElementById("openDialog");
  const closeButton = document.getElementById("closeDialog");
  const dialog = document.getElementById("instructionsDialog");

  openButton.addEventListener("click", function(){
    dialog.showModal();
  });

  closeButton.addEventListener("click", function() {
    dialog.close();
  });
}


// Obtener todas las categorías y filtrar las repetidas.
function flatCategories(fragmentos) {
  var categoriesArrays = [];
  var allCategories;
  var filteredCategories;

  fragmentos.forEach(function(e, i) {
    categoriesArrays.push(e.categories);
  });

  allCategories = categoriesArrays.flat();
  filteredCategories = [...new Set(allCategories)];
  return filteredCategories;
}


// Agregar el checklist de categorías.
function addCategoryCheck(categories) {
  const checkboxField = document.getElementById("fieldCategorias");

  categories.forEach(function(e) {
    var categoryCheckbox = document.createElement("div");
    categoryCheckbox.innerHTML = `<input type="checkbox" name="${e}" value="${e}" class="categoryCheckbox"><label for="${e}" class="cita_${e.toLowerCase()}"><b>${e}</b></label>`;
    checkboxField.appendChild(categoryCheckbox);
  });

  var checkboxes = checkboxField.querySelectorAll("input[type=checkbox]");

  checkboxes.forEach(function(e) {
    e.checked = true;
  });
}


// Agregar los fragmentos y los filtros.
function filterJSON(fragmentos) {
  var filter = FilterJS(fragmentos, "#fragmentos", {
    template: "#templateFragmentos",
    filter_on_init: true,
    criterias: [{
      field: "categories",
      ele: "#seleccionCategorias input:checkbox"
    },
    {
      field: "ref",
      ele: "#cuerpoDeTexto"
    }]
  });
}


// Agregar el cuerpo de texto. Resaltar fragmentos y agregar minimap cuando se cargue.
function addFullText() {
  var textField = document.getElementById("cuerpoDeTexto");
  const textElm = document.getElementById("fragmentosCol2");

  textElm.innerHTML = `<md-block id="textoCompleto" src="./resources/md/fragmentos/${textField.value}.md"></md-block>`;

  textField.addEventListener("change", function() {
    textElm.innerHTML = `<md-block id="textoCompleto" src="./resources/md/fragmentos/${textField.value}.md"></md-block>`;
  });

  setTimeout(function() {
    const mdElm = document.getElementById("textoCompleto");
    if (mdElm.rendered === "remote") {
      toggleTextHighlight();
      miniMapText();
    } else {
      console.error("Error al renderizar texto.");
    }
  }, 3600);
}


// Agregar el miniMap.
function miniMapText() {
  pagemap(document.getElementById("miniMap"), {
    viewport: document.getElementById("fragmentosCol2"),
    styles: {
      "h1, h2, h3, h4": "rgba(0,0,0,0.2)",
      "p": "rgba(0, 0, 0, 0.05)",
      ".cita_animales, .cita_riqueza, .cita_poblamiento, .cita_evangelizacion": "rgba(0, 0, 0, 0.05)",
      ".cita_animales.active": "#92a9a4aa",
      ".cita_riqueza.active": "#d4978baa",
      ".cita_poblamiento.active": "#98a280aa",
      ".cita_evangelizacion.active": "#f2dea0aa"
    },
    back: "rgba(0,0,0,0.02)",
    view: "rgba(0,0,0,0.05)",
    drag: "rgba(0,0,0,0.10)",
    interval: null
  });
}


//  Agregar o quitar el color de resaltado dependiendo del checklist de categorías.
function toggleTextHighlight() {
  const textField = document.getElementById("cuerpoDeTexto");
  const checkboxField = document.getElementById("fieldCategorias");

  function highlight() {
    const checkboxes = checkboxField.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach(function(e) {
      if (e.checked === true) {
        const categoryElements = document.getElementsByClassName(`cita_${e.value.toLowerCase()}`);

        for(let item of categoryElements) {
          item.classList.add("active");
        }
      } else {
        const categoryElements = document.getElementsByClassName(`cita_${e.value.toLowerCase()}`);

        for(let item of categoryElements) {
          item.classList.remove("active");
        }
      }
    });
  };

  function highlightOnChange() {
    const checkboxes = checkboxField.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach(function(e) {
      e.addEventListener("change", function(event) {
        if(event.currentTarget.checked){
          const categoryElements = document.getElementsByClassName(`cita_${event.currentTarget.value.toLowerCase()}`);

          for(let item of categoryElements) {
            item.classList.add("active");
          }
        } else {
          const categoryElements = document.getElementsByClassName(`cita_${event.currentTarget.value.toLowerCase()}`);

          for(let item of categoryElements) {
            item.classList.remove("active");
          }
        }
      });
    });
  };

  textField.addEventListener("change", function() {
    setTimeout(highlight, 1000);
  });

  highlight();
  highlightOnChange();
}