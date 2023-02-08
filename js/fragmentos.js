var xmlFragmentos = new XMLHttpRequest();

xmlFragmentos.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    var fragmentosJSON = [];
    JSON.parse(this.responseText).forEach(function(e){
      fragmentosJSON.push(e);
    })
    filterJSON(fragmentosJSON);
  }
};

xmlFragmentos.open("GET", "../resources/json/fragmentos.json"); 
xmlFragmentos.send();

function filterJSON(data){
  console.log(data);
  var filter = FilterJS(data, '#fragmentos', {
    template: '#template_fragmentos'
  });
}