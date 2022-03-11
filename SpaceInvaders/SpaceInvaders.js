const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const FIRE_KEY = 70;
const DIRECTION_DOWN = -1;
const DIRECTION_UP = 1;

var ballID = 1;

const GAME_WIDTH = 1300;
const GAME_HEIGHT = 900;

bosses = [];
enemies = [];

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
    //loadBosses();
    //spawnBoss();
};


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
        img: 'imagePath1'
    }
    
    let enemy2 = {
        img: 'imagePath1'
    }
    
    let enemy3 = {
        img: 'imagePath1'
    }
    
    let enemy4 = {
        img: 'imagePath1'
    }
    
    let enemy5 = {
        img: 'imagePath1'
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

function spawEnemy(){
    const $box = document.querySelector(".game");
    let index = generateRandom(enemies.length);
    let enemyImg = enemies[index];
    let enemy = document.createElement('img');
    enemy.src = enemyImg.img;
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
        let x = STATE.x_pos;
        let y = STATE.y_pos;
        console.log(x, y);
        shoot(ballID, 1, x, y);
        ballID++;
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

function shoot(id, direction, x, y){
    drawFireball(id, x, y)
    moveFireball(id, x,y);
}

function drawFireball(id, x, y){
    let image = '../images/fireball-removebg-preview.png';
    let imageItem = document.createElement('img');
    imageItem.src = image;
    imageItem.id = id;
    imageItem.style.position = 'relative';
    imageItem.style.display = 'flex';
    setSize(imageItem, 125);
    console.log(x, y);
    
    setPosition(imageItem, x, y);
    const $box = document.querySelector(".game");
    $box.appendChild(imageItem);
}



function moveFireball(fireballId, x, startY){
    let fireball = document.getElementById(fireballId);
    console.log(startY);
    let y = startY;
    var int = setInterval(function() {
        if(y >= -300){
            y -= 5;
            setPosition(fireball, x, y);

            //drawFireball(fireballId, x, y);
        }
        else{
            clearInterval(int);
            
        }
    }, 1000 / 30);
   
    const $box = document.querySelector(".game");
    //fireball.parentNode.removeChild(fireball);
}

function drawPlayer(x, y){
    const $player = document.createElement("img");
    $player.style.position = 'relative';
    $player.style.display = 'flex';
    $player.src = '../images/red_ship-removebg-preview.png';
    $player.className = "player";
    $player.id = "player";

    setSize($player, STATE.spaceship_width);
    setPosition($player, x, y)
    $box.appendChild($player);
}

function movePlayer(key, x, y){
    let player = document.getElementById("player")
    const $box = document.querySelector(".game");

    if(key == KEY_LEFT){
        player.parentNode.removeChild(player);
        for(var i = 1; i < 11; i++){
            STATE.x_pos -= 0.5;
        }
        drawPlayer(STATE.x_pos, STATE.y_pos);
    }
    else if(key == KEY_RIGHT){
        player.parentNode.removeChild(player);
        STATE.x_pos += 5;
        drawPlayer(STATE.x_pos, STATE.y_pos);
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


//

//Game
const $box = document.querySelector(".game");
createPlayer($box);
