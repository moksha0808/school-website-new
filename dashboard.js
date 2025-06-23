// Dashboard JS for admin actions (backend integration)
document.addEventListener('DOMContentLoaded', function () {
  // Fetch and display student applications
  const token = localStorage.getItem('adminToken');
  if (token) {
    fetch('https://your-backend-url/admin/applications', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        const container = document.createElement('div');
        container.className = 'mb-8';
        container.innerHTML = '<h2 class="text-xl font-semibold mb-2">Student Applications</h2>';
        if (Array.isArray(data) && data.length > 0) {
          const list = document.createElement('ul');
          list.className = 'space-y-2';
          data.forEach(app => {
            const li = document.createElement('li');
            li.className = 'p-3 bg-gray-100 rounded';
            li.textContent = `${app.name} (Class: ${app.class})`;
            list.appendChild(li);
          });
          container.appendChild(list);
        } else {
          container.innerHTML += '<div class="text-gray-600">No applications found.</div>';
        }
        document.querySelector('.max-w-3xl').prepend(container);
      })
      .catch(() => {
        // Optionally handle error
      });
  }

  // Add Achievement
  const addAchievementForm = document.getElementById('addAchievementForm');
  const achievementSuccess = document.getElementById('achievementSuccess');
  if (addAchievementForm) {
    addAchievementForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // TODO: Send data to backend
      achievementSuccess.classList.remove('hidden');
      addAchievementForm.reset();
      setTimeout(() => achievementSuccess.classList.add('hidden'), 2000);
    });
  }
  // Edit Curriculum
  const editCurriculumForm = document.getElementById('editCurriculumForm');
  const curriculumSuccess = document.getElementById('curriculumSuccess');
  if (editCurriculumForm) {
    editCurriculumForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // TODO: Send updated curriculum to backend
      curriculumSuccess.classList.remove('hidden');
      setTimeout(() => curriculumSuccess.classList.add('hidden'), 2000);
    });
  }
});
// Replace 'https://your-backend-url' with your deployed backend URL
