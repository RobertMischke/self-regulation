import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KontaktComponent } from '../../components/kontakt.component';

@Component({
  selector: 'app-cofounder',
  standalone: true,
  imports: [RouterLink, KontaktComponent],
  template: `
    <div class="min-h-screen bg-white text-slate-900">
      <div class="mx-auto max-w-3xl px-6 py-16 sm:py-24">

        <a routerLink="/" class="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800">
          &larr; Zur&uuml;ck zur Startseite
        </a>

        <!-- Hero -->
        <div class="flex items-center gap-3">
          <span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">Offen</span>
          <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Mitstreiter gesucht</h1>
        </div>

        <!-- Intro -->
        <p class="mt-6 text-lg leading-8 text-slate-600">
          Ich teste gerade, ob aus diesem Prototyp ein kleines, fokussiertes Produkt
          f&uuml;r Selbstregulation entstehen kann.
        </p>
        <p class="mt-3 text-lg leading-8 text-slate-600">
          Daf&uuml;r suche ich Menschen, die Lust haben, den Ansatz gemeinsam mit mir
          weiterzuentwickeln und in den Markt zu bringen.
        </p>

        <!-- Worum es geht -->
        <section class="mt-12">
          <h2 class="text-xl font-bold">Worum es geht</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Im Kern geht es um ein einfaches Tool, das Menschen dabei hilft,
            den eigenen Zustand einzusch&auml;tzen und n&auml;chste Schritte abzuleiten.
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Der Prototyp steht. Jetzt interessiert mich vor allem:
            Gibt es daf&uuml;r echtes Interesse &ndash; und die richtigen Leute, um daraus mehr zu machen?
          </p>
        </section>

        <!-- Wen ich suche -->
        <section class="mt-10">
          <h2 class="text-xl font-bold">Wen ich suche</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Besonders spannend finde ich Menschen mit Interesse an:
          </p>
          <ul class="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Produkt
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Positionierung
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Vermarktung
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Vertrieb
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Community-Aufbau
            </li>
          </ul>
          <p class="mt-4 text-sm leading-7 text-slate-600">
            Die technische Umsetzung kann ich selbst abdecken.
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Wichtig ist mir eine <strong>hohe AI-Affinit&auml;t:</strong> Entwicklung, Marketing
            und Vertrieb sollen so weit wie m&ouml;glich AI-gest&uuml;tzt, schnell und schlank aufgebaut werden.
          </p>
        </section>

        <!-- Warum interessant -->
        <section class="mt-10">
          <h2 class="text-xl font-bold">Warum das interessant sein k&ouml;nnte</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Der Prototyp ist in weniger als 10 Stunden entstanden, fast vollst&auml;ndig AI-gest&uuml;tzt.
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Ich gehe davon aus, dass sich auch weitere Funktionen wie Payments, Verlaufsspeicherung
            und zus&auml;tzlicher Content mit vergleichsweise geringem Aufwand umsetzen lassen.
            Genau das macht den Ansatz f&uuml;r mich spannend:
            kleines Produkt, schnelle Iteration, geringe Entwicklungskosten.
          </p>
        </section>

        <!-- Monetarisierung -->
        <section class="mt-10">
          <h2 class="text-xl font-bold">Monetarisierung</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Die Basisfunktion &ndash; ein vollst&auml;ndiges Dashboard zur Selbsteinsch&auml;tzung &ndash;
            soll frei verf&uuml;gbar bleiben.
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            M&ouml;gliche Premium-Features:
          </p>
          <ul class="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Verlauf und Entwicklung &uuml;ber Zeit
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Individuelle oder eigene Dashboards
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Zus&auml;tzliche Inhalte und Funktionen
            </li>
          </ul>
          <p class="mt-4 text-sm leading-7 text-slate-600">
            Abo oder Lifetime-Lizenz.
          </p>
        </section>

        <!-- Wissenschaftliche Grundlage -->
        <section class="mt-10">
          <h2 class="text-xl font-bold">Wissenschaftliche Grundlage</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Die Inhalte sind aktuell nicht wissenschaftlich validiert.
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Ich sehe aber einen realistischen Weg, die fachliche Qualit&auml;t schrittweise
            zu verbessern &ndash; durch transparente Annahmen, strukturierte Einbeziehung
            relevanter Forschung und fachliche R&uuml;ckmeldung.
          </p>
          <a routerLink="/validierung" class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">
            Mehr zur wissenschaftlichen Einordnung &rarr;
          </a>
        </section>

        <div class="mt-12">
          <app-kontakt />
        </div>

      </div>
    </div>
  `,
})
export class CofounderComponent {}
