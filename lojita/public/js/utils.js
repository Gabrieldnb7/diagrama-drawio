const $ = element => document.querySelector(element)

function getProductIdFromUrl() {
    var url = window.location.href;
    var lastSlashIndex = url.lastIndexOf('/');
    var id = url.substring(lastSlashIndex + 1);

    return id;
}

async function getProducts() {
    const [ masculino, feminino ] = await Promise.all([
        (await fetch("https://fakestoreapi.com/products/category/men's clothing")).json(),
        (await fetch("https://fakestoreapi.com/products/category/women's clothing")).json()        
    ]);

    const todos = [ ...masculino, ...feminino ]
    
    return { todos, masculino, feminino };
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

const userLogo = document.querySelector(".user-icon")
const logoutBtn = document.querySelector("#logout")
const cookies = getCookies()
const accessToken = cookies["access_token"]

if(!accessToken) document.querySelector(".dropdown").classList.remove("dropdown")
userLogo.addEventListener('click', (e) => {
    if(accessToken) return e.preventDefault()
})

logoutBtn.addEventListener('click', () => {
    fetch("http://localhost:3030/auth/logout", {
        method: "POST",
    })

    window.location.href = "/";
})

function getCookies() {
    const cookies = document.cookie.split('; ');
    const cookieObj = {};
  
    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookieObj[name] = value;
    });
  
    return cookieObj;
}