let table = document.querySelector("#table");
let Side = true;
let round = true;

for (let index = 0; index < 42; index++) {
    table.innerHTML += `<div class="block" id="${index}"></div>`;
}

let cells = document.querySelectorAll('.block');

cells.forEach(x => {
    x.addEventListener("click", Test);
});

function Test() {
    console.log(`Block id ${this.id} wanna kys`);
    console.log(this.style.backgroundColor);
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