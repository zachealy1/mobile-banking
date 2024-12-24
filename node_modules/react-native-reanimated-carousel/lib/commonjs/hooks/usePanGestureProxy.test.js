"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNative2 = require("@testing-library/react-native");

var _jestUtils = require("react-native-gesture-handler/jest-utils");

var _usePanGestureProxy = require("./usePanGestureProxy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(_reactNative2.cleanup);

const mockedEventHandlers = () => {
  return {
    begin: jest.fn(),
    start: jest.fn(),
    active: jest.fn(),
    end: jest.fn(),
    fail: jest.fn(),
    cancel: jest.fn(),
    finish: jest.fn()
  };
};

const mockedEventHandlersFromUser = () => {
  return {
    begin: jest.fn(),
    start: jest.fn(),
    active: jest.fn(),
    end: jest.fn(),
    fail: jest.fn(),
    cancel: jest.fn(),
    finish: jest.fn()
  };
};

describe("Using RNGH v2 gesture API", () => {
  function SingleHandler(_ref) {
    let {
      handlers,
      handlersFromUser,
      treatStartAsUpdate
    } = _ref;
    const pan = (0, _usePanGestureProxy.usePanGestureProxy)({
      onConfigurePanGesture: gesture => {
        // This is user's customizations
        gesture.onBegin(handlersFromUser.begin).onUpdate(handlersFromUser.active).onEnd(handlersFromUser.end).onFinalize(handlers.finish).withTestId("pan");
      },
      onGestureStart: treatStartAsUpdate ? handlers.active : handlers.start,
      onGestureUpdate: handlers.active,
      onGestureEnd: handlers.end,
      options: {
        enabled: true
      }
    });
    return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, null, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
      gesture: pan
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "v2 API test")));
  }

  function RacingHandlers(_ref2) {
    let {
      tapHandlers,
      panHandlers
    } = _ref2;

    const tap = _reactNativeGestureHandler.Gesture.Tap().onBegin(tapHandlers.begin).onEnd(tapHandlers.end).withTestId("tap");

    const pan = (0, _usePanGestureProxy.usePanGestureProxy)({
      onConfigurePanGesture: _ => {
        _.onBegin(panHandlers.begin).onFinalize(panHandlers.finish).withTestId("pan");
      },
      onGestureStart: panHandlers.start,
      onGestureUpdate: panHandlers.active,
      onGestureEnd: panHandlers.end,
      options: {
        enabled: true
      }
    });
    return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, null, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
      gesture: _reactNativeGestureHandler.Gesture.Race(tap, pan)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "v2 API test")));
  }

  it("sends events to handlers", () => {
    const tapHandlers = mockedEventHandlers();
    const panHandlers = mockedEventHandlers();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(RacingHandlers, {
      tapHandlers: tapHandlers,
      panHandlers: panHandlers
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"), [{
      state: _reactNativeGestureHandler.State.BEGAN
    }, {
      state: _reactNativeGestureHandler.State.ACTIVE
    }, {
      state: _reactNativeGestureHandler.State.END
    }]);
    expect(panHandlers.begin).toBeCalledWith(expect.objectContaining({
      state: _reactNativeGestureHandler.State.BEGAN
    }));
    expect(panHandlers.finish).toBeCalled();
    expect(tapHandlers.begin).not.toBeCalled();
  });
  it("sends events with additional data to handlers", () => {
    const panHandlers = mockedEventHandlers();
    const panHandlersFromUser = mockedEventHandlersFromUser();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(SingleHandler, {
      handlers: panHandlers,
      handlersFromUser: panHandlersFromUser,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"), [{
      state: _reactNativeGestureHandler.State.BEGAN,
      translationX: 0
    }, {
      state: _reactNativeGestureHandler.State.ACTIVE,
      translationX: 10
    }, {
      translationX: 20
    }, {
      translationX: 20
    }, {
      state: _reactNativeGestureHandler.State.END,
      translationX: 30
    }]);
    expect(panHandlersFromUser.begin).toBeCalledTimes(1);
    expect(panHandlersFromUser.active).toBeCalledTimes(2);
    expect(panHandlersFromUser.end).toBeCalledTimes(1);
    expect(panHandlers.active).toBeCalledTimes(3);
    expect(panHandlers.active).toHaveBeenLastCalledWith(expect.objectContaining({
      translationX: 20
    }));
  });
  it("does not include console.error in the output", () => {
    // if react-native-gesture-handler detects that some handlers are
    // workletized and some are not, it will log an error to the
    // console. We'd like to make sure that this doesn't happen.
    // The error that would be shown looks like:
    // [react-native-gesture-handler] Some of the callbacks in the gesture are worklets and some are not. Either make sure that all calbacks are marked as 'worklet' if you wish to run them on the UI thread or use '.runOnJS(true)' modifier on the gesture explicitly to run all callbacks on the JS thread.
    const panHandlers = mockedEventHandlers();
    const panHandlersFromUser = mockedEventHandlersFromUser();
    jest.spyOn(console, "error");
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(SingleHandler, {
      handlers: panHandlers,
      handlersFromUser: panHandlersFromUser,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"), [{
      state: _reactNativeGestureHandler.State.BEGAN
    }, {
      state: _reactNativeGestureHandler.State.ACTIVE
    }, {
      state: _reactNativeGestureHandler.State.END
    }]);
    expect(console.error).not.toBeCalled();
  });
});
describe("Event list validation", () => {
  function SingleHandler(_ref3) {
    let {
      handlers,
      handlersFromUser,
      treatStartAsUpdate
    } = _ref3;
    const pan = (0, _usePanGestureProxy.usePanGestureProxy)({
      onConfigurePanGesture: _ => {
        _.onBegin(handlersFromUser.begin).onUpdate(handlersFromUser.active).onEnd(handlersFromUser.end).onFinalize(handlers.finish).withTestId("pan");
      },
      onGestureStart: treatStartAsUpdate ? handlers.active : handlers.start,
      onGestureUpdate: handlers.active,
      onGestureEnd: handlers.end,
      options: {
        enabled: true
      }
    });
    return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, null, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
      gesture: pan
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "v2 API test")));
  }

  it("throws error when oldState doesn't correspond to previous event's state", () => {
    const panHandlers = mockedEventHandlers();
    const panHandlersFromUser = mockedEventHandlersFromUser();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(SingleHandler, {
      handlers: panHandlers,
      handlersFromUser: panHandlersFromUser
    }));
    expect(() => {
      (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"), [{
        oldState: _reactNativeGestureHandler.State.UNDETERMINED,
        state: _reactNativeGestureHandler.State.BEGAN,
        x: 0,
        y: 10
      }, {
        oldState: _reactNativeGestureHandler.State.UNDETERMINED,
        state: _reactNativeGestureHandler.State.ACTIVE,
        x: 1,
        y: 11
      }]);
    }).toThrow("when state changes, oldState should be the same as previous event' state");
  });
  it.each([[_reactNativeGestureHandler.State.END], [_reactNativeGestureHandler.State.FAILED], [_reactNativeGestureHandler.State.CANCELLED]])("correctly handles events ending with state %s", lastState => {
    const panHandlers = mockedEventHandlers();
    const panHandlersFromUser = mockedEventHandlersFromUser();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(SingleHandler, {
      handlers: panHandlers,
      handlersFromUser: panHandlersFromUser
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"), [{
      state: _reactNativeGestureHandler.State.BEGAN
    }, {
      state: _reactNativeGestureHandler.State.ACTIVE
    }, {
      state: lastState
    }]);
    expect(panHandlersFromUser.begin).toBeCalledTimes(1);
    expect(panHandlersFromUser.active).toBeCalledTimes(0);
    expect(panHandlersFromUser.end).toBeCalledTimes(1);
    if (lastState === _reactNativeGestureHandler.State.END) expect(panHandlers.end).toBeCalled();else expect(panHandlers.finish).toBeCalledWith(expect.any(Object), false);
  });
});
describe("Filling event list with defaults", () => {
  function RacingTapAndPan(_ref4) {
    let {
      handlers,
      treatStartAsUpdate
    } = _ref4;

    const tap = _reactNativeGestureHandler.Gesture.Tap().onBegin(handlers.begin).onEnd(handlers.end).withTestId("tap");

    const pan = (0, _usePanGestureProxy.usePanGestureProxy)({
      onConfigurePanGesture: _ => {
        _.onBegin(handlers.begin).onFinalize(handlers.finish).withTestId("pan");
      },
      onGestureStart: treatStartAsUpdate ? handlers.active : handlers.start,
      onGestureUpdate: handlers.active,
      onGestureEnd: handlers.end,
      options: {
        enabled: true
      }
    });
    return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, null, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
      gesture: _reactNativeGestureHandler.Gesture.Exclusive(pan, tap)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "v2 API test")));
  }

  it("fills oldState if not passed", () => {
    const handlers = mockedEventHandlers();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(RacingTapAndPan, {
      handlers: handlers,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"), [{
      state: _reactNativeGestureHandler.State.BEGAN
    }, {
      state: _reactNativeGestureHandler.State.ACTIVE
    }, {
      state: _reactNativeGestureHandler.State.ACTIVE
    }, {
      state: _reactNativeGestureHandler.State.ACTIVE
    }, {
      state: _reactNativeGestureHandler.State.END
    }]);
    expect(handlers.begin).toBeCalledWith(expect.objectContaining({
      oldState: _reactNativeGestureHandler.State.UNDETERMINED
    }));
    expect(handlers.active).nthCalledWith(1, expect.objectContaining({
      oldState: _reactNativeGestureHandler.State.BEGAN
    }));
    expect(handlers.active).lastCalledWith(expect.not.objectContaining({
      oldState: expect.anything()
    }));
    expect(handlers.end).toBeCalledWith(expect.objectContaining({
      oldState: _reactNativeGestureHandler.State.ACTIVE
    }), true);
  });
  it("fills missing ACTIVE states", () => {
    const panHandlers = mockedEventHandlers();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(RacingTapAndPan, {
      handlers: panHandlers,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"), [{
      state: _reactNativeGestureHandler.State.BEGAN,
      x: 0,
      y: 10
    }, {
      state: _reactNativeGestureHandler.State.ACTIVE,
      x: 1,
      y: 11
    }, {
      x: 2,
      y: 12
    }, {
      x: 3,
      y: 13
    }, {
      state: _reactNativeGestureHandler.State.END,
      x: 4,
      y: 14
    }]);
    expect(panHandlers.active).toBeCalledTimes(3);
    expect(panHandlers.active).toHaveBeenLastCalledWith(expect.objectContaining({
      x: 3,
      y: 13
    }));
  });
  it("fills BEGIN and END events for discrete handlers", () => {
    const handlers = mockedEventHandlers();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(RacingTapAndPan, {
      handlers: handlers,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("tap"), [{
      x: 5
    }]);
    expect(handlers.begin).toBeCalledTimes(1);
    expect(handlers.end).toBeCalledTimes(1);
  });
  it("with FAILED event, fills BEGIN event for discrete handlers", () => {
    const handlers = mockedEventHandlers();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(RacingTapAndPan, {
      handlers: handlers,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("tap"), [{
      state: _reactNativeGestureHandler.State.FAILED
    }]);
    expect(handlers.begin).toBeCalledTimes(1);
    expect(handlers.end).toBeCalledTimes(1);
    expect(handlers.end).toBeCalledWith(expect.anything(), false);
  });
  it("uses event data from first event in filled BEGIN, ACTIVE events", () => {
    const handlers = mockedEventHandlers();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(RacingTapAndPan, {
      handlers: handlers,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"), [{
      x: 120
    }]);
    expect(handlers.begin).toBeCalledWith(expect.objectContaining({
      x: 120
    }));
    expect(handlers.active).toHaveBeenNthCalledWith(1, expect.objectContaining({
      x: 120
    }));
  });
  it("uses event data from last event in filled END events", () => {
    const handlers = mockedEventHandlers();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(RacingTapAndPan, {
      handlers: handlers,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"), [{
      x: 120,
      state: _reactNativeGestureHandler.State.FAILED
    }]);
    expect(handlers.begin).toBeCalledTimes(1);
    expect(handlers.active).toBeCalledTimes(1);
    expect(handlers.end).toBeCalledWith(expect.objectContaining({
      x: 120
    }), false);
  });
  it("uses event data filled events", () => {
    const handlers = mockedEventHandlers();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(RacingTapAndPan, {
      handlers: handlers,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"), [{
      x: 5,
      y: 15
    }, {
      x: 6,
      y: 16
    }, {
      x: 7,
      y: 17
    }]);
    expect(handlers.begin).toBeCalledWith(expect.objectContaining({
      x: 5,
      y: 15
    }));
    expect(handlers.active).toBeCalledTimes(3);
    expect(handlers.end).toBeCalledWith(expect.objectContaining({
      x: 7,
      y: 17
    }), true);
  });
  it("fills BEGIN and END events when they're not present, for discrete handlers", () => {
    const handlers = mockedEventHandlers();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(RacingTapAndPan, {
      handlers: handlers,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("tap"));
    expect(handlers.begin).toBeCalledTimes(1);
    expect(handlers.end).toHaveBeenCalledTimes(1);
  });
  it("fills BEGIN, ACTIVE and END events when they're not present, for continuous handlers", () => {
    const handlers = mockedEventHandlers();
    (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(RacingTapAndPan, {
      handlers: handlers,
      treatStartAsUpdate: true
    }));
    (0, _jestUtils.fireGestureHandler)((0, _jestUtils.getByGestureTestId)("pan"));
    expect(handlers.begin).toBeCalledTimes(1);
    expect(handlers.active).toBeCalledTimes(1);
    expect(handlers.end).toHaveBeenCalledTimes(1);
  });
});
//# sourceMappingURL=usePanGestureProxy.test.js.map