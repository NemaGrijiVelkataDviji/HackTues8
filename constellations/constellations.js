const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close");

function modalShow(element){
	modal.style.display = "block";
	wikiContent(element);
}
function modalClose(){
	modal.style.display = "none";
}