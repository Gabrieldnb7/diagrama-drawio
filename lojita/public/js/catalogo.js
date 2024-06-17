window.addEventListener('DOMContentLoaded', async () => {
    let category = getProductIdFromUrl()
    let produtos = await getProducts()   

    switch(category) {
        case("feminino"):
            renderProducts(produtos.feminino)
            break
        
        case("masculino"):
            renderProducts(produtos.masculino)
            break
        
        default:
            renderProducts(produtos.todos)
            break
    }
})