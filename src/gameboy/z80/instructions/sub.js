import { isHalfCarry } from '../flagsUtil';

function SUBr8(register) {
  const prevValue = this.registers.a;
  const subVal = this.registers.a - this.registers[register];
  this.registers.a = subVal & 0xFF;

  this.setSubtractFlagBit();
  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }

  if (subVal < 0) {
    this.setCarryFlagBit();
  } else {
    this.clearCarryFlagBit();
  }

  if (isHalfCarry(prevValue, -this.registers[register])) {
    this.setHalfCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }
}

export { SUBr8 };
