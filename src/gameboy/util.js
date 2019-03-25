const repeatEvery = (cycleCount, callback) => {
  let repeatCount = 0;
  return (currentCycle) => {
    if (repeatCount < ~~(currentCycle / cycleCount)) {
      callback();
      repeatCount += 1;
    }
  };
};

module.exports = {
  repeatEvery,
};
