const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://mongoDB-01:qpoZlSLuMELybuH1@cluster0-kamaf.mongodb.net/test?retryWrites=true&w=majority')
    .then(client => {
      console.log('Connected!');
      callback(client);
    })
    .catch(err => console.log(err));
}

module.exports = mongoConnect;
