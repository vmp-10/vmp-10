document.addEventListener('DOMContentLoaded', async function () { //fica async functi0on porqeu o fetch data aguarda uma promise
    const products_url = 'https://deisishop.pythonanywhere.com/products';
    const categories_url = 'https://deisishop.pythonanywhere.com/categories';

    const produtos = await fetchData(products_url);
    const categorias = await fetchData(categories_url);

    if (produtos) {
        carregarProdutos(produtos);
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }
    if (categorias) carregarCategorias(categorias);

    atualizaCesto();
    aplicarFiltros();
    checkout();
});

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Erro HTTP: ${response.status}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function fetchBuy(data) {
    try {
        const response = await fetch('https://deisishop.pythonanywhere.com/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) // aqui são enviados os dados
        })
        if (!response.ok)
            throw new Error(`Erro HTTP: ${response.status}`);

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

document.querySelectorAll('#filtros #filtro, #filtros #ordenar').forEach(el => {
    el.addEventListener('change', aplicarFiltros);
});
document.querySelector('#filtros #pesquisa').addEventListener('input', aplicarFiltros);

function aplicarFiltros() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const filtroCategoria = document.querySelector('#filtros #filtro').value;
    const ordenar = document.querySelector('#filtros #ordenar').value;
    const pesquisa = document.querySelector('#filtros #pesquisa').value.toLowerCase();

    let filtrados = produtos.slice(); // copia o array

    if (filtroCategoria && filtroCategoria !== '') {
        filtrados = filtrados.filter(p => p.category === filtroCategoria);
    }

    if (pesquisa) {
        filtrados = filtrados.filter(p =>
            p.title.toLowerCase().includes(pesquisa) ||
            p.description.toLowerCase().includes(pesquisa)
        );
    }

    switch (ordenar) {
        case 'ascendente':
            filtrados.sort((a, b) => a.price - b.price);
            break;
        case 'decrescente':
            filtrados.sort((a, b) => b.price - a.price);
            break;
    }

    const container = document.querySelector("#produtos .produtos-container");
    container.innerHTML = "";
    filtrados.forEach(p => criarProduto(p));
}


function carregarCategorias(categorias) {
    const filtro = document.querySelector('#filtros #filtro');
    categorias.forEach(function (categoria) {
        const option = document.createElement('option');
        option.value = categoria;
        option.innerHTML = categoria;
        filtro.append(option);
    });
}

function carregarProdutos(produtos) {
    produtos.forEach(function (produto) {
        criarProduto(produto);
    });
}

function criarProdutoCommon(produto) {
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

function criarProduto(produto) {
    const article = criarProdutoCommon(produto)

    const button = document.createElement('button');
    button.textContent = "+ Adicionar ao cesto";
    article.append(button);

    button.addEventListener('click', function () {
        criaProdutoCesto(produto);
        guardaProdutoCesto(produto);
        atualizaCesto();
    })

    document.querySelector("#produtos .produtos-container").append(article);
}

function criaProdutoCesto(produto) {
    const article = criarProdutoCommon(produto)

    const button = document.createElement('button');
    button.textContent = "- Remover do cesto";
    article.append(button);

    button.addEventListener('click', function () {
        removeProdutoCesto(produto, article);
        atualizaCesto();
    })

    document.querySelector("#cesto .cesto-container").append(article);
}

function getCesto() { // desde qwue mudei para a API, tenho que obter o cesto diferente
    const cesto = localStorage.getItem('produtos-selecionados');
    if (!cesto) return [];
    try {
        return JSON.parse(cesto);
    } catch {
        localStorage.removeItem('produtos-selecionados');
        return [];
    }
}

function guardaProdutoCesto(produto) {
    const cesto = getCesto();
    cesto.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(cesto));
}

function atualizaCesto() {
    const cestoContainer = document.querySelector("#cesto .cesto-container");
    cestoContainer.innerHTML = ""; // limpa para n ficar sempre aa dar append

    const custo = document.querySelector('#checkout .custo');
    if (custo) custo.remove(); // remove total antigo se existir

    const cesto = getCesto();
    cesto.forEach(produto => {
        criaProdutoCesto(produto);
    });

    const total = calculaTotalCesto();
    const p = document.createElement('p');
    p.classList.add('custo');
    p.textContent = "Custo total: " + total + "€";
    document.querySelector('#checkout').append(p);
}

function checkout() {
    const button = document.querySelector('#checkout #buy');
    const student = document.querySelector('#checkout #student-check');
    const cupao = document.querySelector('#checkout #cupao');

    button.addEventListener('click', async function () {
        const cesto = getCesto();

        if (cesto.length === 0) {
            alert("O cesto está vazio!");
            return;
        }

        const productIDs = cesto.map(p => p.id);

        const data = {
            products: productIDs,
            student: student.checked,
            coupon: cupao.value.trim() || null,
            name: name || "Sem nome"
        };


        const response = await fetchBuy(data);

        if (response) {
            localStorage.removeItem('produtos-selecionados');
            atualizaCesto();
            alert(`
                Compra efetuada com sucesso!
                Referência: ${response.reference}
                Total: ${response.totalCost}€
                Mensagem: ${response.example}
            `);
        } else {
            alert("Falha ao processar a compra. Tenta novamente.");
        }
    });
}

function calculaTotalCesto() {
    const cesto = getCesto();
    let totalCesto = 0;

    cesto.forEach(item => {
        totalCesto += item.price;
    });

    return totalCesto;
}

function removeProdutoCesto(produto, article) {
    article.remove();

    const cesto = getCesto();
    const cestoNovo = cesto.filter(item => item.id !== produto.id); // remove produto por id
    localStorage.setItem('produtos-selecionados', JSON.stringify(cestoNovo));
}