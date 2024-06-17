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
  setTimeout(showSlides, 2000); 
}

window.addEventListener('DOMContentLoaded', async () => {
    let produtos = await getProducts()   

    renderProducts('#mens-products', produtos.masculino.slice(0, 3));
    renderProducts('#womens-products', produtos.feminino.slice(0, 3));
})

function renderProducts(containerSelector, products) {
    const container = $(containerSelector);

    container.innerHTML = '';
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
        `;
    });
}