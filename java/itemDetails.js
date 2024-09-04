document.addEventListener('DOMContentLoaded', () => {
    // Retrieve item details from localStorage
    const itemName = localStorage.getItem('itemName');
    const itemDescription = localStorage.getItem('itemDescription');
    const itemPrice = localStorage.getItem('itemPrice');
    const itemImage = localStorage.getItem('itemImage');

    // Populate the page with item details
    document.getElementById('item-name').textContent = itemName;
    document.getElementById('item-description').textContent = itemDescription;
    document.getElementById('item-price').textContent = itemPrice;
    document.getElementById('item-image').src = itemImage;

    // Add to Bag button functionality
    document.getElementById('add-to-bag').addEventListener('click', () => {
        const size = document.getElementById('size-dropdown').value;
        const quantity = document.getElementById('amount').value;

        // Retrieve current cart from localStorage or initialize as empty array
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add new item to cart
        cartItems.push({
            itemName,
            itemDescription,
            itemPrice,
            itemImage,
            size,
            quantity
        });

        // Save updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Redirect to cart page
        window.location.href = 'cart.html';
    });

    // Go to Cart button functionality
    document.getElementById('go-to-cart').addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
});
