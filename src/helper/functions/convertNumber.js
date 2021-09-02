export const convertNumber = (number) => {
  const value = parseInt(number);
  const sign = value < 0 ? -1 : 1;
  const valuePos = Math.abs(value);
  let customValue;

  if (valuePos >= 0 && valuePos < 1000) {
    customValue = valuePos * sign;
  } else if (valuePos >= 1000 && valuePos < 10000) {
    customValue = `${(valuePos / 1000).toFixed(1)}k`;
  } else if (valuePos >= 10000 && valuePos < 1000000) {
    customValue = `${(valuePos / 1000).toFixed(0)}k`;
  } else if (valuePos >= 1000000) {
    customValue = `${(valuePos / 1000000).toFixed(2)}M`;
  }

  if (sign === -1) {
    return `- ${customValue}`;
  } else if (sign === 1) {
    return `+ ${customValue}`;
  }
};
