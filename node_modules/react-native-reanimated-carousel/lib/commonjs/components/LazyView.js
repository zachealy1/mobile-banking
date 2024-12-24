"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LazyView = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LazyView = props => {
  const {
    shouldUpdate,
    children
  } = props;
  if (!shouldUpdate) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children);
};

exports.LazyView = LazyView;
//# sourceMappingURL=LazyView.js.map