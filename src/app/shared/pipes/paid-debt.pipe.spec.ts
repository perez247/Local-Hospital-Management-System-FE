import { PaidDebtPipe } from './paid-debt.pipe';

describe('PaidDebtPipe', () => {
  it('create an instance', () => {
    const pipe = new PaidDebtPipe();
    expect(pipe).toBeTruthy();
  });
});
