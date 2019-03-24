import { combineBytes } from './../bytesUtil';

function JPn16(hNumber, lNumber) {
  this.registers.pc = combineBytes(hNumber, lNumber);
}

function JPrr16(hRegister, lRegister) {
  const address = combineBytes(this.registers[hRegister], this.registers[lRegister]);
  this.registers.pc = address;
}

function JPZn16(hNumber, lNumber) {
  const zeroFlagBit = this.getZeroFlagBit();
  if (zeroFlagBit === 1) {
    const address = combineBytes(hNumber, lNumber);
    this.registers.pc = address;
  }
}

module.exports = {
  JPn16,
  JPrr16,
  JPZn16,
};
