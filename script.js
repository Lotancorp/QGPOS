// JavaScript Code for POS Web
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Simulated Login Validation
    if (username === 'admin' && password === '1234') {
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

const items = [
    { id: 1, name: 'Item A', price: 50000 },
    { id: 2, name: 'Item B', price: 75000 },
    { id: 3, name: 'Item C', price: 100000 }
];

const cart = [];

function renderItems() {
    const itemGrid = document.getElementById('itemGrid');
    itemGrid.innerHTML = '';

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <p>${item.name}</p>
            <p>Rp${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        itemGrid.appendChild(itemDiv);
    });
}

function addToCart(itemId) {
    const item = items.find(i => i.id === itemId);
    cart.push(item);
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} - Rp${item.price}</p>
        `;
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = `Rp${total}`;
}

function checkout() {
    alert('Checkout successful!');
    cart.length = 0; // Clear the cart
    renderCart();
}

renderItems();
