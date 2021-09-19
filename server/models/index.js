// import the models to package all of them together
const User = require('./User');
const Record = require('./Record');
const Genre = require('./Genre');
const Order = require('./Order');

// export the models
module.exports={ User, Record, Genre, Order };