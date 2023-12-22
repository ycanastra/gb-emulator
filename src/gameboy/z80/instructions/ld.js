import { combineBytes, seperateBytes } from './../bytesUtil.js';

function LDr8n8(register, number) {
  this.registers[register] = number;
}

function LDr8r8(dstRegister, srcRegister) {
  this.registers[dstRegister] = this.registers[srcRegister];
}

function LDr16n16(hRegister, lRegister, hNumber, lNumber) {
  // Special case for stack pointer because it's stored as one 16bit rather than two 8bit
  if (hRegister === 's' && lRegister === 'p') {
    const spL = this.byte1;
    const spH = this.byte2;
    this.registers.sp = combineBytes(spH, spL);
  } else {
    this.registers[hRegister] = hNumber;
    this.registers[lRegister] = lNumber;
  }
}

function LDrn16r8(hDstNumber, lDstNumber, srcRegister) {
  const address = combineBytes(hDstNumber, lDstNumber);
  this.writeMemory(address, this.registers[srcRegister]);
}

function LDrr16n8(hDstRegister, lDstRegister, srcNumber) {
  const address = combineBytes(this.registers[hDstRegister], this.registers[lDstRegister]);
  this.writeMemory(address, srcNumber);
}

function LDrr16r8(hDstRegister, lDstRegister, srcRegister) {
  const address = combineBytes(this.registers[hDstRegister], this.registers[lDstRegister]);
  this.writeMemory(address, this.registers[srcRegister]);
}

function LDr8rn16(dstRegister, hSrcNumber, lSrcNumber) {
  const address = combineBytes(hSrcNumber, lSrcNumber);
  this.registers[dstRegister] = this.readMemory(address);
}

function LDr8rr16(dstRegister, hSrcRegister, lSrcRegister) {
  const hSrcRegVal = this.registers[hSrcRegister];
  const lSrcRegVal = this.registers[lSrcRegister];
  const address = combineBytes(hSrcRegVal, lSrcRegVal);

  this.registers[dstRegister] = this.readMemory(address);
}

function LDrr8r8(dstRegister, srcRegister) {
  const address = (0xFF00 + this.registers[dstRegister]) & 0xFFFF;
  this.writeMemory(address, this.registers[srcRegister]);
}

function LDDrr16r8(hDstRegister, lDstRegister, srcRegister) {
  const hDstRegVal = this.registers[hDstRegister];
  const lDstRegVal = this.registers[lDstRegister];

  const address = combineBytes(hDstRegVal, lDstRegVal);
  this.writeMemory(address, this.registers[srcRegister]);

  // Decrement
  const decVal = (address - 1) & 0xFFFF;
  const { highByte, lowByte } = seperateBytes(decVal);
  this.registers[hDstRegister] = highByte;
  this.registers[lDstRegister] = lowByte;
}

function LDHr8rn8(register, number) {
  const address = (0xFF00 + number) & 0xFFFF;
  this.registers[register] = this.readMemory(address);
}

function LDHrn8r8(number, register) {
  const address = (0xFF00 + number) & 0xFFFF;
  this.writeMemory(address, this.registers[register]);
}

function LDIr8rr16(dstRegister, hSrcRegister, lSrcRegister) {
  const hSrcRegVal = this.registers[hSrcRegister];
  const lSrcRegVal = this.registers[lSrcRegister];

  const srcAddress = combineBytes(hSrcRegVal, lSrcRegVal);
  this.registers[dstRegister] = this.readMemory(srcAddress);

  // Increment
  const incVal = (srcAddress + 1) & 0xFFFF;
  const { highByte, lowByte } = seperateBytes(incVal);
  this.registers[hSrcRegister] = highByte;
  this.registers[lSrcRegister] = lowByte;
}

function LDIrr16r8(hDstRegister, lDstRegister, srcRegister) {
  const hDstRegVal = this.registers[hDstRegister];
  const lDstRegVal = this.registers[lDstRegister];

  const address = combineBytes(hDstRegVal, lDstRegVal);
  this.writeMemory(address, this.registers[srcRegister]);

  // Increment
  const incVal = (address + 1) & 0xFFFF;
  const { highByte, lowByte } = seperateBytes(incVal);
  this.registers[hDstRegister] = highByte;
  this.registers[lDstRegister] = lowByte;
}

export {
  LDr8n8,
  LDr8r8,
  LDr8rn16,
  LDr8rr16,
  LDr16n16,
  LDrn16r8,
  LDrr8r8,
  LDrr16n8,
  LDrr16r8,
  LDDrr16r8,
  LDHr8rn8,
  LDHrn8r8,
  LDIr8rr16,
  LDIrr16r8,
};
