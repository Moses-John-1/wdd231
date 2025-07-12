// 1️⃣ Fetch members from JSON and render to the DOM
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to fetch members data');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error loading members:', error);
    }
}

function displayMembers(members) {
    const container = document.getElementById('directory');
    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${getMembershipLabel(member.membership)}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

// Convert numeric membership level to label
function getMembershipLabel(level) {
    switch (level) {
        case 3: return 'Gold';
        case 2: return 'Silver';
        case 1: return 'Member';
        default: return 'N/A';
    }
}

// Toggle view buttons
document.getElementById('grid-btn').addEventListener('click', () => {
    document.getElementById('directory').classList.add('grid-view');
    document.getElementById('directory').classList.remove('list-view');
    document.getElementById('grid-btn').classList.add('active');
    document.getElementById('list-btn').classList.remove('active');
});

document.getElementById('list-btn').addEventListener('click', () => {
    document.getElementById('directory').classList.add('list-view');
    document.getElementById('directory').classList.remove('grid-view');
    document.getElementById('list-btn').classList.add('active');
    document.getElementById('grid-btn').classList.remove('active');
});

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Start fetching members on page load
fetchMembers();

const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.textContent = nav.classList.contains('open') ? '\u00D7' : '\u2630';
});

