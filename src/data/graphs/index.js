const sampleGraph = require('./sample_graph.json');
const clusterGraph = require('./cluster_graph.json');
const d3Deps = require('./d3_deps.json');

export const graphFileList = [
  {
    name: 'Sample Graph 1.json',
    graph: sampleGraph,
    desc: 'It is good to play around',
  },
  {
    name: 'Clustered Graph.json',
    graph: clusterGraph,
    desc: 'It has clustered graphs',
  },
  {
    name: 'D3 Dependencies.json',
    graph: d3Deps,
    desc: 'Contains all d3 modules',
  },
];
