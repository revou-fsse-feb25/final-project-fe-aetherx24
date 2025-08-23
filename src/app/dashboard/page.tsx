import DashboardLayout from '@/components/DashboardLayout';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Luminark",
  description: "Your personalized learning dashboard",
};

export default function DashboardPage() {
  return <DashboardLayout />;
}
