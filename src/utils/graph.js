import get from 'lodash/get';

export const getRandomPosition = () => ({
  x: Math.floor(Math.random() * 500),
  y: Math.floor(Math.random() * 500),
});

export const getNewNode = currentNodeList => {
  if (currentNodeList.length === 0) {
    return { id: 1 };
  }
  // Get the last element and get the next ID
  const lastNodeId = currentNodeList[currentNodeList.length - 1].id;
  const nextId = Number.parseInt(lastNodeId, 10) + 1;
  return { id: `${nextId}` };
};

export const getNewLink = (linkList, source, target) => {
  if (linkList.length === 0) {
    return { id: `1`, source, target };
  }
  const lastNodeId = linkList[linkList.length - 1].id;
  const nextId = Number.parseInt(lastNodeId, 10) + 1;
  return { id: `${nextId}`, source, target };
};

export const isLinkDuplicate = (links, sourceId, targetId) => {
  const duplicatedLinks = links.filter(
    link =>
      (link.source.id === sourceId && link.target.id === targetId) ||
      (link.target.id === sourceId && link.source.id === targetId),
  );
  return duplicatedLinks.length > 0;
};

export const removeLinksWithNode = (links, nodeId) => {
  const newLinks = links.filter(
    link => !(link.source.id === nodeId || link.target.id === nodeId),
  );
  return newLinks;
};

export const getNodeIdDegreeMap = links => {
  const nodeIdDegreeMap = {};
  links.forEach(link => {
    const sourceId = link.source.id;
    const targetId = link.target.id;
    nodeIdDegreeMap[sourceId] = get(nodeIdDegreeMap, sourceId, 0) + 1;
    nodeIdDegreeMap[targetId] = get(nodeIdDegreeMap, targetId, 0) + 1;
  });
  return nodeIdDegreeMap;
};
