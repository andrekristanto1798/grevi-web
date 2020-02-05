import omit from 'lodash/omit';
import uniq from 'lodash/uniq';

export const QUALITATIVE_TYPE = 'qualitative_type';
export const QUANTATIVE_TYPE = 'quantative_type';

export const isArrayEqual = (arr1, arr2) =>
  arr1.sort().join(',') === arr2.sort().join(',');

export const combineTwoArrays = (arr1, arr2) => uniq([...arr1, ...arr2]);

const ignoredKeys = [
  'x',
  'y',
  'selected',
  '__indexColor',
  '__controlPoints',
  '__photons',
  'index',
  'vx',
  'vy',
  'fx',
  'fy',
];

export const getUniqueKeys = objectList =>
  objectList
    .reduce((acc, obj) => {
      return combineTwoArrays(acc, Object.keys(obj));
    }, [])
    .filter(key => !ignoredKeys.includes(key));

export const reduceMapValuetoNumber = map =>
  Object.entries(map).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: Number(value),
    }),
    {},
  );

export const getIdValuesMapByKey = (arr, key) =>
  arr.reduce(
    (resultMap, obj) => ({
      ...resultMap,
      [obj.id]: obj[key],
    }),
    {},
  );

const isStringNumber = str => /^\d+$/.test(str);

export const getValuesType = values => {
  let isNumber = true;
  let index = 0;
  while (isNumber && index < values.length) {
    isNumber = isStringNumber(values[index]);
    index += 1;
  }
  return isNumber ? QUANTATIVE_TYPE : QUALITATIVE_TYPE;
};

export const toOption = obj => ({ key: obj, text: obj, value: obj });

export const cleanFromIgnoredKeys = obj => omit(obj, ignoredKeys);

export const cleanNodesFromIgnoredKeys = nodes =>
  nodes.map(cleanFromIgnoredKeys);

export const cleanLinksFromIgnoredKeys = links =>
  links.map(cleanFromIgnoredKeys).map(link => ({
    ...link,
    source: link.source.id,
    target: link.target.id,
  }));
