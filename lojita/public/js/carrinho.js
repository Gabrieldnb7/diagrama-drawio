document.addEventListener('DOMContentLoaded', () => {
    const selectAllCheckbox = document.getElementById('selectAll');
    const productCheckboxes = document.querySelectorAll('.product-select');
    const quantityInputs = document.querySelectorAll('.quantity');
    const removeButtons = document.querySelectorAll('.remove-product');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const finalizePurchaseButton = document.getElementById('finalizePurchase');
    const purchaseModal = document.getElementById('purchaseModal');
    const closeModal = document.querySelector('.modal .close');

    function updateSubtotalAndTotal() {
        let subtotal = 0;
        productCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const product = checkbox.closest('.product');
                const price = parseFloat(product.dataset.price);
                const quantity = parseInt(quantityInputs[index].value);
                subtotal += price * quantity;
            }
        });
        subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        totalElement.textContent = `R$ ${subtotal.toFixed(2)}`; // Frete grátis
    }

    selectAllCheckbox.addEventListener('change', () => {
        const isChecked = selectAllCheckbox.checked;
        productCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        updateSubtotalAndTotal();
    });

    productCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSubtotalAndTotal);
    });

    quantityInputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            const product = input.closest('.product');
            const price = parseFloat(product.dataset.price);
            const quantity = parseInt(input.value);
            const productTotal = product.querySelector('.product-total');
            productTotal.textContent = `R$ ${(price * quantity).toFixed(2)}`;
            updateSubtotalAndTotal();
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            product.remove();
            updateSubtotalAndTotal();
        });
    });

    document.getElementById('calculateShipping').addEventListener('click', () => {
        const cep = document.getElementById('cep').value;
        if (/^\d{5}-\d{3}$/.test(cep)) {
            alert('Frete grátis!');
            updateSubtotalAndTotal();
        } else {
            alert('CEP inválido. Por favor, insira um CEP no formato 00000-000.');
        }
    });

    finalizePurchaseButton.addEventListener('click', () => {
        purchaseModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        purchaseModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === purchaseModal) {
            purchaseModal.style.display = 'none';
        }
    });

    updateSubtotalAndTotal();
});
