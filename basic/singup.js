document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!name || !email || !password) {
      return alert('Please fill all required fields.');
    }

    if (password !== confirmPassword) {
      return alert('Passwords do not match.');
    }

    try {
      // Use relative API path for Vercel deployment
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      const data = await response.json();
      alert('Signup successful! You can now log in.');
      form.reset();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error during signup. Try again later.');
    }
  });
});
