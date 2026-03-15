import { Component } from '@angular/core';

@Component({
  selector: 'app-kontakt',
  standalone: true,
  template: `
    <section class="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6">
      <h2 class="text-xl font-bold">Kontakt</h2>
      <p class="mt-3 text-sm leading-7 text-slate-600">
        Kein riesiges Venture. Eher ein kleines, scharfes Produkt mit klarer Zielgruppe.
      </p>
      <p class="mt-1 text-sm leading-7 text-slate-600">
        Wenn dich das anspricht, melde dich gern.
      </p>

      <div class="mt-3 flex flex-col gap-3 text-sm">
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
  `,
})
export class KontaktComponent {}
