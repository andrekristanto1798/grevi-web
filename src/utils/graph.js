import { mapToThreeDecimals } from './objects';

const createGraph = require('ngraph.graph');
const centrality = require('ngraph.centrality');
const createWhisper = require('ngraph.cw');
const pagerank = require('ngraph.pagerank');

export const getRandomPosition = () => ({
  x: Math.floor(Math.random() * 500),
  y: Math.floor(Math.random() * 500),
});

export const randomString = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

export const isIdExisted = (list, id) =>
  list.filter(obj => obj.id === id).length > 0;

// next Id will be always a string
const getNextId = list => {
  if (list.length === 0) {
    return '1';
  }
  // Get the last element and get the next ID
  const lastId = Math.max(...list.map(obj => obj.id));
  let nextId = Number.parseInt(lastId, 10) + 1;
  if (Number.isNaN(lastId)) {
    nextId = randomString();
    while (isIdExisted(list, nextId)) {
      nextId = randomString();
    }
  }
  return `${nextId}`;
};

export const getNewNode = currentNodeList => {
  return { id: getNextId(currentNodeList) };
};

export const getNewLink = (linkList, source, target) => {
  return { id: getNextId(linkList), source, target };
};

export const isLinkDuplicate = (links, sourceId, targetId) => {
  const duplicatedLinks = links.filter(
    link =>
      (link.source.id === sourceId && link.target.id === targetId) ||
      (link.target.id === sourceId && link.source.id === targetId),
  );
  return duplicatedLinks.length > 0;
};

export const editLinksWithNewNode = (links, prevNodeId, newNodeId) => {
  if (prevNodeId === newNodeId) return links;
  const newLinks = links.map(link => {
    const newLink = { ...link };
    if (link.source.id === prevNodeId) newLink.source.id = newNodeId;
    if (link.target.id === prevNodeId) newLink.target.id = newNodeId;
    return newLink;
  });
  return newLinks;
};

export const removeLinksWithNode = (links, nodeId) => {
  const newLinks = links.filter(
    link => !(link.source.id === nodeId || link.target.id === nodeId),
  );
  return newLinks;
};

export const constructGraph = (nodes, links) => {
  const graph = createGraph();
  nodes.forEach(node => graph.addNode(node.id));
  links.forEach(link => graph.addLink(link.source.id, link.target.id));
  return graph;
};

export const getNodeIdDegreeMap = (nodes, links) => {
  const graph = constructGraph(nodes, links);
  return centrality.degree(graph);
};

export const getNodeIdBetweennessMap = (nodes, links) => {
  const graph = constructGraph(nodes, links);
  return mapToThreeDecimals(centrality.betweenness(graph));
};

export const getNodeIdClosenessMap = (nodes, links) => {
  const graph = constructGraph(nodes, links);
  return mapToThreeDecimals(centrality.closeness(graph));
};

export const getNodeIdClusterMap = (nodes, links, count) => {
  const graph = constructGraph(nodes, links);
  const whisper = createWhisper(graph);
  for (let i = 0; i < count; i += 1) {
    whisper.step();
  }
  const nodeMap = {};
  let idx = 1;
  whisper.forEachCluster(cluster => {
    if (cluster == null) return;
    const clusterName = `Cluster ${idx}`;
    cluster.nodes.forEach(nodeId => {
      nodeMap[nodeId] = clusterName;
    });
    idx += 1;
  });
  return nodeMap;
};

export const getNodeIdPageRankMap = (nodes, links) => {
  const graph = constructGraph(nodes, links);
  return mapToThreeDecimals(pagerank(graph));
};
