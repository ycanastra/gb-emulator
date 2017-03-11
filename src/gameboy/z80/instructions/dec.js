
function DECr8(register) {
  this.registers[register] = (this.registers[register] - 1) & 0xFF;

  if (this.registers[register] === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.setSubtractFlagBit();
}

module.exports = {
  DECr8,
};
