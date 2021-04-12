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


