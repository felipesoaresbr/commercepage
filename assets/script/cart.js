document.addEventListener('contentLoaded', () => {
    const currentlyCartAmount = document.querySelector('.cartAmount');
    const cartAside = document.querySelector('.cart-aside');
    const cartContainer = document.querySelector('.cart-container');
    const clearButton = document.querySelector('.clear-cart');

    let cartAmount = parseInt(localStorage.getItem('amount')) || 0;
    const prices = localStorage.getItem('prices');
    const priceArray = prices ? JSON.parse(prices) : [];

    function updateCartDisplay() {
        if (cartAmount === 0) {
            currentlyCartAmount.style.display = 'none';
            cartAside.style.display = 'none';
            cartContainer.innerHTML = '<article class="cart-is-empty"><p>O seu carrinho está vazinho, continue <a href= "commerce/index.html">comprando</a></p></article>';
        } else {
            currentlyCartAmount.style.display = 'flex';
            cartAside.style.display = 'block';
            currentlyCartAmount.textContent = cartAmount;
            loadProducts();
        }
    }

    function loadProducts() {
        cartContainer.innerHTML = '';

        for (let i = 0; i < cartAmount; i++) {
            cartContainer.innerHTML += `
                <article class="in-cart-product">
                    <div class="product-image"></div>
                    <section class="product-content">
                        <header class="product-header">
                            Nome do Produto
                            <span class="product-price">${priceArray[i]}</span>
                        </header>
                        <button class="delete-product">
                            <img src="./assets/icons/trash3.svg">
                        </button>
                    </section>
                </article>
            `;
        }
    }

    function totalPrice() {
        const totalPrice = document.querySelector('.total-price');

        const formattedPrices = priceArray.map(price => {
            let cleanPrice = price.replace('R$', '').replace(/\s/g, '').replace(',', '.');
            return Number(cleanPrice);
        });

        const total = formattedPrices.reduce((total, value) => total + value, 0);
        totalPrice.textContent = `R$${total.toFixed(2).replace('.', ',')}`;
    }

    function clearCart() {
        clearButton.addEventListener('click', () => {
            localStorage.removeItem('amount');
            localStorage.removeItem('prices');
            cartAmount = 0;

            updateCartDisplay();
        });
    }

    updateCartDisplay();
    totalPrice();
    clearCart(); 
});
