const $ = element => document.querySelector(element)

function getProductIdFromUrl() {
    // Obtém a parte da URL após a última barra '/'
    var url = window.location.href;
    var lastSlashIndex = url.lastIndexOf('/');
    var id = url.substring(lastSlashIndex + 1);

    // Retorna o ID obtido da URL
    return id;
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

function getProduto(){
    let produto;
    fetch(`https://fakestoreapi.com/products/${getProductIdFromUrl()}`)
              .then(res=>res.json())
              .then(result=>{
                  renderProduto(result)
              });
    }


document.addEventListener("DOMContentLoaded", () => {
    const decreaseButton = document.getElementById("decrease");
    const increaseButton = document.getElementById("increase");
    const quantitySpan = document.getElementById("quantity");
    const addToCartButton = document.getElementById("addToCart");
    const sizeButtons = document.querySelectorAll('.size-button');
    getProduto();

    let quantity = 1;

    decreaseButton.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        }
    });

    increaseButton.addEventListener("click", () => {
        quantity++;
        quantitySpan.textContent = quantity;
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