//Today's Card Variables
let today = document.getElementById("today");
    todayDate = document.getElementById("today-date");
    cityLocation = document.getElementById("location");
    todayDegree = document.getElementById("today-degree");
    todayImg = document.getElementById("today-img");
    todayDescription  = document.getElementById("today-Des");
    humidty = document.getElementById("humidty");
    wind = document.getElementById("wind");
    compass = document.getElementById("compass");
    searchBar = document.getElementById("search-bar");
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];


let apiResponse,
    responseData;
// Next Days Card Variables ;
let nextDay = document.getElementsByClassName("nextDay");
    nextDayIcon = document.getElementsByClassName("nextDay-icon");
    maxDegree = document.getElementsByClassName("max-degree");
    minDegree = document.getElementsByClassName("min-degree");
    nextDayDescription = document.getElementsByClassName("nextDay-description");

    
let currentCity =  "Cairo";




async function getWeather()
{
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b9f304e0dc274c9d90b213304222703&q=${currentCity}&days=3`);
    responseData = await apiResponse.json();
    console.log(responseData);
    displayToday();
    displaynext();
}
getWeather();

function displayToday()
{
    let date= new Date();
    today.innerHTML = days[date.getDay()]
    todayDate.innerHTML = `${date.getDate()} ${month[date.getMonth()]}`
    cityLocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = responseData.current.temp_c;
    todayImg.setAttribute("src",`https:${responseData.current.condition.icon}`);
    todayDescription.innerHTML = responseData.current.condition.text;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerHTML = responseData.current.wind_dir;
    humidty.innerHTML =responseData.current.humidity;
}



function displaynext()
{
    for(let i= 0 ; i<nextDay.length ; i++)
    {
        nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()] ;
        nextDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text;
    }
}

searchBar.addEventListener("keyup",function()
{
    currentCity = searchBar.value;
    getWeather();
})