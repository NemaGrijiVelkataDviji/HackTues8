const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const FIRE_KEY = 70;
const DIRECTION_DOWN = -1;
const DIRECTION_UP = 1;
const GAME_WIDTH = 1300;
const GAME_HEIGHT = 900;

window.onload = function(){
    loadBosses();
    player.draw();
};

function generateRandom(maxLimit){
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand);
    return rand;
}

function playerControlls(key){
    let keyNum;

    if(window.event){
        keyNum = key.keyCode;
    } else if (key.which){
        keyNum = key.which;
    }

    if(keyNum == FIRE_KEY){
        fireballs.push(makeFireball());
    }

    if(keyNum == KEY_LEFT){
        player.x -= 10;
    }
    if(keyNum == KEY_RIGHT){
        player.x += 10;
    }
}

var player = {
    x : GAME_WIDTH - 750,
    y : GAME_HEIGHT - 100,
    element : document.createElement("img"),
    draw(){
        this.element.style.position = "relative";
        this.element.src = '../images/red_ship-removebg-preview.png';
        setSize(this.element, 120);
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        box.appendChild(this.element);
    }
}


var fireballs = [];
function makeFireball(){
    var fireball = {
        x: player.x,
        y: player.y,
        element : document.createElement("img"),
        draw(){
            this.element.src = '../images/fireball-removebg-preview.png';
            this.element.style.position = 'absolute';
            this.element.style.display = 'flex';
            setSize(this.element, 125);
            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
            //setPosition(this.element, this.x, this.y);
            box.appendChild(this.element);
        }
    }
    return fireball;
}



var enemies = [];
function createEnemy(){
    var enemy = {
        x: 0,
        y: 0,
        element: document.createElement("img"),
        draw(){
            this.element.src = '../images/alien_spaceship.png';
            this.element.style.position = 'absolute';
            let randX = generateRandom(1100);
            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
            setSize(this.element, 250);
            box.appendChild(this.element);
        },
    }
    return enemy;
}




var bosses = [];
var boss = {
    x: 0,
    y: 0,
    health: 0,
    element: document.createElement("img"),

    draw(){
        bossIndex = generateRandom(bossVariations.length),
        currentBoss = bossVariations[bossIndex],
        this.element.src = currentBoss.img //currentBoss.img;
        this.health = currentBoss.health;
        box.appendChild(this.element);
    }
    
}

var bossVariations = []
function loadBosses(){
    let boss1 = {
        img: '../images/red_ship-removebg-preview.png',
        health: 100,
    };
    bossVariations.push(boss1);

    let boss2 = {
        img: '../images/red_ship-removebg-preview.png',
        heath: 150,
    };

    bossVariations.push(boss2);

    
    let boss3 = {
        img: '../images/red_ship-removebg-preview.png',
        heath: 120,
    };
    
    bossVariations.push(boss3);
}


setInterval(() => {
    
    //console.log(player.x);
    player.draw();

    //draw balls
    for(var i = 0; i < fireballs.length; i++){

        fireballs[i].draw();
    }
    //move balls
    for(var ia = 0; ia < fireballs.length; ia++){
        fireballs[ia].y -= 2;
        if(fireballs[ia].y <= -80){
            box.removeChild(fireballs[ia].element);
            fireballs.splice(ia, 1);
        }
    }
    //spawn enemies
    for(var k = 0; k <= 60; k++){
        if(k == 60){
            
        }
    }
    //move enemies
    for(var j = 0; j < fireballs.length; j++){
        //enemies[j].y += 2;
       // if(enemies[j].y >= 750){
            //box.removeChild(enemies[j]);
       // }
    }

    //check collisions
    for(let i = 0; i < fireballs.length; i++){

    }


}, 1000 / 60);



const box = document.querySelector(".game");




function setSize($element, width) {
    $element.style.width = `${width}px`;
    $element.style.height = "auto";
}