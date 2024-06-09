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
                <a href="/produto/${product.id}" class="btnProduto">
                    <div class="produto">
                        <div class="imagem">
                            <img src="${product.image}">
                        </div>
                        <div class="product-caption">
                            <div class="nome">
                                ${product.title}
                            </div>
                            <div class="preco">
                                De: ${product.price.toLocaleString('pt-br', { style: "currency", currency: "BRL"})}
                            </div>
                            <div class="promocao">
                                Por: ${Math.round(product.price - product.price * 0.1).toLocaleString('pt-br', { style: "currency", currency: "BRL"})}
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        `
    })
}