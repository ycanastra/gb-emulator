import { combineBytes } from '../bytesUtil';

function XORr8(register) {
  this.registers.a = this.registers.a ^ this.registers[register];

  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  this.clearHalfCarryFlagBit();
  this.clearCarryFlagBit();
}

function XORn8(number) {
  this.registers.a = this.registers.a ^ number;

  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  this.clearHalfCarryFlagBit();
  this.clearCarryFlagBit();
}

function XORrr16(hRegister, lRegister) {
  const address = combineBytes(this.registers[hRegister], this.registers[lRegister]);

  this.registers.a = (this.registers.a ^ this.readMemory(address)) & 0xFF;

  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  this.clearHalfCarryFlagBit();
  this.clearCarryFlagBit();
}

export { XORn8, XORr8, XORrr16 };
