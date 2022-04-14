const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const AUTH_CODE = 401;
const NOT_FOUND_CODE = 404;
const DUPLICATE_CODE = 409;
const SERVER_ERROR_CODE = 500;
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUND = 10;
const availableTypesForUpload = ['image/png', 'image/jpeg', 'image/jpg'];

module.exports = {
  CREATED_CODE,
  BAD_REQUEST_CODE,
  AUTH_CODE,
  NOT_FOUND_CODE,
  DUPLICATE_CODE,
  SERVER_ERROR_CODE,
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUND,
  availableTypesForUpload,
};
