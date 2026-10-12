import { validatePolicySearchInput } from '../rules/policyRules.js';

describe('Policy Rules Tests', () => {
  it('should validate policy search input', () => {
    expect(validatePolicySearchInput('P')).toBe('Policy search query must be at least 2 characters');
    expect(validatePolicySearchInput('POL-123')).toBe('');
  });
});
