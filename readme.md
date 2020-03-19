# GREVI - Graph Editing and Visualization

GREVI is a web-based graph application for editing, visualization, and analysis purposes which is free to use and open-sourced.

GREVI is built on top of ReactJS, ReduxJS, Semantic UI, and React Force Graph.

## Features:

- Colouring by property

- Adjusting radius by property

- Data laboratory

- Graph orientation layout

- Interactive mouse interactions (hover, highlight, click)

- User friendly GUI

- Export and Load in JSON format

- Extract subgraph

- Analysis using graph algorithms

  MST, Shortest Path, Centrality, Clustering, PageRank

## Static Dataset

1. COVID-19 Singapore

This directed network contains the confirmed cases and clusters of COVID-19 in Singapore. A node represents either a confirmed case or a cluster which affects multiple other nodes. An edge from node A to node B shows that the virus contracted from node A to node B.

2. Les Miserables

This undirected network contains co-occurrences of characters in Victor Hugo's novel 'Les Misérables'. A node represents a character and an edge between two nodes shows that these two characters appeared in the same chapter of the book. The weight of each link indicates how often such a co-appearance occurred.

3. Word Adjacencies

This is the undirected network of common noun and adjective adjacencies for the novel "David Copperfield" by English 19th century writer Charles Dickens. A node represents either a noun or an adjective. An edge connects two words that occur in adjacent positions.

4. Chicago

This is the road transportation network of the Chicago region (USA). Nodes are transport nodes, and edges are connections.
44

5. D3 Dependencies

A directed structural graph network containing all the libraries in D3. A node represents the library and an edge from node A to node B means that node A contains the node B.

## Data Format

<pre>
JSON => { nodes: Node[], links: Link[] }
Node
- id: Integer || String
- [key]: value
Link:
- id: Integer || String
- source: Integer || String (= node's id)
- target: Integer || String (= node's id)
- [key]: value
</pre>

## Project structure

```
src/
├── actions             # Redux action creators
├── components          # React reusable components
├── data                # Static data
├── reducers            # Redux reducers
├── routes              # Main app routes
├── selectors           # Redux selectors
├── store               # Redux store
├── templates           # HTML template
└── utils               # Common utility
```

## Installation

```bash
https://github.com/andrekristanto1798/grevi-web
cd grevi-web
yarn install
yarn start
```

## Build

```bash
yarn build
```

## Deployment

```bash
yarn deploy # Deploying to github pages
```

## Webpack Configuration

`webpack/paths.js` and modify the source and file names based on your need.

- `webpack/webpack.common.js` config common webpack for both dev and production environments.
- webpack/webpack.dev.js config webpack for dev environment.
- `webpack/webpack.prod.js` config webpack for production environment.
- `/webpack.config.js` main webpack config that merge common and webpack environment based config.
