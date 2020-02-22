import React from 'react';
// Components
import { Accordion } from 'semantic-ui-react';
// Visualization
import ColoringByProperty from './ColoringByProperty';
import RadiusByProperty from './RadiusByProperty';
import MST from './MST';
import ShortestPath from './ShortestPath';
// Data
import { NodeTable, LinkTable } from './GraphTableSection';
// Setting
import SettingSection from './SettingSection';

const visualizationPanels = [
  {
    key: 'coloring',
    title: 'Coloring By Property',
    content: { content: <ColoringByProperty /> },
  },
  {
    key: 'radius',
    title: 'Radius By Property',
    content: { content: <RadiusByProperty /> },
  },
  {
    key: 'mst',
    title: 'Minimum Spanning Tree',
    content: { content: <MST /> },
  },
  {
    key: 'shortest-path',
    title: 'Shortest Path',
    content: { content: <ShortestPath /> },
  },
];

const dataPanels = [
  {
    key: 'node-table',
    title: 'Graph Nodes Table',
    content: { content: <NodeTable /> },
  },
  {
    key: 'link-table',
    title: 'Graph Links Table',
    content: { content: <LinkTable /> },
  },
];

export const VisualizationTab = () => (
  <Accordion
    fluid
    panels={visualizationPanels}
    activeIndex={[0, 1, 2, 3]}
    exclusive={false}
  />
);

export const DataTab = () => (
  <Accordion fluid panels={dataPanels} activeIndex={[0, 1]} exclusive={false} />
);

export const SettingTab = () => <SettingSection />;
