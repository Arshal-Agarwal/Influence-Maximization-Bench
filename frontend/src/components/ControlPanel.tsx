import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const graphs = [
  { value: 1, label: "Sparse" },
  { value: 2, label: "Dense" },
  { value: 3, label: "Scale Free" },
  { value: 4, label: "Random" },
];

const models = [
  { value: "ic", label: "Independent Cascade (IC)" },
  { value: "lt", label: "Linear Threshold (LT)" },
];

const modes = [
  { value: "general", label: "General Info" },
  { value: "compare", label: "Compare All Algorithms" },
  { value: "run", label: "Run an Algorithm" },
  { value: "details", label: "Computation Details" },
];

const algorithmsIC = [
  { value: "bruteforce", label: "Brute Force" },
  { value: "greedy", label: "Greedy" },
  { value: "greedy_dp", label: "Greedy (DP Optimized)" },
  { value: "heuristic", label: "Heuristic" },
  { value: "degree_discount", label: "Degree Discount" },
];

const algorithmsLT = [
  { value: "bruteforce", label: "Brute Force" },
  { value: "naive_greedy", label: "Naive Greedy" },
  { value: "greedy_storage", label: "Greedy with Storage" },
  { value: "local_dag", label: "Local DAG" },
];


interface ControlPanelProps {
  onRun: (config: {
    graph: number;
    model: string;
    mode: string;
    algorithm: string;
    seedSize: number;
    iterations: number;
  }) => void;
}

export function ControlPanel({ onRun }: ControlPanelProps) {
  const [graph, setGraph] = useState<number>(1);
  const [model, setModel] = useState("ic");
  const [mode, setMode] = useState("general");
  const [algorithm, setAlgorithm] = useState("greedy");
  const [seedSize, setSeedSize] = useState(10);
  const [iterations, setIterations] = useState(300);

  const algorithms = model === "ic" ? algorithmsIC : algorithmsLT;

  const handleRun = () => {
    onRun({ graph, model, mode, algorithm, seedSize, iterations });
  };

  return (
    <aside className="w-80 border-r border-border bg-surface-elevated p-6 flex flex-col gap-6 overflow-y-auto">
      {/* Graph Selection */}
      <section className="space-y-3">
        <Label className="text-caption uppercase text-muted-foreground">Select Graph</Label>

        <Select value={String(graph)} onValueChange={(v) => setGraph(Number(v))}>
          <SelectTrigger className="bg-background w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {graphs.map((g) => (
              <SelectItem key={g.value} value={String(g.value)}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Model Selection */}
      <section className="space-y-3">
        <Label className="text-caption uppercase text-muted-foreground">Select Model</Label>
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {models.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Mode */}
      <section className="space-y-3">
        <Label className="text-caption uppercase text-muted-foreground">Select Mode</Label>
        <RadioGroup value={mode} onValueChange={setMode}>
          {modes.map((m) => (
            <div key={m.value} className="flex items-center gap-2">
              <RadioGroupItem id={m.value} value={m.value} />
              <Label htmlFor={m.value}>{m.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </section>

      {/* Algorithm (only in run mode) */}
      {mode === "run" && (
        <section className="space-y-3">
          <Label className="text-caption uppercase text-muted-foreground">Algorithm</Label>

          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((a) => (
                <SelectItem key={a.value} value={a.value}>
                  {a.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>
      )}

      {/* Parameters */}
      <section className="space-y-4">
        <Label className="text-caption uppercase text-muted-foreground">Parameters</Label>

        <div className="space-y-2">
          <div>
            <Label htmlFor="seedSize">Seed size (k)</Label>
            <Input
              id="seedSize"
              type="number"
              value={seedSize}
              onChange={(e) => setSeedSize(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="iterations">Iterations (R)</Label>
            <Input
              id="iterations"
              type="number"
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
            />
          </div>
        </div>
      </section>

      <Button onClick={handleRun} className="mt-auto w-full">
        <Play className="h-4 w-4" />
        Run
      </Button>
    </aside>
  );
}
