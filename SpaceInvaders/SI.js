const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const FIRE_KEY = 70;
const DIRECTION_DOWN = -1;
const DIRECTION_UP = 1;
const GAME_WIDTH = 1300;
const GAME_HEIGHT = 900;
var game_started = false

function startGame(){
    spawnenemies = false;
    infoTime = true;
    var startGame = document.createElement("img");
    startGame.src = '../images/startScreen.jpg';
    startGame.style.position = "absolute";
    startGame.style.width = GAME_WIDTH;
    startGame.style.height = GAME_HEIGHT;
    startGame.id = "startScreen";
    
    box.appendChild(startGame);
}

function playAgain(){
    location.reload()
}

function gameOver(){
    spawnenemies = false;
    bossSpawned = false;
    infoTime = true;
    gameEnded = true;
    var gameOver = document.createElement("img");
    gameOver.src = '../images/gameOver.jpg';
    gameOver.style.position = "absolute";
    gameOver.style.width = GAME_WIDTH;
    gameOver.style.height = GAME_HEIGHT;
    gameOver.style.backgroundSize = "100% 100%";
    gameOver.onclick = function() { playAgain(); };
    gameOver.id = "gameOver";


    box.removeChild(player.element);

    for(let b = 0; b < enemies.length; b++){
        box.removeChild(enemies[b].element);
    }
    enemies.splice(0, enemies.length);

    for(let b = 0; b < fireballs.length; b++){
        box.removeChild(fireballs[b].element);
    }
    fireballs.splice(0, fireballs.length);

    if(bossSpawned == true)
    box.removeChild(bosses[0].element);
    bosses.splice(0, bosses.length);

    box.appendChild(gameOver);
}

function start(){
    spawnenemies = true;
    infoTime = false;
    var startScreen = document.getElementById("startScreen")
    box.removeChild(startScreen);
    game_started = true;
}

window.onload = function(){
    startGame();
    loadBosses();
    player.draw();
};

function generateRandom(maxLimit){
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand);
    return rand;
}

 var down = [];
    document.addEventListener('keydown', function(event) {
        if (down[event.key] && infoTime == false){
          return;
        } else {
            if(game_started == false){
                start();
            }
         //do the normal things you do when you get key presses
         else if(event.key == 'f' && infoTime == false){
            fireballs.push(makeFireball());
         }
        down[event.key]=true;
        }
      }, true);
      document.addEventListener('keyup', function(event) {
        down[event.key]=false;
         //do the normal things you do when you get key releases
      }, true);
 

function playerControlls(key){
    let keyNum;
    if(infoTime == false){
        if(window.event){
            keyNum = key.keyCode;
        } else if (key.which){
            keyNum = key.which;
        }
    
        if(keyNum == KEY_LEFT && player.x > -10){
            player.x -= 20;
        }
        if(keyNum == KEY_RIGHT && player.x < 1190){
            player.x += 20;
        }
    }
    
}


var scoreboard = {
    element: document.createElement("txt"),
    x: 800,
    drawScore() {
        this.element.className = "scoreboard"
        this.element.font = "64px Arial";
        this.element.fillStyle = "#0095DD";
        this.element.textContent = `${player.score}`;
        this.element.style.width = "120px";
        this.element.style.height = "60px";
        this.element.style.position = "absolute";
        this.element.style.fontSize = "xxx-large";
        this.element.style.color = "deepskyblue";
        this.element.style.left = "1200px";
        this.element.style.top = "15px"
        const box = document.querySelector(".game");
        box.appendChild(this.element);
    }
}

var player = {
    x : GAME_WIDTH - 750,
    y : GAME_HEIGHT - 100,
    health : 10,
    score: 0,
    element : document.createElement("img"),
    draw(){
        this.element.style.position = "relative";
        this.element.src = '../images/red_ship-removebg-preview.png';
        setSize(this.element, 120);
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.element.id = "player";
        const box = document.querySelector(".game");
        box.appendChild(this.element);
    }
}


var fireballs = [];
function makeFireball(){
    var fireball = {
        x: player.x + 3,
        y: player.y - 115,
        element : document.createElement("img"),
        draw(){
            this.element.src = '../images/fireball-removebg-preview.png';
            this.element.style.position = 'absolute';
            this.element.style.display = 'flex';
            setSize(this.element, 125);
            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
            const box = document.querySelector(".game");
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
            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
            setSize(this.element, 250);
            const box = document.querySelector(".game");
            box.appendChild(this.element);
        },
    }
    return enemy;
}




var bosses = [];
function spawnBoss(){
    var boss = {
        x: 600,
        y: 0,
        health: 0,
        width : 0,
        offset: 0,
        name: 'asd',
        element: document.createElement("img"),
    
        draw(){
            bossIndex = generateRandom(bossVariations.length),
            currentBoss = bossVariations[bossIndex],
            this.element.src = currentBoss.img //currentBoss.img;
            this.element.style.position = 'absolute';
            this.health = currentBoss.health;
            this.width = currentBoss.width;
            this.offset = currentBoss.offset;
            this.name = currentBoss.name;
            this.height = currentBoss.height;
            setSize(this.element, 250);
            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
            const box = document.querySelector(".game");
            box.appendChild(this.element);
        },
        
        checkhealth(){
            if(this.health <= 0){
                return true;
            }else{
                return false;
            }
        }
    
    }
    return boss;
}


var bossVariations = []
function loadBosses(){
    let boss1 = {
        img: '../images/mercury.png',
        health: 100,
        width: 200,
        height: 140,
        offset: 60,
        name: "Mercury (planet)"
    };
    bossVariations.push(boss1);

    let boss2 = {
        img: '../images/venus.png',
        health: 150,
        width: 200,
        height: 140,
        offset: 70,
        name: "Venus"
    };

    bossVariations.push(boss2);

    
    let boss3 = {
        img: '../images/earth.png',
        health: 120,
        width: 195,
        height: 135,
        offset: 60,
        name: "Earth"
    };

    bossVariations.push(boss3);

    let boss4 = {
        img: '../images/mars.png',
        health: 120,
        width: 200,
        height: 140,
        offset: 70,
        name: "Mars"
    }

    bossVariations.push(boss4);

    let boss5 = {
        img: '../images/jupiter.png',
        health: 120,
        width: 190,
        height: 130,
        offset: 60,
        name: "Jupiter"
    };

    bossVariations.push(boss5);
    
    let boss6 = {
        img: '../images/saturn.png',
        health: 120,
        width: 200,
        height: 80,
        offset: 60,
        name: "Saturn"
    };

    bossVariations.push(boss6);
    
    let boss7 = {
        img: '../images/uranus.png',
        health: 120,
        width: 200,
        height: 140,
        offset: 70,
        name: "Uranus"
    };

    bossVariations.push(boss7);
    
    let boss8 = {
        img: '../images/neptune.png',
        health: 120,
        width: 190,
        height: 140,
        offset: 60,
        name: "Neptune"
    };
    
    bossVariations.push(boss8);

    let boss9 = {
        img: '../images/sun.png',
        health: 120,
        width: 180,
        height: 90,
        offset: 60,
        name: "Sun"
    };
    
    bossVariations.push(boss9);
}

let k = 0;
var wikiReq = false;

setInterval(() => {
    
    if(gameEnded == false)
    player.draw();

    //draw balls
    for(let i = 0; i < fireballs.length; i++){

        fireballs[i].draw();
    }
    //move balls
    for(let ia = 0; ia < fireballs.length; ia++){
        fireballs[ia].y -= 13;
        if(fireballs[ia].y <= -80){
            box.removeChild(fireballs[ia].element);
            fireballs.splice(ia, 1);
        }
    }

    //spawn enemies
    k++;
    if(k >= 60 && spawnenemies == true){
        enemy = createEnemy();
        enemy.x = generateRandom(1190) -195;
        enemies.push(enemy);
        k = 0;
    }
    
    for(let ka = 0; ka < enemies.length; ka++){
        enemies[ka].draw();
    }
    //move enemies
    for(let j = 0; j < enemies.length; j++){
        enemies[j].y += 2;
        if(enemies[j].y >= 780){
            player.health -= 10;
            box.removeChild(enemies[j].element);
            enemies.splice(j, 1);
        }
    }

    

    //pause game on boss spawn
    if(bossSpawned == true){
        if(infoTime == true){
            spawnenemies = false;
            for(let b = 0; b < enemies.length; b++){
                box.removeChild(enemies[b].element);
            }
            enemies.splice(0, enemies.length); 
            //PLANET INFO HERE
            if(wikiReq == true){
                wikiContent(bosses[0].name);
                wikiReq = false;
            }
                //planet name is bosses[0].element.name
            
        }else if(infoTime == false){
            spawnenemies = true;
        }
    }
    //check collisions
    for(let i = 0; i < fireballs.length; i++){
        //check enemy collision
        for(let k = 0; k < enemies.length; k++){
            if (fireballs[i].x < enemies[k].x + 260 &&
                fireballs[i].x - 110 > enemies[k].x &&
                fireballs[i].y < enemies[k].y + 50 &&
                fireballs[i].y + 60 > enemies[k].y) {
                    player.score += 1;
                    box.removeChild(enemies[k].element);
                    enemies.splice(k, 1);
                    box.removeChild(fireballs[i].element);
                    fireballs.splice(i, 1);
             }
        }
        //check boss collision
        if(bossSpawned){
            if (fireballs[i].x < bosses[0].x + bosses[0].width &&
                fireballs[i].x > bosses[0].x - bosses[0].offset &&
                fireballs[i].y < bosses[0].y + bosses[0].height &&
                fireballs[i].y + 60 > bosses[0].y) {
                    box.removeChild(fireballs[i].element);
                    fireballs.splice(i, 1);
                    bosses[0].health -= 10;
                    if(bosses[0].checkhealth()){
                        player.score += 10;
                        
                        box.removeChild(bosses[0].element);
                        bosses.splice(0, 1);
                        //spawnenemies = true;
                        bossSpawned = false;
                    }
             }
        }
        
    }

    //spawn boss
    if(player.score % 30 == 0 && bossSpawned == false && player.score != 0){
        scoreboard.drawScore();
        bossCreate();
        infoTime = true;
        wikiReq = true;
        //console.log();
        modal.style.display = "block";
    }

    //check player health
    if(player.health <= 0 && gameEnded == false){
        
        gameOver();
    }

    //update score
    scoreboard.drawScore();
    

}, 1000 / 60);


var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];

span.onclick = () => {
    modal.style.display = "none";
    infoTime = false;
}



function bossCreate(){
    if(bossSpawned == false){
        bosses.push(spawnBoss());
        bossSpawned = true;
        bosses[0].draw();
    }
}

var infoTime = false;
var spawnenemies = true;
var bossSpawned = false;
var gameEnded = false;
const box = document.querySelector(".game");




function setSize($element, width) {
    $element.style.width = `${width}px`;
    $element.style.height = "auto";
}