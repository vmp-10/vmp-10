document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos(produtos); // de produtos.js
    atualizaCesto();
});

function carregarProdutos(produtos){
    produtos.forEach(function(produto){
        criarProduto(produto);
    });
}

function criarProdutoCommon(produto){
    const article = document.createElement('article');
    article.classList.add("flex-card");

    const titulo = document.createElement('h2');
    titulo.textContent = produto.title;
    article.append(titulo);
    
    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;
    article.append(imagem);
    
    const preco = document.createElement('p');
    preco.textContent = "Custo total: " + produto.price + "€";
    article.append(preco); 

    const description = document.createElement('p');
    description.textContent = produto.description;
    article.append(description);

    return article;    
}
function criarProduto(produto){
    const article = criarProdutoCommon(produto)
    
    const button = document.createElement('button');
    button.textContent = "+ Adicionar ao cesto";
    article.append(button);

    button.addEventListener('click', function() {
        criaProdutoCesto(produto);
        guardaProdutoCesto(produto);
        atualizaCesto();
    })

    document.querySelector("#produtos").append(article);
}
function criaProdutoCesto(produto){
    const article = criarProdutoCommon(produto)
    
    const button = document.createElement('button');
    button.textContent = "- Remover do cesto";
    article.append(button);
    
    button.addEventListener('click', function() {
        removeProdutoCesto(produto, article);
        atualizaCesto();
    })
    
    document.querySelector("#cesto").append(article);
}

function guardaProdutoCesto(produto){
    const cesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    cesto.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(cesto));   
}

function atualizaCesto() {
    const cestoContainer = document.querySelector("#cesto");
    cestoContainer.innerHTML = ""; // limpa para n ficar sempre aa dar append

    const cesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    cesto.forEach(produto => {
        criaProdutoCesto(produto);
    });

    const total = calculaTotalCesto();
    const p = document.createElement('p');
    p.textContent = "Custo total: " + total + "€";
    cestoContainer.append(p);
}


function calculaTotalCesto(){
    const cesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || []; 
    let totalCesto = 0;

    cesto.forEach(item => {
        totalCesto += item.price;
    });

    return totalCesto;
}

function removeProdutoCesto(produto, article){
    article.remove();

    const cesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    const cestoNovo = cesto.filter(item => item.id !== produto.id); // remove produto por id
    localStorage.setItem('produtos-selecionados', JSON.stringify(cestoNovo));
}