// 1. Select elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// 2. API URL using your coordinates (rounded to 2 decimal places)
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=5.04&lon=7.91&units=metric&appid=0673075be2455e389ebab34df32d2f5c';

// 3. Fetch Data Function
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // For debugging: see the full JSON object
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// 4. Display Data
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(1)} °C`;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', data.weather[0].description);

    captionDesc.textContent = data.weather[0].description;
}

// 5. Call the function
apiFetch();
