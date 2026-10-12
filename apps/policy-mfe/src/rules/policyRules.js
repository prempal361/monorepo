export const validatePolicySearchInput = (query) => {
  if (query && query.trim().length > 0 && query.trim().length < 2) {
    return 'Policy search query must be at least 2 characters';
  }
  return '';
};
