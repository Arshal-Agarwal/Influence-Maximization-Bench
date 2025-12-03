import { useState } from "react";
import { Header } from "@/components/Header";
import { ControlPanel } from "@/components/ControlPanel";
import { ResultsPanel } from "@/components/ResultsPanel";

const Index = () => {
  const [mode, setMode] = useState("general");
  const [hasRun, setHasRun] = useState(false);
  const [config, setConfig] = useState({
    graph: "sparse",
    model: "ic",
    algorithm: "greedy",
    seedSize: 10,
    iterations: 1000,
  });

  const handleRun = (newConfig: typeof config & { mode: string }) => {
    setConfig({
      graph: newConfig.graph,
      model: newConfig.model,
      algorithm: newConfig.algorithm,
      seedSize: newConfig.seedSize,
      iterations: newConfig.iterations,
    });
    setMode(newConfig.mode);
    if (newConfig.mode === "run") {
      setHasRun(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ControlPanel onRun={handleRun} />
        <ResultsPanel mode={mode} config={config} hasRun={hasRun} />
      </div>
    </div>
  );
};

export default Index;
