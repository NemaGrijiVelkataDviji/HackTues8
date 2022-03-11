const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const FIRE_KEY = 70;
const DIRECTION_DOWN = -1;
const DIRECTION_UP = 1;


var ballID = 0.001;
var enemyID = 1;

const GAME_WIDTH = 1300;
const GAME_HEIGHT = 900;

bosses = [];
enemies = [];
spawnedEnemies = [];
spawnedBosses = [];
fireballs = [];

const STATE = {
    x_pos: 0,
    y_pos: 0,
    spaceship_width: 120
}

function setPosition($element, x, y) {
    $element.style.transform = `translate(${x}px, ${y}px)`;
}

function setSize($element, width) {
    $element.style.width = `${width}px`;
    $element.style.height = "auto";
}

window.onload = function(){
    loadBosses();
    loadEnemies();
    //spawnBoss();
};

setInterval(() => {
    //move player

    //move balls

    //spawn enemies

    //move enemies
    
    //check collisions


}, 1000 / 60);

let yenemies = 100;
    let interval = setInterval(() => {
        yenemies += 2;
        if(y <= 750){
            setPosition(enemy, x, yenemies)
        }
        else{
            $box.removeChild(enemy);
            clearInterval(interval);
        }

function loadBosses(){
    let boss1 = {
        img: '../images/red_ship-removebg-preview.png',
        health: 100,
        damage: 50,
        class: 'className'
    };
    bosses.push(boss1);

    let boss2 = {
        img: '../images/red_ship-removebg-preview.png',
        heath: 150,
        damage: 35,
        class: 'className'
    };

    bosses.push(boss2);

    
    let boss3 = {
        img: '../images/red_ship-removebg-preview.png',
        heath: 120,
        damage: 42,
        class: 'className'
    };
    
    bosses.push(boss3);
}

function loadEnemies(){
    let enemy1 = {
        img: '../images/alien_spaceship.png'
    }
    
    let enemy2 = {
        img: '../images/alien_spaceship.png'
    }
    
    let enemy3 = {
        img: '../images/alien_spaceship.png'
    }
    
    let enemy4 = {
        img: '../images/alien_spaceship.png'
    }
    
    let enemy5 = {
        img: '../images/alien_spaceship.png'
    }

    enemies.push(enemy1);
    enemies.push(enemy2);
    enemies.push(enemy3);
    enemies.push(enemy4);
    enemies.push(enemy5);
}

function generateRandom(maxLimit){
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand);
    return rand;
}

function UpdateEnemy(enemy, x){
    
    
}

var interval = setInterval(() => {
    spawnEnemy();
    checkCollision();
}, 1000);


function checkCollision(ball, enemy){

}

function spawnEnemy(){
    let index = generateRandom(enemies.length);
    let enemyImg = enemies[index].img;
    let enemy = document.createElement("img");
    enemy.style.position = 'absolute';
    enemy.src = enemyImg;
    enemy.id = enemyID;
    enemyID++;
    setSize(enemy, 250);

    let randX = generateRandom(1100);
    setPosition(enemy, randX, 0)
    UpdateEnemy(enemy, randX);
    $box.appendChild(enemy);

}



function spawnBoss(){
    let bossIndex = generateRandom(bosses.length);
    const boss = document.createElement('img');
    let currentBoss = bosses[bossIndex];
    boss.src = '../images/red_ship-removebg-preview.png'; //currentBoss.img;
    
    const $box = document.querySelector(".game");
    $box.appendChild(boss);
}

function playerControlls(key){
    let keyNum;

    if(window.event){
        keyNum = key.keyCode;
    } else if (key.which){
        keyNum = key.which;
    }

    if(keyNum == FIRE_KEY){
        let x = STATE.x_pos + 3;
        let y = STATE.y_pos - 110;
        console.log(x, y);
        shoot(ballID, x, y);
        ballID += 0.001;
    }

    if(keyNum == KEY_LEFT){
        let player = document.getElementById("player");
        let x = player.x;
        let y = STATE.y_pos;
        movePlayer(keyNum, x, y)
    }
    if(keyNum == KEY_RIGHT){
        let player = document.getElementById("player");
        let x = player.x;
        let y = STATE.y_pos;
        movePlayer(keyNum, x, y)
    }
}

function shoot(id, x, y){
    drawFireball(id, x, y)
    moveFireball(id, x,y);
}



function drawFireball(id, x, y){
    let image = '../images/fireball-removebg-preview.png';
    let imageItem = document.createElement('img');
    imageItem.src = image;
    imageItem.id = id;
    imageItem.style.position = 'absolute';
    imageItem.style.display = 'flex';
    setSize(imageItem, 125);
    setPosition(imageItem, x, y);
    $box.appendChild(imageItem);
    let ball = {
        ballElement: imageItem,
        coordX : x,
        coordY : y,
    }
    fireballs.push(ball);
    const $box = document.querySelector(".game");

    return ball;
}



function moveFireball(fireballId, x, startY){

    //cikul za celiq masiv



    let fireball = document.getElementById(fireballId);
    console.log(startY);
    let y = startY;
    var int = setInterval(function() {
        if(y >= -80){
            for(var i = 1; i < 100000; i++){
                y -= 0.0002;
            }
            setPosition(fireball, x, y);
        }
        else{
            clearInterval(int);
            console.log(fireball.id);
            fireball.parentNode.removeChild(fireball);
        }
    }, 1000 / 60);
   
    const $box = document.querySelector(".game");
    
}

function drawPlayer(x, y){
    const $player = document.createElement("img");
    $player.style.position = 'absolute';
    $player.style.display = 'flex';
    $player.src = '../images/red_ship-removebg-preview.png';
    $player.className = "player";
    $player.id = "player";

    setSize($player, STATE.spaceship_width);
    setPosition($player)
    $box.appendChild($player);
}

function movePlayer(key){
    let player = document.getElementById("player")

    if(key == KEY_LEFT){
        for(var i = 1; i < 100; i++){
            STATE.x_pos -= 0.5;
        }
        setPosition(player, STATE.x_pos, STATE.y_pos);
    }
    else if(key == KEY_RIGHT){
        for(var i = 1; i > -100; i--){
            STATE.x_pos += 0.5;
            setPosition(player, STATE.x_pos, STATE.y_pos);
        }
        
    }
}



//Player
function createPlayer($box) {
    STATE.x_pos = GAME_WIDTH - 750;
    STATE.y_pos = GAME_HEIGHT - 100;

    const $player = document.createElement("img");
    $player.style.position = 'relative';
    $player.style.display = 'flex';
    $player.src = '../images/red_ship-removebg-preview.png';
    $player.className = "player";
    $player.id = "player";

    
    $box.appendChild($player);
    setPosition($player, STATE.x_pos, STATE.y_pos);
    setSize($player, STATE.spaceship_width);
}



//Game
const $box = document.querySelector(".game");
createPlayer($box);
