$(function () {

    $("#btnSave").on("click", async function (event) {
        event.preventDefault();
        const placeN = $("#name").val().trim();
        const placeR = $("#review").val().trim();
        const placeA = $("#address").val().trim();
        let placeI = $("#placeImg")[0].files[0];  // get input value

        // make object
        const data = new FormData();
        data.append("file", placeI);

        data.append("upload_preset", "bvomk4gv");
        // upload file
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/myfoodmap/image/upload",
            {
                method: "POST",
                body: data
            }
        );
        const file = await res.json();
        console.log(file.url);
        
        if (placeN != "" && placeR != "") {

            const placeNameCon = {
                name: placeN,
                review: placeR,
                image: file.url,
                address: placeA                
            }

            $.ajax("/locations/user", {
                type: "POST",
                data: placeNameCon
            }).then(() => {
                console.log("Success");
            })
        } else { alert("Please fill up the blank space") }
    })
    
});