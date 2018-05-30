const { seperateBytes } = require('./../bytesUtil.js');

function RSTf(address) {
  const { highByte: pcHighByte, lowByte: pcLowByte } = seperateBytes(this.registers.pc);

  this.writeMemory(this.registers.sp - 1, pcHighByte);
  this.writeMemory(this.registers.sp - 2, pcLowByte);

  this.registers.pc = address;
  this.registers.sp -= 2;
}

module.exports = RSTf;
