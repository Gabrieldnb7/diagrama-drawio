const $ = element => document.querySelector(element)

window.addEventListener('DOMContentLoaded', getProducts)

function getProducts() {
    fetch("https://fakestoreapi.com/products/category/women's clothing")
        .then(response => response.json())
        .then(products => {
            renderProducts(products);
        })
}

function renderProducts(products) {
    const container = $('#products-list')

    container.innerHTML = ''
    products.forEach(product => {
        container.innerHTML += `
            <li class="prod">
                <a class="btnProduto">
                    <div class="produto">
                        <div class="imagem">
                            <img src="${product.image}">
                        </div>
                        <div class="nome">
                            ${product.title}
                        </div>
                        <div class="preco">
                            De: R$89,99
                        </div>
                        <div class="promocao">
                            Por: R$59,99
                        </div>
                    </div>
                </a>
            </li>
        `
    })
}