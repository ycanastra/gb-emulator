
function setBit(byte, bitNumber) {
  return ((byte | (1 << bitNumber)) & 0xFF);
}

function getBit(value, bitNumber) {
  return (value >> bitNumber) & 0x1;
}

function clearBit(byte, bitNumber) {
  return ((byte & ~(1 << bitNumber)) & 0xFF);
}

function rotateRight(byte, carryFlag) {
  const newCarryFlag = getBit(byte, 0);
  const newByte = (carryFlag === 1) ? setBit(byte >> 1, 7) : clearBit(byte >> 1, 7);
  return { byte: newByte, carryFlag: newCarryFlag };
}

function RRr8(register) {
  const carryFlag = this.getCarryFlagBit();
  const { byte: newReg, carryFlag: newCarryFlag }
    = rotateRight(this.registers[register], carryFlag);

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

export { RRr8 };
