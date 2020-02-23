import { mapToThreeDecimals, normalizeObjectId } from './objects';

const createGraph = require('ngraph.graph');
const centrality = require('ngraph.centrality');
const createWhisper = require('ngraph.cw');
const pagerank = require('ngraph.pagerank');
const kruskal = require('ngraph.kruskal');
const shortestPath = require('ngraph.path');

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

export const getLinkSource = link => normalizeObjectId(link, 'source');
export const getLinkTarget = link => normalizeObjectId(link, 'target');

export const getNewNode = currentNodeList => {
  return { id: getNextId(currentNodeList) };
};

export const getNewLink = (linkList, source, target) => {
  return { id: getNextId(linkList), source, target };
};

export const isLinkDuplicate = (links, sourceId, targetId) => {
  const duplicatedLinks = links.filter(
    link =>
      (getLinkSource(link) === sourceId && getLinkSource(link) === targetId) ||
      (getLinkTarget(link) === sourceId && getLinkTarget(link) === targetId),
  );

  return duplicatedLinks.length > 0;
};

export const editLinksWithNewNode = (links, prevNodeId, newNodeId) => {
  if (prevNodeId === newNodeId) return links;
  const newLinks = links.map(link => {
    const newLink = { ...link };
    if (getLinkSource(link) === prevNodeId) newLink.source.id = newNodeId;
    if (getLinkTarget(link) === prevNodeId) newLink.target.id = newNodeId;
    return newLink;
  });
  return newLinks;
};

export const removeLinksWithNode = (links, nodeId) => {
  const newLinks = links.filter(
    link => !(getLinkSource(link) === nodeId || getLinkTarget(link) === nodeId),
  );
  return newLinks;
};

export const constructGraph = (nodes, links) => {
  const graph = createGraph();
  nodes.forEach(node => graph.addNode(node.id));
  links.forEach(link => {
    const sourceId = getLinkSource(link);
    const targetId = getLinkTarget(link);
    graph.addLink(sourceId, targetId, link.id);
  });
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

export const getMstGraph = (nodes, links, weightFn) => {
  const graph = constructGraph(nodes, links);
  const mstPath = kruskal(graph, weightFn);
  const linkMap = links.reduce((acc, link) => {
    const sourceId = getLinkSource(link);
    const targetId = getLinkTarget(link);
    const key = `${sourceId}-${targetId}`;
    return { ...acc, [key]: link };
  }, {});
  const newLinks = [];
  mstPath.forEach(path => {
    const correspondingLink = linkMap[`${path.fromId}-${path.toId}`];
    newLinks.push(correspondingLink);
  });
  return { nodes, links: newLinks };
};

export const getShortestPathGraph = (
  nodes,
  links,
  fromNode,
  toNode,
  weightFn,
) => {
  const graph = constructGraph(nodes, links);
  const pathFinder = shortestPath.aStar(graph, {
    distance: (f, t, link) => weightFn(link),
  });
  const nodePaths = pathFinder.find(fromNode, toNode);
  const newNodesId = nodePaths.map(node => node.id);
  const newLinksId = [];
  nodePaths.forEach((node, idx) => {
    if (idx + 1 === nodePaths.length) return;
    const fromId = node.id;
    const toId = nodePaths[idx + 1].id;
    const linkId = node.links.find(
      link =>
        (link.fromId === fromId && link.toId === toId) ||
        (link.fromId === toId && link.toId === fromId),
    ).data;
    newLinksId.push(linkId);
  });
  return {
    nodes: nodes.filter(node => newNodesId.includes(node.id)),
    links: links.filter(link => newLinksId.includes(link.id)),
  };
};

export const extractSubgraph = (nodes, links, nodeId, numberOfHops) => {
  const graph = constructGraph(nodes, links);
  if (!graph.hasNode(nodeId))
    throw new Error(`Error: nodeId (${nodeId}) does not exist`);
  const newNodesId = new Set([nodeId]);
  const newLinksId = new Set();
  function dfsWithHop(startingNode, hop, maxNumberOfHops) {
    if (hop < maxNumberOfHops) {
      graph.forEachLinkedNode(startingNode, (node, link) => {
        newNodesId.add(node.id);
        newLinksId.add(link.data);
        dfsWithHop(node.id, hop + 1, maxNumberOfHops);
      });
    }
  }
  dfsWithHop(nodeId, 0, numberOfHops);
  return {
    nodes: nodes.filter(node => newNodesId.has(node.id)),
    links: links.filter(link => newLinksId.has(link.id)),
  };
};
