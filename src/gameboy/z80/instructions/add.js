const { combineBytes, seperateBytes } = require('./../bytesUtil.js');

function ADDr8r8(dstRegister, srcRegister) {
  const addVal = this.registers[dstRegister] + this.registers[srcRegister];
  this.registers[dstRegister] = addVal & 0xFF;

  if (this.registers[dstRegister] === 0x00) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  this.clearSubtractFlagBit();
  if (addVal > 0xFF) {
    this.setCarryFlagBit();
  } else {
    this.clearHalfCarryFlagBit();
  }
}

function ADDr8rr16(register1, hRegister2, lRegister2) {
  const hRegVal = this.registers[hRegister2];
  const lRegVal = this.registers[lRegister2];
  const address = combineBytes(hRegVal, lRegVal);
  const additionOperand = this.mainMemory[address];
  const addVal = this.registers[register1] + additionOperand;
  this.registers.a = addVal & 0xFF;

  this.clearSubtractFlagBit();
  if (this.registers.a === 0) {
    this.setZeroFlagBit();
  } else {
    this.clearZeroFlagBit();
  }
  if (addVal > 0xFF) {
    this.setCarryFlagBit();
  } else {
    this.clearCarryFlagBit();
  }
}

function ADDr16r16(hDstReg, lDstReg, hSrcReg, lSrcReg) {
  const dstRegVal = combineBytes(this.registers[hDstReg], this.registers[lDstReg]);
  const srcRegVal = combineBytes(this.registers[hSrcReg], this.registers[lSrcReg]);

  const addVal = dstRegVal + srcRegVal;
  const { highByte, lowByte } = seperateBytes(addVal & 0xFFFF);

  this.registers[hDstReg] = highByte;
  this.registers[lDstReg] = lowByte;

  this.clearSubtractFlagBit();
  if (addVal > 0xFFFF) {
    this.setCarryFlagBit();
  } else {
    this.clearCarryFlagBit();
  }
}

module.exports = {
  ADDr8r8,
  ADDr8rr16,
  ADDr16r16,
};
