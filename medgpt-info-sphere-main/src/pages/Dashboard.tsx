
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MedicationCard } from "@/components/medications/MedicationCard";
import { MedicationSkeleton } from "@/components/medications/MedicationSkeleton";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, BookOpen, BookmarkCheck, Info, Layers, Pill, Search, SlidersHorizontal } from "lucide-react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Mock medication data
  const medications = [
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
      id: "456",
      name: "Lipitor",
      genericName: "Atorvastatin",
      category: "Cholesterol",
      description: "Atorvastatin is used to lower cholesterol and triglycerides in the blood. It helps reduce the risk of heart attack, stroke, and other complications.",
      drugClass: "Statin",
      interactions: 8
    },
    {
      id: "789",
      name: "Metformin",
      genericName: "Metformin HCl",
      category: "Diabetes",
      description: "Metformin is used to control blood sugar levels in people with type 2 diabetes. It works by improving the body's response to insulin.",
      drugClass: "Biguanide",
      interactions: 5
    },
    {
      id: "012",
      name: "Synthroid",
      genericName: "Levothyroxine",
      category: "Thyroid",
      description: "Levothyroxine is a thyroid hormone replacement used to treat hypothyroidism. It works by replacing the natural thyroid hormone that your body doesn't make.",
      drugClass: "Hormone",
      interactions: 10
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
      id: "678",
      name: "Norvasc",
      genericName: "Amlodipine",
      category: "Blood Pressure",
      description: "Amlodipine is a calcium channel blocker used to treat high blood pressure and certain types of chest pain. It works by relaxing blood vessels.",
      drugClass: "Calcium Channel Blocker",
      interactions: 7
    }
  ];
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search query empty",
        description: "Please enter a medication name, condition, or symptom",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Search complete",
        description: `Found results for "${searchQuery}"`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <section className="text-center space-y-3 mx-auto max-w-3xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-medBlue-700 dark:text-medBlue-400">
          MedGPT Information Sphere
        </h1>
        <p className="text-lg text-muted-foreground">
          Your trusted source for comprehensive medication information and interactions
        </p>
        
        <div className="relative mt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search medications, conditions, or symptoms..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Card className="med-card-hover">
            <CardHeader>
              <Pill className="h-6 w-6 text-medBlue-500" />
              <CardTitle className="text-lg">Browse Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Search our comprehensive database of medications to find detailed information on usage, side effects, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Find Medications
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="med-card-hover">
            <CardHeader>
              <Layers className="h-6 w-6 text-medGreen-500" />
              <CardTitle className="text-lg">Compare Drugs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compare medications side-by-side to see differences in effectiveness, side effects, interactions, and cost.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Layers className="mr-2 h-4 w-4" />
                Start Comparison
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="med-card-hover">
            <CardHeader>
              <AlertCircle className="h-6 w-6 text-amber-500" />
              <CardTitle className="text-lg">Check Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Verify potential interactions between multiple medications to ensure safety and effectiveness of your treatment.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <AlertCircle className="mr-2 h-4 w-4" />
                Check Interactions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Explore Medications</h2>
        
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Info className="h-4 w-4 mr-1" />
              <span>Showing {medications.length} medications</span>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {medications.map((medication) => (
                <MedicationCard key={medication.id} {...medication} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {medications.slice(0, 3).map((medication) => (
                <MedicationCard key={medication.id} {...medication} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {medications.slice(2, 5).map((medication) => (
                <MedicationCard key={medication.id} {...medication} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="bookmarked" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {medications
                .filter(med => med.isBookmarked)
                .map((medication) => (
                  <MedicationCard key={medication.id} {...medication} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      <section className="border-t pt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Quick Resources</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-medBlue-500" />
                <span>Medication Guides</span>
              </CardTitle>
              <CardDescription>
                Educational resources for understanding your medications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-medBlue-500" />
                  <span className="text-sm hover:underline cursor-pointer">Understanding Drug Classes and Categories</span>
                </li>
                <li className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-medBlue-500" />
                  <span className="text-sm hover:underline cursor-pointer">How to Read Medication Labels</span>
                </li>
                <li className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-medBlue-500" />
                  <span className="text-sm hover:underline cursor-pointer">Guide to Common Side Effects</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookmarkCheck className="h-5 w-5 text-medGreen-500" />
                <span>Helpful Tools</span>
              </CardTitle>
              <CardDescription>
                Tools to help you manage your medications safely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-medGreen-500" />
                  <span className="text-sm hover:underline cursor-pointer">Medication Schedule Planner</span>
                </li>
                <li className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-medGreen-500" />
                  <span className="text-sm hover:underline cursor-pointer">Pill Identifier Tool</span>
                </li>
                <li className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-medGreen-500" />
                  <span className="text-sm hover:underline cursor-pointer">Dosage Calculator</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <footer className="border-t mt-12 pt-6 pb-12 text-center text-sm text-muted-foreground">
        <p>MedGPT Information Sphere © 2025. Always consult healthcare professionals for medical advice.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
