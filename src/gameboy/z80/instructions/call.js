
const { combineBytes, seperateBytes } = require('./../bytesUtil.js');

function CALLn16(hNumber, lNumber) {
  const { highByte: pcH, lowByte: pcL } = seperateBytes(this.registers.pc);
  this.mainMemory[this.registers.sp - 1] = pcH;
  this.mainMemory[this.registers.sp - 2] = pcL;

  const newPc = combineBytes(hNumber, lNumber);

  this.registers.pc = newPc;
  this.registers.sp -= 2;
}

module.exports = {
  CALLn16,
};
