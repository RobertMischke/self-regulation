import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KontaktComponent } from '../../components/kontakt.component';

@Component({
  selector: 'app-validierung',
  standalone: true,
  imports: [RouterLink, KontaktComponent],
  template: `
    <div class="min-h-screen bg-white text-slate-900">
      <div class="mx-auto max-w-3xl px-6 py-16 sm:py-24">

        <a routerLink="/" class="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800">
          &larr; Zur&uuml;ck zur Startseite
        </a>

        <!-- Hero -->
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Wissenschaftliche Einordnung</h1>
        <p class="mt-6 text-lg leading-8 text-slate-600">
          Dieses Tool ist aktuell kein wissenschaftlich validiertes System.
          Es soll Menschen dabei unterst&uuml;tzen, ihren inneren Zustand bewusster
          wahrzunehmen und Orientierung f&uuml;r n&auml;chste Schritte zu finden.
        </p>

        <!-- Status quo -->
        <section class="mt-12">
          <h2 class="text-xl font-bold">Status&nbsp;quo</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Die Skalen, Modi und Interventionen in den Dashboards basieren derzeit nicht
            auf einer systematischen fachlichen Herleitung. Sie sind in weiten Teilen aus
            der Arbeit mit Large Language Models entstanden &ndash; also aus generierten
            Vorschl&auml;gen, Verdichtungen und Ableitungen, die ich bislang noch nicht
            fachlich gepr&uuml;ft oder validiert habe.
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Das bedeutet konkret: Schwellenwerte, Gewichtungen und Empfehlungen sind derzeit
            vorl&auml;ufige Annahmen. Sie k&ouml;nnen im Alltag als Ansto&szlig; zur
            Selbstbeobachtung n&uuml;tzlich sein, sind aber bisher nicht wissenschaftlich
            &uuml;berpr&uuml;ft.
          </p>
        </section>

        <!-- Warum trotzdem interessant -->
        <section class="mt-10">
          <h2 class="text-xl font-bold">Warum das trotzdem interessant sein kann</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Schon das bewusste Innehalten, Einordnen des eigenen Zustands und Nachdenken
            &uuml;ber m&ouml;gliche n&auml;chste Schritte kann hilfreich sein.
            Ein Teil des Nutzens dieses Werkzeugs kann also bereits in der strukturierten
            Selbstwahrnehmung liegen &ndash; auch dann, wenn die zugrunde liegenden Modelle
            inhaltlich noch nicht ausreichend belastbar sind.
          </p>
        </section>

        <!-- Validierungsweg -->
        <section class="mt-10">
          <h2 class="text-xl font-bold">Ein Weg zu mehr fachlicher Qualit&auml;t</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Ein m&ouml;glicher Weg, die inhaltliche Basis dieses Ansatzes schrittweise
            fundierter zu machen:
          </p>

          <div class="mt-6 space-y-6">
            <div class="rounded-2xl border border-slate-200 p-5">
              <div class="flex items-center gap-3">
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">1</span>
                <h3 class="font-bold text-slate-800">Relevante Forschung strukturierter einbeziehen</h3>
              </div>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                KI-Systeme k&ouml;nnen dabei helfen, Literatur zu recherchieren, thematisch
                zu ordnen und erste Zusammenfassungen zu erstellen. Sie ersetzen keine
                Fachexpertise, k&ouml;nnen aber bei der Vorarbeit unterst&uuml;tzen.
              </p>
            </div>

            <div class="rounded-2xl border border-slate-200 p-5">
              <div class="flex items-center gap-3">
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">2</span>
                <h3 class="font-bold text-slate-800">Annahmen sichtbar machen</h3>
              </div>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                Jede Skala, jeder Schwellenwert und jede Intervention sollte schrittweise
                eine nachvollziehbare Begr&uuml;ndung bekommen &ndash; idealerweise mit Quelle,
                sonst zumindest mit klar benannter Annahme.
              </p>
            </div>

            <div class="rounded-2xl border border-slate-200 p-5">
              <div class="flex items-center gap-3">
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">3</span>
                <h3 class="font-bold text-slate-800">Fachliche R&uuml;ckmeldung einholen</h3>
              </div>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                Wenn die inhaltliche Grundlage besser dokumentiert ist, kann sie von Menschen
                mit Fachwissen aus Psychologie, Psychiatrie, Neurowissenschaft oder angrenzenden
                Bereichen kritisch eingeordnet werden.
              </p>
            </div>

            <div class="rounded-2xl border border-slate-200 p-5">
              <div class="flex items-center gap-3">
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">4</span>
                <h3 class="font-bold text-slate-800">Schrittweise verbessern</h3>
              </div>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                R&uuml;ckmeldungen von Nutzer:innen und Fachleuten k&ouml;nnen helfen, Skalen,
                Empfehlungen und Interventionen pr&auml;ziser zu machen. Ich verstehe dieses Tool
                nicht als fertige L&ouml;sung, sondern als etwas, das nur durch &Uuml;berarbeitung
                besser werden kann.
              </p>
            </div>
          </div>
        </section>

        <!-- Einladung -->
        <section class="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6">
          <h2 class="text-xl font-bold">Mitmachen</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Du hast fachliche Expertise und m&ouml;chtest Inhalte mitdenken oder kritisch pr&uuml;fen?
            Du kennst Studien oder Modelle, die relevant sein k&ouml;nnten?
            Oder du hast Feedback aus der praktischen Nutzung?
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Ich freue mich &uuml;ber R&uuml;ckmeldungen &ndash; besonders auch &uuml;ber kritische.
            Au&szlig;erdem suche ich Mitstreiter:innen, die Lust haben, diesen Ansatz gemeinsam weiterzuentwickeln.
          </p>
          <div class="mt-4">
            <a routerLink="/cofounder" class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">
              Mitstreiter gesucht &rarr;
            </a>
          </div>
        </section>

        <div class="mt-8">
          <app-kontakt />
        </div>

      </div>
    </div>
  `,
})
export class ValidierungComponent {}
