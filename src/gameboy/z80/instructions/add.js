import { isHalfCarry } from '../flagsUtil.js';
import { combineBytes, seperateBytes } from './../bytesUtil.js';

function ADDn8(register, number) {
  const prevValue = this.registers[register];
  const addVal = this.registers[register] + number;
  this.registers[register] = addVal & 0xFF;

  if (this.registers[register] === 0x00) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  if (addVal > 0xFF) {
    this.setCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }

  if (isHalfCarry(prevValue, number)) {
    this.setHalfCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }
}

function ADDr8r8(dstRegister, srcRegister) {
  const prevValue = this.registers[dstRegister];
  const addVal = this.registers[dstRegister] + this.registers[srcRegister];
  this.registers[dstRegister] = addVal & 0xFF;

  if (this.registers[dstRegister] === 0x00) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  if (addVal > 0xFF) {
    this.setCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }

  if (isHalfCarry(prevValue, this.registers[srcRegister])) {
    this.setHalfCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }
}

function ADDr8rr16(register1, hRegister2, lRegister2) {
  const prevValue = this.registers[register1];
  const hRegVal = this.registers[hRegister2];
  const lRegVal = this.registers[lRegister2];
  const address = combineBytes(hRegVal, lRegVal);
  const additionOperand = this.readMemory(address);
  const addVal = this.registers[register1] + additionOperand;
  this.registers[register1] = addVal & 0xFF;

  this.clearSubtractFlagBit();
  if (this.registers[register1] === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  if (addVal > 0xFF) {
    this.setCarryFlagBit();
  } else {
    this.clearCarryFlagBit();
  }

  if (isHalfCarry(prevValue, additionOperand)) {
    this.setHalfCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }
}

function ADDr16r16(hDstReg, lDstReg, hSrcReg, lSrcReg) {
  const dstRegVal = combineBytes(this.registers[hDstReg], this.registers[lDstReg]);
  const srcRegVal = combineBytes(this.registers[hSrcReg], this.registers[lSrcReg]);

  const addVal = dstRegVal + srcRegVal;
  const { highByte, lowByte } = seperateBytes(addVal & 0xFFFF);

  this.registers[hDstReg] = highByte;
  this.registers[lDstReg] = lowByte;

  this.clearSubtractFlagBit();
  if (addVal > 0xFFFF) {
    this.setCarryFlagBit();
  } else {
    this.clearCarryFlagBit();
  }
}

export {
  ADDn8,
  ADDr8r8,
  ADDr8rr16,
  ADDr16r16,
};
