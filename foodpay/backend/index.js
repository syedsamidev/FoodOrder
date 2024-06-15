const express = require('express');
const { connectToMongo } = require("./db.js");
const createUserRoutes = require("./routes/CreateUser.js");
const displayDataRoutes = require ("./routes/displayData.js");
const orderRoutes = require("./routes/orders.js");


const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

// Define a route for the root URL ('/')
app.get('/', (req, res) => {
    res.send('Successful response.');
});

// Define API routes
app.use("/api", createUserRoutes);
app.use("/api", displayDataRoutes);
app.use("/api", orderRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Connect to MongoDB and start the server
async function startServer() {
    try {
        await connectToMongo();
        app.listen(5000, () => {
            console.log('Example app is listening on port 5000.');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

startServer();
