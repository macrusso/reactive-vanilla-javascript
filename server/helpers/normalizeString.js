// remove accents characters
module.exports = (string) => {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
};

