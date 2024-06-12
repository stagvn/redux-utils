"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.customListDataSelectorCreator = void 0;
var _fp = require("lodash/fp");
var _reduxApiCall = require("redux-api-call");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var REDUCER_LIST_PATH = 'redux_api_call_hooks/list';
var reduxListApiCallReducer = function reduxListApiCallReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
    payload = action.payload;
  try {
    switch (type) {
      case _reduxApiCall.ACTIONS.COMPLETE:
        var name = payload.name,
          isList = payload.isList,
          resourceName = payload.resourceName,
          json = payload.json;
        if (!isList) {
          return state;
        }
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, name, json));
      case _reduxApiCall.ACTIONS.DISPOSE:
        var disposeName = payload.name;
        return (0, _fp.omit)([disposeName])(state);
    }
    return state;
  } catch (error) {
    console.log(error);
    return state;
  }
};
var customListDataSelectorCreator = exports.customListDataSelectorCreator = function customListDataSelectorCreator(apiCallName) {
  return function (paramsString) {
    if (paramsString.length === 0) {
      return (0, _fp.get)("".concat(REDUCER_LIST_PATH, ".").concat(apiCallName));
    }
    return (0, _fp.get)("".concat(REDUCER_LIST_PATH, ".").concat(apiCallName, "__").concat(paramsString));
  };
};
var _default = exports["default"] = _defineProperty({}, REDUCER_LIST_PATH, reduxListApiCallReducer);