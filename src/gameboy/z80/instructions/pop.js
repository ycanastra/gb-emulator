
function POPr16(hRegister, lRegister) {
  this.registers[lRegister] = this.mainMemory[this.registers.sp];
  this.registers[hRegister] = this.mainMemory[this.registers.sp + 1];
  this.registers.sp += 2;
}

export default POPr16;
