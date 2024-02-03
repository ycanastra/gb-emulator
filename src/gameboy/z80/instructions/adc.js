import { isHalfCarry } from '../flagsUtil';

function ADCn8(number) {
  const carryFlag = this.getCarryFlagBit();

  const prevValue = this.registers.a;
  const addVal = this.registers.a + number + carryFlag;
  this.registers.a = addVal & 0xFF;

  if (this.registers.a === 0x00) {
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

  if (isHalfCarry(prevValue, number + carryFlag)) {
    this.setHalfCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }
}

export { ADCn8 };
