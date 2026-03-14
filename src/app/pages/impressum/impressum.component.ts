import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-white text-slate-900">
      <div class="mx-auto max-w-3xl px-6 py-16 sm:py-24">

        <a routerLink="/" class="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800">
          &larr; Zur&uuml;ck zur Startseite
        </a>

        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Impressum</h1>

        <address class="mt-8 text-sm not-italic leading-7 text-slate-600">
          Robert Mischke<br>
          Softwareentwicklung<br>
          Warschauer Str. 32<br>
          10243 Berlin
        </address>

        <!-- Kontakt -->
        <section class="mt-10">
          <h2 class="text-xl font-bold">Kontakt</h2>
          <dl class="mt-3 text-sm leading-7 text-slate-600">
            <div class="flex gap-2">
              <dt class="font-medium text-slate-700">Telefon:</dt>
              <dd><a href="tel:+4917818668480" class="text-indigo-600 hover:underline">0178 18 668 48</a></dd>
            </div>
            <div class="flex gap-2">
              <dt class="font-medium text-slate-700">E-Mail:</dt>
              <dd><a href="mailto:robertmischke&#64;gmail.com" class="text-indigo-600 hover:underline">robertmischke&#64;gmail.com</a></dd>
            </div>
          </dl>
        </section>

        <!-- Streitbeilegung -->
        <section class="mt-10 border-t border-slate-100 pt-8">
          <h2 class="text-xl font-bold">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p class="mt-3 text-sm leading-7 text-slate-500">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <!-- Quelle -->
        <p class="mt-10 text-xs text-slate-400">
          Quelle:
          <a href="https://www.e-recht24.de/impressum-generator.html" target="_blank" rel="noopener noreferrer"
             class="hover:underline">https://www.e-recht24.de/impressum-generator.html</a>
        </p>

      </div>
    </div>
  `,
})
export class ImpressumComponent {}
