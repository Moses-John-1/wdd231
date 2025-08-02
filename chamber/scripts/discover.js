const cardGrid = document.getElementById('card-grid');

// 1. Fetch and display location cards
async function loadLocations() {
    try {
        const response = await fetch('data/item-of-interest.json');
        const data = await response.json();
        const locations = data.locations;

        locations.forEach(loc => {
            const card = document.createElement('section');
            card.classList.add('location-card');

            card.innerHTML = `
        <h2>${loc.name}</h2>
        <figure>
          <img src="images/${loc.image}" alt="${loc.name}" loading="lazy">
        </figure>
        <p>${loc.description}</p>
        <figcaption class="location-address">${loc.address}</figcaption>
        <a class="discover-btn" href="#">learn more</a>
      `;

            cardGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading locations:', error);
    }
}

// 2. Handle visit tracking
function showVisitMessage() {
    const messageBox = document.querySelector("#visitor-message");
    const today = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');

    if (!lastVisit) {
        messageBox.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const diff = today - Number(lastVisit);
        const oneDay = 1000 * 60 * 60 * 24;

        if (diff < oneDay) {
            messageBox.textContent = "Back so soon! Awesome!";
        } else {
            const days = Math.floor(diff / oneDay);
            messageBox.textContent = `You last visited ${days} day${days === 1 ? '' : 's'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', today);
}

// Run
loadLocations();
showVisitMessage();

const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.textContent = nav.classList.contains('open') ? '\u00D7' : '\u2630';
});


document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;
