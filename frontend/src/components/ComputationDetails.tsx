import { Terminal, Cpu, Clock, Database } from "lucide-react";

interface ComputationDetailsProps {
  config: {
    graph: number;
    model: string;
    algorithm: string;
    seedSize: number;
    iterations: number;
  };
}

export function ComputationDetails({ config }: ComputationDetailsProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent-subtle">
          <Terminal className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-heading text-foreground">Computation Details</h2>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="text-label text-foreground">Execution Log</h3>
        </div>
        <div className="p-4 font-mono text-caption space-y-2 bg-background">
          <p className="text-muted-foreground">
            <span className="text-primary">[INFO]</span> Loading {config.graph} graph...
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">[INFO]</span> Graph loaded: 1,024 nodes, 4,096 edges
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">[INFO]</span> Initializing {config.model.toUpperCase()} model
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">[INFO]</span> Running {config.algorithm} with k={config.seedSize}, R={config.iterations}
          </p>
          <p className="text-muted-foreground">
            <span className="text-success">[SUCCESS]</span> Computation completed in 2.34s
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="h-4 w-4" />
            <span className="text-caption uppercase tracking-wider">Operations</span>
          </div>
          <p className="text-title text-foreground">1.02M</p>
          <p className="text-caption text-muted-foreground">Primitive ops</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-caption uppercase tracking-wider">Runtime</span>
          </div>
          <p className="text-title text-foreground">2.34s</p>
          <p className="text-caption text-muted-foreground">Wall clock time</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Database className="h-4 w-4" />
            <span className="text-caption uppercase tracking-wider">Memory</span>
          </div>
          <p className="text-title text-foreground">12.4MB</p>
          <p className="text-caption text-muted-foreground">Peak usage</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="text-label text-foreground">Algorithm Trace</h3>
        <div className="space-y-2 font-mono text-caption">
          <div className="flex justify-between text-muted-foreground">
            <span>Iteration 1: Selected node 247</span>
            <span className="text-foreground">Δ spread: +45.2</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Iteration 2: Selected node 89</span>
            <span className="text-foreground">Δ spread: +38.7</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Iteration 3: Selected node 512</span>
            <span className="text-foreground">Δ spread: +31.4</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Iteration 4: Selected node 156</span>
            <span className="text-foreground">Δ spread: +28.1</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Iteration 5: Selected node 723</span>
            <span className="text-foreground">Δ spread: +24.6</span>
          </div>
          <p className="text-muted-foreground pt-2 border-t border-border">
            ... {config.seedSize - 5} more iterations
          </p>
        </div>
      </div>
    </div>
  );
}
