const userInput = document.querySelector('.search-box input');
const findIpArrow = document.querySelector('.search-box .icon--arrow');
const userIp = document.querySelector('#ip-address .value');
const userLocation = document.querySelector('#location .value');
const userTimezone = document.querySelector('#timezone .value');
const userIsp = document.querySelector('#isp .value');
const ipDisplay = document.querySelector('.ip-display');



/* Changing map marker Icon of map*/
const myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [30,40],
    iconAnchor: [16,42]
});

// Initialize map
let map = L.map('map',{dragging:false}).setView([0,0], 1);
let tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
let tileLayer = L.tileLayer(tileUrl, {maxZoom: 19}).addTo(map);
let marker = L.marker([0,0],{icon:myIcon});




/* On load function */
window.addEventListener('load', async ()=>{
    displayIpAddress();
    locationOnMap();
});

/* When user Enters a custom Ip address and clicks on arrow btn */
findIpArrow.addEventListener('click',()=>{
    let customIp = userInput.value;
    displayIpAddress(customIp);
    locationOnMap(customIp);
})

/* When user Enters a custom Ip address and clicks ENTER on keyboard */
window.addEventListener('keyup',event=>{
    if (event.keyCode === 13 && userInput){
        let customIp = userInput.value;
        displayIpAddress(customIp);
        locationOnMap(customIp);
    }
})



/**************** ALL FUNCTIONS THAT MAKE EVERYTHING HAPPEN ************************/




/* Fetch Ip address and details from ipinfo */
async function getIpAddress(ipAddress){
    try{
        let config = {params:{token:'7f38ccd56f3c4e'}}
        if(ipAddress){
            let ipData = await axios.get(`https://ipinfo.io/${ipAddress}`, config)
            return ipData.data;
        }
        else{
            let ipData = await axios.get(`https://ipinfo.io/`, config)
            return ipData.data;
        }
    }
    catch(err){
        console.log(err);
    }
}


/* To display users fetched IP address on screen */
async function displayIpAddress(ipAddress){
    try{
        let data = await getIpAddress(ipAddress);
        console.log(data);
        userIp.textContent = `${data.ip}`;
        userLocation.textContent = `${data.city}, ${data.region}, ${data.country}`;
        userTimezone.textContent = `${data.timezone}`;
        if(data.hostname){
            userIsp.textContent = `${data.hostname}`;
        }
        else{
            userIsp.textContent = `Not Available`;
        }
        userInput.value = ``;
    }
    catch(err){
        console.log(err)
    }
}


/* Changing map tile and marker according to data.json */
async function locationOnMap(ipAddress){
    try{
        let data = {};
        if(ipAddress){
            data = await getIpAddress(ipAddress)
        }
        else{
            data = await getIpAddress();
        }
        let currentLocation = data.loc.split(',');
        map.flyTo([`${(currentLocation[0])}`,`${currentLocation[1]}`], 7,{
            duration:0.7
        });
        marker.setLatLng([`${(currentLocation[0])}`,`${currentLocation[1]}`]).addTo(map);
    }
    catch(err){
        console.log(err)
    }
}











