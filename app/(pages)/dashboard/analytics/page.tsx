import { AppShell } from "@/components/app-shell";
import { AnalyticsView } from "@/components/dashboard/AnalyticsView";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AnalyticsDashboardPage() {
  return (
    <div className="dashboard-theme min-h-screen bg-background text-foreground">
      <TooltipProvider>
        <AppShell pathname="/dashboard/analytics">
          <AnalyticsView />
        </AppShell>
      </TooltipProvider>
    </div>
  );
}
