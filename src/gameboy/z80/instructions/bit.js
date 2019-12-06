
function getBit(value, bitNumber) {
  return (value >> bitNumber) & 0x1;
}

function BITn3r8(number, register) {
  const sigBit = getBit(this.registers[register], number);

  if (sigBit === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  this.clearHalfCarryFlagBit();
}

export { BITn3r8 };
