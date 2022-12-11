//* Required Dependencies OR node modules
const express = require('express') // returns a function reference.
const fs = require('fs')
const path = require('path') // provides utilities for working with file and directory paths.

//* Initializing express & port number
const app = express()
const PORT = process.env.PORT || 3000

//* Setting up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public'))) // Adding a static middleware for serving assets

//* Require routes files
require('./routes/routes')(app)

//* Setting up listener to listen to connections
app.listen(PORT, function () {
  console.log(`App listening at http://localhost:${PORT}`)
})
