const http = require('http')
const fs = require('fs')
const path = require('path')

const extensions = {
  '.txt': 'text/plain',
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json'
}
function parseData(body/*foo=bar&baz=qux*/) {
  body.split('&')/*['foo=bar', 'baz=qux']*/
  .map(string => string.split('=')) /*[['foo', 'bar'], ['baz', 'qux']]*/
  .reduce((), {})
} // {foo:"bar", baz:"qux"}

// standings/index.html

// <link rel="stylesheet" href="../standings.css" />

/*
skillsilo.com/spanish => spanish/index.html, spanish/app.js, spanish/style.css
skillsilo.com/japanese => japanese/index.html
*/
function fixURL (url) {
  if (url.slice(-1) === '/') {
    url += 'index.html'
  } else if (path.extname(url) === '') {
    url += '/index.html'
  }

  return url
}

const server = http.createServer((req, res) => {
  // http://localhost:3000/ => 404
  // http://localhost:3000/index.html
  // / => /index.html
  // /standings => /standings/index.html
  // /standings.html x> /standings.html/index.html
  // /standings/ => /standings/index.html
  const filePath = path.join(__dirname, fixURL(req.url))

  if (req.method === 'GET') {
    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) {
        res.statusCode = 404
        res.write('404: File not found.')
        res.end()
      } else {
        const ext = path.extname(filePath)
        res.writeHead(200, {'Content-Type': extensions[ext]})
        res.write(file)
        res.end()
      }
    })
  } else if (req.method === 'POST') {
    req.on('data', (chunk) => {
      let body = ''
      body += chunk
      // childfistname=micah&childlastname=gordon&
      const registerInfo = parseData(body)
      // const registerInfo = body.split('&')
      //   .map((pair) => pair.split('='))
      //   .reduce((obj, [key, val]) => {
      //     obj[key] = val
      //     return obj
      //   }, {})
      const rosterAddition = JSON.stringify(registerInfo, null, 2)
      fs.appendFile('roster.json', rosterAddition, (err) => {
        if (err) {
        }
      })
    })
    req.on('end', () => {
      res.end('A request has been made in your honor.')
    })
  }
})
server.listen(3000, () => {
  console.log('Serving on port 3000...')
})
