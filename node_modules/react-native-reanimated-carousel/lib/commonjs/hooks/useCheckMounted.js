"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCheckMounted = useCheckMounted;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useCheckMounted() {
  const mounted = _react.default.useRef(false);

  _react.default.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
}
//# sourceMappingURL=useCheckMounted.js.map