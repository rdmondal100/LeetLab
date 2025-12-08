export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  starterCode: string;
}

export interface AIAnalysisResult {
  score: number;
  timeComplexity: string;
  spaceComplexity: string;
  critique: string;
  improvedCode: string;
}

export enum AnalysisStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
