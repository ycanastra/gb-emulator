const { combineBytes } = require('./../bytesUtil.js');

function ADDr8rr16(register1, hRegister2, lRegister2) {
  const hRegVal = this.registers[hRegister2];
  const lRegVal = this.registers[lRegister2];
  const address = combineBytes(hRegVal, lRegVal);
  const additionOperand = this.mainMemory[address];
  const addVal = this.registers[register1] + additionOperand;
  this.registers.a = addVal & 0xFF;

  this.clearSubtractFlagBit();
  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  if (addVal > 0xFF) {
    this.setCarryFlagBit();
  } else {
    this.clearCarryFlagBit();
  }
}

module.exports = {
  ADDr8rr16,
};
