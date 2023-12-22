import { combineBytes, seperateBytes } from './../bytesUtil.js';

function CALLn16(hNumber, lNumber) {
  const { highByte: pcH, lowByte: pcL } = seperateBytes(this.registers.pc);
  this.writeMemory(this.registers.sp - 1, pcH);
  this.writeMemory(this.registers.sp - 2, pcL);

  const newPc = combineBytes(hNumber, lNumber);

  this.registers.pc = newPc;
  this.registers.sp -= 2;
}

function CALLNZn16(hNumber, lNumber) {
  if (this.getZeroFlagBit() === 1) {
    return;
  }

  const { highByte: pcH, lowByte: pcL } = seperateBytes(this.registers.pc);
  this.writeMemory(this.registers.sp - 1, pcH);
  this.writeMemory(this.registers.sp - 2, pcL);

  const newPc = combineBytes(hNumber, lNumber);

  this.registers.pc = newPc;
  this.registers.sp -= 2;
}

export { CALLn16, CALLNZn16 };
