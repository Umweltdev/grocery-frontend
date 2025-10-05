
export const currencyFormatter = (value) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);

export const percentFormatter = (value) =>
  new Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(value / 100);

export const quantityFormatter = (value) =>
  new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0,
  }).format(value);
