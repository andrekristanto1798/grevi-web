import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as graphActions from '../../src/actions/graph.action.js';
import { delay, getExpectedActionsWithLoading } from '../utils.js';
import { SETTING_SET } from '../../src/actions/setting.action.js';
import { ALGO_SET_GRAPH } from '../../src/actions/algo.action.js';
import { downloadJSON } from '../../src/utils/download';
import { defaultPopupData } from '../../src/reducers/graph.reducer.js';
import {
  SELECT_MODE,
  ADD_NODE_MODE,
  ADD_LINK_MODE,
} from '../../src/components/EditingTools/index.js';

jest.mock('../../src/utils/download');

const types = {
  RESET_ALL: graphActions.RESET_ALL,
  SET: graphActions.SET,
  SET_GRAPH_NODES: graphActions.SET_GRAPH_NODES,
  SET_GRAPH_LINKS: graphActions.SET_GRAPH_LINKS,
};

global.alert = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('graph action tests', () => {
  it('changeFilename action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'filename',
        value: 'result',
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.changeFilename('result'));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  const emptyGraph = { nodes: [], links: [] };
  const invalidNodeGraph = { nodes: [{ invalid: true }], links: [] };
  const invalidLinkGraph = { nodes: [], links: [{ invalid: true }] };
  const validGraph = {
    nodes: [{ id: 1 }, { id: 2 }],
    links: [{ id: 1, source: 1, target: 2 }],
  };
  const parsedValidGraph = {
    nodes: [{ id: '1' }, { id: '2' }],
    links: [{ id: '1', source: '1', target: '2' }],
  };

  it('loadGraphFile action on valid args', async () => {
    const expectedActions = [
      { type: types.RESET_ALL },
      ...getExpectedActionsWithLoading([
        {
          type: types.SET,
          key: 'filename',
          value: 'result',
        },
        {
          type: types.SET,
          key: 'data',
          value: parsedValidGraph,
        },
        {
          type: types.SET,
          key: 'nodeKeys',
          value: ['id'],
        },
        {
          type: types.SET,
          key: 'linkKeys',
          value: ['id', 'source', 'target'],
        },
        {
          type: SETTING_SET,
          key: 'nodeTextKey',
          value: 'id',
        },
      ]),
    ];
    const store = mockStore({ graph: { data: emptyGraph } });
    await store.dispatch(graphActions.loadGraphFile('result', validGraph));
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('loadGraphFile action on invalid node args', async () => {
    const expectedActions = [
      { type: types.RESET_ALL },
      ...getExpectedActionsWithLoading([]),
    ];
    const store = mockStore({ graph: { data: emptyGraph } });
    await store.dispatch(
      graphActions.loadGraphFile('result', invalidNodeGraph),
    );
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('loadGraphFile action on invalid link args', async () => {
    const expectedActions = [
      { type: types.RESET_ALL },
      ...getExpectedActionsWithLoading([]),
    ];
    const store = mockStore({ graph: { data: emptyGraph } });
    await store.dispatch(
      graphActions.loadGraphFile('result', invalidLinkGraph),
    );
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('downloadGraphFile action', async () => {
    const expectedActions = [];
    const store = mockStore({ graph: { data: emptyGraph, filename: 'test' } });
    await store.dispatch(graphActions.downloadGraphFile());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
    expect(downloadJSON).toHaveBeenCalled();
    expect(downloadJSON).toHaveBeenCalledWith(expect.any(String), 'test.json');
  });

  it('resetPopupData action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'popupData',
        value: defaultPopupData,
      },
    ];
    const store = mockStore({});
    await store.dispatch(graphActions.resetPopupData());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('setMode select mode', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'clickedNodeId',
        value: null,
      },
      {
        type: types.SET,
        key: 'mode',
        value: SELECT_MODE,
      },
    ];
    const store = mockStore({ graph: { data: emptyGraph, filename: 'test' } });
    await store.dispatch(graphActions.setMode(SELECT_MODE));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('setMode add node mode', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'clickedNodeId',
        value: null,
      },
      {
        type: types.SET_GRAPH_NODES,
        nodes: [{ id: '1' }],
      },
      {
        type: types.SET,
        key: 'nodeKeys',
        value: ['id'],
      },
    ];
    const store = mockStore({ graph: { data: emptyGraph, filename: 'test' } });
    await store.dispatch(graphActions.setMode(ADD_NODE_MODE));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('setMode add link mode', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'clickedNodeId',
        value: null,
      },
      {
        type: types.SET,
        key: 'mode',
        value: ADD_LINK_MODE,
      },
      {
        type: types.SET,
        key: 'popupData',
        value: defaultPopupData,
      },
    ];
    const store = mockStore({ graph: { data: emptyGraph, filename: 'test' } });
    await store.dispatch(graphActions.setMode(ADD_LINK_MODE));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('clickNode when not add link mode', async () => {
    const expectedActions = [];
    const store = mockStore({ graph: { mode: SELECT_MODE } });
    await store.dispatch(graphActions.clickNode({ id: '1' }));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('clickNode when add link mode and link is duplicate', async () => {
    const expectedActions = [];
    const store = mockStore({
      graph: {
        data: parsedValidGraph,
        mode: ADD_LINK_MODE,
        clickedNodeId: '1',
      },
    });
    await store.dispatch(graphActions.clickNode({ id: '2' }));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('clickNode when add link mode and clickedNodeId is the null', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'clickedNodeId',
        value: '1',
      },
    ];
    const store = mockStore({
      graph: {
        data: parsedValidGraph,
        mode: ADD_LINK_MODE,
        clickedNodeId: null,
      },
    });
    await store.dispatch(graphActions.clickNode({ id: '1' }));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('clickNode when add link mode and clickedNodeId is the same', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'clickedNodeId',
        value: '1',
      },
    ];
    const store = mockStore({
      graph: {
        data: parsedValidGraph,
        mode: ADD_LINK_MODE,
        clickedNodeId: '1',
      },
    });
    await store.dispatch(graphActions.clickNode({ id: '1' }));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('clickNode when add link mode and link is created', async () => {
    const expectedActions = [
      {
        type: types.SET_GRAPH_LINKS,
        links: [{ id: '1', source: '1', target: '2' }],
      },
      {
        type: types.SET,
        key: 'linkKeys',
        value: ['id', 'source', 'target'],
      },
      {
        type: types.SET,
        key: 'clickedNodeId',
        value: null,
      },
    ];
    const store = mockStore({
      graph: {
        data: { ...parsedValidGraph, links: [] },
        mode: ADD_LINK_MODE,
        clickedNodeId: '1',
      },
    });
    await store.dispatch(graphActions.clickNode({ id: '2' }));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('hoverNode on invalid node', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'hoveredNodeId',
        value: [],
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.hoverNode(null));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('hoverNode on valid node', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'hoveredNodeId',
        value: ['1'],
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.hoverNode({ id: '1' }));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('hoverNodes on invalid nodes', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'hoveredNodeId',
        value: [],
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.hoverNodes(null));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('hoverNodes on valid nodes', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'hoveredNodeId',
        value: ['1', '2'],
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.hoverNodes([{ id: '1' }, { id: '2' }]));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('hoverLink action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'hoveredLinkId',
        value: '1',
      },
      {
        type: types.SET,
        key: 'hoveredNodeId',
        value: ['1', '2'],
      },
    ];
    const store = mockStore({ graph: { data: parsedValidGraph } });
    await store.dispatch(
      graphActions.hoverLink({ id: '1', source: '1', target: '2' }),
    );
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('setNodePopup action', async () => {
    const node = { id: '1' };
    const position = { x: 0, y: 0 };
    const expectedActions = [
      {
        type: types.SET,
        key: 'popupData',
        value: { type: 'node', data: node, position },
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.setNodePopup(node, position));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('setLinkPopup action', async () => {
    const link = { id: '1' };
    const position = { x: 0, y: 0 };
    const expectedActions = [
      {
        type: types.SET,
        key: 'popupData',
        value: { type: 'link', data: link, position },
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.setLinkPopup(link, position));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('focusNodeOn action', async () => {
    const node = { id: '1' };
    const expectedActions = [
      {
        type: types.SET,
        key: 'focusedNode',
        value: node,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.focusNodeOn(node));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('resetFocusedNode action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'focusedNode',
        value: null,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.resetFocusedNode());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('focusLinkOn action', async () => {
    const link = { id: '1' };
    const expectedActions = [
      {
        type: types.SET,
        key: 'focusedLink',
        value: link,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.focusLinkOn(link));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('resetFocusedLink action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'focusedLink',
        value: null,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.resetFocusedLink());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('editNode action', async () => {
    const node = { id: '1' };
    const expectedActions = [
      {
        type: types.SET,
        key: 'editedNode',
        value: node,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.editNode(node));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('cancelEditNode action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'editedNode',
        value: null,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.cancelEditNode());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('editLink action', async () => {
    const link = { id: '1' };
    const expectedActions = [
      {
        type: types.SET,
        key: 'editedLink',
        value: link,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.editLink(link));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });
  it('cancelEditLink action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'editedLink',
        value: null,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.cancelEditLink());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('deleteNode action', async () => {
    const node = { id: '1' };
    const expectedActions = [
      {
        type: types.SET,
        key: 'deletedNode',
        value: node,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.deleteNode(node));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('cancelDeleteNode action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'deletedNode',
        value: null,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.cancelDeleteNode());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('deleteLink action', async () => {
    const link = { id: '1' };
    const expectedActions = [
      {
        type: types.SET,
        key: 'deletedLink',
        value: link,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.deleteLink(link));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('cancelDeleteLink action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'deletedLink',
        value: null,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.cancelDeleteLink());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('submitEditedNode action', async () => {
    const expectedActions = [
      {
        type: ALGO_SET_GRAPH,
        graph: null,
      },
      {
        type: types.SET,
        key: 'data',
        value: parsedValidGraph,
      },
      {
        type: types.SET,
        key: 'editedNode',
        value: null,
      },
    ];
    const store = mockStore({
      graph: {
        editedNode: { id: '1' },
        data: parsedValidGraph,
        nodeKeys: ['id'],
      },
      algo: {},
    });
    await store.dispatch(graphActions.submitEditedNode({ id: '1' }));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('submitEditedLink action', async () => {
    const expectedActions = [
      {
        type: ALGO_SET_GRAPH,
        graph: null,
      },
      {
        type: types.SET,
        key: 'data',
        value: parsedValidGraph,
      },
      {
        type: types.SET,
        key: 'editedLink',
        value: null,
      },
    ];
    const store = mockStore({
      graph: {
        editedLink: { id: '1' },
        data: parsedValidGraph,
        linkKeys: ['id', 'source', 'target'],
      },
      algo: {},
    });
    await store.dispatch(
      graphActions.submitEditedLink({ id: '1', source: '1', target: '2' }),
    );
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('submitDeleteNode action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'nodeKeys',
        value: ['id'],
      },
      {
        type: types.SET,
        key: 'popupData',
        value: defaultPopupData,
      },
      {
        type: ALGO_SET_GRAPH,
        graph: null,
      },
      {
        type: types.SET,
        key: 'data',
        value: { nodes: [{ id: '2' }], links: [] },
      },
      {
        type: types.SET,
        key: 'deletedNode',
        value: null,
      },
    ];
    const store = mockStore({
      graph: {
        deletedNode: { id: '1' },
        data: parsedValidGraph,
        nodeKeys: ['id', 'source', 'target'],
      },
      algo: {},
    });
    await store.dispatch(graphActions.submitDeleteNode());
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('submitDeleteLink action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'linkKeys',
        value: [],
      },
      {
        type: types.SET,
        key: 'popupData',
        value: defaultPopupData,
      },
      {
        type: ALGO_SET_GRAPH,
        graph: null,
      },
      {
        type: types.SET,
        key: 'data',
        value: { nodes: parsedValidGraph.nodes, links: [] },
      },
      {
        type: types.SET,
        key: 'deletedLink',
        value: null,
      },
    ];
    const store = mockStore({
      graph: {
        deletedLink: { id: '1' },
        data: parsedValidGraph,
        linkKeys: ['id', 'source', 'target'],
      },
      algo: {},
    });
    await store.dispatch(graphActions.submitDeleteLink());
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('refreshGraphLayout action', async () => {
    const expectedActions = [
      {
        type: ALGO_SET_GRAPH,
        graph: parsedValidGraph,
      },
      {
        type: types.SET,
        key: 'data',
        value: parsedValidGraph,
      },
    ];
    const store = mockStore({
      graph: { data: parsedValidGraph },
      algo: { graph: parsedValidGraph },
    });
    await store.dispatch(graphActions.refreshGraphLayout());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('handleChangeNodeSearchValue action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'nodeSearchValue',
        value: 'newValue',
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.handleChangeNodeSearchValue('newValue'));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('handleChangeLinkSearchValue action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'linkSearchValue',
        value: 'newValue',
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.handleChangeLinkSearchValue('newValue'));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('toogleSearchAsFilter action', async () => {
    const expectedActions = [
      {
        type: types.SET,
        key: 'searchAsFilter',
        value: true,
      },
    ];
    const store = mockStore({ graph: {} });
    await store.dispatch(graphActions.toogleSearchAsFilter(false));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });
});
