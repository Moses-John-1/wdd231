// Get URL parameters
const params = new URLSearchParams(window.location.search);

document.getElementById("fname-output").textContent = params.get("fname") || "N/A";
document.getElementById("lname-output").textContent = params.get("lname") || "N/A";
document.getElementById("email-output").textContent = params.get("email") || "N/A";
document.getElementById("phone-output").textContent = params.get("telephone") || "N/A";
document.getElementById("business-output").textContent = params.get("businessName") || "N/A";
document.getElementById("timestamp-output").textContent = params.get("timestamp") || new Date().toLocaleString();

// Footer date updates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;