import { validatePaymentRequest, validatePaymentAmount } from '../rules/paymentRules.js';

describe('Payment Rules Tests', () => {
  it('should validate payment amount', () => {
    expect(validatePaymentAmount(-50)).toBe('Payment amount must be greater than zero');
    expect(validatePaymentAmount(1500)).toBe('');
  });

  it('should validate payment request', () => {
    const errors = validatePaymentRequest({});
    expect(errors.customer).toBeDefined();
    expect(errors.product).toBeDefined();
  });
});
