// Instantiate formatters once for better performance
const currencyFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
});

const percentFormat = new Intl.NumberFormat("en-GB", {
  style: "percent",
  minimumFractionDigits: 2,
});

const quantityFormat = new Intl.NumberFormat("en-GB", {
  maximumFractionDigits: 0,
});

export const currencyFormatter = (value) => currencyFormat.format(value);
export const percentFormatter = (value) => percentFormat.format(value / 100);
export const quantityFormatter = (value) => quantityFormat.format(value);
