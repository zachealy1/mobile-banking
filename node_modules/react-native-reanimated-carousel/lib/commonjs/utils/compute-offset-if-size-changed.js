"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeOffsetIfSizeChanged = computeOffsetIfSizeChanged;

function computeOffsetIfSizeChanged(params) {
  "worklet";

  const {
    handlerOffset,
    prevSize,
    size
  } = params;
  return handlerOffset / prevSize * size;
}
//# sourceMappingURL=compute-offset-if-size-changed.js.map