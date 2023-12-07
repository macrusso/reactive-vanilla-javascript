const normalizeString = require('../helpers/normalizeString');
const parseDate = require('../helpers/parseDate');

const sortData = ({ data, orderBy, orderType }) => {
  if (orderBy === 'name') {
    data = sortByName(data, orderType);
  } else if (orderBy === 'date') {
    data = sortByDate(data, orderType);
  } else if (Object.keys(data[0]).find(key => key === orderBy)) {
    data = sortByValue(data, orderBy, orderType);
  }
  return data;
};

const sortByName = (data, orderType) => {
  data.sort((a, b) => {
    const nameA = normalizeString(`${a.first_name} ${a.last_name}`);
    const nameB = normalizeString(`${b.first_name} ${b.last_name}`);

    return getSortedData(nameA, nameB, orderType);
  });
  return data;
};

const sortByValue = (data, orderBy, orderType) => {
  data.sort((a, b) => {
    const valueA = normalizeString(`${a[orderBy]}`);
    const valueB = normalizeString(`${b[orderBy]}`);

    return getSortedData(valueA, valueB, orderType);
  });

  return data;
};

const sortByDate = (data, orderType) => {
  data.sort((a, b) => {
    let dateA = parseDate(a.date);
    let dateB = parseDate(b.date);

    return getSortedData(dateA, dateB, orderType);
  });

  return data;
};

const getSortedData = (valueA, valueB, orderType) => {
  if (orderType === 'asc') {
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  }
  if (orderType === 'desc') {
    if (valueA > valueB) return -1;
    if (valueA < valueB) return 1;
    return 0;
  }
};

module.exports = {
  sortData,
  parseDate,
  normalizeString
};