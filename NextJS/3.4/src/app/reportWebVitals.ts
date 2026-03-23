export type WebVitalsMetric = {
  id: string;
  name: string;
  value: number;
  delta?: number;
  rating?: "good" | "needs-improvement" | "poor";
  navigationType?: string;
  entries?: PerformanceEntry[];
};

export function reportWebVitals(metric: WebVitalsMetric) {
  // Visible in the browser console (not the server terminal).
  // Replace with your analytics/beacon call if needed.
  console.log("[web-vitals]", metric);
}
