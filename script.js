const API = "0ca628ef9f4ef234540def244691a796";
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector('.search input') // поле ввода 
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const searchCancel = document.querySelector('.cross button');

async function ClearInput(){
    searchbox.value  = " ";
}

searchCancel.addEventListener('click', ClearInput);

async function checkCorrect(city){
    const response = await fetch(URL + city + `&appid=${API}`);

    document.querySelector(".weather").style.display = "none";

    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();

        let City = document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " км/ч";
    
        // Обновление изображений
    
        if (data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"
        }
        if (data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}


searchButton.addEventListener("click", ()=> {
    checkCorrect(searchbox.value);
})

checkCorrect();


