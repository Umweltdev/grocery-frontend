/**
 * Applies Marketing Cost Displacement (MCD) to a base price.
 */
export const applyMCD = (basePrice, mcdConfig, spendFactor = 1) => {
  if (typeof basePrice !== 'number' || basePrice < 0) {
    throw new Error('basePrice must be a non-negative number');
  }
  if (typeof spendFactor !== 'number' || spendFactor < 0) {
    throw new Error('spendFactor must be a non-negative number');
  }
  
  if (!mcdConfig?.enabled) return basePrice;

  const rawIncrease =
    basePrice * (1 + (mcdConfig.sensitivityCoefficient ?? 0) * spendFactor);

  const maxAllowed = basePrice * (1 + (mcdConfig.maxPriceIncrease ?? 0));

  return Math.min(rawIncrease, maxAllowed);
};
/**
 * Applies Returning Customer Discount (RCD) to a price.
 */
export const applyRCD = (
  price,
  rcdConfig,
  customerSpend = 0,
  customerVisits = 0
) => {
  if (typeof price !== 'number' || price < 0) {
    throw new Error('price must be a non-negative number');
  }
  if (typeof customerSpend !== 'number' || customerSpend < 0) {
    throw new Error('customerSpend must be a non-negative number');
  }
  if (typeof customerVisits !== 'number' || customerVisits < 0) {
    throw new Error('customerVisits must be a non-negative number');
  }

  if (!rcdConfig?.enabled) return price;

  if (
    customerSpend < (rcdConfig.thresholds?.minimumSpend ?? 0) ||
    customerVisits < (rcdConfig.thresholds?.minimumVisits ?? 0)
  ) {
    return price;
  }

  const discount = Math.min(
    (customerSpend / 100) * (rcdConfig.spendWeight ?? 0),
    rcdConfig.maxDiscount ?? 0
  );

  return price * (1 - discount / 100);
};
/**
 * Pipeline to calculate final product price with MCD + RCD.
 */
export const calculateFinalPrice = ({
  basePrice,
  mcdConfig,
  rcdConfig,
  customerSpend = 0,
  customerVisits = 0,
}) => {
  const spendFactor =
    customerSpend >= (mcdConfig?.minimumSpendThreshold ?? 0) ? 1 : 0;

  const mcdPrice = applyMCD(basePrice, mcdConfig, spendFactor);
  const rcdPrice = applyRCD(mcdPrice, rcdConfig, customerSpend, customerVisits);

  return {
    basePrice,
    mcdPrice,
    rcdPrice,
    discount: ((mcdPrice - rcdPrice) / mcdPrice) * 100,
  };
};
