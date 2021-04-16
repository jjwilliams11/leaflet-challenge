// function to set colors based on depth of quake
function colorDepth(depth){
    if(depth < 10){
        return "#00FF80";
    }
    else if (depth >=10 && depth < 30){
        return "#008000";
    }
    else if (depth >=30 && depth < 50){
        return "#FFFF00";
    }
    else if (depth >=50 && depth < 70){
        return "#FF8000";
    }
    else if (depth >=70 && depth < 90){
        return "#FF3333";
    }
    else{
        return "#990000";
    }

}

// function to set radius based on magnitude of quake
function magnitudeSize(magnitude) {
    return magnitude * 25000;
  }

function dateTime(time){

    let date = new Date(time*1000);

    let hours = date.getHours();

    let minutes = `${date.getMinutes()}`;

    let seconds = `${date.getSeconds()}`;

    let quakeTime = `Occurred on ${date} at ${hours}:${minutes}:${seconds}`

    return quakeTime
}


// Get our data
let Quake7dayUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(Quake7dayUrl).then(function(data) {
    console.log(data.features)
    // Once we get a response, send the data.features object to the createFeatures function
    createQuakes(data.features);
});

let plateBoundaries = "static/GeoJSON/PB2002_boundaries.json"


function createQuakes (quakeData) {
    function onEachFeatures(feature, layer){
        layer.bindPopup(`<h2>Location: ${feature.properties.place}</h2> <hr> <h3>${dateTime(feature.properties.time)}</h3> 
        <hr> <h3> Magnitude of ${magnitude} and Depth of ${depth}`);
    }

    let earthquakes = L.geoJson(quakeData, {
        onEachFeatures: onEachFeatures
    });

    createMap(earthquakes)
}


function createMap(earthquakes) {

    // Adding tile layers to the map
    let streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
        })

    let lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
        })

    let darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
        })


    // setup baseMaps
    let baseMaps = {
        Street: streetMap,
        Light: lightMap,
        Dark: darkMap
    };

    // setup overlayMaps
    let overlayMaps = {
        // Techtonic: plateLayer,
        EarthQuakes: earthquakes
    };

    // Creating map object
    let quakeMap = L.map("map", {
        center: [29.9546500, -90.0750700],
        zoom: 3,
        layers: [streetMap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(quakeMap);


    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = ['<10','10 - 30','30 -50 ','50 -70','70 - 90', '>90'];
        var colors = ['#00FF80','#008000','#FFFF00','#FF8000','#FF3333', '#990000'];
        var labels = [];

        // Add min & max
        var legendInfo = "<h1>Earthquake Depth (KM) </h1>" +
        "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding legend to the map
    legend.addTo(quakeMap);
}



// // Adding quake and techtonic plate layers
// let quakeMarkers = [];

// let plateMarkers = [];

// d3.json(plateBoundaries).then(function(boundaries) {
    
//     let plateLayer = L.geoJson(boundaries, {
//     })
//     // boundaries = boundaries.features

//     // boundaries.forEach(data => {
//     //     data = data.geometry.coordinates;
//     //     // console.log(data);
//     //     data.forEach(marker => {
//     //         plateMarkers.push(marker)
//     //         // console.log(marker)
//     //     })
        
//     // })

// })
// console.log(plateMarkers)
// let plateLine = L.polyline(plateMarkers, {
//     color: "yellow"
// });

// let plateLayer = L.layerGroup(plateLine);








// Plot our data
// d3.json(Quake7dayUrl).then(function(quakeData) {
//     quakeData = quakeData.features
//     quakeData.forEach(quake => {

//         let lat = quake.geometry.coordinates[1];
//         let lon = quake.geometry.coordinates[0];
//         let depth = quake.geometry.coordinates[2];
//         let magnitude = quake.properties.mag;
//         let time = quake.properties.time;
    
//         L.circle([lat,lon], {
//             color: colorDepth(depth),
//             fillColor: colorDepth(depth),
//             fillOpacity: 0.7,
//             radius: magnitudeSize(magnitude)       
//         }).bindPopup(`<h2>Location: ${quake.properties.place}</h2> <hr> <h3>${dateTime(time)}</h3> 
//         <hr> <h3> Magnitude of ${magnitude} and Depth of ${depth}`)//.addTo(quakeMap)
//     });

// });
