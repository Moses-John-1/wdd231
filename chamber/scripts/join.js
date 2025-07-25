document.getElementById("timestamp").value = new Date().toISOString();

document.querySelectorAll(".info-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const modalId = link.dataset.modal;
        document.getElementById(modalId).style.display = "block";
    });
});

document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", () => {
        const modalId = btn.dataset.close;
        document.getElementById(modalId).style.display = "none";
    });
});

window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
    }
});
