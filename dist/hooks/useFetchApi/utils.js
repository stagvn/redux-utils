"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customLastRequestSelectorCreator = exports.customIsFetchingSelectorCreator = exports.customErrorSelectorCreator = exports.customDataSelectorCreator = exports.buildParamsString = void 0;
var _fp = require("lodash/fp");
var _qs = _interopRequireDefault(require("qs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// This is from redux-api-call's source code since it's not exported
var REDUCER_PATH = 'api_calls';
var buildParamsString = exports.buildParamsString = function buildParamsString(_ref) {
  var params = _ref.params,
    paramKeys = _ref.paramKeys;
  if (paramKeys && paramKeys.length === 0) {
    return '';
  }
  return (0, _fp.flow)((0, _fp.pick)(paramKeys), _qs["default"].stringify, function (str) {
    return str.length == 0 ? '' : str;
  })(params);
};
var customIsFetchingSelectorCreator = exports.customIsFetchingSelectorCreator = function customIsFetchingSelectorCreator(apiCallName) {
  return function (paramsString) {
    if (paramsString.length === 0) {
      return (0, _fp.get)([REDUCER_PATH, apiCallName, 'isFetching']);
    }
    return (0, _fp.get)([REDUCER_PATH, "".concat(apiCallName, "__").concat(paramsString), 'isFetching']);
  };
};
var customDataSelectorCreator = exports.customDataSelectorCreator = function customDataSelectorCreator(apiCallName) {
  return function (paramsString) {
    if (paramsString.length === 0) {
      return (0, _fp.get)([REDUCER_PATH, apiCallName, 'data']);
    }
    return (0, _fp.get)([REDUCER_PATH, "".concat(apiCallName, "__").concat(paramsString), 'data']);
  };
};
var customErrorSelectorCreator = exports.customErrorSelectorCreator = function customErrorSelectorCreator(apiCallName) {
  return function (paramsString) {
    if (paramsString.length === 0) {
      return (0, _fp.get)([REDUCER_PATH, apiCallName, 'error']);
    }
    return (0, _fp.get)([REDUCER_PATH, "".concat(apiCallName, "__").concat(paramsString), 'error']);
  };
};
var customLastRequestSelectorCreator = exports.customLastRequestSelectorCreator = function customLastRequestSelectorCreator(apiCallName) {
  return function (paramsString) {
    if (paramsString.length === 0) {
      return (0, _fp.get)([REDUCER_PATH, apiCallName, 'lastRequest']);
    }
    return (0, _fp.get)([REDUCER_PATH, "".concat(apiCallName, "__").concat(paramsString), 'lastRequest']);
  };
};