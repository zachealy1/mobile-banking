"use strict";

var _reactNativeReanimated = require("react-native-reanimated");

var _reactHooks = require("@testing-library/react-hooks");

var _useOffsetX = require("./useOffsetX");

describe("useSharedValue", () => {
  it("should return the correct values", async () => {
    const hook = (0, _reactHooks.renderHook)(() => {
      const range = (0, _reactNativeReanimated.useSharedValue)({
        negativeRange: [7, 9],
        positiveRange: [0, 3]
      });
      const inputs = Array.from({
        length: 10
      }).map((_, index) => ({
        config: {
          dataLength: 10,
          handlerOffset: (0, _reactNativeReanimated.useSharedValue)(-0),
          index,
          loop: false,
          size: 393
        },
        range
      }));
      return inputs.map(input => {
        const {
          config,
          range
        } = input;
        return (0, _useOffsetX.useOffsetX)(config, range);
      });
    });
    const expected = hook.result.current.map(v => v.value).slice();
    expect(expected).toMatchInlineSnapshot(`
            [
              0,
              393,
              786,
              1179,
              9007199254740991,
              9007199254740991,
              9007199254740991,
              2751,
              3144,
              3537,
            ]
        `);
  });
});
//# sourceMappingURL=useOffsetX.test.js.map