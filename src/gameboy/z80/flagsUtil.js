
function getBit(value, bitNumber) {
  return (value >> bitNumber) & 0x1;
}

function setBit(byte, bitNumber) {
  return ((byte | (1 << bitNumber)) & 0xFF);
}

function clearBit(byte, bitNumber) {
  return ((byte & ~(1 << bitNumber)) & 0xFF);
}

function getZeroFlagBit() {
  return getBit(this.registers.f, 7);
}
function getSubtractFlagBit() {
  return getBit(this.registers.f, 6);
}
function getHalfCarryFlagBit() {
  return getBit(this.registers.f, 5);
}
function getCarryFlagBit() {
  return getBit(this.registers.f, 4);
}

function setZeroFlagBit() {
  this.registers.f = setBit(this.registers.f, 7);
}
function setSubtractFlagBit() {
  this.registers.f = setBit(this.registers.f, 6);
}
function setHalfCarryFlagBit() {
  this.registers.f = setBit(this.registers.f, 5);
}
function setCarryFlagBit() {
  this.registers.f = setBit(this.registers.f, 4);
}

function clearZeroFlagBit() {
  this.registers.f = clearBit(this.registers.f, 7);
}
function clearSubtractFlagBit() {
  this.registers.f = clearBit(this.registers.f, 6);
}
function clearHalfCarryFlagBit() {
  this.registers.f = clearBit(this.registers.f, 5);
}
function clearCarryFlagBit() {
  this.registers.f = clearBit(this.registers.f, 4);
}

function isHalfCarry(a, b) {
  return b < 0
    ? (((a & 0xf) - ((-1) * b & 0xf)) & 0x10) === 0x10
    : (((a & 0xf) + (b & 0xf)) & 0x10) === 0x10;
}

function isHalfCarry16bit(a, b) {
  return (((a & 0x00FF) + (b & 0x00FF)) & 0x0100) === 0x0100;
}

export {
  getZeroFlagBit,
  getSubtractFlagBit,
  getHalfCarryFlagBit,
  getCarryFlagBit,
  setZeroFlagBit,
  setSubtractFlagBit,
  setHalfCarryFlagBit,
  setCarryFlagBit,
  clearZeroFlagBit,
  clearSubtractFlagBit,
  clearHalfCarryFlagBit,
  clearCarryFlagBit,
  isHalfCarry,
  isHalfCarry16bit,
};
