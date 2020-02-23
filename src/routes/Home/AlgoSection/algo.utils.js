import { ALGO_UNIFORM_WEIGHT } from '../../../actions/algo.action';
import { toOption } from '../../../utils/objects';

export const getLinkKeyOptions = linkKeys => [
  { key: 'none', value: null, text: 'none' },
  ...linkKeys.map(toOption),
  {
    key: 'uniform-weight',
    value: ALGO_UNIFORM_WEIGHT,
    text: 'Uniform Weight',
  },
];
