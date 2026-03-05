import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Target,
  Zap,
  Download,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Importez votre CV",
    description:
      "Uploadez votre CV au format PDF ou collez-le directement en texte.",
  },
  {
    icon: Target,
    title: "Analyse ATS intelligente",
    description:
      "Notre IA simule un systeme ATS et evalue votre CV sur 8 criteres cles.",
  },
  {
    icon: Zap,
    title: "Optimisation automatique",
    description:
      "L'IA reecrit votre CV pour maximiser votre score ATS tout en restant fidele a votre profil.",
  },
  {
    icon: Download,
    title: "Telechargez le resultat",
    description:
      "Recuperez votre CV optimise au format PDF, pret a etre envoye.",
  },
];

const benefits = [
  "Augmentez vos chances de passer les filtres ATS",
  "Identifiez les mots-cles manquants dans votre CV",
  "Obtenez un score detaille sur 8 criteres",
  "Optimisation basee sur l'IA Claude d'Anthropic",
  "Comparaison avant/apres avec score ameliore",
  "Export PDF professionnel",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-20 text-center md:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-primary" />
          Propulse par l&apos;IA Claude
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Optimisez votre CV pour les{" "}
          <span className="text-primary">systemes ATS</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          75% des CV sont rejetes par les ATS avant d&apos;etre lus par un
          recruteur. Notre outil analyse votre CV, identifie les faiblesses et
          le reecrit pour maximiser vos chances.
        </p>
        <div className="flex gap-4">
          <Link href="/optimize">
            <Button size="lg" className="gap-2">
              Commencer l&apos;optimisation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Comment ca marche
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Card key={i} className="relative overflow-hidden">
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute right-4 top-4 text-4xl font-bold text-muted/80">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">
                Pourquoi utiliser ATS Optimizer ?
              </h2>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                <div className="text-6xl font-bold text-primary">+35%</div>
                <p className="text-lg font-medium">
                  Amelioration moyenne du score ATS
                </p>
                <p className="text-sm text-muted-foreground">
                  Basee sur l&apos;optimisation de mots-cles, la structure et le
                  formatage de votre CV
                </p>
                <Link href="/optimize">
                  <Button className="mt-2 gap-2">
                    Tester gratuitement
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
          ATS CV Optimizer &mdash; Propulse par Claude d&apos;Anthropic
        </div>
      </footer>
    </div>
  );
}
