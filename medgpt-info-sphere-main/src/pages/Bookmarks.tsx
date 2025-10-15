
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MedicationCard } from "@/components/medications/MedicationCard";
import { Bookmark, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Bookmarks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock bookmarked medications data
  const bookmarkedMedications = [
    {
      id: "123",
      name: "Lisinopril",
      genericName: "Lisinopril",
      category: "Blood Pressure",
      description: "Lisinopril is an ACE inhibitor used to treat high blood pressure and heart failure. It works by relaxing blood vessels so blood can flow more easily.",
      drugClass: "ACE Inhibitor",
      interactions: 12,
      isBookmarked: true
    },
    {
      id: "345",
      name: "Prilosec",
      genericName: "Omeprazole",
      category: "Gastrointestinal",
      description: "Omeprazole is a proton pump inhibitor that decreases the amount of acid produced in the stomach. It's used to treat acid reflux and ulcers.",
      drugClass: "Proton Pump Inhibitor",
      interactions: 15,
      isBookmarked: true
    },
    {
      id: "789",
      name: "Metformin",
      genericName: "Metformin HCl",
      category: "Diabetes",
      description: "Metformin is used to control blood sugar levels in people with type 2 diabetes. It works by improving the body's response to insulin.",
      drugClass: "Biguanide",
      interactions: 5,
      isBookmarked: true
    }
  ];
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    toast.success(`Searching for "${searchQuery}" in bookmarks`);
  };
  
  const handleClearAll = () => {
    toast.info("This would clear all bookmarks (feature not implemented in demo)");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Your Bookmarked Medications</h1>
          <p className="text-muted-foreground">
            Quick access to medications you've saved for reference
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleClearAll}>
          <Trash2 className="h-4 w-4" />
          <span>Clear All</span>
        </Button>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search your bookmarks..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </div>
      
      <Tabs defaultValue="medications">
        <TabsList>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="searches">Saved Searches</TabsTrigger>
        </TabsList>
        
        <TabsContent value="medications" className="mt-6">
          {bookmarkedMedications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {bookmarkedMedications.map((medication) => (
                <MedicationCard key={medication.id} {...medication} />
              ))}
            </div>
          ) : (
            <Card className="py-12">
              <div className="text-center px-4">
                <Bookmark className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No bookmarked medications</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  You haven't bookmarked any medications yet. Browse medications and click the bookmark icon to save them for quick access.
                </p>
                <Button>
                  Browse Medications
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="guides" className="mt-6">
          <Card className="py-12">
            <div className="text-center px-4">
              <Bookmark className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No bookmarked guides</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                You haven't bookmarked any medication guides yet. Browse our educational resources and save them for later reference.
              </p>
              <Button>
                Browse Guides
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="searches" className="mt-6">
          <Card className="py-12">
            <div className="text-center px-4">
              <Bookmark className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No saved searches</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                You haven't saved any searches yet. Save common searches for quick access in the future.
              </p>
              <Button>
                Go to Search
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookmarks;
