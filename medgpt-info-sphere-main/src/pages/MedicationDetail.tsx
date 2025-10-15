
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { MedicationDetailCard, MedicationDetail } from "@/components/medications/MedicationDetailCard";
import { MedicationDetailSkeleton } from "@/components/medications/MedicationSkeleton";
import { ArrowLeft } from "lucide-react";

const MedicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [medication, setMedication] = useState<MedicationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMedication = async () => {
      setIsLoading(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Mock medication detail data
        const mockMedication: MedicationDetail = {
          id: id || "unknown",
          name: "Lisinopril",
          genericName: "Lisinopril",
          category: "Blood Pressure",
          description: "Lisinopril is an angiotensin-converting enzyme (ACE) inhibitor used to treat high blood pressure (hypertension) and heart failure. It works by relaxing blood vessels so blood can flow more easily, which helps to lower blood pressure and decrease the workload on the heart.",
          drugClass: "ACE Inhibitor",
          ingredients: [
            "Lisinopril (active ingredient)",
            "Calcium phosphate",
            "Mannitol",
            "Corn starch",
            "Magnesium stearate"
          ],
          sideEffects: {
            common: [
              "Dizziness",
              "Headache",
              "Dry cough",
              "Fatigue",
              "Nausea"
            ],
            serious: [
              "Swelling of face, lips, tongue, or throat (angioedema)",
              "Difficulty breathing or swallowing",
              "Decreased urination",
              "Persistent sore throat with fever",
              "Irregular heartbeat"
            ]
          },
          dosages: [
            {
              form: "Tablet",
              strength: "5 mg",
              instructions: "Take one tablet by mouth once daily. May be taken with or without food."
            },
            {
              form: "Tablet",
              strength: "10 mg",
              instructions: "Take one tablet by mouth once daily. May be taken with or without food."
            },
            {
              form: "Tablet",
              strength: "20 mg",
              instructions: "Take one tablet by mouth once daily. May be taken with or without food."
            }
          ],
          interactions: [
            {
              medication: "Potassium supplements",
              severity: "moderate",
              description: "May cause high potassium levels in the blood. Monitoring recommended."
            },
            {
              medication: "Lithium",
              severity: "moderate",
              description: "May increase lithium levels, potentially leading to toxicity."
            },
            {
              medication: "NSAIDs (e.g., ibuprofen)",
              severity: "moderate",
              description: "May reduce the blood pressure-lowering effects of lisinopril."
            },
            {
              medication: "Aliskiren",
              severity: "severe",
              description: "Combination increases risk of kidney problems, high potassium levels, and low blood pressure."
            }
          ],
          contraindications: [
            "History of angioedema related to previous ACE inhibitor therapy",
            "Hereditary or idiopathic angioedema",
            "Pregnancy (2nd and 3rd trimesters)",
            "Concomitant use with aliskiren in diabetic patients"
          ],
          pregnancyCategory: "Category D (Positive evidence of risk to human fetus)",
          breastfeedingSafety: "Compatible with breastfeeding, but infant should be monitored for possible effects",
          storageInstructions: "Store at room temperature 20-25°C (68-77°F). Keep container tightly closed and protect from moisture.",
          isBookmarked: false
        };
        
        setMedication(mockMedication);
        setIsLoading(false);
      }, 1500);
    };
    
    fetchMedication();
  }, [id]);
  
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={goBack} aria-label="Go back">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Medication Information</h1>
      </div>
      
      {isLoading ? (
        <MedicationDetailSkeleton />
      ) : medication ? (
        <MedicationDetailCard medication={medication} />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-muted-foreground">
            Medication not found
          </h2>
          <p className="mt-2">
            The medication you're looking for doesn't exist or has been removed.
          </p>
          <Button className="mt-4" onClick={goBack}>
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default MedicationDetailPage;
