
function CPL() {
  this.registers.a = this.registers.a ^ 0xFF;

  this.setSubractBit();
  this.setHalfCarryFlagBit();
}

export default CPL;
