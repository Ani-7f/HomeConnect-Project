document.addEventListener('DOMContentLoaded', () => {
    // Retrieve cart items from localStorage or initialize as an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Select DOM elements
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.getElementById('cart-summary');
    const totalCartPriceElement = document.getElementById('total-cart-price');
    const purchaseButton = document.getElementById('purchase-button');

    // Modal elements
    const modal = document.getElementById('checkout-modal');
    const modalTotalPrice = document.getElementById('modal-total-price');
    const closeButton = document.querySelector('.close-button');
    const confirmCheckoutButton = document.getElementById('confirm-checkout-button');

    function updateCartUI() {
        if (cartItems.length > 0) {
            let grandTotal = 0; // To calculate the total price of all items
            cartItemsContainer.innerHTML = ''; // Clear any existing content

            // Loop through each cart item and generate HTML
            cartItems.forEach((cartItem, index) => {
                // Parse the item price, removing any non-numeric characters
                const price = parseFloat(cartItem.itemPrice.replace(/[^0-9.-]+/g, ""));
                const quantity = parseInt(cartItem.quantity, 10); // Ensure quantity is treated as an integer
                const itemTotalPrice = (price * quantity).toFixed(2); // Calculate total price for this item
                grandTotal += parseFloat(itemTotalPrice); // Add to grand total

                // Generate HTML for each item
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

                // Append the item HTML to the container
                cartItemsContainer.innerHTML += itemHtml;
            });

            // Display the total price of all items
            totalCartPriceElement.textContent = `Total Price: R${grandTotal.toFixed(2)}`;
            modalTotalPrice.textContent = `R${grandTotal.toFixed(2)}`; // Set modal total price
            cartSummary.style.display = 'block'; // Show summary
            emptyCartMessage.style.display = 'none'; // Hide empty message
            purchaseButton.style.display = 'block'; // Show the purchase button

            // Add delete button functionality
            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'), 10); // Parse index as integer
                    // Remove item from cartItems array
                    cartItems.splice(index, 1); // Remove the item using splice
                    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
                    updateCartUI(); // Refresh the cart display
                });
            });

        } else {
            // Show empty cart message and hide item details
            cartItemsContainer.innerHTML = ''; // Clear item details
            emptyCartMessage.style.display = 'block'; // Show empty message
            cartSummary.style.display = 'none'; // Hide summary
            purchaseButton.style.display = 'none'; // Hide the purchase button
        }
    }

    // Initialize cart UI on page load
    updateCartUI();

    // Show the modal when the purchase button is clicked
    purchaseButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Confirm checkout and close the modal
    confirmCheckoutButton.addEventListener('click', () => {
        alert('Thank you for your purchase!');
        // Clear cart items from localStorage
        localStorage.removeItem('cartItems');
        // Update cart UI to reflect empty cart
        updateCartUI();
        // Close the modal
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
