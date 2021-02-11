// require your server and launch it
const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 4000
const server = require('./api/server');

const app = express()
app.use(cors())
app.use(express.json())

server.listen(port, () =>{
    console.log(`\n* Server Running on http://localhost${port} *\n`)
})

