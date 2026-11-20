import { AppShell } from "@/components/app-shell";
import { AfsFoilsManager } from "@/components/dashboard/AfsFoilsManager";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardAfsFoilsPage() {
  return (
    <div className="dashboard-theme min-h-screen bg-background text-foreground">
      <TooltipProvider>
        <AppShell pathname="/dashboard/afs-foils">
          <AfsFoilsManager />
        </AppShell>
      </TooltipProvider>
    </div>
  );
}
