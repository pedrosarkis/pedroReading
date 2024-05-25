const express = require('express')

const app = express()
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const cookieSession = require('cookie-session')

const connectionDatabase = require('./database/connection')

app.set('views', './view')
app.set('view engine', 'ejs')
app.use(express.static('./public')) 

app.use(cookieSession({
    name: 'session',
    keys: [ 'pedro', 'pedro'],
    maxAge: 60000
}))

app.use(express.json())

require('./helper/loadRouter')(app)

connectionDatabase.connectDabatase()
 
const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port)
module.exports = server