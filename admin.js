// Admin panel JS for login and dashboard (placeholder for backend integration)
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // TODO: Replace with real backend authentication
      const username = loginForm.username.value;
      const password = loginForm.password.value;
      if (username === 'admin' && password === 'admin123') {
        window.location.href = 'dashboard.html';
      } else {
        loginError.classList.remove('hidden');
      }
    });
  }
});
