const camelcaseKeys = require('camelcase-keys');

function toCamel(data) {
  return camelcaseKeys(data, { deep: true });
}

export default toCamel;
