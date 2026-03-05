export interface ATSScoreBreakdown {
  keywordMatch: number;
  skillsAlignment: number;
  formattingScore: number;
  experienceRelevance: number;
  sectionHeaders: number;
  contactInfo: number;
  quantifiedAchievements: number;
  jobTitleMatch: number;
}

export interface ATSAnalysis {
  score: number;
  breakdown: ATSScoreBreakdown;
  missingKeywords: string[];
  presentKeywords: string[];
  suggestions: string[];
}

export interface OptimizationResult {
  originalScore: number;
  optimizedScore: number;
  optimizedCV: string;
  optimizedBreakdown: ATSScoreBreakdown;
  changes: string[];
}
