import React from 'react';
import { Button } from 'semantic-ui-react';
// Utils
import { getLinkSource, getLinkTarget } from '../../../utils/graph';

export const nodeToGraphTableData = (focusOn, edit, remove) => obj => ({
  ...obj,
  Actions: (
    <>
      <Button
        title="Focus"
        color="facebook"
        icon="eye"
        size="mini"
        onClick={() => focusOn(obj)}
      />
      <Button
        title="Edit"
        color="green"
        icon="pencil"
        size="mini"
        onClick={() => edit(obj)}
      />
      <Button
        title="Delete"
        color="red"
        icon="delete"
        size="mini"
        onClick={() => remove(obj)}
      />
    </>
  ),
});

export const linkToGraphTableData = (focusOn, edit, remove) => obj => ({
  ...obj,
  source: getLinkSource(obj),
  target: getLinkTarget(obj),
  Actions: (
    <>
      <Button
        title="Focus"
        color="facebook"
        icon="eye"
        size="mini"
        onClick={() => focusOn(obj)}
      />
      <Button
        title="Edit"
        color="green"
        icon="pencil"
        size="mini"
        onClick={() => edit(obj)}
      />
      <Button
        title="Delete"
        color="red"
        icon="delete"
        size="mini"
        onClick={() => remove(obj)}
      />
    </>
  ),
});
