const covid19sg = require('./covid_19_sg.json');
const lesMiserables = require('./Les Miserables.json');
const wordAdjancencies = require('./Word Adjacencies.json');
const chicago = require('./Chicago.json');
const d3Deps = require('./d3_deps.json');

export const graphFileList = [
  {
    name: 'COVID-19 Singapore.json',
    graph: covid19sg,
    desc: 'COVID-19 Cluster in Singapore',
  },
  {
    name: 'Les Miserables.json',
    graph: lesMiserables,
    desc: `This undirected network contains co-occurances of characters in Victor Hugo's novel 'Les Misérables'`,
  },
  {
    name: 'Word Adjacencies.json',
    graph: wordAdjancencies,
    desc: `This is the undirected network of common noun and adjective adjacencies for the novel "David Copperfield" by English 19th century writer Charles Dickens`,
  },
  {
    name: 'Chicago Graph.json',
    graph: chicago,
    desc: `This is the road transportation network of the Chicago region (USA)`,
  },
  {
    name: 'D3 Dependencies.json',
    graph: d3Deps,
    desc: 'Contains all d3 modules',
  },
];

export const emptyGraphData = {
  name: 'Empty Graph.json',
  graph: { nodes: [], links: [] },
};
