var xhr = new XMLHttpRequest();
var searchURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=false&exintro&exsentences=5&origin=*&format=json&titles=";

function wikiContent(element){
  //console.log(element);
  var url = searchURL + element;
  
  var modalTitle;
  var modalContent;

  xhr.open('GET', url, true);
  //console.log("opened");

  xhr.onload = function(){
    var data = JSON.parse(this.response);
    var pageId = Object.keys(data.query.pages)

    modalTitle = data.query.pages[pageId].title;
    document.getElementById("modal-title").innerHTML = modalTitle;
    modalContent = data.query.pages[pageId].extract;
    document.getElementById("modal-content").innerHTML = modalContent;
    console.log(element, url, data.query.pages[pageId], modalTitle, modalContent);
  }

  xhr.send();
  //console.log("sent");
}