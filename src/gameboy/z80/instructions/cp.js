
import { isHalfCarry } from '../flagsUtil.js';
import { combineBytes } from './../bytesUtil.js';

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

  if (isHalfCarry(this.registers.a, -number)) {
    this.setHalfCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }
}

function CPrr16(hRegister, lRegister) {
  const hRegVal = this.registers[hRegister];
  const lRegVal = this.registers[lRegister];
  const address = combineBytes(hRegVal, lRegVal);
  const cpValue = (this.registers.a - this.readMemory(address)) & 0xFF;

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

  if (isHalfCarry(this.registers.a, -this.readMemory(address))) {
    this.setHalfCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }
}

export {
  CPn8,
  CPrr16,
};
