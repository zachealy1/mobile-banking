"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAutoPlay = useAutoPlay;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useAutoPlay(opts) {
  const {
    autoPlay = false,
    autoPlayReverse = false,
    autoPlayInterval,
    carouselController
  } = opts;
  const {
    prev,
    next
  } = carouselController;
  const timer = React.useRef();
  const stopped = React.useRef(!autoPlay);
  const play = React.useCallback(() => {
    if (stopped.current) return;
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      autoPlayReverse ? prev({
        onFinished: play
      }) : next({
        onFinished: play
      });
    }, autoPlayInterval);
  }, [autoPlayReverse, autoPlayInterval, prev, next]);
  const pause = React.useCallback(() => {
    if (!autoPlay) return;
    timer.current && clearTimeout(timer.current);
    stopped.current = true;
  }, [autoPlay]);
  const start = React.useCallback(() => {
    if (!autoPlay) return;
    stopped.current = false;
    play();
  }, [play, autoPlay]);
  React.useEffect(() => {
    if (autoPlay) start();else pause();
    return pause;
  }, [pause, start, autoPlay]);
  return {
    pause,
    start
  };
}
//# sourceMappingURL=useAutoPlay.js.map