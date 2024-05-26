let table = document.querySelector("#table");
let Side = true;
let round = true;
let store = document.querySelector("#Store");
let MorshuLine = false;
let storeExit = document.querySelector("#exitShop");
let Win = false;


/*game load */
/*Az X és Y fellettek cserélve véletlen */
for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 7; y++) {
        table.innerHTML += `<div class="block" id="${x}-${y}"></div>`;
    }
}

console.log(document.getElementById("1"));

let cells = document.querySelectorAll('.block');

cells.forEach(x => {
    x.style.backgroundColor = 'lightgray';
    x.addEventListener("click", Test);
});

/*actual game */

function Test() {
    let IdData = this.id;
    let Id1 = IdData.split("-")[0];
    let Id2 = IdData.split("-")[1];
    console.log(this.id)
    console.log(`Block Y: ${Id1} X:${Id2}`);
        if (this.style.backgroundColor == 'lightgray') {
            if (Side == true) {
                this.style.backgroundColor = 'lightblue';
                CheckHorizontally(Id1, Id2, 'lightblue');
                CheckVertically(Id1, Id2, 'lightblue');
                CheckDiagnoally1(Id1, Id2, 'lightblue');
                CheckDiagnoally2(Id1, Id2, 'lightblue');
                Side = false;
                round = false;
                /*Win condition */
                /*tie function */
            }
            else{
                this.style.backgroundColor = 'lightcoral';
                CheckHorizontally(Id1, Id2, 'lightcoral');
                CheckVertically(Id1, Id2, 'lightcoral');
                CheckDiagnoally1(Id1, Id2, 'lightcoral');
                CheckDiagnoally2(Id1, Id2, 'lightcoral');
                Side = true;
                round = false;
            }
        }
        else{
            console.log("Foglalt bitch");
        }
    round = true;
}



function CheckHorizontally(Y, X, color) {
let winCondition = true;
    if (X == 0) {
        for (let e = 0; e < 4; e++) {
            if (document.getElementById(`${Y}-${e}`).style.backgroundColor != color) {
                winCondition = false;
            }
        }
    }
    else if(X == 6){
        for (let e = 6; e > 2; e--) {
            if (document.getElementById(`${Y}-${e}`).style.backgroundColor != color) {
                winCondition = false;
            }
        }
    }
    else{
        let temporaryHelper = 0;
        let biggest = 0;
        for (let e = 0; e < 7; e++) {
            let string = document.getElementById(`${Y}-${e}`).style.backgroundColor;
            if (string == color) {
                temporaryHelper++;
            }
            else{
                if (biggest < temporaryHelper) {
                    biggest = temporaryHelper;
                }
                temporaryHelper = 0;
            }
        }
        if (biggest != 4) {
            winCondition = false;
        }
    }
    console.log(`Horizontal check: ${winCondition}`);
    return winCondition;
}



function CheckVertically(Y, X, color) {
    let winCondition = true;
    if (Y == 0) {
        for (let e = 0; e < 4; e++) {
            if (document.getElementById(`${e}-${X}`).style.backgroundColor != color) {
                winCondition = false;
            }
        }
    }
    else if(Y == 5){
        for (let e = 5; e > 1; e--) {
            if (document.getElementById(`${e}-${X}`).style.backgroundColor != color) {
                winCondition = false;
            }
        }
    }
    else{
        let temporaryHelper = 0;
        let biggest = 0;
        for (let e = 0; e < 6; e++) {
            let string = document.getElementById(`${e}-${X}`).style.backgroundColor;
            if (string == color) {
                temporaryHelper++;
            }
            else{
                if (biggest < temporaryHelper) {
                    biggest = temporaryHelper;
                }
                temporaryHelper = 0;
            }
        }
        if (biggest != 4) {
            winCondition = false;
        }
    }
    console.log(`Vertical check: ${winCondition}`);
    return winCondition;
}


/*Lentről felfelé átló való check */
function CheckDiagnoally1(Y, X, color)
{
    let winCondition = true;
        let temporaryHelper = 0;
        let biggest = 0;
        let tempX = X;
        let tempY = Y;
        while (tempY != 5 && tempX != 0) {
            tempX--;
            tempY++;
        }

        while (tempY != -1 && tempX != 7) { 
            let string = document.getElementById(`${tempY}-${tempX}`).style.backgroundColor;
            if (string == color) {
                temporaryHelper++;
            }
            else{
                if (biggest < temporaryHelper) {
                    biggest = temporaryHelper;
                }
                temporaryHelper = 0;
            }
            tempY--;
            tempX++;
        }
        if (biggest < temporaryHelper) {
            biggest = temporaryHelper;
        }

        if (biggest < 4) {
            winCondition = false;
        }

    console.log(`Diagnoal1 check: ${winCondition}`);
    return winCondition;
}

/*Fentről lefelé átló való check */
function CheckDiagnoally2(Y, X, color)
{
    let winCondition = true;
        let temporaryHelper = 0;
        let biggest = 0;
        let tempX = X;
        let tempY = Y;
        while (tempY != 0 && tempX != 0) {
            tempX--;
            tempY--;
        }

        while (tempY != 6 && tempX != 7) { 
            let string = document.getElementById(`${tempY}-${tempX}`).style.backgroundColor;
            if (string == color) {
                temporaryHelper++;
            }
            else{
                if (biggest < temporaryHelper) {
                    biggest = temporaryHelper;
                }
                temporaryHelper = 0;
            }
            tempY++;
            tempX++;
        }
        if (biggest < temporaryHelper) {
            biggest = temporaryHelper;
        }

        if (biggest < 4) {
            winCondition = false;
        }

    console.log(`Diagnoal2 check: ${winCondition}`);
    return winCondition;
}

function TieCheck() {
    let tie = true;
    if (Win == false) {
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 7; x++) {
                let string = document.getElementById(`${y}-${x}`).style.backgroundColor;
                if (string == 'lightgray') {
                    tie = false;
                }
            }
        }
    }
    return tie;
}

/* Shop */
store.addEventListener('click', Morshu);
storeExit.addEventListener('click', Exit);

function Morshu() {
    document.querySelector("#shop").style.visibility = 'visible';
    let morshu = document.querySelector("#left");
    if (MorshuLine == false) {
        morshu.style.backgroundImage = 'url(/Pics/Open_first.gif)';
        document.querySelector('#audio').innerHTML = '<audio src="/line1.mp3" controls="controls" style="display: none;" autoplay></audio>';
        MorshuLine = true;
    }
    else{
        morshu.style.backgroundImage = 'url(/Pics/Morshu.png)';
    }
}

function Exit() {
    document.querySelector("#shop").style.visibility = 'hidden';
    document.querySelector('#audio').innerHTML = '';
}