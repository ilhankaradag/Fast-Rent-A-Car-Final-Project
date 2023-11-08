const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

URI = process.env.MONGODB_URI;

async function main() {
  try {
    await mongoose.connect(URI);
    // const admin = new Admin({
    //   name: 'admin',
    //   email: 'admin@gmail.com',
    //   password: 'admin123',
    //   isAdmin: true,
    // });

    // await admin.save();

    console.log('MongoDb Connect');
  } catch (error) {
    console.log(error);
  }
}
main();

module.exports = main;
