
function combineBytes(highByte, lowByte) {
  return ((highByte << 8) | lowByte) & 0xFFFF;
}

function JPn16(hNumber, lNumber) {
  this.registers.pc = combineBytes(hNumber, lNumber);
}

function JPrr16(hRegister, lRegister) {
  const address = combineBytes(this.registers[hRegister], this.registers[lRegister]);
  this.registers.pc = address;
}

module.exports = {
  JPn16,
  JPrr16,
};
