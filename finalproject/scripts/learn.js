document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('open');
        question.classList.toggle('active');
    });
});


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const hamburgerIcon = hamburger.querySelector('i');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');

    // Toggle icon
    if (navLinks.classList.contains('show')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-xmark'); // X icon
    } else {
        hamburgerIcon.classList.remove('fa-xmark');
        hamburgerIcon.classList.add('fa-bars'); // Menu icon
    }
});


const yearElements = document.querySelectorAll('.year');
const currentYear = new Date().getFullYear();
yearElements.forEach(el => el.textContent = currentYear);

const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}
