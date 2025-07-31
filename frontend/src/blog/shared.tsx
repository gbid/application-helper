import React from "react";
import { AnschreibenGuide } from "./anschreiben-guide";
import { LebenslaufGuide } from "./lebenslauf-guide";
import { KINutzung } from "./ki-nutzung";
import { AnschreibenNotwendig } from "./anschreiben-notwendig";
import { Berufseinsteiger } from "./berufseinsteiger";
import { AnschreibenVorlagen } from "./anschreiben-vorlagen";
import { LebenslaufVorlagen } from "./lebenslauf-vorlagen";
import { LebenslaufEnglisch } from "./lebenslauf-englisch";
import { HobbysLebenslauf } from "./hobbys-lebenslauf";
import { BlogHome } from "./blog-home";
import { ArbeitszeugnisVerstehen } from "./arbeitszeugnis-verstehen";
import { AssessmentCenterErfolg } from "./assessment-center-erfolg";
import { BeruflicheNeuorientierung } from "./berufliche-neuorientierung";
import { BewerbungBeiStartups } from "./bewerbung-bei-startups";
import { BewerbungNachBerufspause } from "./bewerbung-nach-berufspause";
import { BoreoutAmArbeitsplatz } from "./boreout-am-arbeitsplatz";
import { ErsteWocheImNeuenJob } from "./erste-woche-im-neuen-job";
import { GehaltsverhandlungMeistern } from "./gehaltsverhandlung-meistern";
import { Initiativbewerbung } from "./initiativbewerbung";
import { JobwechselPlanen } from "./jobwechsel-planen";
import { KoerperspracheVorstellungsgespraech } from "./koerpersprache-vorstellungsgespraech";
import { ProbearbeitenUndProbezeit } from "./probearbeiten-und-probezeit";
import { RemoteJobsBewerbung } from "./remote-jobs-bewerbung";
import { VorstellungsgespraechHaeufigeFragen } from "./vorstellungsgespraech-haeufige-fragen";
import { WannKuendigen } from "./wann-kuendigen";
import { BlogRoute } from "../route";
import { BlogPostKind } from "../route";

export type BlogMeta = {
  title: string;
  description: string;
  datePublished: string;
  lastModified?: string;
  author: string;
  keywords: readonly string[];
  readingTime: string;
};

export type PostStyles = {
  container: React.CSSProperties;
  header: {
    title: React.CSSProperties;
    meta: React.CSSProperties;
  };
  content: {
    section: React.CSSProperties;
    paragraph: React.CSSProperties;
    list: React.CSSProperties;
    listItem: React.CSSProperties;
    highlight: React.CSSProperties;
    note: React.CSSProperties;
  };
};

export type BlogPostProps = {
  meta: BlogMeta;
  styles: PostStyles;
  children: React.ReactNode;
};

export const styles: PostStyles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    color: "#2D3748", // Darker base text color
    fontSize: "1.1rem", // Slightly larger base font
  },
  header: {
    title: {
      fontSize: "2.75rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      color: "#1A202C", // Even darker for title
      lineHeight: 1.2,
    },
    meta: {
      color: "#718096",
      marginBottom: "3rem",
      fontSize: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  },
  content: {
    section: {
      marginBottom: "3rem", // More spacing between sections
    },
    paragraph: {
      lineHeight: 1.8,
      marginBottom: "1.5rem",
    },
    list: {
      marginLeft: "1.5rem",
      marginBottom: "1.5rem",
    },
    listItem: {
      marginBottom: "0.75rem",
      position: "relative",
    },
    highlight: {
      backgroundColor: "#EBF8FF", // Light blue background
      padding: "1.5rem",
      borderRadius: "8px",
      marginBottom: "1.5rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
    },
    note: {
      borderLeft: "4px solid #4299E1", // Brighter blue
      paddingLeft: "1.5rem",
      marginBottom: "1.5rem",
      backgroundColor: "#F7FAFC", // Very light gray-blue
      padding: "1.5rem",
      borderRadius: "0 8px 8px 0",
    },
  },
};

export const headingStyles = {
  h2: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: "2.5rem",
    marginBottom: "1.5rem",
    lineHeight: 1.3,
  },
  h3: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2D3748",
    marginTop: "2rem",
    marginBottom: "1rem",
    lineHeight: 1.4,
  },
};

export const linkStyles = {
  color: "#4299E1",
  textDecoration: "none",
  borderBottom: "1px solid transparent",
  transition: "border-color 0.2s ease",
  ":hover": {
    borderBottomColor: "#4299E1",
  },
};

export function BlogPost({ meta, styles, children }: BlogPostProps) {
  return (
    <article style={styles.container}>
      <header>
        <h1 style={styles.header.title}>{meta.title}</h1>
        <div style={styles.header.meta}>
          <time dateTime={meta.datePublished}>
            {new Date(meta.datePublished).toLocaleDateString("de-DE")}
          </time>
          <span>·</span>
          <span>{meta.author}</span>
        </div>
      </header>
      {children}
    </article>
  );
}

export const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={headingStyles.h2}>{children}</h2>
);

export const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={headingStyles.h3}>{children}</h3>
);

export type BlogProps = {
  blogRoute: BlogRoute;
};

export const BLOG_META: { readonly [K in BlogPostKind]: BlogMeta } = {
  "hobbys-lebenslauf": {
    title: "Hobbys im Lebenslauf: Diese Interessen überzeugen Personaler 2024",
    description:
      "Erfahre, welche Hobbys in deinen Lebenslauf gehören und wie du Freizeitaktivitäten überzeugend als relevante Kompetenzen präsentierst",
    datePublished: "2024-11-14",
    author: "Maria Weber",
    readingTime: "6 min",
    keywords: [
      "Lebenslauf Hobbys",
      "Hobbys Lebenslauf",
      "Interessen Lebenslauf",
      "Lebenslauf Freizeitaktivitäten",
      "Hobbys Bewerbung",
    ],
  },
  "lebenslauf-englisch": {
    title:
      "Lebenslauf auf Englisch: Von deutscher Struktur zu internationalem CV",
    description:
      "Guide für deinen englischen Lebenslauf: Vermeide typische Übersetzungsfehler und erstelle einen überzeugenden internationalen CV",
    datePublished: "2024-12-03",
    author: "Maria Weber",
    readingTime: "7 min",
    keywords: [
      "Lebenslauf Englisch",
      "CV Englisch",
      "Lebenslauf übersetzen",
      "Englischer Lebenslauf",
      "International CV",
    ],
  },
  "lebenslauf-vorlagen": {
    title:
      "Lebenslauf von der Stange? Warum Standard-Vorlagen dein Potenzial verstecken",
    description:
      "Erfahre, wie du deinen Lebenslauf von einer Standard-Vorlage zu einem überzeugenden Profil entwickelst, das deine wahren Stärken zeigt",
    datePublished: "2024-01-25",
    author: "Maria Weber",
    readingTime: "8 min",
    keywords: [
      "Lebenslauf Vorlage",
      "Lebenslauf Muster",
      "Lebenslauf erstellen",
      "CV Vorlage",
      "Bewerbung Lebenslauf",
    ],
  },
  "anschreiben-vorlagen": {
    title: "Anschreiben Vorlagen 2024: Warum sie deine Chancen sabotieren",
    description:
      "Erfahre, warum Standard-Vorlagen für dein Anschreiben mehr schaden als nutzen und wie du stattdessen überzeugst",
    datePublished: "2024-01-25",
    author: "Maria Weber",
    readingTime: "8 min",
    keywords: [
      "Anschreiben Vorlage",
      "Bewerbung Vorlagen",
      "Anschreiben Muster",
      "Bewerbung Beispiele",
      "Anschreiben schreiben",
    ],
  },
  berufseinsteiger: {
    title:
      "Lebenslauf für Berufseinsteiger: So überzeugst du ohne Berufserfahrung",
    description:
      "Dein Guide für einen überzeugenden Berufseinsteiger-Lebenslauf: Praktische Tipps und Beispiele, wie du dein Potenzial optimal präsentierst",
    datePublished: "2024-11-06",
    author: "Maria Weber",
    readingTime: "8 min",
    keywords: [
      "Lebenslauf Berufseinsteiger",
      "Bewerbung ohne Berufserfahrung",
      "Erster Job Bewerbung",
      "Lebenslauf Absolvent",
      "Berufsanfänger Bewerbung",
    ],
  },
  "anschreiben-notwendig": {
    title: "Bewerbung ohne Anschreiben: Wann du darauf verzichten kannst",
    description:
      "Anschreiben: Zeitverschwendung oder wichtiger erster Eindruck? Der komplette Guide für die richtige Entscheidung und moderne Alternativen",
    datePublished: "2024-10-04",
    author: "Maria Weber",
    readingTime: "6 min",
    keywords: [
      "Bewerbung ohne Anschreiben",
      "Anschreiben notwendig",
      "Moderne Bewerbung",
      "Anschreiben 2024",
      "Bewerbung Anschreiben",
    ],
  },
  "ki-nutzung": {
    title:
      "It's a (Job-)Match! Warum du KI deine Bewerbung schreiben lassen solltest",
    description:
      "Moderne Bewerbungsprozesse verstehen und optimieren: Warum KI-Unterstützung keine Trickserei ist, sondern dir hilft, deine Qualifikationen optimal zu präsentieren",
    datePublished: "2024-12-09",
    author: "Maria Weber",
    readingTime: "9 min",
    keywords: [
      "KI Bewerbung",
      "Bewerbung schreiben",
      "ChatGPT Bewerbung",
      "Künstliche Intelligenz Bewerbung",
      "Bewerbung optimieren",
    ],
  },
  "anschreiben-guide": {
    title: "Bewerbung schreiben: So gelingt dein Anschreiben",
    description:
      "Der Leitfaden für überzeugende Anschreiben: Praxisnahe Tipps, Beispiele und professionelle Unterstützung durch KI",
    datePublished: "2024-07-04",
    author: "Maria Weber",
    readingTime: "10 min",
    keywords: [
      "Anschreiben",
      "Bewerbung schreiben",
      "Bewerbungsanschreiben",
      "Motivationsschreiben",
    ],
  },
  "lebenslauf-guide": {
    title: "Lebenslauf schreiben: Tipps für einen überzeugenden CV",
    description:
      "Der komplette Guide für deinen Lebenslauf: Von Grundlagen bis Expertentipps, inklusive Branchen-Besonderheiten und praktischer Checkliste",
    datePublished: "2024-08-12",
    author: "Maria Weber",
    readingTime: "12 min",
    keywords: [
      "Lebenslauf",
      "Lebenslauf schreiben",
      "CV erstellen",
      "Bewerbung Lebenslauf",
      "Curriculum Vitae",
    ],
  },
  "arbeitszeugnis-verstehen": {
    title: "Arbeitszeugnis richtig lesen: So entschlüsselst du den Geheimcode",
    description:
      "Lerne die verborgene Sprache in Arbeitszeugnissen zu verstehen und was die Formulierungen wirklich über deine Leistung aussagen",
    datePublished: "2024-02-18",
    author: "Maria Weber",
    readingTime: "7 min",
    keywords: [
      "Arbeitszeugnis entschlüsseln",
      "Arbeitszeugnis Formulierungen",
      "Arbeitszeugnis verstehen",
      "Geheimcode Arbeitszeugnis",
      "Zeugnissprache",
    ],
  },
  "assessment-center-erfolg": {
    title: "Assessment Center meistern: Der komplette Vorbereitungsguide",
    description:
      "Strategien und praktische Übungen, um bei jedem Assessment Center zu überzeugen und deine Konkurrenz hinter dir zu lassen",
    datePublished: "2024-03-05",
    author: "Maria Weber",
    readingTime: "10 min",
    keywords: [
      "Assessment Center Vorbereitung",
      "Assessment Center Übungen",
      "Assessment Center Tipps",
      "Gruppenübungen meistern",
      "Einstellungstest",
    ],
  },
  "berufliche-neuorientierung": {
    title: "Berufliche Neuorientierung: In 7 Schritten zum erfüllenden Job",
    description:
      "Dein praktischer Leitfaden für einen erfolgreichen Berufswechsel – von der Selbstreflexion bis zum überzeugenden Lebenslauf",
    datePublished: "2024-01-12",
    author: "Maria Weber",
    readingTime: "9 min",
    keywords: [
      "Berufliche Neuorientierung",
      "Karrierewechsel",
      "Berufswechsel",
      "Neustart Karriere",
      "Jobwechsel Strategie",
    ],
  },
  "bewerbung-bei-startups": {
    title: "Bewerbung bei Startups: Was wirklich anders ist",
    description:
      "Erfahre, wie du deine Bewerbung für Startups optimierst und welche Eigenschaften in der Startup-Kultur besonders gefragt sind",
    datePublished: "2024-05-20",
    author: "Maria Weber",
    readingTime: "8 min",
    keywords: [
      "Startup Bewerbung",
      "Bewerbung Startup",
      "Startup Culture",
      "Bewerbungstipps Startups",
      "Jobs in Startups",
    ],
  },
  "bewerbung-nach-berufspause": {
    title: "Wiedereinstieg nach Berufspause: So gelingt deine Bewerbung",
    description:
      "Strategien für eine überzeugende Bewerbung nach Elternzeit, Sabbatical oder anderen Auszeiten – inkl. Lücken im Lebenslauf positiv darstellen",
    datePublished: "2024-04-14",
    author: "Maria Weber",
    readingTime: "7 min",
    keywords: [
      "Bewerbung nach Berufspause",
      "Wiedereinstieg Beruf",
      "Bewerbung nach Elternzeit",
      "Lücken im Lebenslauf",
      "Beruflicher Wiedereinstieg",
    ],
  },
  "boreout-am-arbeitsplatz": {
    title: "Boreout erkennen und überwinden: Wenn Unterforderung krank macht",
    description:
      "Wie du Langeweile und Unterforderung am Arbeitsplatz erkennst und welche Strategien wirklich helfen – für mehr Engagement und Erfüllung im Job",
    datePublished: "2024-06-02",
    author: "Maria Weber",
    readingTime: "7 min",
    keywords: [
      "Boreout Syndrom",
      "Unterforderung Job",
      "Langeweile Arbeitsplatz",
      "Arbeitsunzufriedenheit",
      "Motivation Arbeit",
    ],
  },
  "erste-woche-im-neuen-job": {
    title: "Die ersten 5 Tage im neuen Job: So startest du erfolgreich durch",
    description:
      "Praxisorientierte Tipps für einen gelungenen Jobeinstieg – von der Vorbereitung bis zum positiven ersten Eindruck bei Kollegen und Vorgesetzten",
    datePublished: "2024-02-28",
    author: "Maria Weber",
    readingTime: "6 min",
    keywords: [
      "Erster Arbeitstag",
      "Neuer Job Tipps",
      "Jobeinstieg",
      "Einarbeitung neuer Job",
      "Erster Eindruck Arbeit",
    ],
  },
  "gehaltsverhandlung-meistern": {
    title: "Gehaltsverhandlung: Die 7 wirksamsten Strategien für mehr Gehalt",
    description:
      "Lerne die psychologischen Prinzipien erfolgreicher Gehaltsverhandlungen und setze sie mit konkreten Formulierungen und Taktiken um",
    datePublished: "2024-03-18",
    author: "Maria Weber",
    readingTime: "9 min",
    keywords: [
      "Gehaltsverhandlung Tipps",
      "Gehalt verhandeln",
      "Gehaltserhöhung",
      "Gehaltsverhandlung Formulierungen",
      "Gehaltsverhandlung Techniken",
    ],
  },
  initiativbewerbung: {
    title: "Initiativbewerbung: So überzeugst du ohne ausgeschriebene Stelle",
    description:
      "Der Leitfaden für erfolgreiche Initiativbewerbungen – inkl. Muster, überzeugender Formulierungen und Strategien zur Kontaktaufnahme",
    datePublished: "2024-01-30",
    author: "Maria Weber",
    readingTime: "8 min",
    keywords: [
      "Initiativbewerbung",
      "Blindbewerbung",
      "Initiativbewerbung Muster",
      "Initiativ bewerben",
      "Initiativbewerbung Anschreiben",
    ],
  },
  "jobwechsel-planen": {
    title: "Jobwechsel strategisch planen: Der ultimative 12-Wochen-Plan",
    description:
      "Schritt-für-Schritt Anleitung für einen erfolgreichen Jobwechsel – von der Entscheidungsfindung bis zur Kündigung und Einarbeitung",
    datePublished: "2024-05-08",
    author: "Maria Weber",
    readingTime: "10 min",
    keywords: [
      "Jobwechsel planen",
      "Stellenwechsel",
      "Jobwechsel Strategie",
      "Karriereplanung",
      "Kündigung planen",
    ],
  },
  "koerpersprache-vorstellungsgespraech": {
    title:
      "Körpersprache im Vorstellungsgespräch: Die subtilen Signale des Erfolgs",
    description:
      "Erfahre, wie du durch bewusste Körpersprache überzeugst und lerne die versteckten Signale deines Gegenübers zu lesen",
    datePublished: "2024-02-05",
    author: "Maria Weber",
    readingTime: "7 min",
    keywords: [
      "Körpersprache Vorstellungsgespräch",
      "Nonverbale Kommunikation",
      "Bewerbungsgespräch Körpersprache",
      "Interview Körpersprache",
      "Selbstbewusstes Auftreten",
    ],
  },
  "probearbeiten-und-probezeit": {
    title: "Probearbeiten und Probezeit: Rechte, Pflichten und Erfolgstipps",
    description:
      "Was du über Probearbeiten wissen solltest und wie du die Probezeit nutzt, um dich unentbehrlich zu machen",
    datePublished: "2024-04-22",
    author: "Maria Weber",
    readingTime: "8 min",
    keywords: [
      "Probearbeiten Rechte",
      "Probezeit Tipps",
      "Probearbeiten Vergütung",
      "Probezeit überstehen",
      "Probearbeiten Bewerbungsprozess",
    ],
  },
  "remote-jobs-bewerbung": {
    title: "Remote Jobs finden und bekommen: Der ultimative Guide",
    description:
      "Wie du die besten Remote-Stellen findest und deine Bewerbung optimierst, um im digitalen Auswahlprozess zu überzeugen",
    datePublished: "2024-03-25",
    author: "Maria Weber",
    readingTime: "9 min",
    keywords: [
      "Remote Jobs finden",
      "Homeoffice Bewerbung",
      "Remote Arbeit",
      "Bewerbung Remote Job",
      "Digitales Vorstellungsgespräch",
    ],
  },
  "vorstellungsgespraech-haeufige-fragen": {
    title:
      "Die 20 häufigsten Vorstellungsgespräch-Fragen (und wie du sie meisterst)",
    description:
      "Vorbereitung ist der Schlüssel: Lerne die typischen Fragen kennen und entwickle überzeugende Antworten für jede Situation",
    datePublished: "2024-06-18",
    author: "Maria Weber",
    readingTime: "11 min",
    keywords: [
      "Vorstellungsgespräch Fragen",
      "Bewerbungsgespräch Antworten",
      "Typische Interviewfragen",
      "Schwierige Fragen Vorstellungsgespräch",
      "Vorstellungsgespräch Vorbereitung",
    ],
  },
  "wann-kuendigen": {
    title:
      "Der richtige Zeitpunkt zur Kündigung: 7 Signale, die du nicht ignorieren solltest",
    description:
      "Erkenne, wann es Zeit ist zu gehen und wie du deinen Abschied professionell gestaltest – ohne Brücken zu verbrennen",
    datePublished: "2024-05-30",
    author: "Maria Weber",
    readingTime: "7 min",
    keywords: [
      "Kündigung Zeitpunkt",
      "Wann kündigen",
      "Job kündigen",
      "Kündigungsgründe",
      "Professionell kündigen",
    ],
  },
} as const;

export function Blog({ blogRoute }: BlogProps) {
  switch (blogRoute.kind) {
    case "home":
      return <BlogHome />;
    case "hobbys-lebenslauf":
      return (
        <BlogPost meta={BLOG_META["hobbys-lebenslauf"]} styles={styles}>
          <HobbysLebenslauf />
        </BlogPost>
      );
    case "lebenslauf-englisch":
      return (
        <BlogPost meta={BLOG_META["lebenslauf-englisch"]} styles={styles}>
          <LebenslaufEnglisch />
        </BlogPost>
      );
    case "lebenslauf-vorlagen":
      return (
        <BlogPost meta={BLOG_META["lebenslauf-vorlagen"]} styles={styles}>
          <LebenslaufVorlagen />
        </BlogPost>
      );
    case "anschreiben-vorlagen":
      return (
        <BlogPost meta={BLOG_META["anschreiben-vorlagen"]} styles={styles}>
          <AnschreibenVorlagen />
        </BlogPost>
      );
    case "berufseinsteiger":
      return (
        <BlogPost meta={BLOG_META["berufseinsteiger"]} styles={styles}>
          <Berufseinsteiger />
        </BlogPost>
      );
    case "anschreiben-notwendig":
      return (
        <BlogPost meta={BLOG_META["anschreiben-notwendig"]} styles={styles}>
          <AnschreibenNotwendig />
        </BlogPost>
      );
    case "ki-nutzung":
      return (
        <BlogPost meta={BLOG_META["ki-nutzung"]} styles={styles}>
          <KINutzung />
        </BlogPost>
      );
    case "anschreiben-guide":
      return (
        <BlogPost meta={BLOG_META["anschreiben-guide"]} styles={styles}>
          <AnschreibenGuide />
        </BlogPost>
      );
    case "lebenslauf-guide":
      return (
        <BlogPost meta={BLOG_META["lebenslauf-guide"]} styles={styles}>
          <LebenslaufGuide />
        </BlogPost>
      );
    case "arbeitszeugnis-verstehen":
      return (
        <BlogPost meta={BLOG_META["arbeitszeugnis-verstehen"]} styles={styles}>
          <ArbeitszeugnisVerstehen />
        </BlogPost>
      );
    case "assessment-center-erfolg":
      return (
        <BlogPost meta={BLOG_META["assessment-center-erfolg"]} styles={styles}>
          <AssessmentCenterErfolg />
        </BlogPost>
      );
    case "berufliche-neuorientierung":
      return (
        <BlogPost
          meta={BLOG_META["berufliche-neuorientierung"]}
          styles={styles}
        >
          <BeruflicheNeuorientierung />
        </BlogPost>
      );
    case "bewerbung-bei-startups":
      return (
        <BlogPost meta={BLOG_META["bewerbung-bei-startups"]} styles={styles}>
          <BewerbungBeiStartups />
        </BlogPost>
      );
    case "bewerbung-nach-berufspause":
      return (
        <BlogPost
          meta={BLOG_META["bewerbung-nach-berufspause"]}
          styles={styles}
        >
          <BewerbungNachBerufspause />
        </BlogPost>
      );
    case "boreout-am-arbeitsplatz":
      return (
        <BlogPost meta={BLOG_META["boreout-am-arbeitsplatz"]} styles={styles}>
          <BoreoutAmArbeitsplatz />
        </BlogPost>
      );
    case "erste-woche-im-neuen-job":
      return (
        <BlogPost meta={BLOG_META["erste-woche-im-neuen-job"]} styles={styles}>
          <ErsteWocheImNeuenJob />
        </BlogPost>
      );
    case "gehaltsverhandlung-meistern":
      return (
        <BlogPost
          meta={BLOG_META["gehaltsverhandlung-meistern"]}
          styles={styles}
        >
          <GehaltsverhandlungMeistern />
        </BlogPost>
      );
    case "initiativbewerbung":
      return (
        <BlogPost meta={BLOG_META["initiativbewerbung"]} styles={styles}>
          <Initiativbewerbung />
        </BlogPost>
      );
    case "jobwechsel-planen":
      return (
        <BlogPost meta={BLOG_META["jobwechsel-planen"]} styles={styles}>
          <JobwechselPlanen />
        </BlogPost>
      );
    case "koerpersprache-vorstellungsgespraech":
      return (
        <BlogPost
          meta={BLOG_META["koerpersprache-vorstellungsgespraech"]}
          styles={styles}
        >
          <KoerperspracheVorstellungsgespraech />
        </BlogPost>
      );
    case "probearbeiten-und-probezeit":
      return (
        <BlogPost
          meta={BLOG_META["probearbeiten-und-probezeit"]}
          styles={styles}
        >
          <ProbearbeitenUndProbezeit />
        </BlogPost>
      );
    case "remote-jobs-bewerbung":
      return (
        <BlogPost meta={BLOG_META["remote-jobs-bewerbung"]} styles={styles}>
          <RemoteJobsBewerbung />
        </BlogPost>
      );
    case "vorstellungsgespraech-haeufige-fragen":
      return (
        <BlogPost
          meta={BLOG_META["vorstellungsgespraech-haeufige-fragen"]}
          styles={styles}
        >
          <VorstellungsgespraechHaeufigeFragen />
        </BlogPost>
      );
    case "wann-kuendigen":
      return (
        <BlogPost meta={BLOG_META["wann-kuendigen"]} styles={styles}>
          <WannKuendigen />
        </BlogPost>
      );
    default: {
      const _exhaustiveCheck: never = blogRoute;
      throw new Error(`Unhandled blog route kind: ${_exhaustiveCheck}`);
    }
  }
}
