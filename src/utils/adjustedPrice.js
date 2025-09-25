export const calculateAdjustedPrice = (basePrice, spend, config) => {
  if (typeof basePrice !== 'number' || typeof spend !== 'number' || !config) {
    throw new Error('Invalid parameters: basePrice and spend must be numbers, config must be an object');
  }

  if (typeof config.minimumSpendThreshold !== 'number' || 
      typeof config.sensitivityCoefficient !== 'number' || 
      typeof config.maxPriceIncrease !== 'number' ||
      config.minimumSpendThreshold <= 0) {
    throw new Error('Invalid config: numeric properties required and minimumSpendThreshold must be positive');
  }

  const factor = Math.min(
    config.sensitivityCoefficient * (spend / config.minimumSpendThreshold),
    config.maxPriceIncrease
  );

  return +(basePrice * (1 + factor)).toFixed(2);
};
