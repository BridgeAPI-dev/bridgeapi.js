function snakeToCamel(obj) {
  let json = JSON.stringify(obj);

  json = json.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  console.log(json);
  return JSON.parse(json);
}

export default snakeToCamel;
