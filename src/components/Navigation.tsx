
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, BookOpen, ArrowLeft, ArrowRight, Users, Search } from "lucide-react";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Journal Entries",
    href: "/journal",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Reverse Mapper",
    href: "/mapper",
    icon: <Search className="h-5 w-5" />,
  },
  {
    title: "Reviewers Panel",
    href: "/review",
    icon: <Users className="h-5 w-5" />,
  },
];

export function Navigation() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 border-r h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[60px]" : "w-[240px] md:w-[280px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-islamic-blue text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <span>{item.icon}</span>
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {isCollapsed ? (
              <ArrowRight className="h-5 w-5" />
            ) : (
              <ArrowLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
