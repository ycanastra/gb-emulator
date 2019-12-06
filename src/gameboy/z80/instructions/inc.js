import { combineBytes, seperateBytes } from './../bytesUtil.js';

function INCr8(register) {
  this.registers[register] = (this.registers[register] + 1) & 0xFF;

  if (this.registers[register] === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
}

function INCr16(hRegister, lRegister) {
  const value = combineBytes(this.registers[hRegister], this.registers[lRegister]);
  const incrementedr16 = (value + 1) & 0xFFFF;
  const { highByte, lowByte } = seperateBytes(incrementedr16);

  this.registers[hRegister] = highByte;
  this.registers[lRegister] = lowByte;
}

export {
  INCr8,
  INCr16,
};
