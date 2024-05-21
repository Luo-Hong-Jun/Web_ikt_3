let table = document.querySelector("#table");

for (let index = 0; index < 42; index++) {
    table.innerHTML += `<div class="block" id="${index}"></div>`;
}