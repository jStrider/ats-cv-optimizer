"use client";

import { cn } from "@/lib/utils";
import type { ATSScoreBreakdown } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

const breakdownLabels: Record<keyof ATSScoreBreakdown, string> = {
  keywordMatch: "Correspondance mots-cles",
  skillsAlignment: "Alignement competences",
  formattingScore: "Formatage ATS",
  experienceRelevance: "Pertinence experience",
  sectionHeaders: "Sections standards",
  contactInfo: "Informations de contact",
  quantifiedAchievements: "Realisations chiffrees",
  jobTitleMatch: "Correspondance poste",
};

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-500";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
}

function getProgressColor(score: number) {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  if (score >= 40) return "bg-orange-500";
  return "bg-red-500";
}

export function ScoreCircle({
  score,
  label,
  size = "lg",
}: {
  score: number;
  label: string;
  size?: "sm" | "lg";
}) {
  const dims = size === "lg" ? "h-32 w-32" : "h-24 w-24";
  const textSize = size === "lg" ? "text-4xl" : "text-2xl";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          dims,
          "relative flex items-center justify-center rounded-full border-4",
          score >= 80
            ? "border-green-500"
            : score >= 60
              ? "border-yellow-500"
              : score >= 40
                ? "border-orange-500"
                : "border-red-500"
        )}
      >
        <span className={cn(textSize, "font-bold", getScoreColor(score))}>
          {score}
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function ScoreBreakdown({
  breakdown,
}: {
  breakdown: ATSScoreBreakdown;
}) {
  return (
    <div className="space-y-3">
      {(Object.entries(breakdown) as [keyof ATSScoreBreakdown, number][]).map(
        ([key, value]) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{breakdownLabels[key]}</span>
              <span className={cn("font-medium", getScoreColor(value))}>
                {value}%
              </span>
            </div>
            <Progress
              value={value}
              className="h-2"
              indicatorClassName={getProgressColor(value)}
            />
          </div>
        )
      )}
    </div>
  );
}
