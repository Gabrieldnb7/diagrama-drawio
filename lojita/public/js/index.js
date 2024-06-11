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

const $ = element => document.querySelector(element);

window.addEventListener('DOMContentLoaded', getProducts);

async function getProducts() {
    const responses = await Promise.all([
        fetch("https://fakestoreapi.com/products/category/men's clothing"),
        fetch("https://fakestoreapi.com/products/category/women's clothing")
    ]);
    const [menData, womenData] = await Promise.all(responses.map(response => response.json()));

    const menProducts = menData.slice(0, 3);
    const womenProducts = womenData.slice(0, 3);

    renderProducts('#mens-products', menProducts);
    renderProducts('#womens-products', womenProducts);
}

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

document.addEventListener("DOMContentLoaded", function() {
    // Obter elementos do modal
    var modal = document.getElementById("cartModal");
    var btn = document.querySelector(".carrinho");
    var span = document.getElementsByClassName("close")[0];
    var goToCartBtn = document.getElementById("goToCart");

    // Quando o usuário clicar no ícone do carrinho, abre o modal
    btn.addEventListener("click", function(event) {
        event.preventDefault();  // Prevenir o comportamento padrão
        modal.style.display = "block";
    });

    // Quando o usuário clicar no "x", fecha o modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // Quando o usuário clicar fora do modal, fecha o modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Ir para a página do carrinho quando clicar no botão "Ir para o Carrinho"
    goToCartBtn.addEventListener("click", function() {
        window.location.href = "/carrinho";
    });

    // Função para atualizar o subtotal
    function updateSubtotal() {
        var cartItems = document.getElementById("cartItems").children;
        var subtotal = 0;
        for (var i = 0; i < cartItems.length; i++) {
            var itemPrice = parseFloat(cartItems[i].getAttribute('data-price'));
            subtotal += itemPrice;
        }
        document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    }

    // Exemplo de como adicionar um item ao carrinho
    function addItemToCart(name, price) {
        var ul = document.getElementById("cartItems");
        var li = document.createElement("li");
        li.textContent = name + " - R$ " + price;
        li.setAttribute('data-price', price);
        ul.appendChild(li);
        updateSubtotal();
    }

    // Exemplo de chamada da função addItemToCart
    addItemToCart('Produto 1', 10.00);
    addItemToCart('Produto 2', 20.00);
});
