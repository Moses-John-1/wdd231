document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "d2btum9r01qvh3vdai7gd2btum9r01qvh3vdai80"; // Replace with your key (local testing only)

    const stocks = [
        { symbol: "NVDA", selector: ".nvidia" },
        { symbol: "TSLA", selector: ".tesla" },
        { symbol: "MSFT", selector: ".microsoft" }
    ];

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

    function formatWithSign(num) {
        return num > 0 ? `+${num.toFixed(2)}` : num.toFixed(2);
    }

    async function updateStocks() {
        for (const stock of stocks) {
            const data = await fetchStock(stock.symbol);
            if (data) {
                // Price
                document.querySelector(`${stock.selector} .price`).textContent =
                    `$${data.c?.toFixed(2) || "--"}`;

                // Change ($ change) with sign & color
                const changeEl = document.querySelector(`${stock.selector} .change`);
                if (data.d !== undefined) {
                    changeEl.textContent = `$${formatWithSign(data.d)}`;
                    changeEl.style.color = data.d > 0 ? "green" : data.d < 0 ? "red" : "gray";
                } else {
                    changeEl.textContent = "--";
                    changeEl.style.color = "";
                }

                // Percent Change with sign & color
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

    updateStocks();
    setInterval(updateStocks, 60000); // Update every minute
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
