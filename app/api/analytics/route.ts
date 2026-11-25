import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") === "30d" ? "30d" : "7d";
    const startDate = range === "30d" ? "30daysAgo" : "7daysAgo";

    const propertyId = process.env.GA_PROPERTY_ID;
    const clientEmail = process.env.GA_CLIENT_EMAIL;
    const privateKey = (process.env.GA_PRIVATE_KEY || "").replace(/\\n/g, "\n");

    if (!propertyId || !clientEmail || !privateKey) {
      return NextResponse.json({
        success: true,
        isConfigured: false,
        data: {
          activeUsersNow: 0,
          totalVisitors: 0,
          totalPageViews: 0,
          avgSessionDuration: "0m 00s",
          timeline: [],
          topPages: [],
          devices: [],
          countries: [],
        },
      });
    }

    const analyticsClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });

    let activeUsersNow = 0;
    try {
      const [realtimeRes] = await analyticsClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        metrics: [{ name: "activeUsers" }],
      });
      const val = realtimeRes.rows?.[0]?.metricValues?.[0]?.value;
      activeUsersNow = val ? parseInt(val, 10) : 0;
    } catch {
      activeUsersNow = 0;
    }

    let timeline: { date: string; visitors: number; pageViews: number }[] = [];
    let totalVisitors = 0;
    let totalPageViews = 0;
    let avgSessionDurationSec = 0;

    try {
      const [overviewRes] = await analyticsClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      });

      if (overviewRes.rows && overviewRes.rows.length > 0) {
        timeline = overviewRes.rows.map((row) => {
          const rawDate = row.dimensionValues?.[0]?.value || "";
          const formattedDate =
            rawDate.length === 8
              ? `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`
              : rawDate;
          const visitors = parseInt(row.metricValues?.[0]?.value || "0", 10);
          const pageViews = parseInt(row.metricValues?.[1]?.value || "0", 10);
          return { date: formattedDate, visitors, pageViews };
        });

        totalVisitors = timeline.reduce((acc, curr) => acc + curr.visitors, 0);
        totalPageViews = timeline.reduce((acc, curr) => acc + curr.pageViews, 0);

        const [totalsRes] = await analyticsClient.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate, endDate: "today" }],
          metrics: [
            { name: "activeUsers" },
            { name: "screenPageViews" },
            { name: "averageSessionDuration" },
          ],
        });
        if (totalsRes.rows && totalsRes.rows.length > 0) {
          totalVisitors = parseInt(totalsRes.rows[0].metricValues?.[0]?.value || String(totalVisitors), 10);
          totalPageViews = parseInt(totalsRes.rows[0].metricValues?.[1]?.value || String(totalPageViews), 10);
          avgSessionDurationSec = parseFloat(totalsRes.rows[0].metricValues?.[2]?.value || "0");
        }
      }
    } catch {
      timeline = [];
    }

    let topPages: { path: string; views: number; visitors: number }[] = [];
    try {
      const [pagesRes] = await analyticsClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
        limit: 8,
      });

      if (pagesRes.rows && pagesRes.rows.length > 0) {
        topPages = pagesRes.rows.map((row) => ({
          path: row.dimensionValues?.[0]?.value || "/",
          views: parseInt(row.metricValues?.[0]?.value || "0", 10),
          visitors: parseInt(row.metricValues?.[1]?.value || "0", 10),
        }));
      }
    } catch {
      topPages = [];
    }

    let devices: { device: string; count: number; percentage: number }[] = [];
    try {
      const [devicesRes] = await analyticsClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate: "today" }],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
      });

      if (devicesRes.rows && devicesRes.rows.length > 0) {
        const rawDevices = devicesRes.rows.map((row) => ({
          device: row.dimensionValues?.[0]?.value || "Other",
          count: parseInt(row.metricValues?.[0]?.value || "0", 10),
        }));
        const sumUsers = rawDevices.reduce((acc, curr) => acc + curr.count, 0) || 1;
        devices = rawDevices.map((d) => ({
          device: d.device.charAt(0).toUpperCase() + d.device.slice(1),
          count: d.count,
          percentage: Math.round((d.count / sumUsers) * 100),
        }));
      }
    } catch {
      devices = [];
    }

    let countries: { country: string; visitors: number }[] = [];
    try {
      const [countryRes] = await analyticsClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate: "today" }],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
        limit: 5,
      });

      if (countryRes.rows && countryRes.rows.length > 0) {
        countries = countryRes.rows.map((row) => ({
          country: row.dimensionValues?.[0]?.value || "Unknown",
          visitors: parseInt(row.metricValues?.[0]?.value || "0", 10),
        }));
      }
    } catch {
      countries = [];
    }

    const minutes = Math.floor(avgSessionDurationSec / 60);
    const seconds = Math.floor(avgSessionDurationSec % 60);
    const avgDurationFormatted = `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;

    return NextResponse.json({
      success: true,
      isConfigured: true,
      data: {
        activeUsersNow,
        totalVisitors,
        totalPageViews,
        avgSessionDuration: avgDurationFormatted,
        timeline,
        topPages,
        devices,
        countries,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
