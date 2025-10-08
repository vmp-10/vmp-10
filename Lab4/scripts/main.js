
//evento 1
document.querySelector('#hover-text').addEventListener('mouseenter', function () {
    const element = document.querySelector('#hover-text');
    element.style.color = 'red';
});

document.querySelector('#hover-text').addEventListener('mouseleave', function () {
    const element = document.querySelector('#hover-text');
    element.style.color = 'black';
});


//evento2
const pintar = document.querySelector('#pintar');
document.querySelector('#butao1').addEventListener('click', function () {
    pintar.style.color = 'Red';
});
document.querySelector('#butao2').addEventListener('click', function () {
    pintar.style.color = 'Green';
});
document.querySelector('#butao3').addEventListener('click', function () {
    pintar.style.color = 'Blue';
});

//evento3
const input = document.querySelector("#input");
const colors = ["red", "brown", "pink", "yellow", "gray"];
let i = 0;
input.addEventListener("input", function () {
    input.style.backgroundColor = colors[i];
    i = (i + 1) % colors.length;
});

//evvento 4
const bgcolor = document.querySelector("#bgcolor");
const sendcolor = document.querySelector("#sendcolor");
sendcolor.addEventListener("click", function () {
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