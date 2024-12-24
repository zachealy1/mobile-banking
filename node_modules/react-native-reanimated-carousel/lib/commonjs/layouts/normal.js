"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalLayout = normalLayout;

var _reactNativeReanimated = require("react-native-reanimated");

function normalLayout(opts) {
  const {
    size,
    vertical
  } = opts;
  return value => {
    "worklet";

    const translate = (0, _reactNativeReanimated.interpolate)(value, [-1, 0, 1], [-size, 0, size]);
    return {
      transform: [vertical ? {
        translateY: translate
      } : {
        translateX: translate
      }]
    };
  };
}
//# sourceMappingURL=normal.js.map