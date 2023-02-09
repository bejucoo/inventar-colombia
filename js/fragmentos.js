fetch("../resources/json/fragmentos.json")
.then(function (response) {
  return response.json();
})
.then(function (data) {
  var tagsArrays = [];
  var allTags;
  var filteredTags;

  data.forEach(function(e, i){
    tagsArrays.push(e.tags); 
  });

  allTags = tagsArrays.flat();
  filteredTags = [...new Set(allTags)];

  addTagsCheck(filteredTags)
  filterJSON(data);
});

function filterJSON(data){
  var filter = FilterJS(data, '#fragmentos', {
    template: '#templateFragmentos',
    criterias: [{
      field: 'tags',
      ele: '#tagsFragmentos input:checkbox',
      all: 'all'
    }]
  });
}

function addTagsCheck(tags){
  const checkboxElm = document.getElementById('tagsFragmentos');
  tags.forEach(function(e){
    var tagCheckbox = document.createElement('div');
    tagCheckbox.classList.add('checkbox');
    tagCheckbox.innerHTML = `<input type="checkbox" name="${e}" value="${e}"><label for="${e}">${e}</label>`;
    checkboxElm.appendChild(tagCheckbox);
  })
}