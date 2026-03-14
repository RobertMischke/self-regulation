import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cofounder',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-white text-slate-900">
      <div class="mx-auto max-w-3xl px-6 py-16 sm:py-24">

        <a routerLink="/" class="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800">
          &larr; Zur&uuml;ck zur Startseite
        </a>

        <!-- Hero -->
        <div class="flex items-center gap-3">
          <span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">Offen</span>
          <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Co-Founder gesucht</h1>
        </div>

        <p class="mt-6 text-lg leading-8 text-slate-600">
          Ich baue ein sehr kleines, fokussiertes Produkt f&uuml;r Selbstregulation und suche Menschen,
          die Lust haben, es mit mir weiterzuentwickeln und in den Markt zu bringen.
        </p>

        <!-- Was ich suche -->
        <section class="mt-12">
          <h2 class="text-xl font-bold">Was ich suche</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Besonders spannend sind <strong>Produkt, Positionierung, Vermarktung, Vertrieb
            und Community-Aufbau.</strong> Die Tech kann vollständig selbst abdecken.
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Wichtig ist mir eine <strong>hohe AI-Affinit&auml;t:</strong> Entwicklung, Marketing
            und Vertrieb sollen so weit wie m&ouml;glich AI-lastig, schnell und schlank aufgebaut werden.
          </p>
        </section>

        <!-- Monetarisierung -->
        <section class="mt-10">
          <h2 class="text-xl font-bold">Monetarisierung</h2>
          <ul class="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Historische Snapshots und pers&ouml;nliche Entwicklung
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Anpassbare und eigene Dashboards
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              Abo-Modell
            </li>
          </ul>
        </section>

        <!-- Vision -->
        <section class="mt-10 rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
          <p class="text-sm leading-7 text-slate-600">
            <strong>Kein riesiges Venture</strong>, sondern ein kleines, scharf positioniertes Produkt.
            Wer Lust hat, so etwas mit aufzubauen, ist willkommen.
          </p>
        </section>

        <!-- Kontakt -->
        <section class="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6">
          <h2 class="text-xl font-bold">Kontakt</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            Meld dich gerne &mdash; formlos, unkompliziert.
          </p>

          <div class="mt-5 flex flex-col gap-3 text-sm">
            <a href="mailto:robertmischke&#64;gmail.com" class="inline-flex items-center gap-2.5 font-medium text-indigo-600 hover:underline">
              <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
              </svg>
              robertmischke&#64;gmail.com
            </a>
            <a href="tel:+4917818668480" class="inline-flex items-center gap-2.5 font-medium text-indigo-600 hover:underline">
              <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
              </svg>
              0178&thinsp;186&thinsp;6848
            </a>
          </div>
        </section>

      </div>
    </div>
  `,
})
export class CofounderComponent {}
