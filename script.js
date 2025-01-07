// Login Validation
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    const spreadsheetId = "1nCBWIy2w66myJUpLHsew189-Ue7FITSTxwMRz-335BQ";
    const apiKey = "AIzaSyDObZlN1jDkIySkgePI-6InKCOGOnxc8bs"; // Ganti dengan API Key Anda
    const sheetName = "Users";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Parse rows to find matching username and password
        const rows = data.values || [];
        const isValid = rows.some(row => row[0] === username && row[1] === password);

        if (isValid) {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('dataInputForm').style.display = 'block';
        } else {
            errorMessage.textContent = 'Username atau password salah.';
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        errorMessage.textContent = 'Terjadi kesalahan pada login.';
    }
});

// Data Input
document.getElementById('dataForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const dataStatus = document.getElementById('dataStatus');

    // Data to append
    const values = [[itemName, quantity, price]];

    // Append API URL
    const sheetName = "DataBarang"; // Worksheet untuk input data
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                range: sheetName,
                majorDimension: "ROWS",
                values: values,
            }),
        });

        if (response.ok) {
            dataStatus.textContent = "Data berhasil ditambahkan!";
            dataStatus.style.color = "green";
            document.getElementById('dataForm').reset();
        } else {
            throw new Error("Gagal menambahkan data.");
        }
    } catch (error) {
        console.error("Error adding data:", error);
        dataStatus.textContent = "Terjadi kesalahan saat menambahkan data.";
        dataStatus.style.color = "red";
    }
});


document.getElementById('paymentInput').addEventListener('input', function(event) {
    this.value = this.value.replace(/[^0-9.]/g, ''); // Hanya angka dan titik yang diizinkan
});
console.log('Header row added to paymentDetails:', paymentDetails.querySelectorAll('tr').length);

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

    // Periksa apakah item sudah ada di cart
    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1; // Jika sudah ada, tambahkan quantity
    } else {
        cart.push({ ...item, quantity: 1 }); // Jika belum ada, tambahkan item dengan quantity 1
    }

    renderCart(); // Perbarui tampilan cart
}
// Render cart items and calculate total price
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span class="item-name">${item.name} - Rp${(item.price * item.quantity).toLocaleString()}</span>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button class="delete-button" onclick="removeItem(${index})">
                    🗑️
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = `Rp${total.toLocaleString()}`;
}
// Update quantity function
function updateQuantity(index, delta) {
    if (cart[index].quantity + delta > 0) {
        cart[index].quantity += delta; // Tambahkan atau kurangi quantity
    } else {
        cart.splice(index, 1); // Hapus item jika quantity menjadi 0
    }
    renderCart(); // Perbarui tampilan cart
}
function removeItem(index) {
    cart.splice(index, 1); // Hapus item dari cart
    renderCart(); // Perbarui tampilan cart
}
// Initial rendering of items
renderItems();
function checkout() {
    document.getElementById('paymentModal').style.display = 'flex';
    const total = calculateTotal();
    const tax = total * 0.11; // Pajak 11%
    const grandTotal = total + tax; // Total termasuk pajak

    // Update Total dan Remaining Amount
    document.getElementById('totalAmount').textContent = `Total: Rp${grandTotal.toLocaleString()}`;
    document.getElementById('remainingAmount').textContent = `Rp${grandTotal.toLocaleString()}`;
    document.getElementById('paidAmount').textContent = 'Rp0'; // Reset jumlah pembayaran
    document.getElementById('paymentInput').value = ''; // Kosongkan input pembayaran

    // Kosongkan tabel pembayaran tetapi jangan tambahkan header tabel lebih dari satu kali
    const paymentDetails = document.getElementById('paymentDetails');
    paymentDetails.innerHTML = ''; // Kosongkan isi tabel tanpa menambahkan header tabel
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th>Description</th><th>Amount</th>`;
    paymentDetails.appendChild(headerRow);

    // Tambahkan detail pajak
    document.getElementById('taxDetail').textContent = `Tax (11%): Rp${tax.toLocaleString()}`;
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}
function addToInput(value) {
    const input = document.getElementById('paymentInput');
    input.value += value;
}
function clearInput() {
    const input = document.getElementById('paymentInput');
    input.value = '';
}
function generateInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get Customer Name
    let customerName = document.getElementById("customerName").value.trim();
    if (customerName === "") {
        customerName = "Customer";
    }

    // Invoice Header
    doc.setFontSize(16);
    doc.text("INVOICE", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Customer: ${customerName}`, 10, 40);
    doc.text(`Invoice No: ${Math.floor(Math.random() * 10000)}`, 150, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 50);

    // Add Table Headers
    let y = 70;
    doc.setFontSize(10);
    doc.text("Description", 10, y);
    doc.text("Unit Price", 90, y);
    doc.text("Qty", 130, y);
    doc.text("Total", 170, y);
    doc.line(10, y + 2, 200, y + 2);

    // Add Items from Cart
    y += 10;
    let subtotal = 0;

    cart.forEach(item => {
        const total = item.price * item.quantity;

        doc.text(item.name, 10, y);
        doc.text(`Rp${item.price.toLocaleString()}`, 90, y);
        doc.text(`${item.quantity}`, 130, y);
        doc.text(`Rp${total.toLocaleString()}`, 170, y);

        subtotal += total;
        y += 10;
    });

    // Add Subtotal and Total
    y += 10;
    doc.text("Subtotal", 130, y);
    doc.text(`Rp${subtotal.toLocaleString()}`, 170, y);
    y += 10;
    const tax = subtotal * 0.11; // Assuming 11% tax
    const total = subtotal + tax;

    doc.text("Tax (11%)", 130, y);
    doc.text(`Rp${tax.toLocaleString()}`, 170, y);
    y += 10;
    doc.text("Total", 130, y);
    doc.text(`Rp${total.toLocaleString()}`, 170, y);

    // Save PDF
    doc.save("invoice.pdf");
}

function proceedWithValidation() {
    const remainingText = document.getElementById('remainingAmount').textContent;
    const remaining = parseFloat(remainingText.replace('Rp', '').replace('Change:', '').replace(/\./g, '').replace(/,/g, ''));

    if (remaining > 0) {
        alert('Remaining balance must be Rp0 or less to proceed.');
        return;
    }

    generateInvoice(); // Generate invoice jika validasi lolos
}

function generateInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get Customer Name
    let customerName = document.getElementById("customerName").value.trim();
    if (customerName === "") {
        customerName = "Customer";
    }

    // Invoice Header
    doc.setFontSize(16);
    doc.text("INVOICE", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Customer: ${customerName}`, 10, 40);
    doc.text(`Invoice No: ${Math.floor(Math.random() * 10000)}`, 150, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 50);

    // Add Table Headers for Items
    let y = 70;
    doc.setFontSize(10);
    doc.text("Description", 10, y);
    doc.text("Unit Price", 90, y);
    doc.text("Qty", 130, y);
    doc.text("Total", 170, y);
    doc.line(10, y + 2, 200, y + 2);

    // Add Items from Cart
    y += 10;
    let subtotal = 0;

    cart.forEach(item => {
        const total = item.price * item.quantity;

        doc.text(item.name, 10, y);
        doc.text(`Rp${item.price.toLocaleString()}`, 90, y);
        doc.text(`${item.quantity}`, 130, y);
        doc.text(`Rp${total.toLocaleString()}`, 170, y);

        subtotal += total;
        y += 10;
    });

    // Add Subtotal, Tax, and Total
    y += 10;
    doc.text("Subtotal", 130, y);
    doc.text(`Rp${subtotal.toLocaleString()}`, 170, y);
    y += 10;
    const tax = subtotal * 0.11; // Assuming 11% tax
    const total = subtotal + tax;

    doc.text("Tax (11%)", 130, y);
    doc.text(`Rp${tax.toLocaleString()}`, 170, y);
    y += 10;
    doc.text("Total", 130, y);
    doc.text(`Rp${total.toLocaleString()}`, 170, y);

    // Add Payment Details Header
    y += 20;
    doc.setFontSize(12);
    doc.text("Payment Details", 10, y);

    // Add Payment Details
    y += 10;
    const paymentRows = Array.from(document.getElementById('paymentDetails').children).slice(1); // Skip header row
    let totalPaid = 0;

    paymentRows.forEach(row => {
        const method = row.children[0].textContent;
        const amount = parseFloat(row.children[1].textContent.replace('Rp', '').replace(/\./g, '').replace(/,/g, ''));

        doc.text(`${method}: Rp${amount.toLocaleString()}`, 10, y);
        totalPaid += amount;
        y += 10;
    });

    // Add Paid and Remaining Balance
    y += 10;
    doc.text(`Total Paid: Rp${totalPaid.toLocaleString()}`, 10, y);
    const remainingBalance = total - totalPaid;
    y += 10;
    doc.text(`Remaining Balance: Rp${remainingBalance.toLocaleString()}`, 10, y);

    // Save PDF
    doc.save("invoice.pdf");
}
function generateInvoice2() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get Customer Name
    let customerName = document.getElementById("customerName").value.trim();
    if (customerName === "") {
        customerName = "Customer";
    }

    // Invoice Header
    doc.setFontSize(16);
    doc.text("INVOICE", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Customer: ${customerName}`, 10, 40);
    doc.text(`Invoice No: ${Math.floor(Math.random() * 10000)}`, 150, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 50);

    // Add Table Headers for Items
    let y = 70;
    doc.setFontSize(10);
    doc.text("Description", 10, y);
    doc.text("Unit Price", 90, y);
    doc.text("Qty", 130, y);
    doc.text("Total", 170, y);
    doc.line(10, y + 2, 200, y + 2);

    // Add Items from Cart
    y += 10;
    let subtotal = 0;

    cart.forEach(item => {
        const total = item.price * item.quantity;

        doc.text(item.name, 10, y);
        doc.text(`Rp${item.price.toLocaleString()}`, 90, y);
        doc.text(`${item.quantity}`, 130, y);
        doc.text(`Rp${total.toLocaleString()}`, 170, y);

        subtotal += total;
        y += 10;
    });

    // Add Subtotal, Tax, and Total
    y += 10;
    doc.text("Subtotal", 130, y);
    doc.text(`Rp${subtotal.toLocaleString()}`, 170, y);
    y += 10;
    const tax = subtotal * 0.11; // Assuming 11% tax
    const total = subtotal + tax;

    doc.text("Tax (11%)", 130, y);
    doc.text(`Rp${tax.toLocaleString()}`, 170, y);
    y += 10;
    doc.text("Total", 130, y);
    doc.text(`Rp${total.toLocaleString()}`, 170, y);

    // Save PDF
    doc.save("invoice.pdf");
}
function selectPayment(method) {
    const input = document.getElementById('paymentInput');
    const amount = parseFloat(input.value || 0);

    if (amount <= 0) {
        alert('Enter a valid amount!');
        return;
    }

    // Cari baris pembayaran dengan metode yang sama
    const paymentDetails = document.getElementById('paymentDetails');
    const rows = Array.from(paymentDetails.querySelectorAll('tr'));
    let existingRow = null;

    // Periksa apakah baris dengan metode pembayaran sudah ada
    rows.forEach(row => {
        const cells = row.children;
        if (cells.length > 0 && cells[0].textContent === method) {
            existingRow = row;
        }
    });

    if (existingRow) {
        // Perbarui jumlah pada baris yang sudah ada
        const currentAmount = parseFloat(existingRow.children[1].textContent.replace('Rp', '').replace(/\./g, '').replace(/,/g, ''));
        existingRow.children[1].textContent = `Rp${(currentAmount + amount).toLocaleString()}`;
    } else {
        // Tambahkan baris baru jika belum ada
        const row = document.createElement('tr');
        row.innerHTML = `<td>${method}</td><td>Rp${amount.toLocaleString()}</td>`;
        paymentDetails.appendChild(row);
    }

    // Kosongkan input
    input.value = '';

    // Update summary setelah menambahkan pembayaran
    updatePaymentSummary();
}

function updatePaymentSummary() {
    const total = calculateTotal(); // Hitung total subtotal
    const tax = total * 0.11; // Pajak 11%
    const grandTotal = total + tax; // Total termasuk pajak

    // Ambil daftar pembayaran dari tabel paymentDetails
    const payments = Array.from(document.getElementById('paymentDetails').querySelectorAll('tr'))
        .slice(1) // Skip header row
        .map(row => parseFloat(row.children[1].textContent.replace('Rp', '').replace(/\./g, '').replace(/,/g, '')));

    // Pastikan semua pembayaran dihitung
    const paid = payments.length > 0 ? payments.reduce((sum, amount) => sum + amount, 0) : 0;

    // Hitung remaining balance
    const remaining = grandTotal - paid;

    // Update Paid Amount
    document.getElementById('paidAmount').textContent = `Rp${paid.toLocaleString()}`;

    // Update Remaining Amount (atau Change jika pembayaran lebih besar)
    if (remaining > 0) {
        document.getElementById('remainingAmount').textContent = `Rp${remaining.toLocaleString()}`;
    } else {
        document.getElementById('remainingAmount').textContent = `Change: Rp${remaining.toLocaleString()}`;
    }

    // Tambahkan detail pajak
    document.getElementById('taxDetail').textContent = `Tax (11%): Rp${tax.toLocaleString()}`;
    console.log({
        total,
        tax,
        grandTotal,
        paid,
        remaining,
    });
    
}   

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}