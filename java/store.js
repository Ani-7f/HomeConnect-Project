// JavaScript for search functionality
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting
    
    let searchQuery = document.getElementById('searchInput').value.toLowerCase();
    let items = document.querySelectorAll('.item');

    items.forEach(function(item) {
        let itemName = item.getAttribute('data-category').toLowerCase();
        let itemDescription = item.querySelector('p').textContent.toLowerCase();

        if (itemName.includes(searchQuery) || itemDescription.includes(searchQuery)) {
            item.style.display = 'block'; // Show item if it matches the search
        } else {
            item.style.display = 'none'; // Hide item if it doesn't match
        }
    });
});

// JavaScript for filter functionality
const filterButtons = document.querySelectorAll('.filter-button');
const items = document.querySelectorAll('.item');
const filterDropdown = document.querySelector('.filter-dropdown select');

// Function to filter items based on filter value
function filterItems(filterValue) {
    items.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Set active button style
    filterButtons.forEach(btn => btn.classList.remove('active'));
}

// Handle filter button clicks
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        filterItems(filterValue);
        this.classList.add('active'); // Highlight the active button
    });
});

// Handle dropdown selection
if (filterDropdown) {
    filterDropdown.addEventListener('change', function() {
        const filterValue = this.value;
        filterItems(filterValue);
    });
}

// Optional: Add active class to the selected dropdown option
filterDropdown.addEventListener('change', function() {
    const selectedValue = this.value;
    filterButtons.forEach(button => {
        if (button.getAttribute('data-filter') === selectedValue) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
});

function redirectToItemDetails(event) {
    event.preventDefault();
    const itemElement = event.target.closest('.item');
    console.log(itemElement); // Check if itemElement is correctly selected

    const itemName = itemElement.dataset.name;
    const itemDescription = itemElement.dataset.description;
    const itemPrice = itemElement.dataset.price;
    const itemImage = itemElement.dataset.image;

    console.log(itemName, itemDescription, itemPrice, itemImage); // Verify the values

    localStorage.setItem('itemName', itemName);
    localStorage.setItem('itemDescription', itemDescription);
    localStorage.setItem('itemPrice', itemPrice);
    localStorage.setItem('itemImage', itemImage);

    window.location.href = 'itemDetails.html';
}
