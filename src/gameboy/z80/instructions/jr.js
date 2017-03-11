
function getTwosComplement(number, numBits) {
  const sigBit = number >> (numBits - 1);

  if (sigBit === 0) {
    return number;
  }
  return (-1) * ((~number + 1) & 0xff);
}

function JRn8(number) {
  const jumpAddress = getTwosComplement(number, 8) + this.registers.pc;
  this.registers.pc = jumpAddress;
}

function JRZn8(number) {
  const zeroFlagBit = this.getZeroFlagBit();

  if (zeroFlagBit === 0) {
    return;
  }

  const jumpAddress = getTwosComplement(number, 8) + this.registers.pc;
  this.registers.pc = jumpAddress;
}

function JRNZn8(number) {
  const zeroFlagBit = this.getZeroFlagBit();

  if (zeroFlagBit === 1) {
    return;
  }

  const jumpAddress = getTwosComplement(number, 8) + this.registers.pc;
  this.registers.pc = jumpAddress;
}

module.exports = {
  JRn8,
  JRZn8,
  JRNZn8,
};
