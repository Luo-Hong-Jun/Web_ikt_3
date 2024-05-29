let table = document.querySelector("#table");
let Side = true;
let store = document.querySelector("#Store");
let MorshuLine = false;
let storeExit = document.querySelector("#exitShop");
let Win = false;
const startButton = document.querySelector("#StartButton");
let morshu = document.querySelector("#left");
let shop = document.querySelector("#shop");
let audio = document.querySelector('#audio');
let creditCardDataValid = false;

/*Shop select img */
let bgimgs = document.querySelectorAll('.img');
bgimgs.forEach(x =>{
    x.addEventListener('click', CreditCheck);
});

document.querySelector('#InfoSend').addEventListener('click', () => {
    creditCardDataValid = Check();
});

function CreditCheck() {
    if (creditCardDataValid == true) {
        InstallBG(this.id);
        morshu.style.backgroundImage = 'url(/Pics/Morshu.png)';
    }
    else{
        morshu.style.backgroundImage = 'url(/Pics/ComeBackLater.gif)';
        audio.innerHTML = '<audio src="/line2.mp3" controls="controls" style="display: none;" autoplay></audio>';
    }
};

function Check() {
    let condition = true;
    let BankCard = document.querySelector('#creditCard').value;
    let CVC = document.querySelector('#CVC').value;
    let ExpDate = document.querySelector('#ExpDate').value;
    let Name = document.querySelector('#Name').value;
    console.log(BankCard);
    console.log(CVC);
    console.log(ExpDate);
    console.log(Name);
    if (BankCard.split(' ').length == 4) {
    }
    else{
        condition = false;
    }
    if (CVC.length == 3 && /^\d+$/.test(CVC)) {
    }
    else{
        condition = false;
    }
    if (ExpDate.length == 5) {
        
    }
    else{
        condition = false;
    }
    if (Name.length == null) {
        condition = false;
    }
    return condition;
}

function InstallBG(name) {
    document.body.style.backgroundImage = `url('/Pics/${name}.png')`;
}

/*game load */
/*Az X és Y fellettek cserélve véletlen */

function Load() {
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 7; y++) {
            table.innerHTML += `<div class="block" id="${x}-${y}"></div>`;
        }
    }

    let cells = document.querySelectorAll('.block');

    cells.forEach(x => {
        x.style.backgroundColor = 'lightgray';
        x.addEventListener("click", Test);
    });
}


/*actual game */

function Test() {
    let IdData = this.id;
    let Id1 = IdData.split("-")[0];
    let Id2 = IdData.split("-")[1];
    console.log(this.id)
    console.log(`Block Y: ${Id1} X:${Id2}`);
        if (this.style.backgroundColor == 'lightgray') {
            console.log('Happened');
            if (Id1 == 5) { 
                if (Side == true) {
                    this.style.backgroundColor = 'lightblue';
                    CheckHorizontally(Id1, Id2, 'lightblue');
                    CheckVertically(Id1, Id2, 'lightblue');
                    CheckDiagnoally1(Id1, Id2, 'lightblue');
                    CheckDiagnoally2(Id1, Id2, 'lightblue');
                    Side = false;
                    /*Win condition check*/
                    if (Win == true) {
                        Reset('blue');
                    }
                    else if (TieCheck()) {
                        Reset('No one');
                    }
                }
                else{
                    this.style.backgroundColor = 'lightcoral';
                    CheckHorizontally(Id1, Id2, 'lightcoral');
                    CheckVertically(Id1, Id2, 'lightcoral');
                    CheckDiagnoally1(Id1, Id2, 'lightcoral');
                    CheckDiagnoally2(Id1, Id2, 'lightcoral');
                    Side = true;
                    if (Win == true) {
                        Reset('red');
                    }
                    else if (TieCheck()) {
                        Reset('No one');
                    }
                }
            }
            else if(document.getElementById(`${Number(Id1)+1}-${Id2}`).style.backgroundColor != 'lightgray'){
                if (Side == true) {
                    this.style.backgroundColor = 'lightblue';
                    CheckHorizontally(Id1, Id2, 'lightblue');
                    CheckVertically(Id1, Id2, 'lightblue');
                    CheckDiagnoally1(Id1, Id2, 'lightblue');
                    CheckDiagnoally2(Id1, Id2, 'lightblue');
                    Side = false;
                    if (Win == true) {
                        Reset('blue');
                    }
                    else if (TieCheck()) {
                        Reset('No one');
                    }
                }
                else{
                    this.style.backgroundColor = 'lightcoral';
                    CheckHorizontally(Id1, Id2, 'lightcoral');
                    CheckVertically(Id1, Id2, 'lightcoral');
                    CheckDiagnoally1(Id1, Id2, 'lightcoral');
                    CheckDiagnoally2(Id1, Id2, 'lightcoral');
                    Side = true;
                    if (Win == true) {
                        Reset('red');
                    }
                    else if (TieCheck()) {
                        Reset('No one');
                    }
                }
            }
            
        }
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
        if (biggest < temporaryHelper) {
        biggest = temporaryHelper;
        }
        if (biggest < 4) {
            winCondition = false;
        }
    }

    if (winCondition == true) {
        Win = true;
    }
    console.log(`Horizontal check: ${winCondition}`);
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
                console.log('happened');
                console.log(temporaryHelper)
            }
            else{
                if (biggest < temporaryHelper) {
                    biggest = temporaryHelper;
                }
                temporaryHelper = 0;
            }
        }
        if (biggest < temporaryHelper) {
            biggest = temporaryHelper;
        }
        if (biggest < 4) {
            winCondition = false;
        }
    }
    if (winCondition == true) {
        Win = true;
    }
    console.log(`Vertical check: ${winCondition}`);
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

        if (winCondition == true) {
            Win = true;
        }
    console.log(`Diagnoal1 check: ${winCondition}`);
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

        if (winCondition == true) {
            Win = true;
        }
    console.log(`Diagnoal2 check: ${winCondition}`);
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
    console.log('tie:');
    console.log(tie);
    return tie;
}

/* Shop */
store.addEventListener('click', Morshu);
storeExit.addEventListener('click', Exit);

function Morshu() {
    store.style.visibility = 'hidden';
    shop.style.visibility = 'visible';
    if (MorshuLine == false) {
        morshu.style.backgroundImage = 'url(/Pics/Open_first.gif)';
        audio.innerHTML = '<audio src="/line1.mp3" controls="controls" style="display: none;" autoplay></audio>';
        MorshuLine = true;
    }
    else{
        morshu.style.backgroundImage = 'url(/Pics/Morshu.png)';
    }
}

function Exit() {
    shop.style.visibility = 'hidden';
    store.style.visibility = 'visible';
    audio.innerHTML = '';
}

/*Start game */

startButton.addEventListener('click', StartUp);

function StartUp() {
    Load();
    table.style.visibility = 'visible';
    startButton.style.visibility = 'hidden';
    store.style.visibility = 'hidden';
    document.querySelector('#Winner').style.visibility = 'hidden';
}

/*Reset Game */
function Reset(WinnerName) {
    Win = false;
    Side = true;
    table.innerHTML = '';
    document.querySelector('#Winner').innerHTML = `${WinnerName} won!`;
    document.querySelector('#Winner').style.visibility = 'visible';
    table.style.visibility = 'hidden';
    startButton.style.visibility = 'visible';
    store.style.visibility = 'visible';
}