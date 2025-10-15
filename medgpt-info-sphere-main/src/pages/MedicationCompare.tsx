
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronDown, Pill, Plus, Trash2 } from "lucide-react";
import { MedicationComparison } from "@/components/medications/MedicationComparison";
import { toast } from "sonner";

// Mock data
const medicationOptions = [
  { id: "123", name: "Lisinopril", type: "ACE Inhibitor" },
  { id: "456", name: "Atorvastatin", type: "Statin" },
  { id: "789", name: "Metformin", type: "Biguanide" },
  { id: "012", name: "Levothyroxine", type: "Hormone" },
  { id: "345", name: "Omeprazole", type: "Proton Pump Inhibitor" },
  { id: "678", name: "Amlodipine", type: "Calcium Channel Blocker" },
  { id: "901", name: "Sertraline", type: "SSRI" },
];

const mockComparisonData = [
  {
    id: "123",
    name: "Lisinopril",
    genericName: "Lisinopril",
    drugClass: "ACE Inhibitor",
    ingredients: ["Lisinopril (active)", "Calcium phosphate", "Mannitol"],
    effectiveness: "high" as const,
    sideEffects: {
      severity: "moderate" as const,
      common: ["Dry cough", "Dizziness", "Headache"]
    },
    interactions: 12,
    cost: "low" as const,
    administrationRoute: "Oral",
    prescriptionRequired: true
  },
  {
    id: "678",
    name: "Amlodipine",
    genericName: "Amlodipine Besylate",
    drugClass: "Calcium Channel Blocker",
    ingredients: ["Amlodipine besylate (active)", "Microcrystalline cellulose", "Magnesium stearate"],
    effectiveness: "high" as const,
    sideEffects: {
      severity: "mild" as const,
      common: ["Swelling of ankles", "Flushing", "Mild dizziness"]
    },
    interactions: 7,
    cost: "low" as const,
    administrationRoute: "Oral",
    prescriptionRequired: true
  },
  {
    id: "456",
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    drugClass: "Statin",
    ingredients: ["Atorvastatin calcium (active)", "Calcium carbonate", "Lactose monohydrate"],
    effectiveness: "high" as const,
    sideEffects: {
      severity: "moderate" as const,
      common: ["Muscle pain", "Joint pain", "Digestive issues"]
    },
    interactions: 15,
    cost: "medium" as const,
    administrationRoute: "Oral",
    prescriptionRequired: true
  }
];

interface MedicationOption {
  id: string;
  name: string;
  type: string;
}

const MedicationCompare = () => {
  const [medicationComboboxOpen, setMedicationComboboxOpen] = useState(false);
  const [selectedMedicationIds, setSelectedMedicationIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("common");
  
  const handleAddMedication = (medication: MedicationOption) => {
    if (selectedMedicationIds.includes(medication.id)) {
      toast.error(`${medication.name} is already in your comparison`);
      return;
    }
    
    if (selectedMedicationIds.length >= 3) {
      toast.error("You can only compare up to 3 medications at once");
      return;
    }
    
    setSelectedMedicationIds([...selectedMedicationIds, medication.id]);
    setMedicationComboboxOpen(false);
  };
  
  const handleRemoveMedication = (id: string) => {
    setSelectedMedicationIds(selectedMedicationIds.filter(medId => medId !== id));
  };
  
  const handleClearAll = () => {
    setSelectedMedicationIds([]);
  };
  
  // Filter data for medications selected for comparison
  const comparisonData = mockComparisonData.filter(med => 
    selectedMedicationIds.includes(med.id)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Medication Comparison Tool</h1>
        <p className="text-muted-foreground">
          Compare medications side-by-side to better understand their differences and similarities
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Medications to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedMedicationIds.map(id => {
                const medication = medicationOptions.find(m => m.id === id);
                if (!medication) return null;
                
                return (
                  <div
                    key={medication.id}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium bg-background"
                  >
                    <Pill className="h-4 w-4 text-medBlue-500" />
                    <span>{medication.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 text-muted-foreground"
                      onClick={() => handleRemoveMedication(medication.id)}
                      aria-label={`Remove ${medication.name}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
              
              <Popover open={medicationComboboxOpen} onOpenChange={setMedicationComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Medication</span>
                    <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start" sideOffset={4}>
                  <Command>
                    <CommandInput placeholder="Search medications..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No medication found.</CommandEmpty>
                      <CommandGroup heading="Select a medication">
                        {medicationOptions
                          .filter(med => !selectedMedicationIds.includes(med.id))
                          .map(medication => (
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
                              {selectedMedicationIds.includes(medication.id) && (
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
            
            {selectedMedicationIds.length > 0 && (
              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-muted-foreground">
                  {selectedMedicationIds.length} medication{selectedMedicationIds.length !== 1 ? 's' : ''} selected
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
      </Card>
      
      {selectedMedicationIds.length > 0 ? (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="common">Common Properties</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Comparison</TabsTrigger>
              <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="common" className="mt-6">
              <MedicationComparison medications={comparisonData} />
            </TabsContent>
            
            <TabsContent value="detailed" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Detailed Comparison Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The detailed comparison view will provide in-depth information about each medication,
                    including pharmacokinetics, dosage adjustments, and more.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="side-effects" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Side Effects Comparison Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The side effects comparison will provide a comprehensive view of all potential
                    side effects for each medication, organized by body system and frequency.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <Card className="py-12">
          <div className="text-center px-4">
            <Pill className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Select medications to compare</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Add 2-3 medications to see a side-by-side comparison of their properties, effectiveness, side effects, and more.
            </p>
            <Button 
              onClick={() => setMedicationComboboxOpen(true)}
              className="mx-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Medications
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MedicationCompare;
