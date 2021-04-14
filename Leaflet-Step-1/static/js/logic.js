// Creating map object
let quakeMap = L.map("map", {
    center: [29.9546500, -90.0750700],
    zoom: 3
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(quakeMap);

// Get our data

let Quake7dayUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// function to set colors based on depth of quake
function colorDepth(depth){
    if(depth < 5){
        return "green";
    }
    else if (depth >=5 && depth < 10){
        return "yellow";
    }
    else{
        return "red";
    }
}

// function to set radius based on magnitude of quake
function magnitudeSize(magnitude) {
    return magnitude * 75000;
  }

let quakeGeoJson;

// Plot our data
d3.json(Quake7dayUrl).then(function(quakeData) {
    quakeData = quakeData.features
    quakeData.forEach(quake => {

        let lat = quake.geometry.coordinates[1];
        let lon = quake.geometry.coordinates[0];
        let depth = quake.geometry.coordinates[2];
        let magnitude = quake.properties.mag;
    
        L.circle([lat,lon], {
            color: colorDepth(quake.geometry.coordinates[2]),
            fillColor: colorDepth(quake.geometry.coordinates[2]),
            fillOpacity: 0.5,
            radius: magnitudeSize(magnitude)       
        }).addTo(quakeMap)
    });

});



// d3.json(Quake7dayUrl).then(function(quakeData) {

//     // Isolate each quake features
//     quakeData = quakeData.features;

//     // Create a new choropleth layer
//     quakeGeoJson = L.choropleth(quakeData, {
  
//       // Define what  property in the features to use
//       valueProperty: "mag",
  
//       // Set color scale
//       scale: ["yellow", "green"],
  
//       // Number of breaks in step range
//       steps: 10,
  
//       // q for quartile, e for equidistant, k for k-means
//       mode: "q",
//       style: {
//         // Border color
//         color: "#fff",
//         weight: 1,
//         fillOpacity: 0.8
//       } //,
  
//       // Binding a pop-up to each layer
//     //   onEachFeature: function(feature, layer) {
//     //     layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
//     //       "$" + feature.properties.MHI2016);
//     //   }
//     }).addTo(myMap);
// })
// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

// HINT the depth of the earth can be found as the third coordinate for each earthquake.

// Include popups that provide additional information about the earthquake when a marker is clicked.

// Create a legend that will provide context for your map data.

// Your visualization should look something like the map above.