
module.exports = (app) => {

  app.use('/', require('./home.Routes'));
  app.use('/user', require('./users.Routes'));



  // advertice item
  app.use('/advertice'  , require('./advertice.Route'));

};


