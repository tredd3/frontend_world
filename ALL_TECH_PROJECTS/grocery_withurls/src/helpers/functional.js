export const pipe = (...args) => x => args.reduce((acc, fn) => fn(acc), x);

export const range = length => [...Array(length).keys()];

export const pad = (length, padCharacter) => value => {
  if (String(value).length >= length) return String(value);
  return range(length - String(value).length).map(() => padCharacter).join('') + String(value);
};

const make2digit = pad(2, '0');

export const formatDate = dateLike => {
  const date = new Date(dateLike);
  return `${date.getFullYear()}-${make2digit(date.getMonth() + 1)}-${make2digit(date.getDate())}`;
};

export const objectToQueryString = obj => Object.entries(obj)
  .reduce((acc, [key, value]) => [...acc, `${encodeURIComponent(key)}=${encodeURIComponent(Array.isArray(value)
    ? value.join(',') : value)}`], []).join('&');

export const queryStringToObject = qs => {
  if (!qs) return {};
  return qs.split('&')
    .map(aQsPart => aQsPart.split('=').map(decodeURIComponent))
    .reduce((acc, [name, value]) => {
      const convertedValue = value.includes(',') ? value.split(',') : [value];
      return { ...acc, [name]: convertedValue };
    }, {});
};
