
function PUSHr16(hRegister, lRegister) {
  const spVal = this.registers.sp;
  this.writeMemory(spVal - 1, this.registers[hRegister]);
  this.writeMemory(spVal - 2, this.registers[lRegister]);
  this.registers.sp -= 2;
}

export default PUSHr16;
