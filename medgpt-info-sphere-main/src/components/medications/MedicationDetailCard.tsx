
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowUpDown, Bookmark, ClipboardCheck, ExternalLink, Pill, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface MedicationDetail {
  id: string;
  name: string;
  genericName: string;
  category: string;
  description: string;
  drugClass: string;
  ingredients: string[];
  sideEffects: {
    common: string[];
    serious: string[];
  };
  dosages: {
    form: string;
    strength: string;
    instructions: string;
  }[];
  interactions: {
    medication: string;
    severity: 'mild' | 'moderate' | 'severe';
    description: string;
  }[];
  contraindications: string[];
  pregnancyCategory: string;
  breastfeedingSafety: string;
  storageInstructions: string;
  isBookmarked?: boolean;
}

export function MedicationDetailCard({ medication }: { medication: MedicationDetail }) {
  const [bookmarked, setBookmarked] = useState(medication.isBookmarked || false);
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(
      bookmarked 
        ? `Removed ${medication.name} from bookmarks` 
        : `Added ${medication.name} to bookmarks`
    );
  };

  const handleCompare = () => {
    toast.info("Added to comparison tray");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("URL copied to clipboard");
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-medBlue-700 dark:text-medBlue-400">
              {medication.name}
            </CardTitle>
            <CardDescription className="mt-1">
              Generic: {medication.genericName}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              aria-label="Share medication"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCompare}
              aria-label="Compare medication"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button
              variant={bookmarked ? "default" : "outline"}
              size="icon"
              onClick={handleBookmark}
              className={bookmarked ? "bg-amber-500 hover:bg-amber-600" : ""}
              aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="bg-medBlue-50 dark:bg-medBlue-900/20 text-medBlue-700 dark:text-medBlue-400">
            {medication.category}
          </Badge>
          <Badge variant="outline" className="bg-medTeal-100 dark:bg-medTeal-900/20 text-medTeal-700 dark:text-medTeal-400">
            {medication.drugClass}
          </Badge>
          {medication.interactions.some(i => i.severity === 'severe') && (
            <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
              High Risk Interactions
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="dosage">Dosage</TabsTrigger>
            <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {medication.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Active Ingredients</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {medication.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Contraindications</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {medication.contraindications.map((item, idx) => (
                    <li key={idx} className="text-red-600 dark:text-red-400">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium mb-1">Pregnancy Category</h4>
                  <p className="text-muted-foreground">{medication.pregnancyCategory}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium mb-1">Breastfeeding Safety</h4>
                  <p className="text-muted-foreground">{medication.breastfeedingSafety}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="dosage" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Available Dosages</h3>
              {medication.dosages.map((dosage, idx) => (
                <div key={idx} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{dosage.form}</h4>
                      <p className="text-sm text-muted-foreground">{dosage.strength}</p>
                    </div>
                    <Pill className="h-5 w-5 text-medBlue-500" />
                  </div>
                  <div className="mt-2">
                    <h5 className="text-xs text-muted-foreground uppercase tracking-wide">Dosing Instructions</h5>
                    <p className="mt-1 text-sm">{dosage.instructions}</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Storage Instructions</h3>
                <p className="text-muted-foreground">
                  {medication.storageInstructions}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="side-effects" className="mt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                  <span>Common Side Effects</span>
                  <Badge variant="outline" className="ml-2">Frequently Reported</Badge>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {medication.sideEffects.common.map((effect, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <div className="h-5 w-5 shrink-0 rounded-full bg-medBlue-100 dark:bg-medBlue-900/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-medBlue-700 dark:text-medBlue-400">{idx + 1}</span>
                      </div>
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2 text-red-600 dark:text-red-400 mb-3">
                  <AlertCircle className="h-5 w-5" />
                  <span>Serious Side Effects</span>
                  <Badge variant="outline" className="ml-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                    Seek Medical Attention
                  </Badge>
                </h3>
                <ul className="space-y-2">
                  {medication.sideEffects.serious.map((effect, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-red-600 dark:text-red-400">
                      <div className="h-5 w-5 shrink-0 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-red-700 dark:text-red-400">!</span>
                      </div>
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="interactions" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Known Drug Interactions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This list shows medications that may interact with {medication.name}. Talk to your healthcare provider before taking these medications together.
              </p>
              
              {medication.interactions.length === 0 ? (
                <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                  <p className="text-muted-foreground">No known interactions reported</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {medication.interactions.map((interaction, idx) => (
                    <div key={idx} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{interaction.medication}</h4>
                        <Badge 
                          variant="outline" 
                          className={
                            interaction.severity === 'severe' 
                              ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400" 
                              : interaction.severity === 'moderate'
                                ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                                : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                          }
                        >
                          {interaction.severity.charAt(0).toUpperCase() + interaction.severity.slice(1)} Risk
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{interaction.description}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 flex justify-center">
                <Button variant="outline" className="gap-2">
                  <ClipboardCheck className="h-4 w-4" />
                  <span>Check Interactions with Other Medications</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <p className="text-xs text-muted-foreground">
          Information last updated: April 15, 2025
        </p>
        <Button variant="link" size="sm" className="gap-1 text-xs">
          <ExternalLink className="h-3 w-3" />
          <span>Source information</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
