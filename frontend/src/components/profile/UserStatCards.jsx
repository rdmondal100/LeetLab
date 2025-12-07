import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheckBig, Trophy, Flame, TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, value, label, badge, hint }) => (
  <Card className="w-full">
    <CardHeader className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-chart-2/10">
          <Icon className="h-5 w-5 text-chart-2" aria-hidden />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          {hint && <small className="text-xs text-muted-foreground mt-1">{hint}</small>}
        </div>
      </div>
      {badge && <Badge className="bg-chart-2/30 text-chart-2">{badge}</Badge>}
    </CardHeader>

    <CardContent className="flex items-center justify-between">
      <div className="text-3xl font-extrabold leading-none">{value}</div>
      <div className="text-right">
        {/* Placeholder place for small trend or sparkline if you want to add later */}
        <small className="text-xs text-muted-foreground">Last 30d</small>
       </div>
    </CardContent>
  </Card>
);

const UserStatCards = ({ stats }) => {
  const defaults = {
    solved: 0,
    acceptance: "0%",
    rank: 0,
    streak: 0,
  };

  const s = { ...defaults, ...(stats || {}) };

  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={CircleCheckBig}
          value={s.solved}
          label="Problems Solved"
          badge={s.acceptance}
          hint="All-time solved"
        />

        <StatCard icon={Trophy} value={`#${s.rank}`} label="Global Rank" hint="Among all users" />

        <StatCard icon={Flame} value={`${s.streak}d`} label="Current Streak" hint="Days with ≥1 solve" />

        <StatCard icon={TrendingUp} value={s.acceptance} label="Acceptance Rate" hint="Submission acceptance" />
      </div>
    </section>
  );
};

export default UserStatCards;
