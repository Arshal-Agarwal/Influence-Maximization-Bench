import { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  Clock,
  Cpu,
  Network,
  BarChart3,
  Zap,
  AlertTriangle
} from "lucide-react";

import { ResultCard } from "./ResultCard";
import { ComparisonTable } from "./ComparisonTable";
import { GeneralInfo } from "./GeneralInfo";
import { ComputationDetails } from "./ComputationDetails";
import { GraphView } from "./GraphView";

import { runIM } from "@/lib/api";
import type { RunResponse } from "@/types";

interface ResultsPanelProps {
  mode: string;
  config: {
    graph: number;
    model: string;
    algorithm: string;
    seedSize: number;
    iterations: number;
  };
  hasRun: boolean;
}

export function ResultsPanel({ mode, config, hasRun }: ResultsPanelProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RunResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== "run" || !hasRun) return;

    setLoading(true);
    setError(null);

    runIM(config)
      .then((res) => setResult(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [mode, hasRun, config]);

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-surface">
      {/* ------------------------------------------- */}
      {/* STATIC MODES */}
      {/* ------------------------------------------- */}
      {mode === "general" && <GeneralInfo />}
      {mode === "compare" && <ComparisonTable />}
      {mode === "details" && <ComputationDetails config={config} />}

      {/* ------------------------------------------- */}
      {/* RUN MODE — NOT STARTED */}
      {/* ------------------------------------------- */}
      {mode === "run" && !hasRun && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <Zap className="h-12 w-12 mx-auto text-muted-foreground" />
            <h2 className="text-heading">Ready to Run</h2>
            <p className="text-body text-muted-foreground">
              Choose parameters then click Run.
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------- */}
      {/* RUN MODE — LOADING */}
      {/* ------------------------------------------- */}
      {mode === "run" && hasRun && loading && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Cpu className="h-12 w-12 mx-auto animate-spin text-muted-foreground" />
            <p className="text-body text-muted-foreground mt-4">
              Computing...
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------- */}
      {/* RUN MODE — ERROR */}
      {/* ------------------------------------------- */}
      {mode === "run" && hasRun && error && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-3">
            <AlertTriangle className="h-10 w-10 text-warning mx-auto" />
            <p className="text-body text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {/* ------------------------------------------- */}
      {/* RUN MODE — SUCCESS */}
      {/* ------------------------------------------- */}
      {mode === "run" && hasRun && !loading && !error && result && (
        <div className="space-y-10 animate-fade-in">
          {/* HEADER */}
          <div>
            <h2 className="text-title">Results</h2>
            <p className="text-body text-muted-foreground">
              {config.algorithm} on graph {config.graph} (
              {config.model.toUpperCase()})
            </p>
          </div>

          {/* METRIC CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="Seed Set"
              value={`${config.seedSize} nodes`}
              subtitle={result.seed_set?.join(", ") ?? ""}
              icon={Users}
              variant="primary"
            />

            <ResultCard
              title="Spread"
              value={result.spread?.toFixed(2) ?? "—"}
              subtitle={
                result.variance ? `±${result.variance.toFixed(2)}` : ""
              }
              icon={TrendingUp}
              variant="success"
            />

            {/* FIXED RUNTIME DISPLAY */}
            <ResultCard
              title="Runtime"
              value={
                result.runtime !== undefined
                  ? `${result.runtime.toFixed(3)} s`
                  : "—"
              }
              subtitle="Algorithm runtime"
              icon={Clock}
            />

            <ResultCard
              title="Operations"
              value={result.operations ?? "—"}
              subtitle="Primitive operations"
              icon={Cpu}
            />

            <ResultCard
              title="Graph Size"
              value={
                result.graph ? `n=${result.graph.nodes}` : "—"
              }
              subtitle={
                result.graph ? `m=${result.graph.edges}` : ""
              }
              icon={Network}
            />

            <ResultCard
              title="Run ID"
              value={result.run_id ?? "—"}
              subtitle="Job identifier"
              icon={BarChart3}
            />
          </div>

          {/* GRAPH VISUALIZATION */}
          {result.elements && (
            <div className="space-y-2">
              <h3 className="text-label text-foreground">
                Graph Visualization
              </h3>
              <p className="text-caption text-muted-foreground">
                Seed nodes are highlighted. Uninfluenced nodes are
                faded for clarity.
              </p>

              <GraphView elements={result.elements} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
