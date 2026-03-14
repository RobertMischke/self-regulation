import { DashboardConfig } from '../models/dashboard-config';
import { modeDefinitions } from '../models/constants';
import { calculateModel, calculateIdealStateDistance, getSystemFeedback } from '../models/regulation';
import { ModeKey } from '../models/types';

export const adhsRegulationConfig: DashboardConfig = {
  key: 'adhs-regulation',
  title: 'ADHS-Regulations-Dashboard',
  icon: '🧠',
  subtitle: 'Interaktive Feedback-Schleife für Aktivierung, Gefühlslage, Mitte und Arbeitsmodus.',
  goal: 'Aufmerksamkeit stabilisieren, Reibung senken und ins Arbeiten kommen.',
  audience: 'Für Fokus, Deep Work, exekutive Steuerung und kognitive Klarheit.',
  disclaimer:
    'Dieses Tool ist eine Hilfe zur Selbststeuerung, nicht zur Diagnose. Es soll dich dabei unterstützen, den passenden Modus zu finden: Starten, Routine, Deep Work oder Reset.',
  metricLabels: ['Aktivierung', 'Klarheit', 'Friktion', 'Stimulation'],
  sliders: [
    { key: 'arousal', label: 'Aktivierung / Arousal', left: 'zu niedrig', right: 'zu hoch' },
    { key: 'mood', label: 'Gefühlslage', left: 'niedrig', right: 'gut' },
    { key: 'centeredness', label: 'Mitte / innere Balance', left: 'weg', right: 'zentriert' },
    { key: 'clarity', label: 'Klarheit', left: 'vernebelt', right: 'klar' },
    { key: 'bodyEnergy', label: 'Körperenergie', left: 'leer', right: 'wach' },
    { key: 'emotionalPressure', label: 'Emotionaler Druck', left: 'ruhig', right: 'hoch' },
    { key: 'stimulationNeed', label: 'Bedarf an Stimulation', left: 'wenig', right: 'viel' },
  ],
  modes: { ...modeDefinitions },
  questionGroups: [
    {
      title: 'Fragen bei Unterstimulation',
      questions: [
        'Fällt dir das Anfangen gerade schwer?',
        'Schweifen deine Gedanken weg, obwohl du etwas tun willst?',
        "Fühlst du dich eher flach, leer oder nicht richtig 'online'?",
      ],
    },
    {
      title: 'Fragen bei Überstimulation',
      questions: [
        'Bist du innerlich hektisch oder reizüberflutet?',
        'Springst du zwischen Tabs, Gedanken oder Aufgaben?',
        'Fühlt sich dein Kopf voll oder zu laut an?',
      ],
    },
    {
      title: 'Fragen zu Gefühlen',
      questions: [
        'Ist gerade starker Druck, Frust oder Unsicherheit da?',
        'Hast du das Gefühl, dass Gefühle deine Steuerung kapern?',
        'Ist die Selbstbewertung gerade eher hart als hilfreich?',
      ],
    },
    {
      title: 'Fragen zum Körper',
      questions: [
        'Bist du müde, hungrig, verspannt oder unruhig?',
        'Hast du heute genug getrunken und gegessen?',
        'Hattest du Schlaf, Licht und etwas Bewegung?',
      ],
    },
  ],
  defaultValues: {
    arousal: 46,
    mood: 58,
    centeredness: 43,
    clarity: 49,
    bodyEnergy: 55,
    emotionalPressure: 41,
    stimulationNeed: 63,
  },
  resetValues: {
    arousal: 55,
    mood: 62,
    centeredness: 60,
    clarity: 61,
    bodyEnergy: 60,
    emotionalPressure: 34,
    stimulationNeed: 50,
  },
  defaultTask: 'Ich möchte meine Aufmerksamkeit so regulieren, dass ich gut arbeite, ohne mich zu überreizen.',
  defaultMicroCommitment: 'Nur den nächsten kleinen Schritt sichtbar machen.',
  resetMicroCommitment: 'Den kleinsten nächsten Schritt auswählen und anfangen.',
  calculate: (inputs) =>
    calculateModel({
      arousal: inputs['arousal'],
      mood: inputs['mood'],
      centeredness: inputs['centeredness'],
      clarity: inputs['clarity'],
      bodyEnergy: inputs['bodyEnergy'],
      emotionalPressure: inputs['emotionalPressure'],
      stimulationNeed: inputs['stimulationNeed'],
    }),
  calculateIdealDistance: (inputs) =>
    calculateIdealStateDistance(
      inputs['arousal'],
      inputs['mood'],
      inputs['centeredness'],
      inputs['clarity'],
      inputs['bodyEnergy'],
      inputs['emotionalPressure'],
      inputs['stimulationNeed'],
    ),
  getSystemFeedback: (modeKey) => getSystemFeedback(modeKey as ModeKey),
};
