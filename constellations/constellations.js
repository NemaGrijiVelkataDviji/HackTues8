var clicks = 0;

var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];
var header = document.getElementById("modal-content");

console.log(header);

function objInfo(element){
    clicks += 1;

    if((clicks % 2) == 1){

        modal.style.display = "block";
		
		var xhr = new XMLHttpRequest();
		var searchURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&origin=*&rvprop=content&format=json&titles=";
		console.log(element.getAttribute('name'));
		var term = element.getAttribute('name');
		var url = searchURL + term;
		console.log(url);

		xhr.open('GET', url, true);

		xhr.onload = function(){
			var data = JSON.parse(this.response);
			var pageId = Object.keys(data.query.pages);
			
			let node = data.query.pages[pageId].title;
		}

		xhr.send();
		
	}
    if((clicks % 2) == 0){
        modal.style.display = "none";
    }
};

span.onclick = function(){
    modal.style.display = "none";
}