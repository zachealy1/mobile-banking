"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dealWithAnimation = dealWithAnimation;

var _reactNativeReanimated = require("react-native-reanimated");

function dealWithAnimation(withAnimation) {
  "worklet";

  switch (withAnimation.type) {
    case "spring":
      return (value, cb) => (0, _reactNativeReanimated.withSpring)(value, withAnimation.config, isFinished => cb(isFinished));

    case "timing":
      return (value, cb) => (0, _reactNativeReanimated.withTiming)(value, withAnimation.config, isFinished => cb(isFinished));
  }
}
//# sourceMappingURL=deal-with-animation.js.map