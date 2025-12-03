import { BookOpen, Target, Lightbulb, TrendingUp } from "lucide-react";

export function GeneralInfo() {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-subtle">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-heading text-foreground">What is Influence Maximization?</h2>
        </div>
        <p className="text-body text-muted-foreground leading-relaxed pl-12">
          Influence Maximization (IM) is a fundamental problem in network analysis that aims to identify 
          a small set of seed nodes in a social network that can maximize the spread of influence. 
          This problem has significant applications in viral marketing, epidemic control, and 
          information dissemination.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-subtle">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-heading text-foreground">Diffusion Models</h2>
        </div>
        <div className="pl-12 space-y-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="text-label text-foreground mb-2">Independent Cascade (IC)</h3>
            <p className="text-body text-muted-foreground">
              Each newly activated node has a single chance to activate each of its inactive neighbors 
              with a probability p. The process continues until no new activations occur.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="text-label text-foreground mb-2">Linear Threshold (LT)</h3>
            <p className="text-body text-muted-foreground">
              A node becomes active when the total weight of its active neighbors exceeds a 
              uniformly random threshold. Each node can be influenced by multiple neighbors over time.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-subtle">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-heading text-foreground">Key Concepts</h2>
        </div>
        <ul className="pl-12 space-y-2">
          <li className="text-body text-muted-foreground flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span><strong className="text-foreground">Seed Set:</strong> The initial set of k nodes chosen to start the diffusion process.</span>
          </li>
          <li className="text-body text-muted-foreground flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span><strong className="text-foreground">Spread:</strong> The expected number of nodes activated by a seed set.</span>
          </li>
          <li className="text-body text-muted-foreground flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span><strong className="text-foreground">Submodularity:</strong> Adding a node yields diminishing returns as the seed set grows.</span>
          </li>
          <li className="text-body text-muted-foreground flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span><strong className="text-foreground">Monte Carlo Simulation:</strong> Estimating spread by averaging over R random cascade samples.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-subtle">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-heading text-foreground">Applications</h2>
        </div>
        <div className="pl-12 grid grid-cols-2 gap-3">
          {[
            "Viral Marketing",
            "Disease Prevention",
            "Rumor Control",
            "Product Adoption",
            "Social Campaigns",
            "Network Security",
          ].map((app) => (
            <div
              key={app}
              className="p-3 rounded-lg bg-muted/50 border border-border text-body text-foreground"
            >
              {app}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
