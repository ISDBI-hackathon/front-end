
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-islamic-blue flex items-center justify-center">
              <span className="text-white font-semibold text-lg">A</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-islamic-blue">AAOIFI-</span>
              <span className="text-islamic-green">AI</span>
            </h1>
          </div>
          <span className="hidden md:inline-block text-xs bg-islamic-gold/20 text-islamic-blue-dark px-2 py-0.5 rounded-full">
            Islamic Financial Accounting Assistant
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="hidden md:inline-flex text-islamic-blue hover:text-islamic-blue-light hover:bg-islamic-blue/5"
          >
            Help
          </Button>
        </div>
      </div>
    </header>
  );
}
