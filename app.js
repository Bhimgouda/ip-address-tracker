async function getIpAddress(){
    let config = {params:{token:'7f38ccd56f3c4e'}}
    let ipData = await axios.get('https://ipinfo.io/', config)
    return ipData.data;
}

getIpAddress()

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
