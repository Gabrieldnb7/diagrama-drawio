document.addEventListener("DOMContentLoaded", async function() {
    const catalogo = await getProducts()
    if(!accessToken) return
    loadCart(catalogo.todos)
});

// Obter elementos do modal
const modal = document.getElementById("cartModal");
const btn = document.querySelector(".carrinho");
const span = document.getElementsByClassName("close")[0];
const goToCartBtn = document.getElementById("goToCart");

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
    if(!accessToken) return window.location.href = "/login";
    window.location.href = "/carrinho";
});

async function loadCart(catalogo) {
    const { cart } = await (await fetch("http://localhost:3030/cart/")).json()
    const { items } = cart

    items.forEach(item => {
        const { productId, quantity } = item
        let [ product ] = catalogo.filter(product => product.id === productId)

        const cartItems = document.getElementById("cartItems")
        const itemForCart = document.createElement("li");

        itemForCart.textContent = `${product.title} (${quantity}) - R$ ${product.price * quantity}`; 
        itemForCart.setAttribute('data-price', product.price);
        itemForCart.setAttribute('data-quantity', quantity);

        cartItems.appendChild(itemForCart);
    })

    updateSubtotal();
}

// Função para atualizar o subtotal
function updateSubtotal() {
    var cartItems = document.getElementById("cartItems").children;

    var subtotal = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var itemPrice = parseFloat(cartItems[i].getAttribute('data-price'));
        var itemQuantity = parseFloat(cartItems[i].getAttribute('data-quantity'));
        subtotal += itemPrice * itemQuantity;
    }
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
}
