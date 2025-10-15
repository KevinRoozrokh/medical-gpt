
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface ComparisonMedication {
  id: string;
  name: string;
  genericName: string;
  drugClass: string;
  ingredients: string[];
  effectiveness: 'low' | 'moderate' | 'high';
  sideEffects: {
    severity: 'mild' | 'moderate' | 'severe';
    common: string[];
  };
  interactions: number;
  cost: 'low' | 'medium' | 'high';
  administrationRoute: string;
  prescriptionRequired: boolean;
}

interface MedicationComparisonProps {
  medications: ComparisonMedication[];
}

export function MedicationComparison({ medications }: MedicationComparisonProps) {
  const getEffectivenessColor = (rating: string) => {
    switch (rating) {
      case 'high': return 'text-medGreen-500';
      case 'moderate': return 'text-amber-500';
      case 'low': return 'text-red-500';
      default: return '';
    }
  };

  const getSideEffectsColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-medGreen-500';
      case 'moderate': return 'text-amber-500';
      case 'severe': return 'text-red-500';
      default: return '';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-medGreen-500';
      case 'medium': return 'text-amber-500';
      case 'high': return 'text-red-500';
      default: return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Medication Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Comparison Criteria</TableHead>
                {medications.map((med) => (
                  <TableHead key={med.id} className="text-center font-medium">
                    {med.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Generic Name</TableCell>
                {medications.map((med) => (
                  <TableCell key={med.id} className="text-center">
                    {med.genericName}
                  </TableCell>
                ))}
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Drug Class</TableCell>
                {medications.map((med) => (
                  <TableCell key={med.id} className="text-center">
                    <Badge variant="outline">{med.drugClass}</Badge>
                  </TableCell>
                ))}
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Active Ingredients</TableCell>
                {medications.map((med) => (
                  <TableCell key={med.id} className="text-center">
                    <ul className="list-disc list-inside text-left text-sm">
                      {med.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </TableCell>
                ))}
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Effectiveness</TableCell>
                {medications.map((med) => (
                  <TableCell key={med.id} className="text-center">
                    <span className={getEffectivenessColor(med.effectiveness)}>
                      {med.effectiveness.charAt(0).toUpperCase() + med.effectiveness.slice(1)}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Side Effects</TableCell>
                {medications.map((med) => (
                  <TableCell key={med.id} className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Badge 
                        variant="outline" 
                        className={`mb-2 ${
                          med.sideEffects.severity === 'severe' 
                            ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400" 
                            : med.sideEffects.severity === 'moderate'
                              ? "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                              : "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        }`}
                      >
                        {med.sideEffects.severity.charAt(0).toUpperCase() + med.sideEffects.severity.slice(1)}
                      </Badge>
                      
                      <ul className="list-disc list-inside text-left text-sm">
                        {med.sideEffects.common.slice(0, 2).map((effect, idx) => (
                          <li key={idx} className={getSideEffectsColor(med.sideEffects.severity)}>
                            {effect}
                          </li>
                        ))}
                        {med.sideEffects.common.length > 2 && <li>...</li>}
                      </ul>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Interactions</TableCell>
                {medications.map((med) => (
                  <TableCell key={med.id} className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {med.interactions > 10 ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : med.interactions > 5 ? (
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-medGreen-500" />
                      )}
                      <span>{med.interactions} known</span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Prescription Required</TableCell>
                {medications.map((med) => (
                  <TableCell key={med.id} className="text-center">
                    {med.prescriptionRequired ? (
                      <CheckCircle className="h-5 w-5 text-medBlue-500 mx-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground mx-auto" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Administration Route</TableCell>
                {medications.map((med) => (
                  <TableCell key={med.id} className="text-center">
                    {med.administrationRoute}
                  </TableCell>
                ))}
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Relative Cost</TableCell>
                {medications.map((med) => (
                  <TableCell key={med.id} className="text-center">
                    <span className={getCostColor(med.cost)}>
                      {med.cost === 'low' && '$ Low'}
                      {med.cost === 'medium' && '$$ Medium'}
                      {med.cost === 'high' && '$$$ High'}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
