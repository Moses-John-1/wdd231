// ========== WEATHER SECTION ==========
const apiKey = '0673075be2455e389ebab34df32d2f5c';
const lat = 5.037452886553352;
const lon = 7.912900496072178;

const weatherSection = document.querySelector('.weather');
const forecastSection = document.querySelector('.weather-forecast .forecast');

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function displayWeather() {
    try {
        console.log('Fetching weather data...');

        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Display current weather
        const current = data.list[0];
        const description = current.weather[0].description;
        const temp = Math.round(current.main.temp);
        const iconSrc = `https://openweathermap.org/img/w/${current.weather[0].icon}.png`;

        const currentWeatherHTML = `
            <h2>Current Weather</h2>
            <img src="${iconSrc}" alt="${description}">
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Description:</strong> ${description}</p>
            
        `;
        weatherSection.innerHTML = currentWeatherHTML;

        // Display 3-day forecast
        const forecastHTML = `
            <h2>Weather Forecast</h2>
            <ul>
                ${get3DayForecastHTML(data.list)}
            </ul>
        `;
        forecastSection.innerHTML = forecastHTML;

        console.log('Weather loaded successfully');

    } catch (error) {
        console.error('Weather fetch error:', error);
        weatherSection.innerHTML = `<p>Unable to load weather data.</p>`;
        forecastSection.innerHTML = `<p>Unable to load forecast data.</p>`;
    }
}

function get3DayForecastHTML(forecastList) {
    const days = [];
    const html = [];

    for (let item of forecastList) {
        const date = new Date(item.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        if (!days.includes(dayName) && days.length < 3 && date.getHours() === 12) {
            days.push(dayName);
            const dayTemp = Math.round(item.main.temp);
            html.push(`<li><strong>${dayName}:</strong> ${dayTemp}°C</li>`);
        }
    }

    return html.join('');
}

document.addEventListener('DOMContentLoaded', displayWeather);


// ========== SPOTLIGHT SECTION ==========
document.addEventListener('DOMContentLoaded', () => {
    const spotlightContainer = document.querySelector('#spotlight-container');

    async function getMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const members = await response.json();

            const spotlightCandidates = members.filter(member =>
                member.membership === 2 || member.membership === 3
            );

            const selectedSpotlights = [];
            while (selectedSpotlights.length < 3 && spotlightCandidates.length > 0) {
                const index = Math.floor(Math.random() * spotlightCandidates.length);
                selectedSpotlights.push(spotlightCandidates.splice(index, 1)[0]);
            }

            selectedSpotlights.forEach(member => {
                const card = document.createElement('section');
                card.classList.add('spotlight');

                card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name} logo">
          <h5>${member.name}</h5>
          <p>${member.description}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        `;

                spotlightContainer.appendChild(card);
            });

        } catch (error) {
            console.error('Error loading spotlight members:', error);
            spotlightContainer.innerHTML = '<p class="error">Unable to load spotlight members. Please try again later.</p>';
        }
    }

    getMembers();
});

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.textContent = nav.classList.contains('open') ? '\u00D7' : '\u2630';
});
