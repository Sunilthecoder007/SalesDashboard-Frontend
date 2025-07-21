import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface SalesLayoutProps {
  children: React.ReactNode;
}

export function SalesLayout({ children }: SalesLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Set sidebar open only if screen is >= 640px (sm breakpoint)
    const isLargeScreen = window.innerWidth >= 640;
    setSidebarOpen(isLargeScreen);
  }, []);

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <header className="fixed left-0 top-0 bg-primary dark:border-b border-gray-800 text-primary-foreground h-16 flex items-center justify-between px-4 sm:px-6 w-full z-10">
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-primary-foreground hover:opacity-60 cursor-pointer"
          >
            <Menu size={24} />
          </a>
          <h1 className="text-lg sm:text-xl font-semibold">Sales Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="mr-2 sm:mr-4 hidden sm:block text-sm sm:text-base">Hello User</span>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              className="h-8 sm:h-10 w-8 sm:w-10 rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarOpen ? "ml-64" : "ml-0"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
