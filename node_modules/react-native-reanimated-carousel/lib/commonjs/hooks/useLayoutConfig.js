"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLayoutConfig = useLayoutConfig;

var _react = _interopRequireDefault(require("react"));

var _layouts = require("../layouts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useLayoutConfig(opts) {
  const {
    size,
    vertical
  } = opts;
  return _react.default.useMemo(() => {
    const baseConfig = {
      size,
      vertical
    };

    switch (opts.mode) {
      case "parallax":
        return _layouts.Layouts.parallax(baseConfig, opts.modeConfig);

      case "horizontal-stack":
        return _layouts.Layouts.horizontalStack(opts.modeConfig);

      case "vertical-stack":
        return _layouts.Layouts.verticalStack(opts.modeConfig);

      default:
        return _layouts.Layouts.normal(baseConfig);
    }
  }, [opts.mode, opts.modeConfig, size, vertical]);
}
//# sourceMappingURL=useLayoutConfig.js.map