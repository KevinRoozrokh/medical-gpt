
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl md:text-6xl font-bold text-medBlue-600 dark:text-medBlue-400 mb-4">404</h1>
        <p className="text-xl md:text-2xl font-semibold mb-4">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => window.history.back()} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </Button>
          <Button asChild className="gap-2">
            <a href="/">
              <Home className="h-4 w-4" />
              <span>Return to Home</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
