const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')


const cameraRouter = require('./routes/cameraRoutes')
const networksRouter = require('./routes/networkRoutes')


// dotenv config
dotenv.config()



// mongodb connection
// connectDB()
connectDB()



// rest object
const app = express()



// middleware
app.use(express.json())
app.use(morgan('dev'))


// router
app.use('/cameras', cameraRouter);
app.use('/networks', networksRouter);



// port

const port = process.env.PORT || 8080

// listen port 

app.listen(port, () => {
    console.log(`server running on ${process.env.NODE_MODE} mode on port ${process.env.PORT}`

    );
})
