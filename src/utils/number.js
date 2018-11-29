export function formatCurrency(number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SGD' }).format(number);
}
