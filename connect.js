let table = document.querySelector("#table");
let Side = true;
let round = true;
let store = document.querySelector("#Store");
let MorshuLine = false;

for (let index = 0; index < 42; index++) {
    table.innerHTML += `<div class="block" id="${index}"></div>`;
}

console.log(document.getElementById("1"))

let cells = document.querySelectorAll('.block');

cells.forEach(x => {
    x.style.backgroundColor = 'lightgray';
    x.addEventListener("click", Test);
});

function Test() {
    let Id = this.id;
    console.log(this.id)
    console.log(`Block id ${Id} wanna kys`);
    console.log(this.style.backgroundColor);
        if (this.style.backgroundColor == 'lightgray') {
            if (Side == true) {
                this.style.backgroundColor = 'blue';
                Side = false;
                round = false;
            }
            else{
                this.style.backgroundColor = 'red';
                Side = true;
                round = false;
            }
        }
        else{
            console.log("Foglalt bitch");
        }
    round = true;
}

store.addEventListener('click', Morshu);

function Morshu() {
    /* fodder */
    document.querySelector("#shop").style.visibility = 'visible';
    let morshu = document.querySelector("#left");
    if (MorshuLine == false) {
        morshu.style.backgroundImage = 'url(/Web_ikt_3/Pics/Open_first.gif)';
        document.querySelector('#audio').innerHTML = '<audio src="/Web_ikt_3/line1.mp3" controls="controls" style="display: none;" autoplay></audio>';
    }
}