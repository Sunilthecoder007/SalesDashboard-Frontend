import { BarChart3, Store, Bell, Settings, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const [isDark, setIsDark] = useState(false);

  const menuItems = [
    { icon: BarChart3, label: "Sales Overview", active: true },
    { icon: Store, label: "Stores", active: false },
    { icon: Bell, label: "Notifications", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] dark:border-r border-gray-800 bg-sidebar text-sidebar-foreground transition-all duration-300 z-10",
      isOpen ? "w-64" : "w-0 overflow-hidden"
    )}>
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground",
              item.active 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Button>
        ))}

        <div className="pt-4 border-t border-sidebar-border dark:border-gray-800">
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {isDark ? "Light Theme" : "Dark Theme"}
          </Button>
        </div>
      </nav>
    </aside>
  );
}