
function combineBytes(highByte, lowByte) {
  return ((highByte << 8) | lowByte) & 0xFFFF;
}

function JPn16(hNumber, lNumber) {
  this.registers.pc = combineBytes(hNumber, lNumber);
}

module.exports = {
  JPn16,
};
