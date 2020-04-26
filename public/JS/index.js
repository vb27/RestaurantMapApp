$(function () {
  // array to hold all the names so that we can loop through them to reference them later
  const namesArr = [];

  // mapbox key
  mapboxgl.accessToken = "pk.eyJ1IjoidmIyNyIsImEiOiJjazk4cjdteTgwNDNiM21xdHQ1Y3BtbWhyIn0.oyEQCIxSrbYI1VZ208kcPw"
  // mapbox function to create a map
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/vb27/ck98rwfum06mc1ikcz89mqepw",
    center: [-122.3321, 47.6062],
    zoom: 7,
    maxzoom: 7,
  });

  render();
  // function that will render all of the saved data of the user
  function render() {
    $.ajax("/locations/saved", {
      type: "GET",
    }).then((savedLoc) => {
      // loops through the json array from the ajax call
      for (let i = 0; i < savedLoc.length; i++) {
        // loads the image of the marker
        map.loadImage("https://i.imgur.com/MK4NUzI.png", function (
          error,
          image
        ) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // this adds the marker on the  map
          map.addLayer({
            maxzoom: 15,
            id: savedLoc[i].name, //this is a unqiue name for each marker so that we can reference them later
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {
                      description: // this is the html that will live inside the popup
                        "<strong>" +
                        savedLoc[i].name +
                        `</strong></br><img class= "image"src= "${savedLoc[i].image}"/><p>` +
                        savedLoc[i].review +
                        "</p><p class='address'>" +
                        savedLoc[i].address +
                        "</p>",
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [savedLoc[i].long, savedLoc[i].lat], // this is the coordinates that place the marker
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
        // making sure that the array has names of the old database
        namesArr.push(savedLoc[i].name);
        console.log(savedLoc[i]);
      }

      clickAble();

    });
  }

  $("#btnSave").on("click", async function (event) {
    event.preventDefault();
    // grabs the values that were inputed by the user in each field
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
    // this is an if statement to make sure that the name that the user inputs is unqiue (this allows other users the same name though)
    let unique = namesArr.indexOf(placeN)
    if (unique === -1) {
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
        // creating an object with all of the users info
        const newLocation = {
          name: placeN,
          review: placeR,
          long: response.features[0].center[0],
          lat: response.features[0].center[1],
          address: response.features[0].place_name,
          image: file.url,
        };
        // giving the object to the newMap function
        newMap(newLocation);

        // if statement to make sure that the name and review fields arent empty
        if (placeN != "" && placeR != "") {
          const placeNameCon = {
            name: placeN,
            review: placeR,
            image: file.url,
            address: response.features[0].place_name,
            long: response.features[0].center[0],
            lat: response.features[0].center[1],
          };
          // creating the new location in the database
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

      // this loops though all the names in the the array so that it can make a click function for them all
      clickAble();

    } else {
      alert("Name needs to be unique!");

    }
  });


  function clickAble() {
    // this loops though all the names in the the array so that it can make a click function for them all
    for (let i = 0; i < namesArr.length; i++) {
      map.on("click", namesArr[i], function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        // this is where the pop up is created
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
  }

  // newMap function makes a maker with the information from the ajax call (basically the same function for the load except it takes the data from the usr input)
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


});
