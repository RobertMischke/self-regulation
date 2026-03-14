import { Component, computed, input, output } from '@angular/core';
import { SliderItem } from '../models/dashboard-config';

interface Point { x: number; y: number; }

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  template: `
    <svg [attr.viewBox]="viewBox" class="mx-auto w-full max-w-md" (click)="onClick($event)">
      <!-- Grid rings -->
      @for (ring of rings; track ring) {
        <polygon
          [attr.points]="ringPoints(ring)"
          fill="none" stroke="#e2e8f0" stroke-width="1"
        />
      }

      <!-- Clickable axis zones (invisible, wide hit area) -->
      @for (pt of axisEndpoints(); track $index) {
        <line
          [attr.x1]="cx" [attr.y1]="cy"
          [attr.x2]="pt.x" [attr.y2]="pt.y"
          stroke="transparent" stroke-width="20" class="cursor-pointer"
          (click)="onAxisClick($event, $index)"
        />
        <line
          [attr.x1]="cx" [attr.y1]="cy"
          [attr.x2]="pt.x" [attr.y2]="pt.y"
          stroke="#e2e8f0" stroke-width="1" class="pointer-events-none"
        />
      }

      <!-- Value polygon -->
      <polygon
        [attr.points]="valuePolygon()"
        fill="rgba(99,102,241,0.15)" stroke="#6366f1" stroke-width="2"
        stroke-linejoin="round" class="pointer-events-none"
      />

      <!-- Draggable value dots -->
      @for (pt of valuePoints(); track $index) {
        <circle
          [attr.cx]="pt.x" [attr.cy]="pt.y"
          r="7" fill="#6366f1" stroke="white" stroke-width="2"
          class="cursor-pointer" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,.15))"
          (pointerdown)="onDotDown($event, $index)"
        />
      }

      <!-- Labels with value -->
      @for (lbl of labelPositions(); track $index) {
        <text
          [attr.x]="lbl.x" [attr.y]="lbl.y"
          [attr.text-anchor]="lbl.anchor"
          dominant-baseline="middle"
          class="fill-slate-700 text-[11px] font-semibold pointer-events-none"
        >{{ lbl.text }}</text>
      }
    </svg>
  `,
})
export class RadarChartComponent {
  readonly items = input.required<SliderItem[]>();
  readonly valueChange = output<{ key: string; value: number }>();

  readonly cx = 250;
  readonly cy = 180;
  readonly radius = 120;
  readonly labelOffset = 30;
  readonly viewBox = '0 0 500 360';
  readonly rings = [0.25, 0.5, 0.75, 1];

  private axisPoint(index: number, total: number, r: number): Point {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    return {
      x: this.cx + r * Math.cos(angle),
      y: this.cy + r * Math.sin(angle),
    };
  }

  readonly axisEndpoints = computed(() => {
    const n = this.items().length;
    return this.items().map((_, i) => this.axisPoint(i, n, this.radius));
  });

  readonly valuePoints = computed(() => {
    const items = this.items();
    const n = items.length;
    return items.map((item, i) => this.axisPoint(i, n, this.radius * (item.value / 100)));
  });

  readonly valuePolygon = computed(() =>
    this.valuePoints().map(p => `${p.x},${p.y}`).join(' ')
  );

  readonly labelPositions = computed(() => {
    const items = this.items();
    const n = items.length;
    return items.map((item, i) => {
      const pt = this.axisPoint(i, n, this.radius + this.labelOffset);
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const cos = Math.cos(angle);
      return {
        x: pt.x,
        y: pt.y,
        text: item.label,
        value: item.value,
        anchor: Math.abs(cos) < 0.01 ? 'middle' : cos > 0 ? 'start' : 'end',
      };
    });
  });

  ringPoints(fraction: number): string {
    const n = this.items().length;
    const r = this.radius * fraction;
    return this.items().map((_, i) => {
      const pt = this.axisPoint(i, n, r);
      return `${pt.x},${pt.y}`;
    }).join(' ');
  }

  /** Click anywhere on an axis line → set slider to the clicked distance */
  onAxisClick(event: MouseEvent, index: number): void {
    event.stopPropagation();
    const value = this.valueFromPointer(event, index);
    if (value != null) {
      const key = this.items()[index].key;
      this.valueChange.emit({ key, value });
    }
  }

  /** Click on the SVG background → find nearest axis */
  onClick(event: MouseEvent): void {
    // only handle direct SVG clicks, not bubbled from axis/dot
  }

  /** Drag a dot along its axis */
  onDotDown(event: PointerEvent, index: number): void {
    event.preventDefault();
    const svg = (event.target as SVGElement).ownerSVGElement!;
    const key = this.items()[index].key;

    const onMove = (e: PointerEvent) => {
      const value = this.valueFromPointerEvent(svg, e, index);
      if (value != null) this.valueChange.emit({ key, value });
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  private valueFromPointer(event: MouseEvent, index: number): number | null {
    const svg = (event.target as SVGElement).ownerSVGElement ?? (event.target as SVGSVGElement);
    return this.valueFromPointerEvent(svg, event, index);
  }

  private valueFromPointerEvent(svg: SVGSVGElement, event: MouseEvent, index: number): number | null {
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());

    const dx = svgPt.x - this.cx;
    const dy = svgPt.y - this.cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const raw = Math.round((dist / this.radius) * 100);
    return Math.max(0, Math.min(100, raw));
  }
}
