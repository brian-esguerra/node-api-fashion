const mongoose = require('mongoose');

// localhost: mongodb://localhost/fashion-db
// cluster: mongodb+srv://javier:<password>@fashion-db.1w5vu.mongodb.net/<dbname>?retryWrites=true&w=majority

// conect db
mongoose.connect('mongodb+srv://javier:Javier123@fashion-db.1w5vu.mongodb.net/fashion-db?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(db => console.log("BD is connected"))
  .catch(err => console.error(err));
