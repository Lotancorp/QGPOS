// JavaScript Code for POS Web
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Simulated Login Validation
    if (username === '2' && password === '2') {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('posContainer').style.display = 'flex';
        document.getElementById('usernameDisplay').textContent = `Welcome, ${username}`;
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});

function logout() {
    document.getElementById('posContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('errorMessage').textContent = '';
}

// Define items with more data
const items = [
    { id: 1, name: 'Big Mac', price: 59000, img: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Cheese Burger', price: 34000, img: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Double Burger', price: 49000, img: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Chicken Sandwich', price: 64000, img: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Veggie Wrap', price: 42000, img: 'https://via.placeholder.com/150' },
    { id: 6, name: 'French Fries', price: 24000, img: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Milkshake', price: 39000, img: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Onion Rings', price: 32000, img: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Grilled Chicken', price: 79000, img: 'https://via.placeholder.com/150' },
    { id: 10, name: 'Fish Fillet', price: 67000, img: 'https://via.placeholder.com/150' },
    { id: 11, name: 'Aqua 600ml', price: 5000, img: 'https://via.placeholder.com/150' },
    { id: 12, name: 'Indomie Goreng', price: 3000, img: 'https://via.placeholder.com/150' },
    { id: 13, name: 'Beng-Beng', price: 2500, img: 'https://via.placeholder.com/150' },
    { id: 14, name: 'SilverQueen 62g', price: 13500, img: 'https://via.placeholder.com/150' },
    { id: 15, name: 'Coca-Cola 330ml', price: 8500, img: 'https://via.placeholder.com/150' },
    { id: 16, name: 'Roti Tawar Sari Roti', price: 15000, img: 'https://via.placeholder.com/150' }
];


// Cart array to store items added to the cart
const cart = [];

// Render items to the grid
function renderItems() {
    const itemGrid = document.getElementById('itemGrid');
    if (!itemGrid) {
        console.error('Element with id "itemGrid" not found');
        return;
    }
    itemGrid.innerHTML = '';

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Rp${item.price.toLocaleString()}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        itemGrid.appendChild(itemDiv);
    });
}

// Add item to the cart
function addToCart(itemId) {
    const item = items.find(i => i.id === itemId);
    if (item) {
        cart.push(item);
        renderCart();
    }
}

// Render cart items and calculate total price
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    if (!cartItems || !totalPrice) {
        console.error('Cart elements not found');
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} - Rp${item.price.toLocaleString()}</p>
        `;
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = `Rp${total.toLocaleString()}`;
}

// Checkout functionality
function checkout() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    alert('Checkout successful!');
    cart.length = 0; // Clear the cart
    renderCart();
}

// Initial rendering of items
renderItems();
