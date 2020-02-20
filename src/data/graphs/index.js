const sampleGraph = require('./sample_graph.json');
const covid19sg = require('./covid_19_sg.json');
const d3Deps = require('./d3_deps.json');

export const graphFileList = [
  {
    name: 'Sample Graph 1.json',
    graph: sampleGraph,
    desc: 'It is good to play around',
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
