import { useState } from "react";
import { Play, ChevronDown } from "lucide-react";
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
  { value: "sparse", label: "Sparse Graph" },
  { value: "dense", label: "Dense Graph" },
  { value: "scale-free", label: "Scale-Free Graph" },
  { value: "random", label: "Random Graph" },
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
  { value: "greedy", label: "Greedy" },
  { value: "celf", label: "CELF" },
  { value: "celf++", label: "CELF++" },
  { value: "degree", label: "Degree Heuristic" },
  { value: "random", label: "Random Selection" },
];

const algorithmsLT = [
  { value: "greedy", label: "Greedy" },
  { value: "celf", label: "CELF" },
  { value: "degree", label: "Degree Heuristic" },
  { value: "pagerank", label: "PageRank" },
];

interface ControlPanelProps {
  onRun: (config: {
    graph: string;
    model: string;
    mode: string;
    algorithm: string;
    seedSize: number;
    iterations: number;
  }) => void;
}

export function ControlPanel({ onRun }: ControlPanelProps) {
  const [graph, setGraph] = useState("sparse");
  const [model, setModel] = useState("ic");
  const [mode, setMode] = useState("general");
  const [algorithm, setAlgorithm] = useState("greedy");
  const [seedSize, setSeedSize] = useState(10);
  const [iterations, setIterations] = useState(1000);

  const algorithms = model === "ic" ? algorithmsIC : algorithmsLT;

  const handleRun = () => {
    onRun({ graph, model, mode, algorithm, seedSize, iterations });
  };

  return (
    <aside className="w-80 border-r border-border bg-surface-elevated p-6 flex flex-col gap-6 overflow-y-auto">
      {/* Graph Selection */}
      <section className="space-y-3">
        <Label className="text-caption uppercase tracking-wider text-muted-foreground font-medium">
          Select Graph
        </Label>
        <Select value={graph} onValueChange={setGraph}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {graphs.map((g) => (
              <SelectItem key={g.value} value={g.value}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Model Selection */}
      <section className="space-y-3">
        <Label className="text-caption uppercase tracking-wider text-muted-foreground font-medium">
          Select Model
        </Label>
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="w-full bg-background">
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

      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-caption uppercase tracking-wider text-muted-foreground font-medium">
          Select Mode
        </Label>
        <RadioGroup value={mode} onValueChange={setMode} className="space-y-2">
          {modes.map((m) => (
            <div key={m.value} className="flex items-center space-x-3">
              <RadioGroupItem value={m.value} id={m.value} />
              <Label
                htmlFor={m.value}
                className="text-body text-foreground cursor-pointer font-normal"
              >
                {m.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>

      {/* Algorithm Selection - Only visible in "run" mode */}
      {mode === "run" && (
        <section className="space-y-3 animate-fade-in">
          <Label className="text-caption uppercase tracking-wider text-muted-foreground font-medium">
            Algorithm
          </Label>
          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger className="w-full bg-background">
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
        <Label className="text-caption uppercase tracking-wider text-muted-foreground font-medium">
          Parameters
        </Label>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="seedSize" className="text-body text-foreground">
              Seed size (k)
            </Label>
            <Input
              id="seedSize"
              type="number"
              value={seedSize}
              onChange={(e) => setSeedSize(Number(e.target.value))}
              min={1}
              max={100}
              className="bg-background"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="iterations" className="text-body text-foreground">
              Monte Carlo iterations (R)
            </Label>
            <Input
              id="iterations"
              type="number"
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
              min={100}
              max={10000}
              step={100}
              className="bg-background"
            />
          </div>
        </div>
      </section>

      {/* Run Button */}
      <Button
        onClick={handleRun}
        className="w-full mt-auto gap-2"
        size="lg"
      >
        <Play className="h-4 w-4" />
        Run
      </Button>

      <p className="text-caption text-muted-foreground text-center">
        Backend will compute influence spread and metrics.
      </p>
    </aside>
  );
}
