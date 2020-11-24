const mongoose = require('mongoose');
const config = require('config');



// dbconfig
const db = config.get('mongoUrl');

// connect to the mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(
        () => console.log('mongodb connected >>>')
    ).catch(err => {
        console.log('database connection failed \n', err);
    });
module.exports = mongoose;
