const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/register', (req, res) => {
  const registerInfo = req.body

  fs.readFile('roster.json', 'utf8', (err, data) => {
    console.log(err)
    if (err && err.code !== 'ENOENT') {
      throw err
    } else {
      const roster = err ? [] : JSON.parse(data)

      roster.push(registerInfo)
      fs.writeFile('roster.json', JSON.stringify(roster, null, 2), (err) => {
        if (err) {
        }
        res.sendStatus(201)
      })
    }
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000...')
})
