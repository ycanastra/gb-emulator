
function SUBr8(register) {
  const subVal = this.registers.a - this.registers[register];
  this.registers.a = subVal & 0xFF;

  this.setSubtractFlagBit();
  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  if (subVal > 0) {
    this.setCarryFlagBit();
  } else {
    this.clearCarryFlagBit();
  }
}

export { SUBr8 };
