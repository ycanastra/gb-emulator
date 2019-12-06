import { combineBytes } from './../bytesUtil.js';

function RET() {
  const pcL = this.mainMemory[this.registers.sp];
  const pcH = this.mainMemory[this.registers.sp + 1];

  this.registers.pc = combineBytes(pcH, pcL);
  this.registers.sp += 2;
}

function RETZ() {
  const zeroFlagBit = this.getZeroFlagBit();
  if (zeroFlagBit === 1) {
    const pcL = this.mainMemory[this.registers.sp];
    const pcH = this.mainMemory[this.registers.sp + 1];

    this.registers.pc = combineBytes(pcH, pcL);
    this.registers.sp += 2;
  }
}

export {
  RET,
  RETZ,
};
