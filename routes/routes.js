const { json } = require('express')
const fs = require('fs')
const path = require('path')

module.exports = (app) => {
  // setup notes variables
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err
    const notes = JSON.parse(data)

    //! API ROUTES
    //* setup get route
    app.get('/api/notes', function (req, res) {
      // return notes as JSON
      res.json(notes)
    })

    //* setup post route
    app.post('/api/notes', function (req, res) {
      // receives a new note, adds it to db.json, then returns the new note
      const newNote = req.body
      notes.push(newNote)
      updateDb()
      res.json(req.body) //* makes the note show up when I click save now
      return console.log('Added new note: ' + newNote.title)
    })

    //* Retrieves a note with specific id
    app.get('/api/notes/:id', function (req, res) {
      res.json(notes.get[req.params.id])
    })

    // //* Deletes a note with specific id
    app.delete('/api/notes/:id', function (req, res) {
      const delNote = req.body
      console.log(delNote.title)
      notes.splice(req.params.id, 1)
      updateDb()
      res.json(req.body.id) //* makes the note deleted when you click delete
      console.log('Deleted note: ' + req.params.id)
    })

    // another way
    // app.delete('/api/notes/:id', function (req, res) {
    //   const id = req.params.id
    //   notes = notes.filter((note) => note.id !== id)
    //   updateDb()
    //   res.json(req.body) // Makes the note deleted when you click delete
    //   console.log('Deleted note: ' + id)
    // })

    // //* Deletes a note with specific id. Either this 👇 or 👆
    // app.delete('/api/notes/:id', (req, res) => {
    //   console.log('Deleted note: ' + req.params.id)
    //   let noteId = req.params.id.toString()
    //   res.json(req.body.id)
    // })

    //delete a note by specific id
    // app.delete('/api/notes/:id', (req, res) => {
    //   console.info(req.method)
    //   const delNoteID = req.params.id
    //   const readFromFile = require('./routes/routes.js')
    //   readFromFile('./db/db.json')
    //     .then((data) => JSON.parse(data))
    //     .then((json) => {
    //       //the result will be returned as an array with all of the notes except the note with id that was passed in as a param
    //       const result = json.filter((note) => note.id !== delNoteID)
    //       console.log(result)

    //       //re-write the result array to db.json
    //       writeToFile('./db/db.json', result)

    //       //response to let client know delete request has been completed
    //       res.json(`note with ${delNoteID} has been deleted`)
    //     })
    // })

    //! VIEW ROUTES
    //* Display notes.html when /notes is accessed
    app.get('/notes', function (req, res) {
      res.sendFile(path.join(__dirname, '../public/notes.html'))
    })

    //* Updates the json file whenever a note is added or deleted
    function updateDb() {
      fs.writeFile('./db/db.json', JSON.stringify(notes, '\t'), (err) => {
        if (err) throw err
        return true
      })
    }
  })
}
