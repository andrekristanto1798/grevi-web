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

export const getNewLink = (source, target) => {
  return { source, target };
};

export const isLinkDuplicate = (links, source, target) => {
  const duplicatedLinks = links.filter(
    link =>
      (link.source === source && link.target === target) ||
      (link.target === source && link.source === target),
  );
  return duplicatedLinks.length > 0;
};
