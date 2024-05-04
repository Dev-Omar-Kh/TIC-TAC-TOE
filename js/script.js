const x = `<div class="x animate__animated animate__bounceIn"><div class="x_design-1"></div><div class="x_design-2"></div></div>`;
const o = `<div class="o animate__animated animate__bounceIn"><span class="o_design"></span></div>`;
const cells = document.getElementsByClassName("cell_container");
const form = document.getElementById("form");
const playerXName = document.getElementById("player_x");
const playerOName = document.getElementById("player_o");
const playerXLocal = document.getElementById("name_1");
const playerOLocal = document.getElementById("name_2");
const xTone = document.getElementById("xTone");
const oTone = document.getElementById("oTone");
const winTone = document.getElementById("winTone");
const drawTone = document.getElementById("drawTone");
let countXRank = 0;
let countORank = 0;
let playerType = false;
let items = [];

if(location.pathname == "/TIC-TAC-TOE/game.html"){

    setInterval(function displayNames(){

        playerXLocal.innerHTML = `${localStorage.getItem("playerX")} <span class="player_type">X</span>`;
        playerOLocal.innerHTML = `${localStorage.getItem("playerO")} <span class="player_type">O</span>`;

    } , 1000);

}

function newGame(){

    localStorage.clear();
    location.replace("index.html")

}

function usersName(){

    localStorage.setItem("playerX" , playerXName.value);
    localStorage.setItem("playerO" , playerOName.value);

}

form.addEventListener('submit' , function(e){

    e.preventDefault();
    usersName();
    location.replace("game.html");

})

function draw(){

    for(let i = 0 ; i < cells.length ; i++){

        cells[i].style.opacity = "0.5";

    };
    
    drawTone.play();

}

function winner(item1 , item2 , item3){

    // loser opacity

    for(let i = 0 ; i < cells.length ; i++){

        cells[i].style.opacity = "0.5";

    };

    document.getElementById(`item_${item1}`).style.opacity = "1";
    document.getElementById(`item_${item2}`).style.opacity = "1";
    document.getElementById(`item_${item3}`).style.opacity = "1";

    // stop game

    for(let i = 0 ; i< items.length ; i++){

        cells[i].removeAttribute("onclick");

    }

    // count rank

    if(playerType){

        console.log("playerX is win");
        document.getElementById("x_rank").innerHTML = countXRank+=1

    }
    else if(!playerType){

        console.log("playerO is win");
        document.getElementById("o_rank").innerHTML = countORank+=1

    }

    winTone.play();

}

function restartGame(){

    // restart game

    for(let i = 0 ; i < 9 ; i++){

        setTimeout(function(){

            document.getElementById(`item_${i}`).innerHTML = '';

            document.getElementById(`item_${i}`).setAttribute("onclick" , "game(this.id)");

            document.getElementById(`item_${i}`).style.opacity = "1";
        
        } , 2000);

    }

}

function compare(){

    for(let i = 0 ; i < 9 ; i++){

        items[i] = document.getElementById(`item_${i}`).innerHTML;

    }

    // draw status

    if(items[0] != '' && items[1] != '' && items[2] != '' && items[3] != '' && items[4] != '' && items[5] != '' && items[6] != '' && items[7] != '' && items[8] != ''){

        draw();
        restartGame();

    }

    // raws compare

    // first raw compare

    if(items[0] === items[1] && items[1] === items[2] && items[0] != ''){

        winner(0 , 1 , 2);
        restartGame();

    }

    // seconde raw compare

    else if(items[3] === items[4] && items[4] === items[5] && items[3] != ''){

        winner(3 , 4 , 5);
        restartGame();

    }

    // third raw compare

    else if(items[6] === items[7] && items[7] === items[8] && items[6] != ''){

        winner(6 , 7 , 8);
        restartGame();

    }

    // column compare

    // first column compare

    if(items[0] === items[3] && items[3] === items[6] && items[0] != ''){

        winner(0 , 3 , 6);
        restartGame();

    }

    // seconde column compare

    else if(items[1] === items[4] && items[4] === items[7] && items[1] != ''){

        winner(1 , 4 , 7);
        restartGame();

    }

    // third column compare

    else if(items[2] === items[5] && items[5] === items[8] && items[2] != ''){

        winner(2 , 5 , 8);
        restartGame();

    }

    // radius compare

    // first radius

    if(items[0] === items[4] && items[4] === items[8] && items[0] != ''){

        winner(0 , 4 , 8);
        restartGame();

    }

    // seconde radius

    else if(items[2] === items[4] && items[4] === items[6] && items[2] != ''){

        winner(2 , 4 , 6);
        restartGame();

    }

}

function game(id){

    let checkElement = document.getElementById(id);

    if(!playerType && checkElement.innerHTML == ''){

        checkElement.innerHTML = x;
        xTone.play();
        playerType = true;

    }
    else if(playerType && checkElement.innerHTML == ''){

        checkElement.innerHTML = o;
        oTone.play();
        playerType = false;

    }

    compare();

}