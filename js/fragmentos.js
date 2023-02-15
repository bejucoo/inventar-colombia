fetch("../resources/json/fragmentos_1.json")
.then(function (response) {
  return response.json();
})
.then(function (fragmentos) {
  filterJSON(fragmentos);
  addCategoryCheck(flatCategories(fragmentos));
  document.onLoad = miniMapText();
});

function filterJSON(fragmentos){
  var filter = FilterJS(fragmentos, '#fragmentos', {
    template: '#templateFragmentos',
    criterias: [{
      field: 'categories',
      ele: '#categoriaFragmentos input:checkbox',
      all: 'all'
    }]
  });
}

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
  const checkboxElm = document.getElementById('categoriaFragmentos');
  categories.forEach(function(e){
    var categoryCheckbox = document.createElement('div');
    categoryCheckbox.classList.add('checkbox');
    categoryCheckbox.innerHTML = `<input type="checkbox" name="${e}" value="${e}"><label for="${e}">${e}</label>`;
    checkboxElm.appendChild(categoryCheckbox);
  })
}

function miniMapText(){
  const canvas = document.querySelector('#miniMap');
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
    
  setTimeout(function(){
    canvas.click();
    console.log('ya');
  }, 5000);
}