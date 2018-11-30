export const noop = () => {};

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
