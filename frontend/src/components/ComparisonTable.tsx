import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const algorithmData = [
  {
    name: "Greedy",
    time: "O(knR)",
    space: "O(n + m)",
    reliability: "High",
    efficiency: "Low",
    coreIdea: "Sequential marginal gain maximization",
  },
  {
    name: "CELF",
    time: "O(knR)",
    space: "O(n + m)",
    reliability: "High",
    efficiency: "Medium",
    coreIdea: "Lazy evaluation with submodularity",
  },
  {
    name: "CELF++",
    time: "O(knR)",
    space: "O(n + m)",
    reliability: "High",
    efficiency: "High",
    coreIdea: "Enhanced CELF with look-ahead",
  },
  {
    name: "Degree Heuristic",
    time: "O(n log n)",
    space: "O(n)",
    reliability: "Medium",
    efficiency: "Very High",
    coreIdea: "Select highest degree nodes",
  },
  {
    name: "PageRank",
    time: "O(km)",
    space: "O(n)",
    reliability: "Medium",
    efficiency: "High",
    coreIdea: "Random walk centrality measure",
  },
];

export function ComparisonTable() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="text-caption font-semibold uppercase tracking-wider">
              Algorithm
            </TableHead>
            <TableHead className="text-caption font-semibold uppercase tracking-wider">
              Time
            </TableHead>
            <TableHead className="text-caption font-semibold uppercase tracking-wider">
              Space
            </TableHead>
            <TableHead className="text-caption font-semibold uppercase tracking-wider">
              Reliability
            </TableHead>
            <TableHead className="text-caption font-semibold uppercase tracking-wider">
              Efficiency
            </TableHead>
            <TableHead className="text-caption font-semibold uppercase tracking-wider">
              Core Idea
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {algorithmData.map((algo, index) => (
            <TableRow
              key={algo.name}
              className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
            >
              <TableCell className="font-medium text-body">{algo.name}</TableCell>
              <TableCell className="text-body font-mono text-muted-foreground">
                {algo.time}
              </TableCell>
              <TableCell className="text-body font-mono text-muted-foreground">
                {algo.space}
              </TableCell>
              <TableCell className="text-body">{algo.reliability}</TableCell>
              <TableCell className="text-body">{algo.efficiency}</TableCell>
              <TableCell className="text-body text-muted-foreground">
                {algo.coreIdea}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
