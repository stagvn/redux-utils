"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var usePostApi = function usePostApi(apiCall) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!apiCall) {
    return {
      data: null,
      post: null,
      isLoading: false,
      error: 'No apiCall'
    };
  }
  var dispatch = (0, _reactRedux.useDispatch)();
  var _options$resourceName = options.resourceName,
    resourceName = _options$resourceName === void 0 ? 'item' : _options$resourceName;
  var rawData = (0, _reactRedux.useSelector)(apiCall.dataSelector);
  var error = (0, _reactRedux.useSelector)(apiCall.errorSelector);
  var isFetching = (0, _reactRedux.useSelector)(apiCall.isFetchingSelector);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  (0, _react.useEffect)(function () {
    if (!isFetching) {
      setIsLoading(false);
    }
  }, [isFetching]);
  var post = function post(params) {
    console.debug("Posting ".concat(resourceName));
    setIsLoading(true);
    dispatch(apiCall.actionCreator(params));
  };
  var _ref = rawData || {},
    data = _ref[resourceName];
  return {
    rawData: rawData,
    data: data,
    post: post,
    isLoading: isLoading,
    error: error
  };
};
var _default = exports["default"] = usePostApi;