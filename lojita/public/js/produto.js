function getProduto(){
    fetch(`https://fakestoreapi.com/products/${getProductIdFromUrl()}`)
              .then(res=>res.json())
              .then(result=>{
                  renderProduto(result)
              });
}

function renderProduto(objeto){
    $("#prodImg").innerHTML = `
    <img style="max-width:180px;" src="${objeto.image}" alt="Imagem produto">
    `
    $("#prodNome").innerHTML = `
    <h2 style="text-align:center">${objeto.title}</h2>
    `
    $("#prodDesc").innerHTML = `
    <p>${objeto.description}</p>
    `

    $("#prodPrice").innerHTML = "De " + objeto.price.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    })

    let discounted = Math.round(objeto.price - objeto.price * 0.1)
    $("#prodDiscount").innerHTML = "Por " + discounted.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    })
    $("#prodInstallment").innerHTML = "Até 6x de " + (objeto.price / 6).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    })
}

let produto = {
    productId: getProductIdFromUrl(),
    quantity: 1
}

if(accessToken) {
    fetch("http://localhost:3030/cart")
        .then(response => response.json())
        .then(data => {
            const { id } = data.cart
            produto.cartId = id
        })
}

document.addEventListener("DOMContentLoaded", () => {
    const decreaseButton = document.getElementById("decrease");
    const increaseButton = document.getElementById("increase");
    const quantitySpan = document.getElementById("quantity");
    const sizeButtons = document.querySelectorAll('.size-button');
    getProduto();

    decreaseButton.addEventListener("click", () => {
        if (produto.quantity > 1) {
            quantitySpan.textContent = --produto.quantity;
        }
    });

    increaseButton.addEventListener("click", () => {
        quantitySpan.textContent = ++produto.quantity;
    });
    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remover a classe 'selected' de todos os botões
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            // Adicionar a classe 'selected' ao botão clicado
            button.classList.add("selected");
            // Atualizar o tamanho selecionado
            selectedSize = button.getAttribute("data-size");
        });
    });
});


const addToCartButton = document.getElementById("addToCart");

addToCartButton.addEventListener('click', e => {
    if(!accessToken) return window.location.href = "/login";

    fetch("http://localhost:3030/cart/items/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    }).then(response => {
        if(response.ok) {
            showPopup("SUCESSO!", "Item adicionado ao carrinho!")
        } else {
            response.json().then( data  => {
                const { msg } = data
                showPopup("AVISO!", msg)
            })
        }

    })
})

const closeModal = document.querySelector('.popup-close');
closeModal.addEventListener('click', () => {
    const popup = document.querySelector('.popup-modal');
    popup.style.display = 'none';
});

function showPopup(title, msg) {
    const popup = document.querySelector('.popup-modal');

    popup.querySelector('.title').innerHTML = title
    popup.querySelector('.description').innerHTML = msg
    popup.style.display = 'block'
}