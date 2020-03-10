const fs = require('fs');
const covidTreeCNA = require('./covid_tree_cna.json');

const rootNode = { id: 1, name: 'Confirmed Cases' };
const nodes = [rootNode];
const links = [];

// Logic:
// for every thing, must add to nodes
// for every children under a node, must add link to the node
// if it has case prop, then add gender

const traverse = (parent, child) => {
  const currentNode = { ...child, id: nodes.length + 1 };
  if (currentNode.case != null) {
    // ?, GENDER, AGE
    const nameData = currentNode.name.split(',').map(str => str.trim());
    currentNode.case = Number(currentNode.case);
    currentNode.age = Number(nameData[nameData.length - 1]);
    currentNode.gender = nameData[nameData.length - 2].toUpperCase();
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

fs.writeFileSync('./covid_graph.json', parsedGraph);
