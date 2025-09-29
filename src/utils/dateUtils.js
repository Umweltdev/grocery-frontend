export const getMaxCollectionDate = (days = 5) => {
  const today = new Date();
  today.setDate(today.getDate() + days);
  return today.toISOString();
};
