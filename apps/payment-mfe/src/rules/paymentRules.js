export const validatePaymentAmount = (amount) => {
  const numAmount = Number(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    return 'Payment amount must be greater than zero';
  }
  return '';
};

export const validatePaymentRequest = (paymentData) => {
  const errors = {};
  if (!paymentData.customerName) {
    errors.customer = 'Please select a customer before payment';
  }
  if (!paymentData.productName) {
    errors.product = 'Please select a product before payment';
  }
  if (!paymentData.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method';
  }
  const amountErr = validatePaymentAmount(paymentData.amount);
  if (amountErr) {
    errors.amount = amountErr;
  }
  return errors;
};
