export const validateCategoryFilter = (category) => {
  const allowedCategories = ['ALL', 'LIFE', 'HEALTH', 'SAVINGS', 'MOTOR'];
  if (!allowedCategories.includes(category)) {
    return 'Invalid product category selected';
  }
  return '';
};
