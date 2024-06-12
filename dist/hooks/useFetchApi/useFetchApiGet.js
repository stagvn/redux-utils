"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fp = require("lodash/fp");
var _reactRedux = require("react-redux");
var _react = require("react");
var _utils = require("./utils");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var useFetchApiGet = function useFetchApiGet(apiCall) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var initialState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    isLoading: true,
    refreshing: false
  };
  var _options$defaultParam = options.defaultParams,
    defaultParams = _options$defaultParam === void 0 ? {} : _options$defaultParam,
    _options$resourceName = options.resourceName,
    resourceName = _options$resourceName === void 0 ? 'item' : _options$resourceName;
  var dispatch = (0, _reactRedux.useDispatch)();
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    paramsString = _useState2[0],
    setParamsString = _useState2[1];
  var error = (0, _reactRedux.useSelector)((0, _utils.customErrorSelectorCreator)(apiCall.name)(paramsString));
  var isFetching = (0, _reactRedux.useSelector)((0, _utils.customIsFetchingSelectorCreator)(apiCall.name)(paramsString));
  var lastRequest = (0, _reactRedux.useSelector)((0, _utils.customLastRequestSelectorCreator)(apiCall.name)(paramsString));
  var rawData = (0, _reactRedux.useSelector)((0, _utils.customDataSelectorCreator)(apiCall.name)(paramsString));
  var _useState3 = (0, _react.useState)(initialState.isLoading),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(initialState.refreshing),
    _useState6 = _slicedToArray(_useState5, 2),
    refreshing = _useState6[0],
    setRefreshing = _useState6[1];
  (0, _react.useEffect)(function () {
    if (!isFetching) {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [isFetching]);
  var customActionCreator = function customActionCreator(params) {
    var action = apiCall.actionCreator(_objectSpread(_objectSpread({}, defaultParams), params));
    var paramsString = (0, _utils.buildParamsString)({
      params: _objectSpread(_objectSpread({}, defaultParams), params),
      paramKeys: apiCall.paramKeys
    });

    // Important! This is to make the selector return correct data
    setParamsString(function (_) {
      return paramsString;
    });
    return _objectSpread(_objectSpread({}, action), {}, {
      payload: _objectSpread(_objectSpread({}, action.payload), {}, {
        name: (0, _fp.flow)(_fp.compact, (0, _fp.join)('__'))([apiCall.name, paramsString])
      })
    });
  };
  var refresh = function refresh(params) {
    console.debug("Refreshing ".concat(resourceName));
    setRefreshing(true);
    dispatch(customActionCreator(params));
  };
  var load = function load(params) {
    console.debug("Fetching ".concat(resourceName));
    setIsLoading(true);
    dispatch(customActionCreator(params));
  };
  var _ref = rawData || {},
    data = _ref[resourceName];
  return {
    rawData: rawData,
    data: data,
    load: load,
    isLoading: isLoading,
    refresh: refresh,
    refreshing: refreshing,
    error: error,
    lastRequest: lastRequest
  };
};
var _default = exports["default"] = useFetchApiGet;