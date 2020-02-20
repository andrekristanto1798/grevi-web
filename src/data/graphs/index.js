const sampleGraph = require('./sample_graph.json');
const clusterGraph = require('./cluster_graph.json');
const covid19sg = require('./covid_19_sg.json');
const d3Deps = require('./d3_deps.json');

export const graphFileList = [
  {
    name: 'Sample Graph.json',
    graph: sampleGraph,
    desc: 'It is good to play around',
  },
  {
    name: 'Sample Clustered Graph.json',
    graph: clusterGraph,
    desc: 'It has clustered graphs',
  },
  {
    name: 'COVID-19 Singapore.json',
    graph: covid19sg,
    desc: 'COVID-19 Cluster in Singapore',
  },
  {
    name: 'D3 Dependencies.json',
    graph: d3Deps,
    desc: 'Contains all d3 modules',
  },
];
