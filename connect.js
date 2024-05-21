let table = document.querySelector("#table");
let Side = true;
let round = true;
let store = document.querySelector("#Store");

for (let index = 0; index < 42; index++) {
    table.innerHTML += `<div class="block" id="${index}"></div>`;
}

let cells = document.querySelectorAll('.block');

cells.forEach(x => {
    x.addEventListener("click", Test);
});

function Test() {
    let Id = Number(this.id);
    console.log(this.id)
    console.log(`Block id ${Id} wanna kys`);
    var ThisCell = document.querySelector(`#${Id}`);
    console.log(ThisCell.style.backgroundColor);
        if (this.style.backgroundColor == '#d3d3d3') {
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

store.addEventListener('click', Morshu)

function Morshu() {
    /* fodder */
    console.log("sorry Link, come back later when you are a little-... mmm.... Richer");
}