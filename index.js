const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const PORT = process.env.PORT;
const { SERVER_ERROR_CODE } = require('./utils/constants');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
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
    await mongoose.connect(process.env.DATABASE_URL);
    await app.listen(PORT, () =>
      console.log(`Backend server is running on ${PORT} port`)
    );
  } catch (e) {
    console.log(e);
  }
}

startApp();