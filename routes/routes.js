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

    //* Deletes a note with specific id
    app.delete('/api/notes/:id', function (req, res) {
      notes.splice(req.params.id, 1)
      updateDb()
      res.json(req.body) //* makes the note deleted when you click delete
      console.log('Deleted note: ' + req.params.id)
    })

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
