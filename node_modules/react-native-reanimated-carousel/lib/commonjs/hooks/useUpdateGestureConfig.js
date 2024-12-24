"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpdateGestureConfig = void 0;

var _react = require("react");

const useUpdateGestureConfig = (gesture, config) => {
  const {
    enabled
  } = config;
  (0, _react.useEffect)(() => {
    if (typeof enabled !== "undefined") gesture.enabled(enabled);
  }, [enabled, gesture]);
};

exports.useUpdateGestureConfig = useUpdateGestureConfig;
//# sourceMappingURL=useUpdateGestureConfig.js.map