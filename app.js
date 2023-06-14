// Defining all my DOM variables

var input_text = document.querySelector('#input-text')
var ip_text = document.querySelector('#ip-text')
var loc_text = document.querySelector('#loc-text')
var timezone_text = document.querySelector("#timezone-text")
var isp_text = document.querySelector("#isp-text")

// Icon for the marker on the Map

var icon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [40, 45],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
})

// Loading the map 

var map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Fetching the user IP and diplay it on the map

fetch("https://api.ipify.org")
    .then(response => geoLocate(response))


 
// Function to fecth data to the api and display the values on the screen 
// I didnt use the api which was recommanded but this one here (https://ip-api.com/) which dont require to register on the website. 

function geoLocate(ip1){
    if (input_text.value.lenght == 0){
        var ip = ip1
    }else{
        var ip = input_text.value
    }
    var url = `http://ip-api.com/json/${ip}`
    fetch(url)
        .then( response => response.json())
        .then( response => {
            ip_text.textContent = response["query"]
            loc_text.textContent = response["city"] + ", " + response["region"] + ", " +response["zip"] + ", " + response["countryCode"]
            timezone_text.textContent = response["timezone"]
            isp_text.textContent = response["isp"]
            var lat = response["lat"]
            var long = response["lon"]
            setMap(lat, long)
        })
}

// Set the new Map center and place a marker corresponding to the ip in the search bar

function setMap(lat, long){
    map.zoomIn(13)
    L.marker([lat, long], {icon: icon}).addTo(map);
    map.panTo(new L.LatLng(lat, long));
}
