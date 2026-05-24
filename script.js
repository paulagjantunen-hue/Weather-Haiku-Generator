const apiKey = "6b2b9f269cc55128b3c490213bebbb34";

const locationEl = document.getElementById("location");
const weatherEl = document.getElementById("weather");
const haikuEl = document.getElementById("haiku");

const btn = document.getElementById("generateBtn");
const cityInput = document.getElementById("cityInput");

btn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) return;

    getWeather(city);
});

async function getWeather(city) {
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            weatherEl.textContent = "City not found.";
            return;
        }

        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main.toLowerCase();

        locationEl.textContent = data.name;
        weatherEl.textContent =
            `${temp}°C • ${data.weather[0].description}`;

        const haiku = generateHaiku(condition, temp);

        haikuEl.textContent = haiku;

        setTheme(condition);

    } catch (err) {
        weatherEl.textContent = "Something went wrong.";
        console.error(err);
    }
}

function generateHaiku(condition, temp) {

    const intros = [
        "Tiny wet pigeons",
        "A confused old cloud",
        "Wind attacks my hair",
        "The sky forgot peace",
        "An ambitious leaf",
        "Cold soup of morning"
    ];

    const middles = {
        clear: [
            "sunlight melts the sidewalk",
            "bees ignore my drama",
            "everyone wears sunglasses"
        ],

        rain: [
            "puddles consume my shoes",
            "the bus smells like soup",
            "umbrellas duel softly"
        ],

        clouds: [
            "gray blankets drift slowly",
            "the sky cannot commit",
            "birds file complaints"
        ],

        snow: [
            "snowflakes attack silently",
            "my fingers lose hope",
            "the world eats all sound"
        ]
    };

    const endings = [
        `it is somehow ${temp} degrees`,
        "nature wins again",
        "I forgot my jacket",
        "a crow watches me",
        "the weather feels personal",
        "tomorrow seems suspicious"
    ];

    let middlePool = middles.clouds;

    if (condition.includes("clear")) {
        middlePool = middles.clear;
    } else if (condition.includes("rain")) {
        middlePool = middles.rain;
    } else if (condition.includes("snow")) {
        middlePool = middles.snow;
    }

    const line1 = random(intros);
    const line2 = random(middlePool);
    const line3 = random(endings);

    return `${line1}
${line2}
${line3}`;
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function setTheme(condition) {
    
    document.body.className = "";

    const rain = document.querySelector(".rain");
    const snow = document.querySelector(".snow");

    rainclassList.remove("active");
    snow.classList.remove("active");

    if (condition.includes("clear")) {

        document.body.classList.add("sunny");

    } else if (condition.includes("rain")) {

        document.body.classList.add("rainy");
        rain.classList.add("active");

    } else if (condition.includes("snow")) {

        document.body.classList.add("snowy");
        snow.classList.add("active");

    } else {

        document.body.classList.add("cloudy");
        
    }
}