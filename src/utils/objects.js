import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';

export const getUniqueKeys = objectList =>
  objectList.reduce((acc, obj) => {
    return uniq([...acc, ...Object.keys(obj)]);
  }, []);

export const getUniqueValues = uniqBy;
