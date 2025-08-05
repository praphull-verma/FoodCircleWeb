document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  /* =========================
     Volunteer Page
     ========================= */
  if (path.includes("volunteer.html")) {
    const requestsList = document.getElementById("requestsList");
    const volunteerSearch = document.getElementById("volunteerSearch");

    const pickupRequests = [
      { donor: "Annapurna Restaurant", items: "15 Veg Meals", address: "Near Central Bus Stand", time: "Pickup by 5 PM" },
      { donor: "Local Bakery", items: "20 Bread Loaves", address: "MG Road, Opposite City Mall", time: "Pickup by 7 PM" },
      { donor: "Hotel Surya", items: "10 Meal Boxes", address: "Shivaji Nagar", time: "Pickup by 6 PM" }
    ];

    const renderVolunteerCards = (filter = "") => {
      requestsList.innerHTML = "";
      const filtered = pickupRequests.filter(req =>
        req.donor.toLowerCase().includes(filter.toLowerCase()) ||
        req.address.toLowerCase().includes(filter.toLowerCase())
      );
      filtered.forEach(req => {
        const card = document.createElement("div");
        card.classList.add("pickup-card");
        card.innerHTML = `
          <div>
            <h3>${req.donor}</h3>
            <p><strong>Items:</strong> ${req.items}</p>
            <p><strong>Address:</strong> ${req.address}</p>
            <p><strong>Time:</strong> ${req.time}</p>
          </div>
          <button class="accept-btn">Accept</button>
        `;
        card.querySelector(".accept-btn").addEventListener("click", () => {
          alert(`You accepted pickup from ${req.donor}!`);
        });
        requestsList.appendChild(card);
      });
    };

    renderVolunteerCards();

    volunteerSearch.addEventListener("input", (e) => {
      renderVolunteerCards(e.target.value);
    });
  }

  /* =========================
     Recipient Page
     ========================= */
  if (path.includes("recipient.html")) {
    const recipientsList = document.getElementById("recipientsList");
    const recipientSearch = document.getElementById("recipientSearch");

    const foodLocations = [
      { title: "Community Hall Pickup", description: "Free veg meals available from 1 PM - 3 PM at Gandhi Hall, near railway station." },
      { title: "Food Truck Distribution", description: "Hot meals and snacks every evening from 6 PM - 8 PM at MG Road, opposite City Mall." },
      { title: "Weekend Food Drive", description: "Bread, rice, and curry distribution on Sundays at Shivaji Nagar Park." }
    ];

    const renderRecipientCards = (filter = "") => {
      recipientsList.innerHTML = "";
      const filtered = foodLocations.filter(loc =>
        loc.title.toLowerCase().includes(filter.toLowerCase()) ||
        loc.description.toLowerCase().includes(filter.toLowerCase())
      );
      filtered.forEach(loc => {
        const card = document.createElement("div");
        card.classList.add("rec-card");
        card.innerHTML = `
          <h3>${loc.title}</h3>
          <p>${loc.description}</p>
          <button class="get-directions">Get Directions</button>
        `;
        card.querySelector(".get-directions").addEventListener("click", () => {
          alert(`Directions to: ${loc.title}`);
        });
        recipientsList.appendChild(card);
      });
    };

    renderRecipientCards();

    recipientSearch.addEventListener("input", (e) => {
      renderRecipientCards(e.target.value);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const pickupForm = document.getElementById('pickupForm');
  pickupForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent page reload

    // Collect form data
    const description = document.getElementById('description').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const address = document.getElementById('address').value.trim();

    // Simple validation (optional)
    if (!description || !quantity || !address) {
      alert('Please fill all fields correctly.');
      return;
    }

    const requestData = {
      description,
      quantity,
      address
    };

    // Send data to backend
    fetch('api/donate', {  // Change URL to your backend endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      alert('Thank you! Your pickup request has been submitted.');
      pickupForm.reset();
    })
    .catch(err => {
      alert('There was an error submitting your request. Please try again.');
      console.error(err);
    });
  });
});
