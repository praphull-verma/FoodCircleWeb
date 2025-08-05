document.addEventListener('DOMContentLoaded', () => {
  const pickupForm = document.getElementById('pickupForm');

  if (pickupForm) {
    pickupForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent the page from reloading

      // Get form data
      const description = document.getElementById('description').value.trim();
      const quantity = document.getElementById('quantity').value;
      const address = document.getElementById('address').value.trim();

      // Check if fields are empty
      if (!description || !quantity || !address) {
        alert('Please fill out all fields.');
        return;
      }

      // Send email using EmailJS
      emailjs.send('service_q9x4bgi', 'template_h8x0xwp', {
        description: description,
        quantity: quantity,
        address: address
      }).then(() => {
        alert('Thank you! Your donation request has been sent via email.');
        pickupForm.reset(); // Clear the form
      }).catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again.');
      });
    });
  }
});
