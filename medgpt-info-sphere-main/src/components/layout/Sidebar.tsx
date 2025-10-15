import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Pill, Layers, AlertCircle, Bookmark, X, Heart, UserCog, HelpCircle, Settings, MessageSquare } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const isMobile = window.innerWidth < 768;

  const routes = [
    {
      label: "MedGPT Chat",
      icon: MessageSquare,
      href: "/",
      color: "text-medBlue-600",
    },
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      color: "text-medBlue-500",
    },
    {
      label: "Medications",
      icon: Pill,
      href: "/medications",
      color: "text-medTeal-500",
    },
    {
      label: "Compare",
      icon: Layers,
      href: "/compare",
      color: "text-medGreen-500",
    },
    {
      label: "Interaction Checker",
      icon: AlertCircle,
      href: "/interaction-checker",
      color: "text-amber-500",
    },
    {
      label: "Bookmarks",
      icon: Bookmark,
      href: "/bookmarks",
      color: "text-purple-500",
    },
  ];

  const secondaryRoutes = [
    {
      label: "Health Profile",
      icon: Heart,
      href: "/profile",
    },
    {
      label: "User Settings",
      icon: UserCog,
      href: "/settings",
    },
    {
      label: "Help & FAQ",
      icon: HelpCircle,
      href: "/help",
    },
  ];

  const SidebarContent = (
    <>
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" onClick={isMobile ? onClose : undefined} className="flex items-center gap-2">
          <div className="bg-medBlue-500 text-white p-1 rounded">
            <Pill className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">MedGPT</span>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 px-4">
        <div className="py-2">
          <h3 className="mb-2 px-4 text-sm font-medium">Main Navigation</h3>
          <nav className="grid gap-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors",
                  location.pathname === route.href 
                    ? "bg-muted text-foreground" 
                    : "text-muted-foreground"
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="py-2">
          <h3 className="mb-2 px-4 text-sm font-medium">Your Account</h3>
          <nav className="grid gap-1">
            {secondaryRoutes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors",
                  location.pathname === route.href 
                    ? "bg-muted text-foreground" 
                    : "text-muted-foreground"
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>
      <div className="border-t px-6 py-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <SheetContent side="left" className="p-0">
          <div className="flex h-full flex-col">{SidebarContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return open ? (
    <div className="hidden md:flex h-full w-[280px] flex-col border-r bg-card">
      {SidebarContent}
    </div>
  ) : null;
}
