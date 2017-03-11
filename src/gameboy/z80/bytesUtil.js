
function combineBytes(highByte, lowByte) {
  return ((highByte << 8) | lowByte) & 0xFFFF;
}

function seperateBytes(word) {
  const highByte = (word >> 8) & 0xFF;
  const lowByte = word & 0xFF;
  return { highByte, lowByte };
}

module.exports = { combineBytes, seperateBytes };
