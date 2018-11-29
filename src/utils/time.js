export const unixToLocal = value => {
  return Number.isInteger(value) ? new Date(value * 1000) : value;
};

export const localToUnix = value => {
  return parseInt((new Date(value).getTime() / 1000).toFixed(0), 10);
};
