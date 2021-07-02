'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateRegisterForm(data) {
  var errors = {};

  // data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.name = !(0, _isEmpty2.default)(data.name) ? data.name : '';
  data.role = !(0, _isEmpty2.default)(data.role) ? data.role : '';
  data.phone = !(0, _isEmpty2.default)(data.phone) ? data.phone : '';
  data.email = !(0, _isEmpty2.default)(data.email) ? data.email : '';
  data.password = !(0, _isEmpty2.default)(data.password) ? data.password : '';

  // if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
  //   errors.firstname = 'First Name must be between 2 and 30 character long';
  // }

  if (!_validator2.default.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 character long';
  }

  // if (Validator.isEmpty(data.firstname)) {
  //   errors.firstname = 'First Name field is required';
  // }

  if (_validator2.default.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  // if (Validator.isEmpty(data.phone)) {
  //   errors.phone = 'Phone number field is required';
  // }

  // if (!Validator.isLength(data.phone, { min: 10, max: 11 })) {
  //   errors.phone = 'Phone number field is invalid';
  // }

  // if (Validator.isMobilePhone(data.phone)) {
  //   errors.phone = 'Phone number field is invalid';
  // }

  if (_validator2.default.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  if (!_validator2.default.isEmail(data.email)) {
    errors.email = 'email is invalid';
  }

  if (_validator2.default.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }

  if (!_validator2.default.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'password must be at least 6 characters long';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};

exports.default = validateRegisterForm;