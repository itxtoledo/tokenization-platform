import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Button
      onClick={() => setIsDarkMode(!isDarkMode)}
      variant="outline"
      size="icon"
      className="rounded-full"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
