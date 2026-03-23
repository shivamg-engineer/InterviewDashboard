"use client";

import { useReportWebVitals } from "next/web-vitals";
import { reportWebVitals } from "./reportWebVitals";

export default function WebVitals() {
  useReportWebVitals(reportWebVitals);
  return null;
}

