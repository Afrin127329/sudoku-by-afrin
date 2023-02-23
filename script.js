let board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

let solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

let numberSelected = null;
let tileSelected = null;
let errors = 0;
let startTime;

window.onload = function(){
    startGame();
}

function startGame(){

    // show the numbers 1-9
    for(let i = 1; i<=9; i++){
        const number = document.createElement('div');
        number.id = i;
        number.innerText = i;
        number.classList.add('number');
        number.addEventListener('click', setNumber);
        document.getElementById('digits').appendChild(number);
    }

    // show the tiles 
    for(let r=0;r<9;r++){
        for(let c=0;c<9;c++){
            const tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            if(board[r][c] != "-"){
                tile.innerText = board[r][c];
            }
            tile.addEventListener('click', setTile);
            tile.classList.add('tile');
            document.getElementById('board').append(tile);
        }

    }

    // Start the timer
    startTimer();
}

const setNumber = function (){
    if(numberSelected != null){
        numberSelected.classList.remove('number-selected')
    }
    numberSelected = this;
    numberSelected.classList.add('number-selected');
}

 const setTile = function (){
    if(numberSelected){
        if(this.innerText != ''){
            return;
        }

        // coords will be an array of rows and columns like ['0', '0']
        let coords = this.id.split('-');
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        if(solution[r][c] == numberSelected.id){
            this.innerText = numberSelected.id;
        }
        else{
            // error will increment by upto 5
            errors += 1;
            document.getElementById('err').innerText =  errors;
            if(errors === 5){
                console.log('Lost');
                errors = 0;
                lostTheGame();
                document.getElementById('err').innerText =  errors;
            }
        }
    }
}

function startTimer() {
    const timer = document.getElementById('time');
    timer.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime(){
    return parseInt(Math.floor(new Date() - startTime) / 1000);
}

function lostTheGame(){
        document.querySelector('.popup').style.display = 'block';
        document.querySelector("#close").addEventListener("click", function(){
            document.querySelector(".popup").style.display = "none";
            startTimer();
        });
}

