import { useState } from "react";
import {
  Users,
  TrendingUp,
  Clock,
  Cpu,
  Network,
  BarChart3,
  Zap,
} from "lucide-react";
import { ResultCard } from "./ResultCard";
import { ComparisonTable } from "./ComparisonTable";
import { GeneralInfo } from "./GeneralInfo";
import { ComputationDetails } from "./ComputationDetails";

interface ResultsPanelProps {
  mode: string;
  config: {
    graph: string;
    model: string;
    algorithm: string;
    seedSize: number;
    iterations: number;
  };
  hasRun: boolean;
}

export function ResultsPanel({ mode, config, hasRun }: ResultsPanelProps) {
  if (mode === "general") {
    return (
      <main className="flex-1 p-8 overflow-y-auto bg-surface">
        <GeneralInfo />
      </main>
    );
  }

  if (mode === "compare") {
    return (
      <main className="flex-1 p-8 overflow-y-auto bg-surface">
        <div className="space-y-6">
          <div>
            <h2 className="text-title text-foreground mb-2">Algorithm Comparison</h2>
            <p className="text-body text-muted-foreground">
              Compare time complexity, space complexity, and characteristics of different
              influence maximization algorithms.
            </p>
          </div>
          <ComparisonTable />
        </div>
      </main>
    );
  }

  if (mode === "details") {
    return (
      <main className="flex-1 p-8 overflow-y-auto bg-surface">
        <ComputationDetails config={config} />
      </main>
    );
  }

  // Run mode - show results
  if (!hasRun) {
    return (
      <main className="flex-1 p-8 overflow-y-auto bg-surface flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Zap className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-heading text-foreground">Ready to Run</h2>
          <p className="text-body text-muted-foreground">
            Configure your parameters in the left panel and click "Run" to execute
            the influence maximization algorithm.
          </p>
        </div>
      </main>
    );
  }

  // Mock results data
  const results = {
    seedSet: "[247, 89, 512, 156, 723, 341, 892, 67, 445, 628]",
    spread: "168.4",
    runtime: "2.34s",
    operations: "1.02M",
    nodes: "1,024",
    edges: "4,096",
    variance: "±3.2",
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-surface">
      <div className="space-y-6">
        <div>
          <h2 className="text-title text-foreground mb-2">Results</h2>
          <p className="text-body text-muted-foreground">
            {config.algorithm.charAt(0).toUpperCase() + config.algorithm.slice(1)} algorithm
            on {config.graph} graph using {config.model.toUpperCase()} model
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <ResultCard
            title="Seed Set"
            value={`${config.seedSize} nodes`}
            subtitle={results.seedSet}
            icon={Users}
            variant="primary"
            delay={0}
          />
          <ResultCard
            title="Expected Spread"
            value={results.spread}
            subtitle={`${results.variance} variance`}
            icon={TrendingUp}
            variant="success"
            delay={50}
          />
          <ResultCard
            title="Runtime"
            value={results.runtime}
            subtitle="Wall clock time"
            icon={Clock}
            delay={100}
          />
          <ResultCard
            title="Primitive Operations"
            value={results.operations}
            subtitle="Total operations"
            icon={Cpu}
            delay={150}
          />
          <ResultCard
            title="Graph Size"
            value={`n = ${results.nodes}`}
            subtitle={`m = ${results.edges}`}
            icon={Network}
            delay={200}
          />
          <ResultCard
            title="Reliability"
            value="High"
            subtitle={`R = ${config.iterations} simulations`}
            icon={BarChart3}
            delay={250}
          />
        </div>

        <div className="rounded-lg border border-border bg-card p-5 space-y-3 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <h3 className="text-label text-foreground">Algorithm Notes</h3>
          <p className="text-body text-muted-foreground leading-relaxed">
            The {config.algorithm} algorithm was executed with {config.iterations} Monte Carlo
            simulations to estimate the expected spread. The submodularity property of the
            influence function guarantees a (1 - 1/e) approximation ratio for the greedy
            approach. Results may vary slightly between runs due to the stochastic nature
            of the diffusion simulation.
          </p>
        </div>
      </div>
    </main>
  );
}
