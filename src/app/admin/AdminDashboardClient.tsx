"use client";

import AdminStats from "@/components/admin/AdminStats";
import TrainersManagement from "@/components/admin/TrainersManagement";
import LoadingUI from "@/components/LoadingUI";
import Navbar from "@/components/Navbar";
import { useGetAppointments } from "@/hooks/use-appointments";
import { useGetTrainers } from "@/hooks/use-trainers";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";

function AdminDashboardClient() {
  const { user } = useUser();
  const { data: trainers = [], isLoading: trainersLoading } = useGetTrainers();
  const { data: appointments = [], isLoading: appointmentsLoading } =
    useGetAppointments();

  const stats = {
    totalTrainers: trainers.length,
    activeTrainers: trainers.filter((t) => t.isActive).length,
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter((a) => a.status === "COMPLETED")
      .length,
  };

  if (trainersLoading || appointmentsLoading) return <LoadingUI />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* ADMIN WELCOME SECTION */}
        <div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                Admin Dashboard
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back,{user?.firstName || "Admin"}!
              </h1>
              <p className="text-muted-foreground">
                Manage trainers, oversee appointments, and monitor your
                performance.
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>
        <AdminStats
          totalTrainers={stats.totalTrainers}
          activeTrainers={stats.activeTrainers}
          totalAppointments={stats.totalAppointments}
          completedAppointments={stats.completedAppointments}
        />
        <TrainersManagement />
      </div>
    </div>
  );
}

export default AdminDashboardClient;
