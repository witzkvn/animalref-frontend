export const convertNumber = (number) => {
  const value = parseInt(number);
  const sign = value < 0 ? -1 : 1;
  const valuePos = Math.abs(value);

  if (valuePos >= 0 && valuePos < 1000) {
    return valuePos * sign;
  } else if (valuePos >= 1000 && valuePos < 10000) {
    return `${((valuePos / 1000) * sign).toFixed(1)}k`;
  } else if (valuePos >= 10000 && valuePos < 1000000) {
    return `${((valuePos / 1000) * sign).toFixed(0)}k`;
  } else if (valuePos >= 1000000) {
    return `${((valuePos / 1000000) * sign).toFixed(2)}M`;
  }
};
