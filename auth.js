// Function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Function to save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Function to set current user
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Function to clear current user (logout)
function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Signup logic
function signup(name, email, password) {
    const users = getUsers();
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return { success: false, message: 'User already exists with this email.' };
    }
    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);
    return { success: true, message: 'Signup successful! Please login.' };
}

// Login logic
function login(email, password) {
    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        setCurrentUser(user);
        return { success: true, message: 'Login successful!' };
    } else {
        return { success: false, message: 'Invalid email or password.' };
    }
}

// Check if user is logged in and redirect if not
function checkLogin() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        // Redirect to login if not logged in and on protected page
        if (window.location.pathname.endsWith('index.html')) {
            window.location.href = 'login.html';
        }
    } else {
        // Display username if logged in
        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay) {
            usernameDisplay.textContent = `Hello, ${currentUser.name}`;
        }
    }
}

// Logout functionality
function logout() {
    clearCurrentUser();
    window.location.href = 'login.html';
}

// Event listeners for forms
document.addEventListener('DOMContentLoaded', () => {
    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const result = signup(name, email, password);
            const errorMessage = document.getElementById('error-message');
            if (result.success) {
                errorMessage.textContent = result.message;
                errorMessage.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                errorMessage.textContent = result.message;
                errorMessage.style.color = 'red';
            }
        });
    }

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const result = login(email, password);
            const errorMessage = document.getElementById('error-message');
            if (result.success) {
                window.location.href = 'index.html';
            } else {
                errorMessage.textContent = result.message;
            }
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Check login on page load
    checkLogin();
});
// Function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Function to save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Function to set current user
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Function to clear current user (logout)
function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Signup logic
function signup(name, email, password) {
    const users = getUsers();
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return { success: false, message: 'User already exists with this email.' };
    }
    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);
    return { success: true, message: 'Signup successful! Please login.' };
}

// Login logic
function login(email, password) {
    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        setCurrentUser(user);
        return { success: true, message: 'Login successful!' };
    } else {
        return { success: false, message: 'Invalid email or password.' };
    }
}

// Check if user is logged in and redirect if not
function checkLogin() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        // Redirect to login if not logged in and on protected page
        if (window.location.pathname.endsWith('index.html')) {
            window.location.href = 'login.html';
        }
    } else {
        // Display username if logged in
        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay) {
            usernameDisplay.textContent = `Hello, ${currentUser.name}`;
        }
    }
}

// Logout functionality
function logout() {
    clearCurrentUser();
    window.location.href = 'login.html';
}

// Event listeners for forms
document.addEventListener('DOMContentLoaded', () => {
    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();  // Added .trim() for better validation
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            // NEW: Validate empty fields
            if (!name || !email || !password) {
                const errorMessage = document.getElementById('error-message');
                errorMessage.textContent = 'All fields are required.';
                errorMessage.style.color = 'red';
                return;
            }
            
            const result = signup(name, email, password);
            const errorMessage = document.getElementById('error-message');
            if (result.success) {
                errorMessage.textContent = result.message;
                errorMessage.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                errorMessage.textContent = result.message;
                errorMessage.style.color = 'red';
            }
        });
    }

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const result = login(email, password);
            const errorMessage = document.getElementById('error-message');
            if (result.success) {
                window.location.href = 'index.html';
            } else {
                errorMessage.textContent = result.message;
            }
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Check login on page load
    checkLogin();
});