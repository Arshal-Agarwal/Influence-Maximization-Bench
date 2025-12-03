export interface RunResponse {
  run_id: string;
  seed_set: number[];
  spread: number;
  variance: number;
  runtime: number;       // backend computation time (ms)
  operations: number;
  graph: {
    nodes: number;
    edges: number;
  };

  // ✅ Add this
  localRuntime: number;   // frontend request → response time (ms)

  // graph elements
  elements: {
    nodes: {
      data: {
        id: string;
        label: string;
        degree: number;
        isSeed?: boolean;
        isInfluenced?: boolean;
      };
      position?: { x: number; y: number };
    }[];

    edges: {
      data: {
        source: string;
        target: string;
        weight?: number;
        activated?: boolean;
      };
    }[];
  };
}
