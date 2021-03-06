
export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap,
    getGeoCodeLocation
}

var map;

export function initMap(lat , lng) {
    if (!lat && !lng) lat = 32.0749831, lng = 34.9120554
    
    console.log('InitMap');
    console.log('lat,lng', lat,lng);

    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 6
            })
            console.log('Map!', map);
        })
  
                
}

export function getMap() {
    return map;
}

function getGeoCodeLocation(userInput) {
            return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=AIzaSyBBCOBcDeaFCoGrW6JMFH3k-AFLC2i4M8k`)
            .then(res => res.data)
}


function addMarker(loc) {
    console.log("MARK",loc)
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAo_8PwXbZvNqsCkm0ZIWcsxi66j2pKRKA'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



