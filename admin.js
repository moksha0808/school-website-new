// Admin panel JS for login and dashboard (backend integration)
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const username = loginForm.username.value;
      const password = loginForm.password.value;
      try {
        const res = await fetch('https://your-backend-url/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem('adminToken', data.token);
          window.location.href = 'dashboard.html';
        } else {
          loginError.classList.remove('hidden');
        }
      } catch (err) {
        loginError.classList.remove('hidden');
      }
    });
  }
});
// Replace 'https://your-backend-url' with your deployed backend URL
