
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Bookmark, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface MedicationCardProps {
  id: string;
  name: string;
  genericName?: string;
  category: string;
  description: string;
  drugClass: string;
  interactions?: number;
  isBookmarked?: boolean;
}

export function MedicationCard({ 
  id, 
  name, 
  genericName, 
  category, 
  description, 
  drugClass,
  interactions = 0,
  isBookmarked = false
}: MedicationCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    toast.success(
      bookmarked 
        ? `Removed ${name} from bookmarks` 
        : `Added ${name} to bookmarks`
    );
  };

  return (
    <Card className="h-full med-card-hover overflow-hidden">
      <Link to={`/medication/${id}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold text-medBlue-700 dark:text-medBlue-400">
              {name}
            </CardTitle>
            <Button
              variant="ghost" 
              size="icon" 
              className={bookmarked ? "text-amber-500" : "text-muted-foreground"}
              onClick={handleBookmark}
              aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
          {genericName && (
            <p className="text-sm text-muted-foreground mt-0">
              Generic: {genericName}
            </p>
          )}
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="bg-medBlue-50 dark:bg-medBlue-900/20 text-medBlue-700 dark:text-medBlue-400">
              {category}
            </Badge>
            <Badge variant="outline" className="bg-medTeal-100 dark:bg-medTeal-900/20 text-medTeal-700 dark:text-medTeal-400">
              {drugClass}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>Details</span>
          </div>
          {interactions > 0 && (
            <div className="flex items-center gap-1 text-amber-500">
              <AlertCircle className="h-3 w-3" />
              <span>{interactions} interactions</span>
            </div>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
}
