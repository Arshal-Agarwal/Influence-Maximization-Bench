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
  // If backend provides positions → use them directly (NO layout)
  const hasPositions =
    elements.nodes.length > 0 &&
    elements.nodes[0].position &&
    typeof elements.nodes[0].position.x === "number";

  const layout = hasPositions
    ? { name: "preset" } // use backend layout
    : {
        name: "fcose",
        animate: true,
        animationDuration: 800,
        fit: true,
        padding: 30,
      };

  const stylesheet = [
    // -------------------------------------------------------
    // DEFAULT NODES — SHOULD BE FADED IF NOT SEED/INFLUENCED
    // -------------------------------------------------------
    {
      selector: "node",
      style: {
        "background-color": "#94a3b8", // slate-400
        "opacity": 0.25,               // <-- fade by default
        "width": 12,
        "height": 12,
        "label": "",
      },
    },

    // -------------------------------------------------------
    // SEED NODES — BRIGHT + GLOW
    // -------------------------------------------------------
    {
      selector: "node[isSeed = true]",
      style: {
        "background-color": "#22c55e",
        "opacity": 1,
        "border-width": 4,
        "border-color": "#166534",
        "width": 28,
        "height": 28,
        "label": "data(label)",
        "color": "white",
        "font-size": "10px",
        "text-outline-width": 2,
        "text-outline-color": "#166534",
        "shadow-blur": 25,
        "shadow-color": "rgba(34,197,94,0.45)",
      },
    },

    // -------------------------------------------------------
    // INFLUENCED NODES — MEDIUM HIGHLIGHT + PULSE
    // -------------------------------------------------------
    {
      selector: "node[isInfluenced = true][isSeed != true]",
      style: {
        "background-color": "#eab308",
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
        "line-color": "rgba(148,163,184,0.35)",
        "curve-style": "bezier",
      },
    },

    // -------------------------------------------------------
    // ACTIVATED EDGES (CASCADE)
    // -------------------------------------------------------
    {
      selector: "edge[activated = true]",
      style: {
        "line-color": "#22c55e",
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
