const express = require('express');

const app = express();
const session = require('express-session');

const connectionDatabase = require('./database/connection');
const sessionMiddleware = require('./middleware/auth');
const adminMiddleware = require('./middleware/authAdmin');
const helmet = require('helmet');
const indexRoute = require('./routes/index');
const indexBook = require('./routes/books');
const indexUser = require('./routes/users');
const indexAdmin = require('./routes/admin');

app.set('views', './view');
app.set('view engine', 'ejs');
app.use(helmet());
app.use(session({
  secret: 'pedroGod',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(express.json());
app.use(express.static('./public'));
app.use(sessionMiddleware);
app.use('/admin', adminMiddleware);
app.use('/', indexRoute);
app.use('/books', indexBook);
app.use('/users', indexUser);
app.use('/admin', indexAdmin);

connectionDatabase.connectDabatase(); // não sei se é o melhor jeito de abstrair, mas foi o mais "clean" que encontrei para deixar o app limpo de conexões.
 
const port = process.env.PORT || 3000
app.listen(port);