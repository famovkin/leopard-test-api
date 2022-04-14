const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes');
const PORT = process.env.PORT || 3000;
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
    await mongoose.connect(process.env.MONGO_URL);
    await app.listen(PORT, () =>
      console.log(`Backend server is running on ${PORT} port`)
    );
  } catch (e) {
    console.log(e);
  }
}

startApp();