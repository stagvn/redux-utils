"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  usePostApi: true
};
Object.defineProperty(exports, "usePostApi", {
  enumerable: true,
  get: function get() {
    return _usePostApi["default"];
  }
});
var _useFetchApi = require("./useFetchApi");
Object.keys(_useFetchApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useFetchApi[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useFetchApi[key];
    }
  });
});
var _usePostApi = _interopRequireDefault(require("./usePostApi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }