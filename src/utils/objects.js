import omit from 'lodash/omit';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';

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
];

export const getUniqueKeys = objectList =>
  objectList
    .reduce((acc, obj) => {
      return combineTwoArrays(acc, Object.keys(obj));
    }, [])
    .filter(key => !ignoredKeys.includes(key));

export const getUniqueValues = (arr, prop) =>
  uniqBy(arr, prop).map(obj => obj[prop]);

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
