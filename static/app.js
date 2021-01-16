async function main(){
  //recuperer IP
  const ip = await fetch("https://api.ipify.org?format=json")
  .then(resultat => resultat.json())
  .then(json => json.ip)

    //récuperer ville de IP

  const ville = await fetch("https://freegeoip.app/json/" + ip)
  .then(resultat => resultat.json())
  .then(json => json.city)
  
    //recuperer meteo de la ville
      const meteo = await fetch("https://api.openweathermap.org/data/2.5/weather?&lang=fr&units=metric&appid=f0cd26ef432d833785e4455713d29d81&q=" + ville)
  .then(resultat => resultat.json())
  .then(json => json)
  console.log(meteo);



  displayWeatherInfos(meteo);

}

function capitalize(str){
  return str[0].toUpperCase() + str.slice(1);
}

const icons = {
  "Rain": "wi wi-day-rain",
  "Clouds": "wi wi-day-cloudy",
  "Clear": "wi wi-day sunny",
  "Snow": "wi wi-day-snow",
  "Fog": "wi wi-day-fog",
  "Drizzle": "wi wi-day-sleet",
}



  //utilisation des données récoltées pour mettre à jour la page
function displayWeatherInfos(data){

const name = data.name;
const temperature = data.main.temp;
const conditions = data.weather[0].main;
const description = data.weather[0].description;

//attribue les données dans contenu du site

document.querySelector("#city").textContent = name;
document.querySelector("#temperature").textContent = Math.round(temperature);
document.querySelector("#weather-description").textContent = capitalize(description);

document.querySelector("i.wi").className = icons[conditions];

document.body.className = conditions.toLowerCase();
}

main();