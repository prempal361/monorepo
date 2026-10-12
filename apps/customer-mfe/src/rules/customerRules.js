export const validateSearchTerm = (term) => {
  if (term && term.trim().length < 2) {
    return 'Search term must be at least 2 characters long';
  }
  return '';
};

export const validateNewCustomer = (customerData) => {
  const errors = {};
  if (!customerData.name || customerData.name.trim() === '') {
    errors.name = 'Customer name is required';
  }
  if (!customerData.email || !customerData.email.includes('@')) {
    errors.email = 'Valid email is required';
  }
  if (!customerData.phone || customerData.phone.length < 10) {
    errors.phone = 'Phone number must be at least 10 digits';
  }
  return errors;
};
