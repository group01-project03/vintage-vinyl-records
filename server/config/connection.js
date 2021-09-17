const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/vintage-vinyl-records',{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
});

// to log mongo queries being executed!
mongoose.set('debug',true);

module.exports=mongoose.connection;