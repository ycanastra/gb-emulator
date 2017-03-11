
const { combineBytes, seperateBytes } = require('./../bytesUtil.js');

function DECr8(register) {
  this.registers[register] = (this.registers[register] - 1) & 0xFF;

  if (this.registers[register] === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.setSubtractFlagBit();
}

function DECr16(hRegister, lRegister) {
  const value = combineBytes(this.registers[hRegister], this.registers[lRegister]);
  const decrementedVal = (value - 1) & 0xFF;

  const { highByte, lowByte } = seperateBytes(decrementedVal);
  this.registers[hRegister] = highByte;
  this.registers[lRegister] = lowByte;
}

module.exports = {
  DECr8,
  DECr16,
};
