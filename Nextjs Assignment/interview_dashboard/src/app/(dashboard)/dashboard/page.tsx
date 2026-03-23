"use client";

import { useQuery } from "@tanstack/react-query";
/* Tailwind styles now loaded via layout.tsx */
import { fetchUsers, fetchTodosByUser } from "@/app/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar,
  Star,
  UserX,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type KPICardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  accentClass: string;
};

function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  accentClass,
}: KPICardProps) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              {title}
            </p>
            <p className="text-3xl font-bold mt-1 tracking-tight">
              {value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {subtitle}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentClass}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["users-kpi"],
    queryFn: () => fetchUsers(30, 0),
  });

  const { data: todosData, isLoading: todosLoading } = useQuery({
    queryKey: ["todos-kpi"],
    queryFn: () => fetchTodosByUser(1),
  });

  const totalUsers = usersData?.total ?? 0;
  const todos = todosData?.todos ?? [];

  const scheduledThisWeek = todos.slice(0, 8).length;
  const noShows = todos.filter((t: any) => !t.completed).slice(0, 3).length;
  const avgScore = 4.2;

  const isLoading = usersLoading || todosLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div suppressHydrationWarning>
        <h1 className="text-2xl font-bold tracking-tight" suppressHydrationWarning>
          Welcome back, {user?.firstName || "..."}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here is your interview pipeline overview
        </p>
      </div>

      {/* KPI Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Scheduled This Week"
            value={scheduledThisWeek}
            subtitle="Active interviews"
            icon={Calendar}
            accentClass="bg-primary/10 text-primary"
          />
          <KPICard
            title="Avg. Feedback Score"
            value={avgScore.toFixed(1)}
            subtitle="Out of 5.0"
            icon={Star}
            accentClass="bg-yellow-100 text-yellow-600"
          />
          <KPICard
            title="No-Shows"
            value={noShows}
            subtitle="This week"
            icon={UserX}
            accentClass="bg-red-100 text-red-600"
          />
          <KPICard
            title="Total Candidates"
            value={totalUsers}
            subtitle="In pipeline"
            icon={Users}
            accentClass="bg-blue-100 text-blue-600"
          />
        </div>
      )}

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todos.slice(0, 5).map((todo: any) => (
              <div
                key={todo.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{todo.todo}</p>
                  <p className="text-xs text-muted-foreground">
                    Candidate #{todo.userId}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    todo.completed
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {todo.completed ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Completion Rate", value: 68 },
              { label: "Feedback Submitted", value: 45 },
              { label: "Offer Acceptance", value: 82 },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    {stat.label}
                  </span>
                  <span className="font-medium">
                    {stat.value}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}