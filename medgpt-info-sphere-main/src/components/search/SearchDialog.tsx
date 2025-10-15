import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, CheckCircle, Search, Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const navigate = useNavigate();
  const [searchTab, setSearchTab] = useState("all");
  
  const medications = [
    { id: "123", name: "Lisinopril", type: "ACE Inhibitor", category: "Blood Pressure" },
    { id: "456", name: "Atorvastatin", type: "Statin", category: "Cholesterol" },
    { id: "789", name: "Metformin", type: "Biguanide", category: "Diabetes" },
    { id: "012", name: "Levothyroxine", type: "Hormone", category: "Thyroid" },
    { id: "345", name: "Omeprazole", type: "Proton Pump Inhibitor", category: "Acid Reflux" },
  ];
  
  const conditions = [
    { id: "111", name: "Hypertension", medications: 28 },
    { id: "222", name: "Type 2 Diabetes", medications: 42 },
    { id: "333", name: "Hypercholesterolemia", medications: 16 },
    { id: "444", name: "GERD", medications: 12 },
    { id: "555", name: "Hypothyroidism", medications: 8 },
  ];
  
  const handleSelect = (id: string, type: 'medication' | 'condition') => {
    onOpenChange(false);
    if (type === 'medication') {
      navigate(`/medication/${id}`);
    } else {
      navigate(`/condition/${id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <Tabs defaultValue="all" value={searchTab} onValueChange={setSearchTab}>
          <div className="flex items-center border-b px-4">
            <TabsList className="h-14">
              <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
              <TabsTrigger value="medications" className="text-sm">Medications</TabsTrigger>
              <TabsTrigger value="conditions" className="text-sm">Conditions</TabsTrigger>
            </TabsList>
          </div>
          <Command className="rounded-lg">
            <CommandInput placeholder="Search MedGPT..." className="h-12" />
            <CommandList className="max-h-[400px]">
              <CommandEmpty>No results found.</CommandEmpty>
              
              <TabsContent value="all" className="mt-0 space-y-2">
                <CommandGroup heading="Medications">
                  {medications.slice(0, 3).map((med) => (
                    <CommandItem
                      key={med.id}
                      onSelect={() => handleSelect(med.id, 'medication')}
                      className="py-2 px-2"
                    >
                      <Pill className="mr-2 h-4 w-4 text-medBlue-500" />
                      <span className="flex-1">{med.name}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {med.type}
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
                
                <CommandGroup heading="Conditions">
                  {conditions.slice(0, 3).map((condition) => (
                    <CommandItem
                      key={condition.id}
                      onSelect={() => handleSelect(condition.id, 'condition')}
                      className="py-2 px-2"
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-medGreen-500" />
                      <span className="flex-1">{condition.name}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {condition.medications} meds
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </TabsContent>
              
              <TabsContent value="medications" className="mt-0">
                <CommandGroup>
                  {medications.map((med) => (
                    <CommandItem
                      key={med.id}
                      onSelect={() => handleSelect(med.id, 'medication')}
                      className="py-2 px-2"
                    >
                      <Pill className="mr-2 h-4 w-4 text-medBlue-500" />
                      <div className="flex flex-col">
                        <span>{med.name}</span>
                        <span className="text-xs text-muted-foreground">{med.type}</span>
                      </div>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {med.category}
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </TabsContent>
              
              <TabsContent value="conditions" className="mt-0">
                <CommandGroup>
                  {conditions.map((condition) => (
                    <CommandItem
                      key={condition.id}
                      onSelect={() => handleSelect(condition.id, 'condition')}
                      className="py-2 px-2"
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-medGreen-500" />
                      <span className="flex-1">{condition.name}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {condition.medications} medications
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </TabsContent>
            </CommandList>
          </Command>
        </Tabs>
        
        <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search by keyword, medication, or condition</span>
          </div>
          <div className="flex items-center gap-1">
            <Pill className="h-4 w-4" />
            <Book className="h-4 w-4" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
