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

  const hasPositions =
    elements.nodes.length > 0 &&
    elements.nodes[0].position &&
    typeof elements.nodes[0].position.x === "number";

  const layout = hasPositions
    ? { name: "preset" }
    : {
        name: "fcose",
        animate: true,
        animationDuration: 800,
        fit: true,
        padding: 30,
      };

  const stylesheet = [
    // -------------------------------------------------------
    // DEFAULT NODES (BACKGROUND)
    // -------------------------------------------------------
    {
      selector: "node",
      style: {
        "background-color": "#64748b", // slate gray
        "opacity": 0.25,
        "width": 10,
        "height": 10,
        "label": "",
        "z-index-compare": "manual",
        "z-index": 0, // BEHIND EVERYTHING
      },
    },

    // -------------------------------------------------------
    // SEED NODES (BLUE + HIGHEST PRIORITY)
    // -------------------------------------------------------
    {
      selector: "node[isSeed = true]",
      style: {
        "background-color": "#880808", // BLUE
        "opacity": 1,
        "border-width": 4,
        "border-color": "#1e40af",
        "width": 28,
        "height": 28,
        "label": "data(label)",
        "color": "white",
        "font-size": "10px",
        "text-outline-width": 2,
        "text-outline-color": "#1e40af",
        "shadow-blur": 25,
        "shadow-color": "rgba(59,130,246,0.45)",
        "z-index-compare": "manual",
        "z-index": 999, // ALWAYS ON TOP
      },
    },

    // -------------------------------------------------------
    // INFLUENCED NODES (YELLOW)
    // -------------------------------------------------------
    {
      selector: "node[isInfluenced = true][isSeed != true]",
      style: {
        "background-color": "#eab308", // YELLOW
        "opacity": 0.9,
        "border-width": 3,
        "border-color": "#854d0e",
        "width": 20,
        "height": 20,
        "label": "data(label)",
        "font-size": "9px",
        "animation-name": "pulse",
        "animation-duration": "1.2s",
        "animation-iteration-count": "infinite",
        "animation-direction": "alternate",
        "z-index-compare": "manual",
        "z-index": 500, // BELOW SEED, ABOVE NORMAL
      },
    },

    // -------------------------------------------------------
    // DEFAULT EDGES
    // -------------------------------------------------------
    {
      selector: "edge",
      style: {
        "width": 1,
        "opacity": 0.2,
        "line-color": "rgba(148,163,184,0.3)",
        "curve-style": "bezier",
      },
    },

    // -------------------------------------------------------
    // ACTIVATED EDGES (CASCADE)
    // -------------------------------------------------------
    {
      selector: "edge[activated = true]",
      style: {
        "line-color": "#3b82f6", // match seed blue
        "width": 2,
        "opacity": 1,
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
