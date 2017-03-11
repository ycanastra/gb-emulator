const { combineBytes, seperateBytes } = require('./../bytesUtil.js');

function RSTf(address) {
  const { highByte: pcHighByte, lowByte: pcLowByte } = seperateBytes(this.registers.pc);

  this.mainMemory[this.registers.sp - 1] = pcHighByte;
  this.mainMemory[this.registers.sp - 2] = pcLowByte;

  this.registers.pc = combineBytes(0, address);
  this.registers.sp -= 2;
}

module.exports = RSTf;
