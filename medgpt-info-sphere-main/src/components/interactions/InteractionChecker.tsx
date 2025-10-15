
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertCircle, Check, ChevronDown, Info, Pill, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock medication data
const medicationOptions = [
  { id: "123", name: "Lisinopril", type: "ACE Inhibitor" },
  { id: "456", name: "Atorvastatin", type: "Statin" },
  { id: "789", name: "Metformin", type: "Biguanide" },
  { id: "012", name: "Levothyroxine", type: "Hormone" },
  { id: "345", name: "Omeprazole", type: "Proton Pump Inhibitor" },
  { id: "678", name: "Amlodipine", type: "Calcium Channel Blocker" },
  { id: "901", name: "Sertraline", type: "SSRI" },
  { id: "234", name: "Albuterol", type: "Bronchodilator" },
  { id: "567", name: "Gabapentin", type: "Anticonvulsant" },
  { id: "890", name: "Hydrochlorothiazide", type: "Diuretic" },
];

interface MedicationOption {
  id: string;
  name: string;
  type: string;
}

interface SelectedMedication extends MedicationOption {
  listId: string;
}

interface InteractionResult {
  medications: [string, string];
  severity: 'mild' | 'moderate' | 'severe' | 'none';
  description: string;
}

export function InteractionCheckerTool() {
  const [selectedMedications, setSelectedMedications] = useState<SelectedMedication[]>([]);
  const [medicationComboboxOpen, setMedicationComboboxOpen] = useState(false);
  const [interactionResults, setInteractionResults] = useState<InteractionResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const handleAddMedication = (medication: MedicationOption) => {
    // Check if medication already in list
    if (selectedMedications.some(med => med.id === medication.id)) {
      toast.error(`${medication.name} is already in your list`);
      return;
    }
    
    setSelectedMedications([
      ...selectedMedications,
      { ...medication, listId: Math.random().toString(36).substring(2, 9) }
    ]);
    setMedicationComboboxOpen(false);
  };

  const handleRemoveMedication = (listId: string) => {
    setSelectedMedications(selectedMedications.filter(med => med.listId !== listId));
    // Clear results if medications change
    setInteractionResults([]);
  };

  const handleClearAll = () => {
    setSelectedMedications([]);
    setInteractionResults([]);
  };

  const checkInteractions = () => {
    if (selectedMedications.length < 2) {
      toast.error("Please add at least two medications to check interactions");
      return;
    }

    setIsChecking(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate mock interactions - in a real app this would come from the API
      const results: InteractionResult[] = [];
      
      // Check all possible combinations
      for (let i = 0; i < selectedMedications.length; i++) {
        for (let j = i + 1; j < selectedMedications.length; j++) {
          const med1 = selectedMedications[i];
          const med2 = selectedMedications[j];
          
          // Some predefined interactions for demo purposes
          let severity: 'mild' | 'moderate' | 'severe' | 'none' = 'none';
          let description = 'No known interaction between these medications.';
          
          // Lisinopril and Amlodipine - moderate
          if ((med1.id === "123" && med2.id === "678") || (med1.id === "678" && med2.id === "123")) {
            severity = 'moderate';
            description = 'May cause excessive lowering of blood pressure. Monitor blood pressure closely.';
          }
          
          // Omeprazole and Levothyroxine - mild
          if ((med1.id === "345" && med2.id === "012") || (med1.id === "012" && med2.id === "345")) {
            severity = 'mild';
            description = 'Omeprazole may decrease the absorption of Levothyroxine. Take these medications at least 4 hours apart.';
          }
          
          // Sertraline and Metformin - none
          if ((med1.id === "901" && med2.id === "789") || (med1.id === "789" && med2.id === "901")) {
            severity = 'none';
            description = 'No significant interaction is expected between these medications.';
          }
          
          // Sertraline and Gabapentin - severe
          if ((med1.id === "901" && med2.id === "567") || (med1.id === "567" && med2.id === "901")) {
            severity = 'severe';
            description = 'Increased risk of serotonin syndrome. This combination should be avoided or used with extreme caution under medical supervision.';
          }
          
          // Add to results if there's an interaction
          if (severity !== 'none' || Math.random() > 0.7) { // Sometimes show "no interaction" too
            results.push({
              medications: [med1.name, med2.name],
              severity,
              description
            });
          }
        }
      }
      
      setInteractionResults(results);
      setIsChecking(false);
      
      if (results.length === 0) {
        toast.success("No interactions found between the selected medications");
      } else if (results.some(r => r.severity === 'severe')) {
        toast.error("Severe interactions detected! Please review carefully.");
      } else if (results.some(r => r.severity === 'moderate')) {
        toast.warning("Moderate interactions detected. Please review.");
      } else {
        toast.info("Mild interactions may exist. See details below.");
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Medication Interaction Checker</CardTitle>
          <CardDescription>
            Select two or more medications to check for potential interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedMedications.map((medication) => (
                <div 
                  key={medication.listId}
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-sm font-medium bg-background"
                >
                  <Pill className="h-3.5 w-3.5 text-medBlue-500" />
                  <span>{medication.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 text-muted-foreground ml-1"
                    onClick={() => handleRemoveMedication(medication.listId)}
                    aria-label={`Remove ${medication.name}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              <Popover open={medicationComboboxOpen} onOpenChange={setMedicationComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Medication</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start" side="bottom" sideOffset={4}>
                  <Command>
                    <CommandInput placeholder="Search for a medication..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No medication found.</CommandEmpty>
                      <CommandGroup heading="Medications">
                        {medicationOptions.map((medication) => (
                          <CommandItem
                            key={medication.id}
                            onSelect={() => handleAddMedication(medication)}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Pill className="h-4 w-4 text-medBlue-500" />
                            <span>{medication.name}</span>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {medication.type}
                            </span>
                            {selectedMedications.some(med => med.id === medication.id) && (
                              <Check className="h-4 w-4 text-medGreen-500" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            
            {selectedMedications.length > 0 && (
              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-muted-foreground">
                  {selectedMedications.length} medication{selectedMedications.length !== 1 ? 's' : ''} selected
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-muted-foreground"
                  onClick={handleClearAll}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="h-4 w-4 mr-2" />
            <span>Check with your healthcare provider before making any medication changes</span>
          </div>
          <Button 
            onClick={checkInteractions} 
            disabled={selectedMedications.length < 2 || isChecking}
            className="min-w-[160px]"
          >
            {isChecking ? "Checking..." : "Check Interactions"}
          </Button>
        </CardFooter>
      </Card>
      
      {interactionResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Interaction Results</CardTitle>
            <CardDescription>
              {interactionResults.length} potential interaction{interactionResults.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interactionResults.map((result, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "rounded-lg border p-4",
                    result.severity === 'severe' ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20" :
                    result.severity === 'moderate' ? "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20" :
                    result.severity === 'mild' ? "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20" :
                    "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <AlertCircle className={cn(
                      "h-5 w-5 mt-0.5",
                      result.severity === 'severe' ? "text-red-600 dark:text-red-400" :
                      result.severity === 'moderate' ? "text-amber-600 dark:text-amber-400" :
                      result.severity === 'mild' ? "text-yellow-600 dark:text-yellow-400" :
                      "text-green-600 dark:text-green-400"
                    )} />
                    <div className="space-y-1">
                      <div className="font-medium flex items-center flex-wrap">
                        <span className="mr-2">{result.medications[0]} + {result.medications[1]}</span>
                        <span 
                          className={cn(
                            "rounded px-2 py-0.5 text-xs font-medium",
                            result.severity === 'severe' ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300" :
                            result.severity === 'moderate' ? "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300" :
                            result.severity === 'mild' ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300" :
                            "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300"
                          )}
                        >
                          {result.severity === 'none' ? 'No Interaction' : `${result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Interaction`}
                        </span>
                      </div>
                      <p className={cn(
                        "text-sm",
                        result.severity === 'severe' ? "text-red-700 dark:text-red-300" :
                        result.severity === 'moderate' ? "text-amber-700 dark:text-amber-300" :
                        result.severity === 'mild' ? "text-yellow-700 dark:text-yellow-300" :
                        "text-green-700 dark:text-green-300"
                      )}>
                        {result.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground border-t pt-6">
            Always consult with a healthcare professional for medical advice tailored to your specific circumstances.
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
