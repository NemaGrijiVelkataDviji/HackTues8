const sun = document.querySelector('.star');

const planets = document.querySelectorAll('.planet');
const p_radii = [13,20,30,40,50,60,70,80];
let p_radians = new Array(8).fill(0);
let p_velocities = [0.4, 0.5, 0.45, 0.4, 0.25, 0.20, 0.15, 0.10];

const moon = document.querySelector('.moon');
const m_radius = 10;
let m_radians = 0;
let m_velocity = 1;

const p_orbits = document.querySelectorAll('.p-orbit');
const m_orbit = document.querySelector('.m-orbit');

p_orbits.forEach((p_orbit, index)=>{
	p_orbit.style.height = `${p_radii[index]}vmin`;
	p_orbit.style.width = `${p_radii[index]}vmin`;
})

setInterval(()=> {
  planets.forEach( (planet, index)=>{
    planet.style.left = `${Math.cos(p_radians[index]) * p_radii[index]}vmin`;
    planet.style.top = `${Math.sin(p_radians[index]) * p_radii[index]}vmin`;
    p_radians[index] += p_velocities[index] * 0.02;
	  planet.style.zIndex = 1;
  })

  moon.style.left = `${earthX() + (Math.cos(m_radians) * m_radius )}vmin`;
  moon.style.top = `${earthY() + (Math.sin(m_radians) * m_radius )}vmin`;
  moon.style.zIndex = 1;
  m_radians += m_velocity * 0.02;

  m_orbit.style.left = `${earthX()}vmin`;
  m_orbit.style.top = `${earthY()}vmin`;

  sun.style.zIndex = 1;
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

function objInfo(element){
  clicks += 1;
  
  let buf_m_vel = 1;  
  let buf_p_vel = [0.8, 0.59, 0.5, 0.4, 0.22, 0.16, 0.12, 0.09];

  if((clicks % 2) == 1){
    m_velocity = 0;
    for(let i = 0; i < p_radians.length; i++){
      p_velocities[i] = 0;
    }
    modal.style.display = "block";
    wikiContent(element);
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
