import { validateCategoryFilter } from '../rules/productRules.js';

describe('Product Rules Tests', () => {
  it('should validate category filter', () => {
    expect(validateCategoryFilter('LIFE')).toBe('');
    expect(validateCategoryFilter('INVALID')).toBe('Invalid product category selected');
  });
});
