"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  Eye,
  Clock,
  Radio,
  ExternalLink,
  Laptop,
  Smartphone,
  Tablet,
  Globe,
  RotateCw,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AnalyticsData {
  activeUsersNow: number;
  totalVisitors: number;
  totalPageViews: number;
  avgSessionDuration: string;
  timeline: { date: string; visitors: number; pageViews: number }[];
  topPages: { path: string; views: number; visitors: number }[];
  devices: { device: string; count: number; percentage: number }[];
  countries: { country: string; visitors: number }[];
}

type RangeType = "7d" | "30d" | "90d" | "1y" | "all";

export function AnalyticsView() {
  const [range, setRange] = useState<RangeType>("30d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async (selectedRange: RangeType, showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    try {
      const res = await fetch(`/api/analytics?range=${selectedRange}`);
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData(range);
    const interval = setInterval(() => {
      fetchData(range, false);
    }, 30000);
    return () => clearInterval(interval);
  }, [range, fetchData]);

  const getDeviceIcon = (device: string) => {
    const lower = device.toLowerCase();
    if (lower.includes("mobile")) return <Smartphone className="size-4 text-emerald-500" />;
    if (lower.includes("tablet")) return <Tablet className="size-4 text-purple-500" />;
    return <Laptop className="size-4 text-blue-500" />;
  };

  const getRangeLabel = (r: RangeType) => {
    switch (r) {
      case "7d":
        return "the last 7 days";
      case "30d":
        return "the last 30 days";
      case "90d":
        return "the last 90 days";
      case "1y":
        return "the last 1 year";
      case "all":
        return "all time";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Website Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Overview of website visitors, traffic trends, and popular pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border bg-muted p-1 text-muted-foreground overflow-x-auto max-w-full">
            {[
              { id: "7d" as const, label: "7 Days" },
              { id: "30d" as const, label: "30 Days" },
              { id: "90d" as const, label: "90 Days" },
              { id: "1y" as const, label: "1 Year" },
              { id: "all" as const, label: "All Time" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRange(tab.id)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  range === tab.id
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchData(range, true)}
            disabled={isRefreshing}
            className="gap-1.5 text-xs cursor-pointer"
          >
            <RotateCw className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60 shadow-xs relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users Now
            </CardTitle>
            <div className="relative flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Radio className="size-4 animate-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight text-emerald-600 flex items-center gap-2">
              {isLoading ? "..." : (data?.activeUsersNow ?? 0)}
              <span className="relative flex size-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500" />
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently browsing wingingwa.com.au
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Visitors
            </CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Users className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight">
              {isLoading ? "..." : (data?.totalVisitors ?? 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="size-3 text-blue-500" />
              Unique visitors in {getRangeLabel(range)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Page Views
            </CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#ef0e0a]/10 text-[#ef0e0a]">
              <Eye className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight text-[#ef0e0a]">
              {isLoading ? "..." : (data?.totalPageViews ?? 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all wings, foils & equipment pages
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Visit Duration
            </CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
              <Clock className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight">
              {isLoading ? "..." : (data?.avgSessionDuration || "0m 00s")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average session engagement time
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 shadow-xs">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">
                  Visitor & Page View Trends
                </CardTitle>
                <CardDescription className="text-xs">
                  Daily visitor activity and page views over time
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#ef0e0a]" />
                  Page Views
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-500" />
                  Visitors
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[280px] w-full flex items-center justify-center text-sm text-muted-foreground">
                Loading analytics data...
              </div>
            ) : data && data.timeline.length > 0 ? (
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data.timeline}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef0e0a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef0e0a" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={11}
                      tickFormatter={(val: string) => {
                        const parts = val.split("-");
                        if (parts.length >= 3) {
                          if (range === "1y" || range === "all") {
                            return `${parts[1]}/${parts[0].slice(2)}`;
                          }
                          return `${parts[1]}/${parts[2]}`;
                        }
                        return val;
                      }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={11}
                      allowDecimals={false}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2.5 shadow-md text-xs space-y-1">
                              <p className="font-semibold text-foreground">{label}</p>
                              <p className="text-[#ef0e0a]">
                                Page Views: <span className="font-bold">{payload[0]?.value}</span>
                              </p>
                              <p className="text-blue-600">
                                Visitors: <span className="font-bold">{payload[1]?.value}</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="pageViews"
                      stroke="#ef0e0a"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPageViews)"
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorVisitors)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[280px] w-full flex flex-col items-center justify-center text-center p-6 border border-dashed rounded-lg bg-muted/20">
                <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-2">
                  <Radio className="size-5 animate-pulse" />
                </div>
                <p className="text-sm font-semibold">Visitor Activity Collecting</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                  Daily traffic trends will automatically graph here as visitors browse the site.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Visitors by Device
            </CardTitle>
            <CardDescription className="text-xs">
              Where users are viewing Winging WA
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[280px] flex items-center justify-center text-sm text-muted-foreground">
                Loading devices...
              </div>
            ) : data && data.devices.length > 0 ? (
              <div className="space-y-4 pt-2">
                {data.devices.map((item) => (
                  <div key={item.device} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 font-medium">
                        {getDeviceIcon(item.device)}
                        {item.device}
                      </span>
                      <span className="font-semibold text-muted-foreground">
                        {item.percentage}% ({item.count})
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-[#ef0e0a] rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[280px] flex flex-col items-center justify-center text-center p-4 text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/20">
                <Laptop className="size-8 text-muted-foreground/40 mb-2" />
                <p className="font-medium text-foreground">Device Analytics</p>
                <p className="mt-1">
                  Device breakdown will populate as visitors browse from Mobile and Desktop devices.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Top Visited Pages
            </CardTitle>
            <CardDescription className="text-xs">
              Most popular pages, wings & equipment on the site
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Loading pages...
              </div>
            ) : data && data.topPages.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="pb-2 font-medium">Page URL</th>
                      <th className="pb-2 font-medium text-right">Page Views</th>
                      <th className="pb-2 font-medium text-right">Visitors</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {data.topPages.map((page, idx) => (
                      <tr key={idx} className="hover:bg-muted/40 transition-colors">
                        <td className="py-2.5 font-medium flex items-center gap-1.5">
                          <span className="text-muted-foreground/60 w-4">{idx + 1}.</span>
                          <span className="truncate max-w-[280px] sm:max-w-[400px]">{page.path}</span>
                          <a
                            href={page.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="size-3" />
                          </a>
                        </td>
                        <td className="py-2.5 text-right font-bold text-[#ef0e0a]">
                          {page.views.toLocaleString()}
                        </td>
                        <td className="py-2.5 text-right text-muted-foreground">
                          {page.visitors.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/20">
                <p className="font-medium text-foreground">No Page Views Yet</p>
                <p className="mt-1">
                  Top pages will appear here once visitors start navigating between equipment and foils.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Top Locations
            </CardTitle>
            <CardDescription className="text-xs">
              Visitor distribution by country
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Loading locations...
              </div>
            ) : data && data.countries.length > 0 ? (
              <div className="space-y-3 pt-1">
                {data.countries.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1 border-b border-border/40 last:border-0"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Globe className="size-3.5 text-muted-foreground" />
                      {item.country}
                    </span>
                    <span className="font-semibold text-muted-foreground">
                      {item.visitors} {item.visitors === 1 ? "visitor" : "visitors"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/20">
                <Globe className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="font-medium text-foreground">Global Locations</p>
                <p className="mt-1">
                  Country locations will populate as visitors access the website.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
