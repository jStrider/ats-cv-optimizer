export interface Example {
  id: string;
  title: string;
  emoji: string;
  jobOffer: string;
  cvText: string;
}

export const examples: Example[] = [
  {
    id: "fullstack-senior",
    title: "Développeur Full-Stack Senior",
    emoji: "💻",
    jobOffer: `DÉVELOPPEUR FULL-STACK SENIOR (H/F)
Paris 9e — CDI — 55-70K€

À propos de nous
TechVision est une scale-up SaaS B2B en forte croissance (x3 ARR en 2025). Notre plateforme d'analytics prédictif aide les retailers à optimiser leur supply chain grâce à l'IA.

Missions
• Concevoir et développer de nouvelles fonctionnalités sur notre plateforme (React/Next.js + Node.js/Python)
• Participer à l'architecture technique et aux choix technologiques
• Mettre en place des pipelines CI/CD robustes
• Mentorer les développeurs juniors de l'équipe (6 personnes)
• Collaborer avec le Product Manager pour définir la roadmap technique
• Optimiser les performances de l'application (temps de chargement, requêtes BDD)
• Contribuer à la mise en place de tests automatisés (unitaires, intégration, E2E)

Stack technique
• Frontend : React 19, Next.js 15, TypeScript, Tailwind CSS, Zustand
• Backend : Node.js, Python (FastAPI), PostgreSQL, Redis, Elasticsearch
• Cloud : AWS (ECS, RDS, S3, Lambda, CloudFront)
• DevOps : Docker, Kubernetes, Terraform, GitHub Actions
• Monitoring : Datadog, Sentry
• Tests : Jest, Playwright, Pytest

Profil recherché
• 5+ ans d'expérience en développement full-stack
• Maîtrise de React/Next.js et Node.js
• Expérience avec Python et les bases de données SQL
• Connaissance des architectures microservices
• Expérience avec AWS ou autre cloud provider
• Capacité à travailler en équipe Agile (Scrum)
• Bon niveau d'anglais technique (équipe internationale)
• Bonus : expérience en ML/IA, connaissance de Kubernetes

Avantages
• RTT, mutuelle Alan, tickets resto Swile
• Remote flexible (3j/semaine)
• Budget formation 2000€/an
• MacBook Pro M4`,
    cvText: `MARC DUPONT
Email: marc.dupont@email.com | Tél: 06 12 34 56 78
LinkedIn: linkedin.com/in/marcdupont

EXPÉRIENCE PROFESSIONNELLE

Développeur Web — WebAgency Paris
Janvier 2022 - Présent
- Création de sites internet pour des clients variés
- Utilisation de WordPress et PHP
- Gestion de projets avec les clients
- Maintenance des sites existants

Développeur Junior — StartupXYZ
Juin 2020 - Décembre 2021
- Développement de fonctionnalités sur l'application mobile
- Correction de bugs
- Participation aux réunions d'équipe

Stage développeur — SSII Services
Mars 2020 - Mai 2020
- Stage de fin d'études
- Développement d'un outil interne en Java

FORMATION

Master Informatique — Université Paris-Saclay (2020)
Licence Informatique — Université Paris-Saclay (2018)

COMPÉTENCES

Langages: JavaScript, PHP, HTML, CSS, un peu de Python
Frameworks: WordPress, jQuery, Bootstrap
Base de données: MySQL
Outils: Git, VS Code

LANGUES
Français: natif
Anglais: intermédiaire

CENTRES D'INTÉRÊT
Football, jeux vidéo, voyages`
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    emoji: "📊",
    jobOffer: `DATA ENGINEER (H/F)
Lyon — CDI — 50-65K€

DataFlow, leader français de la data platform as a service, recrute un Data Engineer pour renforcer son équipe Data.

Vos missions
• Concevoir et maintenir des pipelines de données ETL/ELT à grande échelle
• Développer des modèles de données optimisés pour l'analytics (dbt, SQL avancé)
• Mettre en place l'infrastructure data sur GCP (BigQuery, Dataflow, Pub/Sub)
• Assurer la qualité et la gouvernance des données
• Automatiser les processus de collecte et transformation des données
• Collaborer avec les Data Scientists et Data Analysts
• Monitorer les pipelines et gérer les incidents

Stack
• Langages : Python, SQL, Scala (optionnel)
• Orchestration : Apache Airflow, Dagster
• Processing : Apache Spark, dbt
• Cloud : GCP (BigQuery, Cloud Functions, Dataflow, Cloud Storage)
• Streaming : Apache Kafka, Pub/Sub
• CI/CD : GitLab CI, Docker, Terraform
• Data Quality : Great Expectations, Monte Carlo

Profil
• 3-5 ans d'expérience en data engineering
• Solides compétences en Python et SQL
• Expérience avec un cloud provider (GCP, AWS, Azure)
• Connaissance des architectures data modernes (lakehouse, data mesh)
• Familiarité avec les outils de data quality
• Esprit analytique et rigueur
• Certifications GCP appréciées`,
    cvText: `SOPHIE MARTIN
sophie.martin@gmail.com | 07 98 76 54 32
Lyon, France

EXPÉRIENCE

Analyste données — RetailCorp (2023 - présent)
- Création de rapports Excel pour la direction
- Extraction de données depuis la base Oracle
- Quelques scripts Python pour automatiser des tâches
- Utilisation de Tableau pour la visualisation

Développeuse back-end — DevShop (2021 - 2023)
- Développement d'API REST en Python/Django
- Gestion de base PostgreSQL
- Écriture de requêtes SQL complexes
- Déploiement sur Heroku

Stage — Cabinet Conseil Data (2021)
- Analyse de données clients
- Nettoyage de datasets
- Présentation de résultats

FORMATION
Master Data Science — INSA Lyon (2021)
Mémoire: "Analyse prédictive des ventes retail"

COMPÉTENCES
Python, SQL, Django, PostgreSQL, Excel, Tableau
Git, Linux, un peu de Docker

LANGUES
Français natif, Anglais B2`
  },
  {
    id: "product-manager",
    title: "Product Manager",
    emoji: "🎯",
    jobOffer: `PRODUCT MANAGER (H/F)
Full Remote — CDI — 55-75K€

FinNext, fintech en série B (levée de 30M€), cherche un Product Manager pour piloter la roadmap de son application de gestion financière B2C (2M+ utilisateurs).

Responsabilités
• Définir et prioriser la roadmap produit en collaboration avec le CEO et le CTO
• Mener des études utilisateurs (interviews, surveys, analytics) pour identifier les besoins
• Rédiger les spécifications fonctionnelles et user stories
• Piloter les sprints avec l'équipe de développement (8 devs, 2 designers)
• Suivre les KPIs produit : activation, rétention, NPS, conversion freemium → premium
• Effectuer une veille concurrentielle active
• Présenter les résultats et la stratégie produit au board
• A/B tester les nouvelles fonctionnalités
• Gérer le backlog et les priorités avec Jira

Profil recherché
• 4+ ans d'expérience en Product Management, idéalement en B2C ou fintech
• Maîtrise des méthodologies Agile (Scrum, Kanban)
• Expérience avec les outils analytics (Mixpanel, Amplitude, GA4)
• Capacité à analyser des données pour prendre des décisions
• Excellent sens de la communication (écrite et orale)
• Connaissance du secteur fintech/banking appréciée
• Certifications CSPO ou équivalent appréciées
• Expérience en growth / product-led growth est un plus

Outils
Jira, Confluence, Figma, Mixpanel, Amplitude, Notion, Miro, Hotjar`,
    cvText: `THOMAS BERNARD
thomas.bernard@outlook.fr
Paris, France

PARCOURS

Chef de projet digital — Agence WebPlus (2022-présent)
- Gestion de projets web pour des clients grands comptes
- Coordination entre les équipes design et développement
- Suivi des plannings et budgets
- Reporting hebdomadaire au directeur

Chargé de marketing digital — E-commerce SAS (2020-2022)
- Gestion des campagnes publicitaires Google Ads et Meta
- Suivi des performances avec Google Analytics
- Création de landing pages
- Newsletters et community management

Assistant chef de projet — Cabinet Conseil (2019-2020)
- Support à la gestion de projets de transformation digitale
- Rédaction de comptes-rendus
- Organisation de workshops

ÉTUDES
Master Marketing Digital — ESSEC (2019)
Licence Économie — Université Paris Dauphine (2017)

COMPÉTENCES
Google Analytics, Google Ads, Notion
Trello, Suite Google, Canva
Notions HTML/CSS

LANGUES
Français, Anglais courant, Espagnol scolaire`
  }
];
