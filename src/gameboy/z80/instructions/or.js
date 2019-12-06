
function ORn8(number) {
  this.registers.a = this.registers.a | number;

  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearCarryFlagBit();
  this.clearSubtractFlagBit();
  this.clearHalfCarryFlagBit();
}

function ORr8(register) {
  this.registers.a = this.registers.a | this.registers[register];

  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearCarryFlagBit();
  this.clearSubtractFlagBit();
  this.clearHalfCarryFlagBit();
}

export {
  ORn8,
  ORr8,
};
