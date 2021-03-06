// Source: https://infographics.channelnewsasia.com/covid-19/coronavirus-singapore-clusters.html
const fs = require('fs');
const covidTreeCNA = require('./data/covid_tree_cna.json');
const nodeData = require('./results/github_node_data.json');

const rootNode = { id: 1, name: 'Confirmed Cases' };
const nodes = [rootNode];
const links = [];

const genderMap = {
  'BABY SON': 'MALE',
  'BANGLADESHI MALE': 'MALE',
  FEMALE: 'FEMALE',
  'FEMALE TODDLER': 'FEMALE',
  HUSBAND: 'MALE',
  MALE: 'MALE',
  'MALE TODDLER': 'MALE',
  'PRIVATE-HIRE DRIVER': 'MALE',
  'SAF SERVICEMAN': 'MALE',
};

// Logic:
// for every thing, must add to nodes
// for every children under a node, must add link to the node
// if it has case prop, then add gender

const traverse = (parent, child) => {
  let currentNode = { ...child, id: nodes.length + 1 };
  if (currentNode.gp == null) {
    if (currentNode.children[0].gp != null) {
      currentNode.gp = currentNode.children[0].gp;
    }
  }
  if (currentNode.case != null) {
    // ?, GENDER, AGE
    const nameData = currentNode.name.split(',').map(str => str.trim());
    currentNode.case = Number(currentNode.case);
    currentNode.age = Number(nameData[nameData.length - 1]);
    const genderDesc = (nameData[nameData.length - 2] || '').toUpperCase();
    currentNode.gender = genderMap[genderDesc];
    // Add additional info from github node data
    const dataEl = nodeData[currentNode.case - 1];
    currentNode = { ...currentNode, ...dataEl };
  }
  if (currentNode.gp != null) {
    currentNode.gp = Number(currentNode.gp);
  }
  if (currentNode.cluster != null) {
    currentNode.name += currentNode.cluster;
    delete currentNode.cluster;
  }
  if (parent != null) {
    links.push({
      id: links.length + 1,
      source: parent.id,
      target: currentNode.id,
    });
  }
  nodes.push(currentNode);
  if (Array.isArray(currentNode.children)) {
    currentNode.children.forEach(nextChild => traverse(currentNode, nextChild));
  }
  delete currentNode.children;
  delete currentNode.info;
  delete currentNode.new;
  delete currentNode.type;
  delete currentNode.cny;
  delete currentNode.noclick;
  delete currentNode.url;
};

covidTreeCNA.forEach(cluster => {
  traverse(rootNode, cluster);
});

const parsedGraph = JSON.stringify({ nodes, links }, null, 4);

fs.writeFileSync('./parser/results/covid_graph.json', parsedGraph);
fs.writeFileSync('./src/data/graphs/covid_19_sg.json', parsedGraph);
