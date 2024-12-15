import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </span>
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
    </div>
  );
};

export default ThemeToggle;
