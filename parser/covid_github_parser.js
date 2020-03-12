// Source: https://raw.githubusercontent.com/wentjun/covid-19-sg/master/src/data/covid-sg.json
const fs = require('fs');
const covidTreeGithub = require('./data/covid_tree_github.json');

const featuresArr = covidTreeGithub.features;

// Feature: {type, geometry, properties}
// id
// confirmed
// discharged
// hospital

const nodes = featuresArr.map(node => {
  const nodeData = node.properties;
  const caseNumber = nodeData.id.split('-')[1];
  return {
    case: Number(caseNumber),
    confirmed: new Date(nodeData.confirmed),
    discharged: new Date(nodeData.discharged),
    hospital: nodeData.hospital,
  };
});

fs.writeFileSync(
  './parser/results/github_node_data.json',
  JSON.stringify(nodes, null, 4),
);
