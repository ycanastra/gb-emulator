const mock = jest.fn().mockImplementation(() => {
  return {
    registers: {
      a: 0,
      f: 0,
      b: 0, c: 0, d: 0, e: 0, h: 0, l: 0,
      pc: 0,
      sp: 0,
      ir: 0,
    },
    setZeroFlagBit: jest.fn(),
    setSubtractFlagBit: jest.fn(),
    setHalfCarryFlagBit: jest.fn(),
    setCarryFlagBit: jest.fn(),
    clearZeroFlagBit: jest.fn(),
    clearSubtractFlagBit: jest.fn(),
    clearHalfCarryFlagBit: jest.fn(),
    clearCarryFlagBit: jest.fn(),
  };
});

export default mock;
