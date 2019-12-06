import { ADDr8r8 } from './add';
import Z80 from '../../../__mocks__/z80';

let z80;

beforeEach(() => {
  z80 = new Z80();
});

describe('ADDr8r8', () => {
  it('adds numbers', () => {
    const dstReg = 'a';
    const srcReg = 'c';
    z80.registers[dstReg] = 2;
    z80.registers[srcReg] = 5;

    ADDr8r8.apply(z80, [dstReg, srcReg]);

    expect(z80.registers[dstReg]).toEqual(7);
    expect(z80.clearZeroFlagBit).toHaveBeenCalled();
    expect(z80.clearSubtractFlagBit).toHaveBeenCalled();
  });

  it('sets zero flag is result is 0', () => {
    const dstReg = 'a';
    const srcReg = 'c';

    ADDr8r8.apply(z80, [dstReg, srcReg]);

    expect(z80.registers[dstReg]).toEqual(0);
    expect(z80.setZeroFlagBit).toHaveBeenCalled();
    expect(z80.clearZeroFlagBit).not.toHaveBeenCalled();
  });

  it('sets carry flag if result is carried', () => {
    const dstReg = 'a';
    const srcReg = 'c';
    z80.registers[dstReg] = 0xFF;
    z80.registers[srcReg] = 0x01;

    ADDr8r8.apply(z80, [dstReg, srcReg]);

    expect(z80.registers[dstReg]).toEqual(0);
    expect(z80.setCarryFlagBit).toHaveBeenCalled();
    expect(z80.setZeroFlagBit).toHaveBeenCalled();
    expect(z80.clearZeroFlagBit).not.toHaveBeenCalled();
  });
});
