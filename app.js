const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const errorController = require('./controllers/404');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'longstringvalue', resave: false, saveUninitialized: false}));

app.use((req, res, next) => {
  User.findById('5dec1f0beb064d3a9b290527')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://mongoDB-01:qpoZlSLuMELybuH1@cluster0-kamaf.mongodb.net/store'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Lucas',
          email: 'lucas@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      };
    });
    app.listen(3000);
  })
  .catch(err => console.log(err));

