import React from 'react';
// Components
import { Accordion } from 'semantic-ui-react';
import ColoringByProperty from './ColoringByProperty';
import { NodeTable, LinkTable } from './GraphTableSection';
import RadiusByProperty from './RadiusByProperty';
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

// getDefaultActiveIndex ensures that all
// panels will be opened by default
// by returning the array containing [0...(arr.length)]
const getDefaultActiveIndex = arr =>
  Array(arr.length)
    .fill(0)
    .map((_, idx) => idx);

export const VisualizationTab = () => (
  <Accordion
    fluid
    panels={visualizationPanels}
    defaultActiveIndex={getDefaultActiveIndex(visualizationPanels)}
    exclusive={false}
  />
);

export const DataTab = () => (
  <Accordion
    fluid
    panels={dataPanels}
    defaultActiveIndex={getDefaultActiveIndex(dataPanels)}
    exclusive={false}
  />
);

export const SettingTab = () => <SettingSection />;
