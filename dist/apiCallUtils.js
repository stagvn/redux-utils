"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateEndpoint = exports.enhancedMakeFetchAction = void 0;
var _reduxApiCall = require("redux-api-call");
var _qs = _interopRequireDefault(require("qs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// This function helps remove undefined and null params
// Ex generateEndpoint({host: "abc.com", params: {a: 1, b: undefined, c: null}})
// => "abc.com?a=1&c="
var generateEndpoint = exports.generateEndpoint = function generateEndpoint(_ref) {
  var host = _ref.host,
    params = _ref.params;
  var queryString = _qs["default"].stringify(params, {
    arrayFormat: 'brackets'
  });
  return queryString ? "".concat(host, "?").concat(queryString) : host;
};

// This function wraps makeFetchAction and add apiName and paramKeys
//
// Each apiCall will have a key which is the apiName and store data
// in redux with that key. It means all fetched data with different params
// will be stored under the same key. So the later response will override
// the previous response
//
// Use paramKeys to specify the list of params that you want to separately
// stored its response
var enhancedMakeFetchAction = exports.enhancedMakeFetchAction = function enhancedMakeFetchAction(apiName, endpointGenerator) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$paramKeys = options.paramKeys,
    paramKeys = _options$paramKeys === void 0 ? [] : _options$paramKeys;
  var apiCall = (0, _reduxApiCall.makeFetchAction)(apiName, endpointGenerator);
  return _objectSpread(_objectSpread({}, apiCall), {}, {
    name: apiName,
    paramKeys: paramKeys
  });
};