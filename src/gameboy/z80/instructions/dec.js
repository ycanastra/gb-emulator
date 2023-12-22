import { isHalfCarry } from '../flagsUtil.js';
import { combineBytes, seperateBytes } from './../bytesUtil.js';

function DECr8(register) {
  const prevValue = this.registers[register];
  this.registers[register] = (this.registers[register] - 1) & 0xFF;

  if (this.registers[register] === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.setSubtractFlagBit();

  if (isHalfCarry(prevValue, -1)) {
    this.setHalfCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }
}

function DECr16(hRegister, lRegister) {
  const value = combineBytes(this.registers[hRegister], this.registers[lRegister]);
  const decrementedVal = (value - 1) & 0xFFFF;

  const { highByte, lowByte } = seperateBytes(decrementedVal);
  this.registers[hRegister] = highByte;
  this.registers[lRegister] = lowByte;
}

function DECrr16(hRegister, lRegister) {
  const address = combineBytes(this.registers[hRegister], this.registers[lRegister]);
  const prevValue = this.readMemory(address);

  const decrementedVal = (this.readMemory(address) - 1) & 0xFF;
  this.writeMemory(address, decrementedVal);

  if (decrementedVal === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.setSubtractFlagBit();

  if (isHalfCarry(prevValue, -1)) {
    this.setHalfCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }
}

export {
  DECr8,
  DECr16,
  DECrr16,
};
