const express = require("express")

const app = express();

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log("listening on localhost:" + port)
})