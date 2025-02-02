/**
 * @param {any} value
 * @param {number} [fallback]
 */
export const enhancedParseInt = (value, fallback) => {
  if (value === undefined || value === null) {
    return fallback;
  }

  const parsedValue = Number.parseInt(value);

  if (Number.isNaN(parsedValue)) {
    return fallback;
  }

  return parsedValue;
};

/**
 * @param {any} value
 */
export const stringToBoolean = (value) => value === "true";
