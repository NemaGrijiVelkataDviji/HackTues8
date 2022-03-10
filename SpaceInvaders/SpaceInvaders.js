const KEY_RIGHT = 39;
const KEY_LEFT = 37;

const GAME_WIDTH = 1300;
const GAME_HEIGHT = 900;

const STATE = {
    x_pos: 0,
    y_pos: 0,
    spaceship_width: 50
}

function setPosition($element, x, y) {
    $element.style.transform = `translate(${x}px, ${y}px)`;
}

function setSize($element, width) {
    $element.style.width = `${width}px`;
    $element.style.height = "auto";
}


//Player
function createPlayer($box) {
    STATE.x_pos = GAME_WIDTH / 2;
    STATE.y_pos = GAME_HEIGHT / 2;

    const $player = document.createElement("img");
    $player.src = 'https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png';
    $player.className = "player";

    
    $box.appendChild($player);
    setPosition($player, STATE.x_pos, STATE.y_pos);
    setSize($player, STATE.spaceship_width);
}


//Game
const $box = document.querySelector(".main");
createPlayer($box);
