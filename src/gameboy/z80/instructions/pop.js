
function POPr16(hRegister, lRegister) {
  this.registers[lRegister] = this.readMemory(this.registers.sp);
  this.registers[hRegister] = this.readMemory(this.registers.sp + 1);
  this.registers.sp += 2;
}

export default POPr16;
