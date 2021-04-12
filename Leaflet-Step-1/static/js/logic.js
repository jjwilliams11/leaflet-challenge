// Store API endpoint inside queryUrl
var Quake7dayUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Get request from URL
d3.json(Quake7dayUrl).then(function(data){

    createQuakes(data.features);
});


function createQuakes(quakeData){

    // Function to run through each feature and give a popup with date and time
    function onEachQuake(feature, layer){
        layer.bindPopup(`<h3> ${feature.properties.place} </h3><hr>
                        <h2> ${new Date(feature.properties.time)}</p>`);
    }

    // Create GeoJSON layer and run the above function once for each quake
    let earthquakes = L.geoJSON(quakeData, {
        onEachQuake: onEachQuake
    });

    createMap(earthquakes)
}

function createMap(earthquakes){

    let streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution:"© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom:18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    
    });

    let baseMaps = {
        "Street Map": streetMap
    };


    let overlayMaps = {
        Earthquakes: earthquakes
    };


    let earthquakeMap = L.map("mapid", {
        center: [37.09, -95.71],
        zoom: 4,
        layers: [streetMap,earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(earthquakeMap);

}

