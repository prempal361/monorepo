import { validateSearchTerm, validateNewCustomer } from '../rules/customerRules.js';

describe('Customer Rules Tests', () => {
  it('should validate search term', () => {
    expect(validateSearchTerm('a')).toBe('Search term must be at least 2 characters long');
    expect(validateSearchTerm('Rahul')).toBe('');
  });

  it('should validate new customer inputs', () => {
    const invalid = validateNewCustomer({ name: '', email: 'bad', phone: '123' });
    expect(invalid.name).toBe('Customer name is required');
    expect(invalid.email).toBe('Valid email is required');
    expect(invalid.phone).toBe('Phone number must be at least 10 digits');
  });
});
