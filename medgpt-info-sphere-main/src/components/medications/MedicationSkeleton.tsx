
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function MedicationSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="h-6 w-3/4 med-skeleton"></div>
          <div className="h-6 w-6 rounded-full med-skeleton"></div>
        </div>
        <div className="h-4 w-1/2 med-skeleton mt-2"></div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-5 w-20 med-skeleton rounded-full"></div>
          <div className="h-5 w-24 med-skeleton rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full med-skeleton"></div>
          <div className="h-4 w-full med-skeleton"></div>
          <div className="h-4 w-2/3 med-skeleton"></div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="h-4 w-16 med-skeleton"></div>
        <div className="h-4 w-24 med-skeleton"></div>
      </CardFooter>
    </Card>
  );
}

export function MedicationDetailSkeleton() {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-8 w-64 med-skeleton"></div>
            <div className="h-5 w-48 med-skeleton"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-10 med-skeleton rounded-md"></div>
            <div className="h-10 w-10 med-skeleton rounded-md"></div>
            <div className="h-10 w-10 med-skeleton rounded-md"></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="h-6 w-24 med-skeleton rounded-full"></div>
          <div className="h-6 w-28 med-skeleton rounded-full"></div>
          <div className="h-6 w-40 med-skeleton rounded-full"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-10 w-full med-skeleton rounded-md mb-6"></div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-6 w-32 med-skeleton"></div>
            <div className="h-4 w-full med-skeleton"></div>
            <div className="h-4 w-full med-skeleton"></div>
            <div className="h-4 w-3/4 med-skeleton"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-6 w-40 med-skeleton"></div>
            <div className="space-y-2">
              <div className="h-4 w-full med-skeleton"></div>
              <div className="h-4 w-full med-skeleton"></div>
              <div className="h-4 w-2/3 med-skeleton"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-6 w-36 med-skeleton"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-24 w-full med-skeleton rounded-md"></div>
              <div className="h-24 w-full med-skeleton rounded-md"></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <div className="h-4 w-48 med-skeleton"></div>
        <div className="h-4 w-32 med-skeleton"></div>
      </CardFooter>
    </Card>
  );
}
