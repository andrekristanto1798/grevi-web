import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import * as graphAction from '../../actions/graph.action';
import Modal from '../Modal';
import NodeLinkActions from '../NodeLinkActions';
// Utils
import { beautifyObject, cleanFromIgnoredKeys } from '../../utils/objects';
import { nodeShape, linkShape } from '../UtilPropTypes';
// Styles
import styles from './styles.scss';

export function Popover({ x, y, content }) {
  return (
    <Modal>
      <div
        className={styles.graphPopover__container}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          visibility: content ? 'visible' : 'hidden',
        }}
      >
        {content}
      </div>
    </Modal>
  );
}

Popover.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  content: PropTypes.node,
};

function NodeContent({ node, onClose, focusOn, edit, remove }) {
  const cloneObj = cleanFromIgnoredKeys({ ...node });
  return (
    <div className={styles.content__container}>
      <div className={styles.contentHeader__container}>
        <span />
        <span>
          <Button icon="close" basic size="mini" onClick={onClose} />
        </span>
      </div>
      <pre>{beautifyObject(cloneObj)}</pre>
      <div className={styles.contentFooter__container}>
        <NodeLinkActions
          data={node}
          focusOn={focusOn}
          edit={edit}
          remove={remove}
        />
      </div>
    </div>
  );
}

NodeContent.propTypes = {
  node: nodeShape.isRequired,
  onClose: PropTypes.func.isRequired,
  focusOn: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

const nodeActions = {
  remove: graphAction.deleteNode,
  edit: graphAction.editNode,
  focusOn: graphAction.focusNodeOn,
};

export const ConnectedNodeContent = connect(
  null,
  nodeActions,
)(NodeContent);

export function LinkContent({ link, onClose, focusOn, edit, remove }) {
  const cloneObj = cleanFromIgnoredKeys({ ...link });
  if (cloneObj.source && cloneObj.source.id !== null)
    cloneObj.source = cloneObj.source.id;
  if (cloneObj.target && cloneObj.target.id !== null)
    cloneObj.target = cloneObj.target.id;
  return (
    <div className={styles.content__container}>
      <div className={styles.contentHeader__container}>
        <span />
        <span>
          <Button icon="close" basic size="mini" onClick={onClose} />
        </span>
      </div>
      <pre>{beautifyObject(cloneObj)}</pre>
      <div className={styles.contentFooter__container}>
        <NodeLinkActions
          data={link}
          focusOn={focusOn}
          edit={edit}
          remove={remove}
        />
      </div>
    </div>
  );
}

LinkContent.propTypes = {
  link: linkShape.isRequired,
  onClose: PropTypes.func.isRequired,
  focusOn: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

const linkActions = {
  remove: graphAction.deleteLink,
  edit: graphAction.editLink,
  focusOn: graphAction.focusLinkOn,
};

export const ConnectedLinkContent = connect(
  null,
  linkActions,
)(LinkContent);
