# About this Project

This is a project that includes interactive visualization that helps identify potential Imperial threats by visualizing the interconnections between characters, locations, and objects of interest, using D3.js to render a map of nodes within an SVG element.
Nodes represent different types of entities, such as "Character", "Location", and "Object", and are arranged in concentric circles. Each node is associated with an icon and has a description that is displayed in a tooltip when hovering over it. Nodes are spatially distributed on the map, and connecting lines between them indicate relationships or connections.

Users can interact with nodes by clicking on them, which highlights the selected node and its connections, dimming the others. Additionally, the component includes a filter that allows users to show or hide nodes based on their entity type, dynamically updating the visualization.

The component uses local state to handle node selections and entity filtering. It also incorporates D3 best practices for creating and manipulating SVG elements, including transitions and effects when interacting with nodes. The modular structure and separation of logic make the component efficient and maintainable.

## Prerequisites

Make sure you have the following prerequisites installed before starting:

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn (version 1.22 or higher)

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## GitHub Repository
```bash
https://github.com/yohatu14/test-interactive-map.git
```

## Live URL
```bash
https://galactic-intelligence-network-yohatu.netlify.app/
```