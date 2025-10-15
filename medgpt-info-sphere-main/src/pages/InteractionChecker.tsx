
import { InteractionCheckerTool } from "@/components/interactions/InteractionChecker";

const InteractionChecker = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Medication Interaction Checker</h1>
        <p className="text-muted-foreground">
          Check for potential interactions between your medications to ensure safe use
        </p>
      </div>
      
      <InteractionCheckerTool />
    </div>
  );
};

export default InteractionChecker;
