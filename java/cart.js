document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.getElementById('cart-summary');
    const totalCartPriceElement = document.getElementById('total-cart-price');
    const purchaseButton = document.getElementById('purchase-button');

    const modal = document.getElementById('checkout-modal');
    const modalTotalPrice = document.getElementById('modal-total-price');
    const closeButton = document.querySelector('.close-button');
    const confirmCheckoutButton = document.getElementById('confirm-checkout-button');

    function updateCartUI() {
        if (cartItems.length > 0) {
            let grandTotal = 0;
            cartItemsContainer.innerHTML = '';

            cartItems.forEach((cartItem, index) => {
                const price = parseFloat(cartItem.itemPrice.replace(/[^0-9.-]+/g, ""));
                const quantity = parseInt(cartItem.quantity, 10);
                const itemTotalPrice = (price * quantity).toFixed(2);
                grandTotal += parseFloat(itemTotalPrice);

                const itemHtml = `
                <div class="cart-item">
                    <img src="${cartItem.itemImage}" alt="Item Image" class="cart-item-image">
                    <div class="item-details-group">
                        <div class="item-description">
                            <h1>${cartItem.itemName}</h1>
                            <h2>Price: R${price.toFixed(2)}</h2>
                            <p>Size: ${cartItem.size}</p>
                            <p>Quantity: ${quantity}</p>
                        </div>
                    </div>
                    <div class="price-and-actions">
                        <h1 class="item-total-price">Total Price: R${itemTotalPrice}</h1>
                        <button class="delete-button" data-index="${index}">Remove from Cart</button>
                    </div>
                </div>
            `;

                cartItemsContainer.innerHTML += itemHtml;
            });

            totalCartPriceElement.textContent = `Total Price: R${grandTotal.toFixed(2)}`;
            modalTotalPrice.textContent = `R${grandTotal.toFixed(2)}`;
            cartSummary.style.display = 'block';
            emptyCartMessage.style.display = 'none';
            purchaseButton.style.display = 'block';

            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'), 10);
                    cartItems.splice(index, 1);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartUI();
                });
            });

        } else {
            cartItemsContainer.innerHTML = '';
            emptyCartMessage.style.display = 'block';
            cartSummary.style.display = 'none';
            purchaseButton.style.display = 'none';
        }
    }

    updateCartUI();

    purchaseButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    confirmCheckoutButton.addEventListener('click', () => {
        // Clear cart items from localStorage
        localStorage.removeItem('cartItems');
    
        // Use a timeout to allow the removal to take effect
        setTimeout(() => {
            alert('Thank you for your purchase!');
            // Reload the page to reflect the cleared cart
            window.location.reload();
        }, 100); // Adjust the delay if necessary
    });    
    
    

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
