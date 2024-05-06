const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")


const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/enroll", (req, res) => {
    console.log(req.body)
    // res.status(200).send({"message": "Data received"})
    res.status(401).send({"message": "Data received"})
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})

// Path: server/package.json