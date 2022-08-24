var fs = require('fs');
var http = require('http');
var https = require('https');
const bodyParser = require('body-parser')
const express = require('express')
var privateKey  = fs.readFileSync('certificates/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('certificates/selfsigned.crt', 'utf8');

const httpPorts = [3500, 3501]
const httpsPorts = [3502, 3503]

const createApp = (port) => {
  const app = express()

  app.set('port', port)

  app.set('view engine', 'html')

  app.all('/no-cors', (req, res) => {
    res.end(req.method)
  })

  app.use(require('cors')())
  app.use(require('cookie-parser')())
  app.use(require('compression')())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(bodyParser.raw())
  app.use(require('method-override')())

  app.head('/', (req, res) => {
    return res.sendStatus(200)
  })

  app.get('/', (req, res) => {
    return res.send('<html><body>root page</body></html>')
  })

  app.get('/set-cookie', (req, res) => {
    const { cookie } = req.query

    res
    .append('Set-Cookie', cookie)
    .sendStatus(200)
  })


  app.use(require('errorhandler')())

  return app
}

httpPorts.forEach((port) => {
  const app = createApp(port)
  const server = http.Server(app)

  return server.listen(app.get('port'), () => {
    // eslint-disable-next-line no-console
    return console.log('Express server listening on port', app.get('port'))
  })
})

var credentials = {key: privateKey, cert: certificate};

httpsPorts.forEach(port => {

  const httpsApp = createApp(port)
  const httpsServer = https.createServer(credentials, httpsApp);
  
  httpsServer.listen(port, () => {
    // eslint-disable-next-line no-console
    return console.log('Express server listening on port', port, '(HTTPS)')
  })
})