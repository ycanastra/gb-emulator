
function ANDn8(number) {
  this.registers.a = this.registers.a & number;

  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  this.setHalfCarryFlagBit();
  this.clearCarryFlagBit();
}

function ANDr8(register) {
  this.registers.a = this.registers.a & this.registers[register];

  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  this.setHalfCarryFlagBit();
  this.clearCarryFlagBit();
}

module.exports = {
  ANDn8,
  ANDr8,
};
