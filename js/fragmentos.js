// Obtener los fragmentos.
async function fetchFragments() {
  try {
    const response = await fetch("./resources/json/fragmentos/fragmentos.json")
    const data = await response.json();
    return data;
  } catch(error) {
    console.error(error); 
  }
}

// Ejecutar las funciones cuando se reciba la respuesta.
fetchFragments().then(data => {
  addCategoryCheck(uniqueKeyValues(data, "categoria"));
  filterJSON(data);
  addFullText();
});


// Abrir y cerrar instrucciones.
(() => {
  const openButton = document.getElementById("openDialog");
  const closeButton = document.getElementById("closeDialog");
  const dialog = document.getElementById("instructionsDialog");

  openButton.addEventListener("click", () => dialog.showModal());
  closeButton.addEventListener("click", () => dialog.close());
})();


// Obtener valores sin repetir de un objeto.
const uniqueKeyValues = (obj, key) => {
  let flatValues = obj.flatMap(e => e[key]);
  let filteredValues = [...new Set(flatValues)];
  return filteredValues;
}


// Agregar el checklist de categorías.
const addCategoryCheck = (cat) => {
  const checkboxField = document.getElementById("fieldCategorias");

  cat.forEach(e => {
    let categoryCheckbox = document.createElement("div");
    categoryCheckbox.innerHTML = `<input type="checkbox" name="${e}" value="${e}" class="categoryCheckbox"><label for="${e}" class="cita_${e.toLowerCase()}"><b>${e}: </b><span class="categoryCounter" id="counter_${e.toLowerCase()}"><b>0</b></span></label>`;
    checkboxField.appendChild(categoryCheckbox);
  });

  let checkboxes = checkboxField.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(e => e.checked = true);
}


// Agregar los fragmentos y los filtros.
const filterJSON = (fragmentos) => {
  let filter = FilterJS(fragmentos, "#fragmentos", {
    template: "#templateFragmentos",
    filter_on_init: true,
    criterias: [{
      field: "categoria",
      ele: "#seleccionCategorias input:checkbox"
    },
    {
      field: "ref",
      ele: "#cuerpoDeTexto"
    }],
    callbacks: {
      afterFilter: result => {
        if (result != 0){
          const allCounters = document.getElementsByClassName("categoryCounter");
          for(elm of allCounters) {
            elm.innerHTML = `<b>0</b>`;
          }
          result.forEach(e => {
            const counter = document.getElementById(`counter_${e.categoria.toLowerCase()}`);
            counter.innerHTML = `<b>${Number(counter.textContent) + 1}</b>`;
          });
        } else {
          const allCounters = document.getElementsByClassName("categoryCounter");
          for(elm of allCounters) {
            elm.innerHTML = `<b>0</b>`;
          }
        }
      }
    }
  });
}


// Agregar el miniMap.
const miniMapText = () => {
  pagemap(document.getElementById("miniMap"), {
    viewport: document.getElementById("fragmentosCol2"),
    styles: {
      "h1, h2, h3, h4, h5": "rgba(0,0,0,0.2)",
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
    checkboxes.forEach(e => {
      if (e.checked === true) {
        const categoryElements = document.getElementsByClassName(`cita_${e.value.toLowerCase()}`);
        for(item of categoryElements) {
          item.classList.add("active");
        }
      } else {
        const categoryElements = document.getElementsByClassName(`cita_${e.value.toLowerCase()}`);
        for(item of categoryElements) {
          item.classList.remove("active");
        }
      }
    });
  };

  const highlightOnChange = () => {
    const checkboxes = checkboxField.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach(e => {
      e.addEventListener("change", event => {
        if(event.currentTarget.checked){
          const categoryCounter = document.getElementById(`counter_${event.currentTarget.value.toLowerCase()}`);
          categoryCounter.hidden = false;
          const categoryElements = document.getElementsByClassName(`cita_${event.currentTarget.value.toLowerCase()}`);
          for(let item of categoryElements) {
            item.classList.add("active");
          }
        } else {
          const categoryCounter = document.getElementById(`counter_${event.currentTarget.value.toLowerCase()}`);
          categoryCounter.hidden = true;
          const categoryElements = document.getElementsByClassName(`cita_${event.currentTarget.value.toLowerCase()}`);
          for(let item of categoryElements) {
            item.classList.remove("active");
          }
        }
      });
    });
  };

  textField.addEventListener("change", () => setTimeout(highlight, 500));

  highlight();
  highlightOnChange();
}

// Agregar el cuerpo de texto. Resaltar fragmentos y agregar minimap cuando se cargue.
const addFullText = () => {
  let textField = document.getElementById("cuerpoDeTexto");
  const textElm = document.getElementById("fragmentosCol2");

  textElm.innerHTML = `<md-block id="textoCompleto" src="./resources/md/fragmentos/${textField.value}.md"></md-block>`;

  textField.addEventListener("change", () => textElm.innerHTML = `<md-block id="textoCompleto" src="./resources/md/fragmentos/${textField.value}.md"></md-block>`);

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