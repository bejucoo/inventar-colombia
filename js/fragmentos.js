// Obtener el archivo de los fragmentos y ejecutar las funciones.
fetch("./resources/json/fragmentos/fragmentos_1.json")
.then(function (response){
  return response.json();
})
.then(function (fragmentos){
  addCategoryCheck(flatCategories(fragmentos));
  filterJSON(fragmentos);
  addFullText();
})
.catch(function(e){
  console.log('Error al cargar archivo JSON de los fragmentos:', e);
});

// Obtener todas las categorías y filtrar las repetidas.
function flatCategories(fragmentos){
  var categoriesArrays = [];
  var allCategories;
  var filteredCategories;

  fragmentos.forEach(function(e, i){
    categoriesArrays.push(e.categories); 
  });

  allCategories = categoriesArrays.flat();
  filteredCategories = [...new Set(allCategories)];
  return filteredCategories;
}

// Agregar el checklist de categorías.
function addCategoryCheck(categories){
  const checkboxField = document.getElementById('fieldCategorias');
  const toggleAllElm = document.getElementById('allCategories');

  categories.forEach(function(e){
    var categoryCheckbox = document.createElement('div');
    categoryCheckbox.innerHTML = `<input type="checkbox" name="${e}" value="${e}" class="categoryCheckbox"><label for="${e}" class="cita_${e.toLowerCase()}"><b>${e}</b></label>`;
    checkboxField.appendChild(categoryCheckbox);
  });
}

// Agregar las citas y los filtros.
function filterJSON(fragmentos){
  var filter = FilterJS(fragmentos, '#fragmentos', {
    template: '#templateFragmentos',
    filter_on_init: true,
    criterias: [{
      field: 'categories',
      ele: '#seleccionCategorias input:checkbox'
    },
    {
      field: 'ref',
      ele: '#cuerpoDeTexto'
    }]
  });
}

// Agregar el cuerpo de texto según el elemento de selección.
function addFullText(){
  var selectElm = document.querySelector('#cuerpoDeTexto');
  const textElm = document.querySelector('#fragmentosCol2');

  textElm.innerHTML = `<md-block id="textoCompleto" src="./resources/md/fragmentos/${selectElm.value}.md"></md-block>`;
  
  selectElm.addEventListener('change', function(){
    textElm.innerHTML = `<md-block id="textoCompleto" src="./resources/md/fragmentos/${selectElm.value}.md"></md-block>`;
  });

  setTimeout(function(){
    const mdElm = document.querySelector('#textoCompleto');
    if (mdElm.rendered === 'remote') {
      miniMapText()
    } else {
      console.log('Error al cargar pagemap');
    }
  }, 3600);
}

// Agregar el miniMap del cuerpo de texto.
function miniMapText(){
  pagemap(document.querySelector('#miniMap'), {
    viewport: document.querySelector('#fragmentosCol2'),
    styles: {
      'h1, h2, h3, h4': 'rgba(0,0,0,0.2)',
      'p': 'rgba(0, 0, 0, 0.05)',
      //'mark': 'rgba(255, 255, 0, 0.5)'
      '.cita_animales': '#92a9a4aa'
    },
    back: 'rgba(0,0,0,0.02)',
    view: 'rgba(0,0,0,0.05)',
    drag: 'rgba(0,0,0,0.10)',
    interval: null
  });
}