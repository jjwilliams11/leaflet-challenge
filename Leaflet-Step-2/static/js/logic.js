// Store API endpoint inside queryUrl
var Quake7dayUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Get request from URL
d3.json(Quake7dayUrl).then(function(data){

    createQuakes(data.features);
});


function createQuakes(quakeData){

    function onEachQuake(feature, layer){
        layer.bindPopup("H3")
    }
}