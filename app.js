const express = require('express');

const app = express();

const cookieSession = require('cookie-session');

const connectionDatabase = require('./database/connection');

app.set('views', './view');
app.set('view engine', 'ejs');
app.use(express.static('./public')) ;

app.use(cookieSession({
  name: 'session',
  keys: [ 'pedro', 'pedro'],
  maxAge: 60000
}))

app.use(express.json());

require('./helper/loadRouter')(app);

connectionDatabase.connectDabatase(); 
 
const port = process.env.PORT || 3000
app.listen(port);