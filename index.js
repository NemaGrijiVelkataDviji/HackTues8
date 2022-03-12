const stars = document.querySelectorAll('.star');

const planets = document.querySelectorAll('.planet');
const p_radii = [11,15,25,35,50,65,80,100];
let p_radians = new Array(8).fill(0);
let p_velocities = [0.8, 0.59, 0.5, 0.4, 0.22, 0.16, 0.12, 0.09];

const moon = document.querySelector('#moon');
const m_radius = 3.2;
let m_radians = 0;
let m_velocity = 3;

const p_orbits = document.querySelectorAll('.p-orbit');
const m_orbit = document.querySelector('#m-orbit');

p_orbits.forEach((p_orbit, index)=>{
	p_orbit.style.height = `${p_radii[index]}vmin`;
	p_orbit.style.width = `${p_radii[index]}vmin`;
})

setInterval( ()=> {
  planets.forEach( (planet, index)=>{
    planet.style.left = `${Math.cos(p_radians[index]) * p_radii[index]}vmin`;
    planet.style.top = `${Math.sin(p_radians[index]) * p_radii[index]}vmin`;
    p_radians[index] += p_velocities[index] * 0.02;
	planet.style.zIndex = 1;
  })

  moon.style.left = `${earthX() + (Math.cos(m_radians) * m_radius )}vmin`;
  moon.style.top = `${earthY() + (Math.sin(m_radians) * m_radius )}vmin`;
  m_radians += m_velocity * 0.02;

  m_orbit.style.left = `${earthX()}vmin`;
  m_orbit.style.top = `${earthY()}vmin`;
}, 1000/60);

function earthX(){
  return Number( planets[2].style.left.split('vmin')[0] );
}

function earthY(){
  return Number( planets[2].style.top.split('vmin')[0] );
}

var clicks = 0;

var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];
var header = document.getElementById("modal-content");

console.log(header);

function objInfo(element){
    clicks += 1;

    let buf_m_vel = 3;
    let buf_p_vel = [0.8, 0.59, 0.5, 0.4, 0.22, 0.16, 0.12, 0.09];

    if((clicks % 2) == 1){
        m_velocity = 0;
        for(let i = 0; i < p_radians.length; i++){
            p_velocities[i] = 0;
        }
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
        m_velocity = buf_m_vel;
        for(let i = 0; i < p_radians.length; i++){
            p_velocities = buf_p_vel;
        };
        modal.style.display = "none";
    }
};

span.onclick = function(){
    modal.style.display = "none";
}
