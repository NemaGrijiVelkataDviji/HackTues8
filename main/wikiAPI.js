var xhr = new XMLHttpRequest();
var searchURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=false&exintro&origin=*&rvprop=content&format=json&titles=";

function wikiContent(element){
    var term = element.getAttribute('value');
    var url = searchURL + term;
  
    var modalTitle;
    var modalContent;

    xhr.open('GET', url, true);

    xhr.onload = function(){
        var data = JSON.parse(this.response);
        var pageId = Object.keys(data.query.pages)

        modalTitle = data.query.pages[pageId].title;
        document.getElementById("modal-title").innerHTML = modalTitle;
        modalContent = data.query.pages[pageId].extract;
        document.getElementById("modal-content").innerHTML = modalContent;
        console.log(term, url, data.query.pages[pageId], modalTitle, modalContent);
    }

  xhr.send();
  
}