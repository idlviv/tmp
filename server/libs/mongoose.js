const config = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = config.get('mongoose:uri');
const options = config.get('mongoose:options');

mongoose.connect(db, options)
  .then(() => console.log('Connected to db ' + db),
    (err) => {
      console.log('Який з обробчиків помилок ловить? (err)');
      console.error('Failed to connect to db ' + db);
      console.error('Error ' + err);
      // process.exit(1);
    })
  .catch(err => {
    console.log('Який з обробчиків помилок ловить? (catch)');
    console.error('Failed to connect to db ' + db);
    console.error('Error ' + err);
    // process.exit(1);
  });

module.exports = mongoose;
