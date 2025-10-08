
//evento 1
const passa = document.querySelector('#passa');
function trocaTexto(texto){
    passa.textContent = texto;
}
passa.addEventListener('mouseover', () => trocaTexto('1. Obrigado por passares!'));
passa.addEventListener('mouseout', () => trocaTexto('1. passa por aqui!'));


//evento2
const pintar = document.querySelector('#pintar');
function trocaCor(cor){
    pintar.style.color = cor;
}
document.querySelector('#butao1').addEventListener('click', () => trocaCor('Red'));
document.querySelector('#butao2').addEventListener('click', () => trocaCor('Green'));
document.querySelector('#butao3').addEventListener('click', () => trocaCor('Blue'));

//evento3
let i = 0;
const input = document.querySelector("#input");
const colors = ["red", "brown", "pink", "yellow", "gray"];
input.addEventListener("input", function () {
    input.style.backgroundColor = colors[i];
    i = (i + 1) % colors.length;
});

//evvento 4
const bgcolor = document.querySelector("#bgcolor");
const submit = document.querySelector("#submit");
submit.addEventListener("click", function () {
    document.body.style.backgroundColor = bgcolor.value;
});

// eventp 5
let counter = 0;
const contador = document.querySelector("#contador");
const incrementar = document.querySelector("#incrementar");
incrementar.addEventListener("click", function () {
    counter++;
    contador.innerText = counter;
});