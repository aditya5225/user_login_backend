const express = require("express")
const app = express()
const port = 5000
const cors = require("cors")
const router = require("./routes/router")

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cors())

//to set the route
app.use("/user", router);


app.get("/", (req, res) =>{
    res.send("Hello World")
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

