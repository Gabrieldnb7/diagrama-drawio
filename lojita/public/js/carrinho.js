const cep = document.getElementById('cep');
Inputmask({ mask: "99999-999" }).mask(cep);

document.addEventListener('DOMContentLoaded', async () => {
    const catalogo = await getProducts()
    await loadCheckout(catalogo.todos)

    const selectAllCheckbox = document.getElementById('selectAll');
    const productCheckboxes = document.querySelectorAll('.product-select');
    const quantityInputs = document.querySelectorAll('.quantity');
    const removeButtons = document.querySelectorAll('.remove-product');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const finalizeBtn = document.getElementById('finalizePurchase');

    let checkedProducts = []

    selectAllCheckbox.addEventListener('change', () => {
        const isChecked = selectAllCheckbox.checked;
        productCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        updateSubtotalAndTotal();
    });

    finalizeBtn.addEventListener('click', function() {
        const cep = document.getElementById('cep').value

        if(checkedProducts.length === 0) return showPopup("AVISO!", "Nenhum item foi selecionado!")
        if(cep.includes('_') || cep.length === 0) return showPopup("AVISO!", "Preencha o CEP corretamente!")

        checkedProducts.forEach(product => {
            const cartItemId = product.getAttribute("data-item-id")

            fetch(`http://localhost:3030/cart/items/${cartItemId}`, {
                method: "DELETE",
            }).then(response => {
                if(!response.ok) {
                    alert("Erro ao deletar item.")
                }

                product.remove()
                updateSubtotalAndTotal();
            })
        })

        showPopup("SUCESSO!","Sua compra foi aprovada!! :)")
    })
    
    productCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSubtotalAndTotal);
    });
    
    quantityInputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            const product = input.closest('.product');
            const price = parseFloat(product.dataset.price);
            const quantity = parseInt(input.value);
            const productTotal = product.querySelector('.product-total');

            const itemId = product.getAttribute("data-item-id")
            const cartId = product.getAttribute("data-cart-id")
            console.log(itemId, cartId)
            fetch(`http://localhost:3030/cart/items/${itemId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartId: parseInt(cartId) , quantity: quantity })
            }).then(response => {
                if(!response.ok) {
                    alert("Erro ao atualizar item." + response.status)
                }

                productTotal.textContent = `R$ ${(price * quantity).toFixed(2)}`;
                updateSubtotalAndTotal();
            })
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const cartItemId = product.getAttribute("data-item-id")

            fetch(`http://localhost:3030/cart/items/${cartItemId}`, {
                method: "DELETE",
            }).then(response => {
                if(!response.ok) {
                    alert("Erro ao deletar item.")
                }

                product.remove()
                updateSubtotalAndTotal();
            })
        });
    });

    document.getElementById('calculateShipping').addEventListener('click', () => {
        const cep = document.getElementById('cep');
        Inputmask({ mask: "99999-999" }).mask(cep);

        if (/^\d{5}-\d{3}$/.test(cep.value)) {
            alert('Frete grátis!');
            updateSubtotalAndTotal();
        } else {
            alert('CEP inválido. Por favor, insira um CEP no formato 00000-000.');
        }
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === purchaseModal) {
            purchaseModal.style.display = 'none';
        }
    });

    function updateSubtotalAndTotal() {
        let subtotal = 0;
        checkedProducts = []
        productCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const product = checkbox.closest('.product');
                const price = parseFloat(product.dataset.price);
                const quantity = parseInt(quantityInputs[index].value);
                subtotal += price * quantity;

                checkedProducts.push(product)
            } 
        });
        subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        totalElement.textContent = `R$ ${subtotal.toFixed(2)}`; // Frete grátis
    }
});


async function loadCheckout(catalogo) {
    const { cart } = await (await fetch("http://localhost:3030/cart/")).json()
    const { items } = cart
    
    items.forEach(item => {
        const { id, productId, quantity } = item
        let [ product ] = catalogo.filter(product => product.id === productId)
        
        const container = document.getElementById("checkout")
        const checkoutLine = document.createElement("div");
        checkoutLine.classList.add("product")
        checkoutLine.setAttribute('data-price', product.price)
        checkoutLine.setAttribute('data-item-id', item.id)
        checkoutLine.setAttribute('data-cart-id', cart.id)
        
        checkoutLine.innerHTML = `
            <li>
                <input type="checkbox" class="product-select">
                <span>${product.title}</span>
            </li>

            <li>
                <input type="number" class="quantity" value="${quantity}" min="1">
                <button class="remove-product">Remover</button>
            </li>
            
            <li>
                <span class="product-total">R$ ${product.price * quantity}</span>
            </li>
        `
        
        container.appendChild(checkoutLine);
    })
}

