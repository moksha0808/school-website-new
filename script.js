// Main JS for interactivity

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // FAQ toggle
  window.toggleFaq = function(idx) {
    const answers = document.querySelectorAll('.faq-answer');
    answers.forEach((ans, i) => {
      if (i === idx) {
        ans.classList.toggle('hidden');
      } else {
        ans.classList.add('hidden');
      }
    });
  };

  // Live chat dummy
  const chatBtn = document.getElementById('chatBtn');
  const chatBox = document.getElementById('chatBox');
  if (chatBtn && chatBox) {
    chatBtn.addEventListener('click', () => {
      chatBox.classList.toggle('hidden');
    });
  }

  // Application form submission (real API call)
  const appForm = document.getElementById('applicationForm');
  const formSuccess = document.getElementById('formSuccess');
  if (appForm && formSuccess) {
    appForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const name = appForm.name.value;
      const age = appForm.age.value;
      const studentClass = appForm.class.value;
      const message = appForm.message.value;
      try {
        const res = await fetch('https://your-backend-url/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, age, class: studentClass, message })
        });
        if (res.ok) {
          formSuccess.classList.remove('hidden');
          appForm.reset();
          setTimeout(() => formSuccess.classList.add('hidden'), 3000);
        } else {
          alert('Submission failed. Please try again.');
        }
      } catch (err) {
        alert('Submission failed. Please try again.');
      }
    });
  }

  // Language toggle (dummy)
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('change', function() {
      alert('Language switching is a demo.');
    });
  }
});

// Replace 'https://your-backend-url' with your deployed backend URL
