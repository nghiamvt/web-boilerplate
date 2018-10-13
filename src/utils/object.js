function removeItems(obj, keys) {
  return Object.keys(obj).reduce((result, key) => {
    return keys.includes(key) ? result : {
      ...result,
      [key]: obj[key],
    };
  }, {});
}

export {
  removeItems,
};
