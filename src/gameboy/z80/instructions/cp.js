
import { combineBytes } from './../bytesUtil.js';

function CPn8(number) {
  if (this.registers.a - number === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  if (this.registers.a < number) {
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

  if (this.registers.a - this.mainMemory[address] === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  if (this.registers.a < this.mainMemory[address]) {
    this.setCarryFlagBit();
  } else {
    this.clearCarryFlagBit();
  }
  this.setSubtractFlagBit();
}

export {
  CPn8,
  CPrr16,
};
