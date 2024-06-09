let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

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

