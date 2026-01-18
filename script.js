// Dummy product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "hadphon.jpg"
    },
    {
        id: 2,
        name: "Smartphone Case",
        price: 19.99,
        image: "case.jpg"
    },
    {
        id: 3,
        name: "Laptop Stand",
        price: 49.99,
        image: "stands.jpg"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "spekar.jpg"
    },
    {
        id: 5,
        name: "USB Cable",
        price: 9.99,
        image: "cable.jpg"
    },
    {
        id: 6,
        name: "Gaming Mouse",
        price: 39.99,
        image: "mouse.jpg"
    }
];

// Function to get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update cart count display
function updateCartCount() {
    const cart = getCart();
    document.getElementById('cart-count').textContent = cart.length;
}

// Function to calculate cart total
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

// Function to render cart items in modal
function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotal.textContent = calculateTotal(cart);
}

// Function to remove item from cart
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCartCount();
    renderCart();
}

// Function to render products
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Function to handle add to cart
function addToCart(event) {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        if (product) {
            const cart = getCart();
            cart.push(product);
            saveCart(cart);
            updateCartCount();
            alert('Product added to cart!');
        }
    }
}

// Function to toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Function to open cart modal
function openCartModal() {
    renderCart();
    document.getElementById('cart-modal').style.display = 'block';
}

// Function to close cart modal
function closeCartModal() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();  // Load cart count on page load
    document.getElementById('product-grid').addEventListener('click', addToCart);
    document.getElementById('hamburger').addEventListener('click', toggleMenu);
    document.getElementById('cart-icon').addEventListener('click', openCartModal);
    document.getElementById('close-modal').addEventListener('click', closeCartModal);
    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeFromCart(index);
        }
    });
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('cart-modal')) {
            closeCartModal();
        }
    });
    // Checkout button (placeholder)
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Checkout functionality not implemented yet.');
    });
});