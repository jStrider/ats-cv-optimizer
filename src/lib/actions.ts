"use server";

import Anthropic from "@anthropic-ai/sdk";
import type { ATSAnalysis, OptimizationResult } from "@/lib/types";

const client = new Anthropic();

export async function extractTextFromPDF(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;
  if (!file) throw new Error("Aucun fichier fourni");

  const buffer = Buffer.from(await file.arrayBuffer());
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  return data.text;
}

export async function analyzeCV(
  jobOffer: string,
  cvText: string
): Promise<ATSAnalysis> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `Tu es un expert en recrutement et en systemes ATS (Applicant Tracking Systems). Analyse le CV suivant par rapport a l'offre d'emploi et simule un score ATS.

OFFRE D'EMPLOI:
${jobOffer}

CV DU CANDIDAT:
${cvText}

Reponds UNIQUEMENT avec un objet JSON valide (sans markdown, sans backticks) avec cette structure exacte:
{
  "score": <number 0-100>,
  "breakdown": {
    "keywordMatch": <number 0-100>,
    "skillsAlignment": <number 0-100>,
    "formattingScore": <number 0-100>,
    "experienceRelevance": <number 0-100>,
    "sectionHeaders": <number 0-100>,
    "contactInfo": <number 0-100>,
    "quantifiedAchievements": <number 0-100>,
    "jobTitleMatch": <number 0-100>
  },
  "missingKeywords": ["mot-cle manquant 1", "mot-cle manquant 2"],
  "presentKeywords": ["mot-cle present 1", "mot-cle present 2"],
  "suggestions": ["suggestion 1 en francais", "suggestion 2 en francais"]
}

Criteres d'evaluation ATS:
- keywordMatch: Densite de mots-cles de l'offre retrouves dans le CV
- skillsAlignment: Adequation des competences listees avec celles demandees
- formattingScore: Absence de tableaux, colonnes, graphiques; format simple et parsable
- experienceRelevance: Pertinence de l'experience par rapport au poste
- sectionHeaders: Presence de sections standards (Experience, Formation, Competences, etc.)
- contactInfo: Presence d'informations de contact completes
- quantifiedAchievements: Presence de realisations chiffrees et mesurables
- jobTitleMatch: Adequation du titre/poste actuel avec le poste vise

Le score global est la moyenne ponderee des criteres.`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  return JSON.parse(text) as ATSAnalysis;
}

export async function optimizeCV(
  jobOffer: string,
  cvText: string,
  analysis: ATSAnalysis
): Promise<OptimizationResult> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8192,
    messages: [
      {
        role: "user",
        content: `Tu es un expert en optimisation de CV pour les systemes ATS. Reecris le CV ci-dessous pour maximiser le score ATS par rapport a l'offre d'emploi.

OFFRE D'EMPLOI:
${jobOffer}

CV ACTUEL:
${cvText}

ANALYSE ACTUELLE (score: ${analysis.score}/100):
- Mots-cles manquants: ${analysis.missingKeywords.join(", ")}
- Suggestions: ${analysis.suggestions.join("; ")}

INSTRUCTIONS:
1. Integre naturellement les mots-cles manquants dans le CV
2. Reformule les experiences pour mieux correspondre au poste
3. Ajoute des realisations chiffrees si possible
4. Assure-toi que les sections standards sont presentes (Contact, Resume, Experience, Formation, Competences)
5. Garde un format simple et parsable par un ATS (pas de tableaux, pas de colonnes)
6. Ne mens pas et ne fabrique pas d'experience fictive
7. Garde le contenu factuel du candidat, mais optimise la formulation

Reponds UNIQUEMENT avec un objet JSON valide (sans markdown, sans backticks):
{
  "optimizedCV": "<le CV reecrit complet en texte brut>",
  "optimizedScore": <number 0-100>,
  "optimizedBreakdown": {
    "keywordMatch": <number 0-100>,
    "skillsAlignment": <number 0-100>,
    "formattingScore": <number 0-100>,
    "experienceRelevance": <number 0-100>,
    "sectionHeaders": <number 0-100>,
    "contactInfo": <number 0-100>,
    "quantifiedAchievements": <number 0-100>,
    "jobTitleMatch": <number 0-100>
  },
  "changes": ["changement 1 en francais", "changement 2 en francais"]
}`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const result = JSON.parse(text);

  return {
    originalScore: analysis.score,
    optimizedScore: result.optimizedScore,
    optimizedCV: result.optimizedCV,
    optimizedBreakdown: result.optimizedBreakdown,
    changes: result.changes,
  } as OptimizationResult;
}
