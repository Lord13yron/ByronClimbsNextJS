import { ModeToggle } from "@/components/ModeToggle";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col min-h-screen w-full p-8 ">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold ">Admin Settings</h1>
          <p className=" mt-2">
            Manage your application settings and preferences.
          </p>
        </div>

        {/* Settings Form */}
        <div className="bg-secondary shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">General Settings</h2>
          <Label className="mb-2">Toggle Theme</Label>
          <Tooltip>
            <TooltipTrigger>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>Toggle theme</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
