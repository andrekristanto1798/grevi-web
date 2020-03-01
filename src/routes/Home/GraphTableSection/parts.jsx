import React from 'react';
// Components
import NodeLinkActions from '../../../components/NodeLinkActions';
// Utils
import { mapToString } from '../../../utils/objects';
import { getLinkSource, getLinkTarget } from '../../../utils/graph';

export const nodeToGraphTableData = (focusOn, edit, remove) => obj => ({
  ...mapToString(obj),
  Actions: (
    <NodeLinkActions focusOn={focusOn} edit={edit} remove={remove} data={obj} />
  ),
});

export const linkToGraphTableData = (focusOn, edit, remove) => obj => ({
  ...mapToString(obj),
  source: getLinkSource(obj),
  target: getLinkTarget(obj),
  Actions: (
    <NodeLinkActions focusOn={focusOn} edit={edit} remove={remove} data={obj} />
  ),
});
