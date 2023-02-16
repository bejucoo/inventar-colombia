fetch("../resources/json/fragmentos_1.json")
.then(function (response) {
  return response.json();
})
.then(function (fragmentos) {
  addCategoryCheck(flatCategories(fragmentos));
  filterJSON(fragmentos);
  addFullText();
});

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

function addCategoryCheck(categories){
  const checkboxField = document.getElementById('fieldCategorias');
  const toggleAllElm = document.getElementById('allCategories');

  categories.forEach(function(e){
    var categoryCheckbox = document.createElement('div');
    categoryCheckbox.innerHTML = `<input type="checkbox" name="${e}" value="${e}" class="categoryCheckbox"><label for="${e}">${e}</label>`;
    checkboxField.appendChild(categoryCheckbox);
  });
}

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

function addFullText(){
  var selectElm = document.querySelector('#cuerpoDeTexto');
  const textElm = document.querySelector('#fragmentosCol3');

  textElm.innerHTML = `<md-block id="textoCompleto" src="../resources/md/${selectElm.value}.md"></md-block>`;
  
  selectElm.addEventListener('change', function(){
    textElm.innerHTML = `<md-block id="textoCompleto" src="../resources/md/${selectElm.value}.md"></md-block>`;
  });

  setTimeout(function(){
    const mdElm = document.querySelector('#textoCompleto');
    if (mdElm.rendered === 'remote') {
      miniMapText()
    } else {
      console.log('Error al cargar pagemap');
    }
  }, 5000);
}

function miniMapText(){
  pagemap(document.querySelector('#miniMap'), {
    viewport: document.querySelector('#fragmentosCol3'),
    styles: {
      'header,footer,section,article': 'rgba(0,0,0,0.08)',
      'h1,a': 'rgba(0,0,0,0.10)',
      'h2,h3,h4': 'rgba(0,0,0,0.08)',
      'p': 'rgba(0, 0, 0, 0.05)',
      'mark': 'rgba(255, 255, 0, 0.5)'
    },
    back: 'rgba(0,0,0,0.02)',
    view: 'rgba(0,0,0,0.05)',
    drag: 'rgba(0,0,0,0.10)',
    interval: null
  });
}