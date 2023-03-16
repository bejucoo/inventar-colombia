// Obtener el archivo de los fragmentos y ejecutar las funciones.
fetch("./resources/json/fragmentos/fragmentos.json")
.then((response) => response.json())
.then((data) => {
  openInstructions();
  addFullText();
  addCategoryCheck(flatCategories(data));
  filterJSON(data);
})
.catch((error) => console.error(error));


// Abrir y cerrar instrucciones.
const openInstructions = () => {
  const openButton = document.getElementById("openDialog");
  const closeButton = document.getElementById("closeDialog");
  const dialog = document.getElementById("instructionsDialog");

  openButton.addEventListener("click", () => dialog.showModal());
  closeButton.addEventListener("click", () => dialog.close());
}


// Obtener todas las categorías y filtrar las repetidas.
const flatCategories = (fragmentos) => {
  let categoriesArrays = [];
  let allCategories;
  let filteredCategories;

  fragmentos.forEach((e) => categoriesArrays.push(e.categories));

  allCategories = categoriesArrays.flat();
  filteredCategories = [...new Set(allCategories)];
  return filteredCategories;
}


// Agregar el checklist de categorías.
const addCategoryCheck = (categories) => {
  const checkboxField = document.getElementById("fieldCategorias");

  categories.forEach((e) => {
    let categoryCheckbox = document.createElement("div");
    categoryCheckbox.innerHTML = `<input type="checkbox" name="${e}" value="${e}" class="categoryCheckbox"><label for="${e}" class="cita_${e.toLowerCase()}"><b>${e}</b></label>`;
    checkboxField.appendChild(categoryCheckbox);
  });

  let checkboxes = checkboxField.querySelectorAll("input[type=checkbox]");

  checkboxes.forEach((e) => e.checked = true);
}


// Agregar los fragmentos y los filtros.
const filterJSON = (fragmentos) => {
  let filter = FilterJS(fragmentos, "#fragmentos", {
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
const addFullText = () => {
  let textField = document.getElementById("cuerpoDeTexto");
  const textElm = document.getElementById("fragmentosCol2");

  textElm.innerHTML = `<md-block id="textoCompleto" src="./resources/md/fragmentos/${textField.value}.md"></md-block>`;

  textField.addEventListener("change", () => {
    textElm.innerHTML = `<md-block id="textoCompleto" src="./resources/md/fragmentos/${textField.value}.md"></md-block>`;
  });

  setTimeout(() => {
    const mdElm = document.getElementById("textoCompleto");
    if (mdElm.rendered === "remote") {
      toggleTextHighlight();
      miniMapText();
    } else {
      console.error("Error al cargar texto.");
    }
  }, 500);
}


// Agregar el miniMap.
const miniMapText = () => {
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
const toggleTextHighlight = () => {
  const textField = document.getElementById("cuerpoDeTexto");
  const checkboxField = document.getElementById("fieldCategorias");

  const highlight = () => {
    const checkboxes = checkboxField.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach((e) => {
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

  const highlightOnChange = () => {
    const checkboxes = checkboxField.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach((e) => {
      e.addEventListener("change", (event) => {
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

  textField.addEventListener("change", () => {
    setTimeout(highlight, 1000);
  });

  highlight();
  highlightOnChange();
}