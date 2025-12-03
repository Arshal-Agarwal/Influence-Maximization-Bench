import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

cytoscape.use(fcose);

interface GraphViewProps {
  elements: {
    nodes: any[];
    edges: any[];
  };
}

export function GraphView({ elements }: GraphViewProps) {
  const layout = {
    name: "fcose",
    animate: true,
    animationDuration: 800,
    fit: true,
    padding: 30,
  };

  const stylesheet = [
    {
      selector: "node",
      style: {
        "background-color": "rgba(99,102,241,0.9)",
        "label": "data(label)",
        "font-size": "9px",
        "color": "#e2e8f0",
        "text-outline-width": 1,
        "text-outline-color": "#1e1e2e",
        "width": "mapData(degree, 1, 50, 8, 22)",
        "height": "mapData(degree, 1, 50, 8, 22)",
        "transition-property": "background-color width height",
        "transition-duration": "200ms",
      },
    },

    {
      selector: "node[isSeed = true]",
      style: {
        "background-color": "#22c55e",
        "border-width": 4,
        "border-color": "#166534",
        "shadow-blur": 25,
        "shadow-color": "rgba(34,197,94,0.5)",
      },
    },

    {
      selector: "node[isInfluenced = true]",
      style: {
        "background-color": "#eab308",
        "border-width": 3,
        "border-color": "#854d0e",
        "animation-name": "pulse",
        "animation-duration": "1.2s",
        "animation-iteration-count": "infinite",
        "animation-direction": "alternate",
      },
    },

    {
      selector: "edge",
      style: {
        "width": 1,
        "line-color": "rgba(148,163,184,0.4)",
        "target-arrow-shape": "triangle",
        "target-arrow-color": "rgba(148,163,184,0.4)",
        "curve-style": "bezier",
      },
    },

    {
      selector: "edge[activated = true]",
      style: {
        "line-color": "#22c55e",
        "target-arrow-color": "#22c55e",
        "width": 2.2,
      },
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-3 mt-4">
      <CytoscapeComponent
        elements={[...elements.nodes, ...elements.edges]}
        layout={layout}
        stylesheet={stylesheet}
        style={{ width: "100%", height: "600px", borderRadius: "8px" }}
      />
    </div>
  );
}
