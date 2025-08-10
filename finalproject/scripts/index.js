// API key for stock data
const apiKey = "d2btum9r01qvh3vdai7gd2btum9r01qvh3vdai80";

// List of stocks and their page selectors
const stocks = [
    { symbol: "NVDA", selector: ".nvidia" },
    { symbol: "TSLA", selector: ".tesla" },
    { symbol: "MSFT", selector: ".microsoft" }
];

// Fetch stock data from API
async function fetchStock(symbol) {
    try {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`Error fetching ${symbol}:`, err);
        return null;
    }
}

// Format numbers with + sign if positive
function formatWithSign(num) {
    return num > 0 ? `+${num.toFixed(2)}` : num.toFixed(2);
}

// Update stock info on page
async function updateStocks() {
    for (const stock of stocks) {
        const data = await fetchStock(stock.symbol);
        if (data) {
            // Update price
            document.querySelector(`${stock.selector} .price`).textContent =
                `$${data.c?.toFixed(2) || "--"}`;

            // Update change amount with color
            const changeEl = document.querySelector(`${stock.selector} .change`);
            if (data.d !== undefined) {
                changeEl.textContent = `$${formatWithSign(data.d)}`;
                changeEl.style.color = data.d > 0 ? "green" : data.d < 0 ? "red" : "gray";
            } else {
                changeEl.textContent = "--";
                changeEl.style.color = "";
            }

            // Update percent change with color
            const percentEl = document.querySelector(`${stock.selector} .volume`);
            if (data.dp !== undefined) {
                percentEl.textContent = `${formatWithSign(data.dp)}%`;
                percentEl.style.color = data.dp > 0 ? "green" : data.dp < 0 ? "red" : "gray";
            } else {
                percentEl.textContent = "--";
                percentEl.style.color = "";
            }
        }
    }
}

// Wait for page to load before running
document.addEventListener("DOMContentLoaded", () => {
    updateStocks();                  // Initial update
    setInterval(updateStocks, 60000); // Refresh every 60 seconds

    // Hamburger menu toggle for mobile nav
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const hamburgerIcon = hamburger.querySelector('i');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        if (navLinks.classList.contains('show')) {
            hamburgerIcon.classList.replace('fa-bars', 'fa-xmark'); // Change icon to X
        } else {
            hamburgerIcon.classList.replace('fa-xmark', 'fa-bars'); // Change icon to bars
        }
    });

    // Automatically update all elements with class "year" to current year
    const yearElements = document.querySelectorAll('.year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);

    // Show last modified date of the document
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
});
