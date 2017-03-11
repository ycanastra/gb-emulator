
const { combineBytes } = require('./../bytesUtil.js');

function CPn8(number) {
  const cpValue = (this.registers.a - number) & 0xFF;

  if (cpValue === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  if (this.registers.a < cpValue) {
    this.setCarryFlagBit();
  } else {
    this.clearCarryFlagBit();
  }
  this.setSubtractFlagBit();
}

function CPrr16(hRegister, lRegister) {
  const hRegVal = this.registers[hRegister];
  const lRegVal = this.registers[lRegister];
  const address = combineBytes(hRegVal, lRegVal);
  const cpValue = (this.registers.a - this.mainMemory[address]) & 0xFF;

  if (cpValue === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  if (this.registers.a < cpValue) {
    this.setCarryFlagBit();
  } else {
    this.clearCarryFlagBit();
  }
  this.setSubtractFlagBit();
}

module.exports = {
  CPn8,
  CPrr16,
};
