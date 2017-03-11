
function setBit(byte, bitNumber) {
  return ((byte | (1 << bitNumber)) & 0xFF);
}

function getBit(value, bitNumber) {
  return (value >> bitNumber) & 0x1;
}

function clearBit(byte, bitNumber) {
  return ((byte & ~(1 << bitNumber)) & 0xFF);
}

function rotateLeft(byte, carryFlag) {
  const newCarryFlag = getBit(byte, 7);
  const newByte = (carryFlag === 1) ? setBit(byte << 1, 0) : clearBit(byte << 1, 0);
  return { byte: newByte, carryFlag: newCarryFlag };
}

function RLA() {
  const carryFlag = this.getCarryFlagBit();
  const { byte: newAReg, carryFlag: newCarryFlag } = rotateLeft(this.registers.a, carryFlag);

  this.registers.a = newAReg;

  this.clearZeroFlagBit();
  this.clearSubtractFlagBit();
  this.clearHalfCarryFlagBit();
  if (newCarryFlag === 0) {
    this.clearCarryFlagBit();
  } else {
    this.setCarryFlagBit();
  }
}

function RLr8(register) {
  const carryFlag = this.getCarryFlagBit();
  const { byte: newReg, carryFlag: newCarryFlag } = rotateLeft(this.registers[register], carryFlag);

  this.registers[register] = newReg;

  if (this.registers[register] === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  if (newCarryFlag === 0) {
    this.clearCarryFlagBit();
  } else {
    this.setCarryFlagBit();
  }
  this.clearSubtractFlagBit();
  this.clearHalfCarryFlagBit();
}

module.exports = {
  RLA,
  RLr8,
};
