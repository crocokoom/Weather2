// Select elements from the DOM
const container = document.querySelector('.container'); // Main container
const search = document.querySelector('.search-box button'); // Search button
const weatherBox = document.querySelector('.weather-box'); // Box to display weather info
const weatherDetails = document.querySelector('.weather-details'); // Detailed weather info section
const error404 = document.querySelector('.not-found'); 

// Add event listener for search button click
search.addEventListener('click', () => {
    const APIKey = 'c544010ca97a085c1e7edc4fa9737d2e'; // OpenWeatherMap API key
    const city = document.querySelector('.search-box input').value; // Get user input

    // Return early if input is empty
    if (city === '') return;

    // Fetch weather data from API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json()) // Parse JSON response
        .then(json => {
            // Check if the city was not found
            if (json.cod === '404') {
                container.style.height = '400px'; // Adjust container height for error
                weatherBox.style.display = 'none'; // Hide weather box
                weatherDetails.style.display = 'none'; // Hide weather details
                error404.style.display = 'block'; // Show error message
                error404.classList.add('fadeIn'); // Add fade-in animation
                return;
            }

            // Hide error message if city is found
            error404.style.display = 'none'; 
            error404.classList.remove('fadeIn'); // Remove fade-in class

            // Select elements to display weather data
            const image = document.querySelector('.weather-box img'); // Weather icon
            const temperature = document.querySelector('.weather-box .temperature'); // Temperature display
            const description = document.querySelector('.weather-box .description'); // Weather description
            const humidity = document.querySelector('.weather-details .humidity span'); // Humidity value
            const wind = document.querySelector('.weather-details .wind span'); // Wind speed value

            // Update weather icon based on the weather condition
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/Sun.png'; // Sun icon for clear weather
                    break;
                case 'Rain':
                    image.src = 'images/rain.png'; // Rain icon
                    break;
                case 'Snow':
                    image.src = 'images/snow.png'; // Snow icon
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png'; // Cloud icon
                    break;
                case 'Haze':
                    image.src = 'images/mist.png'; // Mist icon
                    break;
                default:
                    image.src = ''; // Default case if no match
            }

            // Update the displayed temperature, description, humidity, and wind speed
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; // Temperature in °C
            description.innerHTML = `${json.weather[0].description}`; // Weather description
            humidity.innerHTML = `${json.main.humidity}%`; // Humidity percentage
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`; // Wind speed in Km/h

            // Show weather information and adjust container height
            weatherBox.style.display = ''; // Show weather box
            weatherDetails.style.display = ''; // Show weather details
            weatherBox.classList.add('fadeIn'); // Add fade-in animation
            weatherDetails.classList.add('fadeIn'); // Add fade-in animation
            container.style.height = '590px'; // Adjust container height for weather info
        });
});
