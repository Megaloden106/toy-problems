// In a directed graph, we start at some node and every turn, walk along a directed edge of the graph.
// If we reach a node that is terminal (that is, it has no outgoing directed edges), we stop.

// Now, say our starting node is eventually safe if and only if we must eventually walk to a terminal node.
// More specifically, there exists a natural number K so that for any choice of where to walk,
// we must have stopped at a terminal node in less than K steps.

// Which nodes are eventually safe?  Return them as an array in sorted order.

// The directed graph has N nodes with labels 0, 1, ..., N-1, where N is the length of graph.
// The graph is given in the following form: graph[i] is a list of labels j such that (i, j) is a directed edge of the graph.

/**
 * @param {number[][]} graph
 * @return {number[]}
 */
const eventualSafeNodes = (graph) => {
  const result = [];
  const storage = {};
  const isCycle = (node, visited = []) => {
    if (storage[node] !== undefined) return storage[node];
    if (visited[node]) return true;
    let res = false;
    visited[node] = true;
    graph[node].forEach(next => {
      if (isCycle(next, visited)) res = true
    });
    visited[node] = false;
    storage[node] = res;
    return res;
  };
  for (let i = 0; i < graph.length; i++) {
    if (!isCycle(i)) result.push(i);
  }
  return result;
};

let graph = [[1,2],[2,3],[5],[0],[5],[],[]]
console.log(eventualSafeNodes(graph)) // [2,4,5,6]
