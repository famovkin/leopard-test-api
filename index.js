const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const { PORT = 3000 } = process.env;
const { SERVER_ERROR_CODE } = require('./utils/constants');
const app = express();

app.use('/api', routes);
app.use((err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

const startApp = async () => {
  try {
    await mongoose.connect("mongodb+srv://username:test123@test.keury.mongodb.net/test?retryWrites=true&w=majority");
    await app.listen(PORT, () => console.log(`Backend server is running on ${PORT} port`));
  } catch (e) {
    console.log(e);
  }
}

startApp();