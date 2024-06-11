const $ = element => document.querySelector(element)

window.addEventListener('DOMContentLoaded', getProducts)

async function getProducts() {
    const respostas = await Promise.all([
        fetch("https://fakestoreapi.com/products/category/men's clothing"),
        fetch("https://fakestoreapi.com/products/category/women's clothing")        
    ]);
    const [resposta1, resposta2] = respostas;
    const data1 = await resposta1.json();
    const data2 = await resposta2.json();
    console.log('Dados da rota 1:', data1);
    console.log('Dados da rota 2:', data2);
    const product = [...data1, ...data2];
        renderProducts(product);
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