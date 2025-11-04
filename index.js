import express from "express"

const app = express()
const PORT = 3000

// middleware to parse JSON bodies
app.use(express.json())


// defines the route for GET requests
app.get("/", (req, res) => {
    res.json({
        firstName: "John",
        lastName: "Doe"
    })
})



// start the server
// tells express to listen for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
