
function SWAPr8(register) {
  const regByte = this.registers[register];
  const swappedByte = ((regByte & 0x0F) << 4) | ((regByte & 0xF0) >> 4);
  this.registers[register] = swappedByte;

  if (this.registers[register] === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  this.clearHalfCarryFlagBit();
  this.clearCarryFlagBit();
}

export { SWAPr8 };
