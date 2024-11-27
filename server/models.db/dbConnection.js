const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    const mongoDB = mongoose.connect(process.env.MONGODB_URI);

    console.log('\n\n MongoDB host:=>>>', (await mongoDB).connection.host);
  } catch (err) {
    console.log('\n\n MongoDB CONNECTION ERROR:=>>>', err);
  }
};

module.exports = connectDB;
