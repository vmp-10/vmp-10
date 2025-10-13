
//evento 1
const passa = document.querySelector('#passa');
function trocaTexto(texto){
    passa.textContent = texto;
}
passa.addEventListener('mouseover', () => trocaTexto('1. Obrigado por passares!'));
passa.addEventListener('mouseout', () => trocaTexto('1. passa por aqui!'));


//evento2
const pinta = document.querySelector('#pinta p');
function trocaCor(cor) {
    pinta.style.color = cor;
}
document.querySelector('#btn-r').addEventListener('click', () => trocaCor('Red'));
document.querySelector('#btn-g').addEventListener('click', () => trocaCor('Green'));
document.querySelector('#btn-b').addEventListener('click', () => trocaCor('Blue'));

//evento3
let i = 0;
const input = document.querySelector("#input");
const cores = ["red", "brown", "pink", "yellow", "gray"];
input.addEventListener("input", function () {
    input.style.background = cores[i];
    i = ++i % cores.length;
});

//evento 4
document.querySelector('select').onchange = function() {
    document.querySelector('#selects p').style.color = this.value;
}

//evvento 5
const colorir = document.querySelector("#colorir");
const color = document.querySelector("#color");
const submit = document.querySelector("#submit");
submit.addEventListener("click", function () {
    colorir.style.background = color.value;
});

// eventp 6
if (!localStorage.getItem('counter')){
    localStorage.setItem('counter', 0);
}

const contador = document.querySelector("#contador");
const incrementar = document.querySelector("#incrementar");
function count() {
    let counter = localStorage.getItem('counter');
    counter++;
    contador.innerText = counter;
    localStorage.setItem('counter', counter);
}
incrementar.addEventListener('click', count);
contador.innerText = localStorage.getItem('counter');

//evento 7
const clock_count = document.querySelector("#clock-count");
if (!localStorage.getItem('clock')){
    localStorage.setItem('clock', 0);
}
function clock() {
    let tick = localStorage.getItem('clock');
    tick++;
    clock_count.innerText = tick;
    localStorage.setItem('clock', tick);
}
setInterval(clock, 1000);