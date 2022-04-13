const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const startApp = async () => {
  try {
    await mongoose.connect("mongodb+srv://username:test123@test.keury.mongodb.net/test?retryWrites=true&w=majority");
    await app.listen(PORT, () => console.log(`Backend server is running on ${PORT} port`));
  } catch (e) {
    console.log(e);
  }
}

startApp();