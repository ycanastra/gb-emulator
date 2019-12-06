function clearBit(byte, bitNumber) {
  return ((byte & ~(1 << bitNumber)) & 0xFF);
}

function RESn3r8(number, register) {
  this.registers[register] = clearBit(this.registers[register], number);
}

export default RESn3r8;
