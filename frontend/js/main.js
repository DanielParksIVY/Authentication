
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message);
        }
    });
}

const welcomeMessage = document.getElementById('welcomeMessage');
if (welcomeMessage) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        welcomeMessage.innerHTML = `<p>Welcome, <strong>${user.username}</strong>! You are logged in as <strong>${user.role}</strong>.</p>`;
    } else {
        window.location.href = 'login.html';
    }
}
