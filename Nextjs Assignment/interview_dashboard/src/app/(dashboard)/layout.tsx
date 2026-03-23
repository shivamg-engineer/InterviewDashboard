"use client";

import AppLayout from "@/components/Layout/AppLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const AppLayoutTyped = AppLayout as React.ComponentType<{ children?: React.ReactNode }>;
  return <AppLayoutTyped>{children}</AppLayoutTyped>;
}