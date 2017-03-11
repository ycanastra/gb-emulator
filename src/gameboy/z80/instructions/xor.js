
function XORr8(register) {
  this.registers.a = this.registers.a | this.registers[register];

  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  this.clearHalfCarryFlagBit();
  this.clearCarryFlagBit();
}

module.exports = {
  XORr8,
};
