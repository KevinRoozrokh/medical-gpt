
import { Link } from "react-router-dom";
import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog } from "@/components/search/SearchDialog";
import { useState } from "react";

interface TopNavBarProps {
  onMenuClick: () => void;
}

export function TopNavBar({ onMenuClick }: TopNavBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuClick}
          className="mr-2"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-medBlue-600 dark:text-medBlue-400">
            MedGPT
          </span>
        </Link>
        
        <div className="flex-1"></div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setSearchOpen(true)} 
            className="mr-1"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="mr-1"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
      
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
