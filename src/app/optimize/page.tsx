"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScoreCircle, ScoreBreakdown } from "@/components/score-display";
import { PDFDownloadButton } from "@/components/pdf-download";
import { analyzeCV, optimizeCV, extractTextFromPDF } from "@/lib/actions";
import type { ATSAnalysis, OptimizationResult } from "@/lib/types";
import {
  Upload,
  FileText,
  Loader2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  ChevronLeft,
  Play,
} from "lucide-react";
import { examples } from "@/lib/examples";

type Step = "input" | "analysis" | "optimized";

export default function OptimizePage() {
  const [step, setStep] = useState<Step>("input");
  const [jobOffer, setJobOffer] = useState("");
  const [cvText, setCvText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Veuillez selectionner un fichier PDF.");
      return;
    }

    setError(null);
    setFileName(file.name);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const text = await extractTextFromPDF(formData);
      setCvText(text);
    } catch {
      setError("Erreur lors de la lecture du PDF. Essayez de coller le texte directement.");
      setFileName(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!jobOffer.trim() || !cvText.trim()) {
      setError("Veuillez remplir l'offre d'emploi et votre CV.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await analyzeCV(jobOffer, cvText);
      setAnalysis(result);
      setStep("analysis");
    } catch {
      setError("Erreur lors de l'analyse. Verifiez votre cle API et reessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!analysis) return;

    setError(null);
    setLoading(true);

    try {
      const result = await optimizeCV(jobOffer, cvText, analysis);
      setOptimization(result);
      setStep("optimized");
    } catch {
      setError("Erreur lors de l'optimisation. Reessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("input");
    setJobOffer("");
    setCvText("");
    setFileName(null);
    setAnalysis(null);
    setOptimization(null);
    setError(null);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {(["input", "analysis", "optimized"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                step === s
                  ? "bg-primary text-primary-foreground"
                  : (s === "analysis" && (step === "optimized")) ||
                      (s === "input" && step !== "input")
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            {i < 2 && (
              <div className="h-0.5 w-8 bg-muted md:w-16" />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Step 1: Input */}
      {step === "input" && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Examples */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">🚀 Essayer avec un exemple</CardTitle>
              <CardDescription>
                Cliquez sur un exemple pour pré-remplir l&apos;offre et le CV, puis lancez l&apos;analyse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {examples.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => {
                      setJobOffer(ex.jobOffer);
                      setCvText(ex.cvText);
                      setFileName(null);
                      setError(null);
                    }}
                    className={`group flex items-center gap-3 rounded-lg border p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5 ${
                      jobOffer === ex.jobOffer ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <span className="text-2xl">{ex.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{ex.title}</p>
                      <p className="text-xs text-muted-foreground">CV volontairement faible → score bas</p>
                    </div>
                    <Play className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Offre d&apos;emploi</CardTitle>
              <CardDescription>
                Collez le texte de l&apos;offre d&apos;emploi visée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Collez ici le texte de l'offre d'emploi..."
                className="min-h-[300px]"
                value={jobOffer}
                onChange={(e) => setJobOffer(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Votre CV</CardTitle>
              <CardDescription>
                Uploadez un PDF ou collez le texte de votre CV
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary/50 hover:bg-muted/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                {fileName ? (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="font-medium">{fileName}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Cliquez pour uploader un PDF
                  </span>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">OU</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <Textarea
                placeholder="Collez ici le texte de votre CV..."
                className="min-h-[200px]"
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center md:col-span-2">
            <Button
              size="lg"
              className="gap-2"
              onClick={handleAnalyze}
              disabled={loading || !jobOffer.trim() || !cvText.trim()}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              {loading ? "Analyse en cours..." : "Analyser mon CV"}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Analysis */}
      {step === "analysis" && (
        <div className="space-y-6">
          {loading ? (
            <AnalysisSkeleton />
          ) : analysis ? (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="flex flex-col items-center justify-center p-6 md:col-span-1">
                  <ScoreCircle score={analysis.score} label="Score ATS actuel" />
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Detail du score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScoreBreakdown breakdown={analysis.breakdown} />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mots-cles trouves</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {analysis.presentKeywords.map((kw, i) => (
                      <Badge key={i} variant="secondary">
                        {kw}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-destructive">
                      Mots-cles manquants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map((kw, i) => (
                      <Badge key={i} variant="destructive">
                        {kw}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep("input")} className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Retour
                </Button>
                <Button size="lg" onClick={handleOptimize} disabled={loading} className="gap-2">
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {loading ? "Optimisation..." : "Optimiser mon CV"}
                </Button>
              </div>
            </>
          ) : null}
        </div>
      )}

      {/* Step 3: Optimized */}
      {step === "optimized" && (
        <div className="space-y-6">
          {loading ? (
            <AnalysisSkeleton />
          ) : optimization ? (
            <>
              {/* Score comparison */}
              <Card>
                <CardContent className="flex flex-col items-center gap-6 p-8 md:flex-row md:justify-center md:gap-12">
                  <ScoreCircle
                    score={optimization.originalScore}
                    label="Score avant"
                    size="sm"
                  />
                  <div className="flex flex-col items-center">
                    <ArrowRight className="h-8 w-8 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      +{optimization.optimizedScore - optimization.originalScore} pts
                    </span>
                  </div>
                  <ScoreCircle
                    score={optimization.optimizedScore}
                    label="Score apres"
                  />
                </CardContent>
              </Card>

              {/* Breakdown comparison */}
              {analysis && (
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Avant</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScoreBreakdown breakdown={analysis.breakdown} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Apres</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScoreBreakdown breakdown={optimization.optimizedBreakdown} />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Changes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Modifications apportees</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {optimization.changes.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Optimized CV */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">CV optimise</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm">
                    {optimization.optimizedCV}
                  </pre>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={handleReset} className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Recommencer
                </Button>
                <PDFDownloadButton cvText={optimization.optimizedCV} />
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}

function AnalysisSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="flex items-center justify-center p-6">
          <Skeleton className="h-32 w-32 rounded-full" />
        </Card>
        <Card className="md:col-span-2 p-6">
          <Skeleton className="mb-4 h-6 w-40" />
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <Skeleton className="mb-4 h-6 w-40" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <Skeleton className="mb-4 h-6 w-40" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
