document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page refresh

        // Get form data
        const name = form.querySelector(".name").value.trim();
        const email = form.querySelector("#email").value.trim();
        const subject = form.querySelector("#subject").value.trim();
        const message = form.querySelector("#message").value.trim();

        // Create an object
        const formData = {
            name,
            email,
            subject,
            message,
            submittedAt: new Date().toISOString()
        };

        // Store in localStorage
        let savedForms = JSON.parse(localStorage.getItem("contactForms")) || [];
        savedForms.push(formData);
        localStorage.setItem("contactForms", JSON.stringify(savedForms));

        // Optional: clear the form
        form.reset();

        alert("Your message has been saved locally!");
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
