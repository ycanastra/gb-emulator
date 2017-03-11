
function CPL() {
  this.registers.a = this.registers.a ^ 0xFF;

  this.setCarryFlagBit();
  this.setHalfCarryFlagBit();
}

module.exports = CPL;
