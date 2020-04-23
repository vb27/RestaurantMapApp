$(function () {
  const namesArr = [];

  mapboxgl.accessToken =
    "pk.eyJ1IjoidmIyNyIsImEiOiJjazk4cjdteTgwNDNiM21xdHQ1Y3BtbWhyIn0.oyEQCIxSrbYI1VZ208kcPw";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/vb27/ck98rwfum06mc1ikcz89mqepw",
    center: [-122.3321, 47.6062],
    zoom: 7,
    maxzoom: 7,
  });
  map.on("load", function(){
    map.loadImage("https://i.imgur.com/MK4NUzI.png", function (
      error,
      image
    ) {
      if (error) throw error;
      map.addImage("custom-marker", image);
      map.addLayer({
        maxzoom: 15,
        id: this.name,
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  description:
                    "<strong>" +
                    this.name +
                    `</strong></br><img class= "image"src= "${this.image}"/><p>` +
                    this.review +
                    "</p><p class='address'>" +
                    this.address +
                    "</p>",
                },
                geometry: {
                  type: "Point",
                  coordinates: [this.long, this.lat],
                },
              },
            ],
          },
        },
        layout: {
          "icon-image": "custom-marker",
          "icon-allow-overlap": true,
          "symbol-placement": "point",
          "icon-anchor": "bottom",
        },
      });
    });
  })
  $("#btnSave").on("click", async function (event) {
    event.preventDefault();
    const placeN = $("#name").val().trim();
    const placeR = $("#review").val().trim();
    const placeA = $("#address").val().trim();

    let placeI = $("#placeImg")[0].files[0]; // get input value

    // make object
    const data = new FormData();
    data.append("file", placeI);

    data.append("upload_preset", "bvomk4gv");
    // upload file
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/myfoodmap/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    console.log(file.url)

      for (i=0; i<namesArr.length; i++){
        if (placeN === namesArr[i])
        alert("Title needs to be unique!")
        return;
      }

    namesArr.push(placeN);
    // api URL and ajax call
    var queryURL =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      placeA +
      ".json?proximity=-122.27995,47.88047&access_token=pk.eyJ1IjoidmIyNyIsImEiOiJjazk4cjdteTgwNDNiM21xdHQ1Y3BtbWhyIn0.oyEQCIxSrbYI1VZ208kcPw";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // console.log(response.features[0].center[0]); //long
      // console.log(response.features[0].center[1]); //lat
      // creating an object with all of the users info
      const newLocation = {
        name: placeN,
        review: placeR,
        long: response.features[0].center[0],
        lat: response.features[0].center[1],
        address: response.features[0].place_name,
        image: file.url
      };
      // giving the object to the newMap function
      newMap(newLocation);
      if (placeN != "" && placeR != "") {
        const placeNameCon = {
            name: placeN,
            review: placeR,
            image: file.url,
            address: response.features[0].place_name,
            // long: response.features[0].center[0]
            // lat: response.features[0].center[1]
        };
       
        $.ajax("/locations/user", {
            type: "POST",
            data: placeNameCon,
        }).then(() => {
            console.log("Success");
        });
    } else {
        alert("Please fill up the blank space");
    }
    });

    // newMap function makes a maker with the information from the ajax call
    function newMap(newLocation) {
      map.loadImage("https://i.imgur.com/MK4NUzI.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-marker", image);
        map.addLayer({
          maxzoom: 15,
          id: newLocation.name,
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {
                    description:
                      "<strong>" +
                      newLocation.name +
                      `</strong></br><img class= "image"src= "${newLocation.image}"/><p>` +
                      newLocation.review +
                      "</p><p class='address'>" +
                      newLocation.address +
                      "</p>",
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [newLocation.long, newLocation.lat],
                  },
                },
              ],
            },
          },
          layout: {
            "icon-image": "custom-marker",
            "icon-allow-overlap": true,
            "symbol-placement": "point",
            "icon-anchor": "bottom",
          },
        });
      });
    }

    // this is an on click function that is inside a loop so that there can be multiple id's with the same onclick
    for (i = 0; i < namesArr.length; i++) {
      map.on("click", namesArr[i], function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });
      // these last two on functions change the mouse from the hand to a pointer when they hover over a marker
      map.on("mouseenter", namesArr[i], function () {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", namesArr[i], function () {
        map.getCanvas().style.cursor = "";
      });
      
    }
    
});

});