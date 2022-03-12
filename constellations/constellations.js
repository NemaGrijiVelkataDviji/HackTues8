const modal = document.getElementById("modal");

function modalShow(element){
	modal.style.display = "block";
	wikiContent(element);
}
function modalClose(){
	modal.style.display = "none";
}