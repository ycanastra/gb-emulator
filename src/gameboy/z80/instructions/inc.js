
const { combineBytes, seperateBytes } = require('./../bytesUtil.js');

function INCr8(register) {
  this.registers[register] = (this.registers[register] + 1) & 0xFF;

  if (this.registers[register] === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
}

function INCr16(register1, register2) {
  const reg1Value = this.registers[register1];
  const reg2Value = this.registers[register2];
  const incrementedr16 = combineBytes(reg1Value, reg2Value) + 1;
  const { highByte, lowByte } = seperateBytes(incrementedr16);

  this.registers[register1] = highByte;
  this.registers[register2] = lowByte;
}

module.exports = {
  INCr8,
  INCr16,
};
