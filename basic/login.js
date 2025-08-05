document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      return alert('Please fill in all fields.');
    }

    try {
      const response = await fetch('/api/login', {  // Changed for Vercel
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Login failed.');

      alert(data.message);
      // Redirect to home page or dashboard
      window.location.href = 'index.html';
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  });
});
