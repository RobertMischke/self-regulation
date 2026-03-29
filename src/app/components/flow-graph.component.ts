import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FlowDefinition, FlowStep, FlowOption } from '../flows/flow.model';

/* ── Layout constants ────────────────────────────────── */
const NODE_W = 200;
const NODE_H = 44;
const GAP_X = 54;
const GAP_Y = 34;
const PAD = 24;
const BACK_EDGE_MARGIN = 38;

/* ── Types ───────────────────────────────────────────── */
interface GNode {
  id: string;
  label: string;
  fullLabel: string;
  type: string; // FlowStepType | 'cross-flow'
  row: number;
  col: number;
  x: number;
  y: number;
  isCurrent: boolean;
}

interface GEdge {
  from: string;
  to: string;
  label?: string;
  path: string;
  labelX: number;
  labelY: number;
  isBack: boolean;
  isCrossFlow: boolean;
  isActive: boolean;
}

/* ── Helper: option label ────────────────────────────── */
function optLabel(o: string | FlowOption): string {
  return typeof o === 'string' ? o : o.label;
}

function truncate(s: string, max = 28): string {
  return s.length > max ? s.substring(0, max - 1) + '…' : s;
}

@Component({
  selector: 'app-flow-graph',
  standalone: true,
  template: `
    <svg
      [attr.viewBox]="viewBox"
      class="w-full select-none"
      style="max-height: 480px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="fg-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 Z" fill="#94a3b8" />
        </marker>
        <marker id="fg-arrow-hi" viewBox="0 0 10 10" refX="9" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 Z" fill="#7c3aed" />
        </marker>
        <marker id="fg-arrow-cf" viewBox="0 0 10 10" refX="9" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 Z" fill="#64748b" />
        </marker>
      </defs>

      <!-- Edges (below nodes) -->
      @for (e of edges; track e.from + e.to + (e.label ?? '')) {
        <path
          [attr.d]="e.path"
          [attr.stroke]="e.isCrossFlow ? '#64748b' : e.isActive ? '#7c3aed' : '#cbd5e1'"
          [attr.stroke-dasharray]="e.isCrossFlow ? '6 4' : e.isBack ? '4 3' : 'none'"
          stroke-width="1.8"
          fill="none"
          [attr.marker-end]="e.isCrossFlow ? 'url(#fg-arrow-cf)' : e.isActive ? 'url(#fg-arrow-hi)' : 'url(#fg-arrow)'"
        />
        @if (e.label) {
          <rect
            [attr.x]="e.labelX - measureLabel(e.label) / 2 - 4"
            [attr.y]="e.labelY - 8"
            [attr.width]="measureLabel(e.label) + 8"
            height="14"
            rx="3"
            fill="white"
            opacity="0.85"
          />
          <text
            [attr.x]="e.labelX"
            [attr.y]="e.labelY + 2"
            text-anchor="middle"
            class="text-[9px]"
            fill="#64748b"
          >{{ e.label }}</text>
        }
      }

      <!-- Nodes -->
      @for (n of nodes; track n.id) {
        <g class="cursor-pointer" (click)="nodeClick.emit(n.id)">
          @if (n.isCurrent) {
            <rect
              [attr.x]="n.x - 3" [attr.y]="n.y - 3"
              [attr.width]="nodeW + 6" [attr.height]="nodeH + 6"
              rx="11" fill="none" stroke="#7c3aed" stroke-width="2" opacity="0.35"
            />
          }
          <rect
            [attr.x]="n.x" [attr.y]="n.y"
            [attr.width]="nodeW" [attr.height]="nodeH"
            rx="8"
            [attr.fill]="bgColor(n.type)"
            [attr.stroke]="n.isCurrent ? '#7c3aed' : borderColor(n.type)"
            stroke-width="1.5"
          >
            @if (n.fullLabel !== n.label) {
              <title>{{ n.fullLabel }}</title>
            }
          </rect>
          <!-- Type icon -->
          <text
            [attr.x]="n.x + 12" [attr.y]="n.y + nodeH / 2 + 1"
            text-anchor="middle" class="text-[12px]"
            [attr.fill]="borderColor(n.type)"
          >{{ typeIcon(n.type) }}</text>
          <!-- Label -->
          <text
            [attr.x]="n.x + 24" [attr.y]="n.y + nodeH / 2 + 4"
            class="text-[11px]"
            [attr.fill]="n.isCurrent ? '#5b21b6' : '#334155'"
            [attr.font-weight]="n.isCurrent ? '600' : '500'"
          >
            @if (n.fullLabel !== n.label) {
              <title>{{ n.fullLabel }}</title>
            }
            {{ n.label }}
          </text>
        </g>
      }
    </svg>
  `,
})
export class FlowGraphComponent implements OnChanges {
  @Input() flow!: FlowDefinition;
  @Input() currentStepId = '';
  @Output() nodeClick = new EventEmitter<string>();

  readonly nodeW = NODE_W;
  readonly nodeH = NODE_H;

  nodes: GNode[] = [];
  edges: GEdge[] = [];
  viewBox = '0 0 400 300';

  ngOnChanges(): void {
    this.computeGraph();
  }

  /* ── Colours ────────────────────────────────────────── */
  bgColor(type: string): string {
    switch (type) {
      case 'choice':     return '#ede9fe';
      case 'action':     return '#e0f2fe';
      case 'recheck':    return '#fef3c7';
      case 'end':        return '#d1fae5';
      case 'cross-flow': return '#f1f5f9';
      default:           return '#f8fafc';
    }
  }
  borderColor(type: string): string {
    switch (type) {
      case 'choice':     return '#8b5cf6';
      case 'action':     return '#0284c7';
      case 'recheck':    return '#d97706';
      case 'end':        return '#059669';
      case 'cross-flow': return '#94a3b8';
      default:           return '#94a3b8';
    }
  }
  typeIcon(type: string): string {
    switch (type) {
      case 'choice':     return '◇';
      case 'action':     return '▸';
      case 'recheck':    return '↻';
      case 'end':        return '●';
      case 'cross-flow': return '⇗';
      default:           return '·';
    }
  }

  measureLabel(text: string): number {
    return text.length * 5.2;
  }

  /* ── Graph layout ───────────────────────────────────── */
  private computeGraph(): void {
    if (!this.flow) return;

    const steps = this.flow.steps.map((s, i) => ({
      ...s,
      resolvedId: s.id || `s${i}`,
      index: i,
    }));
    const stepById = new Map(steps.map(s => [s.resolvedId, s]));

    // ── 1. Build raw edges ──
    type RawEdge = { from: string; to: string; label?: string; isCrossFlow: boolean; flowId?: string };
    const rawEdges: RawEdge[] = [];

    for (const step of steps) {
      if (step.type === 'end') continue;

      const routedTargets = new Set<string>();

      if (step.options) {
        for (const opt of step.options) {
          if (typeof opt !== 'string') {
            if (opt.next) {
              rawEdges.push({ from: step.resolvedId, to: opt.next, label: opt.label, isCrossFlow: false });
              routedTargets.add(opt.next);
            } else if (opt.flowId) {
              const vId = `xf:${opt.flowId}`;
              rawEdges.push({ from: step.resolvedId, to: vId, label: opt.label, isCrossFlow: true, flowId: opt.flowId });
              routedTargets.add(vId);
            }
          }
        }
      }

      const defaultNext = step.next || (step.index < steps.length - 1 ? steps[step.index + 1].resolvedId : null);
      if (defaultNext && !routedTargets.has(defaultNext)) {
        rawEdges.push({ from: step.resolvedId, to: defaultNext, isCrossFlow: false });
      }
    }

    // ── 2. Main path (follow first edge per node) ──
    const mainPath: string[] = [];
    const onMain = new Set<string>();
    let cur = steps[0]?.resolvedId;
    while (cur && !onMain.has(cur) && stepById.has(cur)) {
      mainPath.push(cur);
      onMain.add(cur);
      const out = rawEdges.filter(e => e.from === cur && !e.isCrossFlow);
      cur = out.length > 0 ? out[0].to : '';
    }

    // ── 3. Assign node positions ──
    const posMap = new Map<string, { row: number; col: number }>();
    mainPath.forEach((id, i) => posMap.set(id, { row: i, col: 0 }));

    // Branch nodes (real steps not on main path)
    const branchNodes = steps.filter(s => !onMain.has(s.resolvedId));
    for (const bn of branchNodes) {
      const srcEdge = rawEdges.find(e => e.to === bn.resolvedId);
      const srcPos = srcEdge ? posMap.get(srcEdge.from) : null;
      const row = srcPos ? srcPos.row + 1 : mainPath.length;
      posMap.set(bn.resolvedId, { row, col: 1 });
    }

    // Cross-flow virtual nodes
    const cfEdges = rawEdges.filter(e => e.isCrossFlow);
    for (const cf of cfEdges) {
      if (!posMap.has(cf.to)) {
        const srcPos = posMap.get(cf.from);
        const row = srcPos ? srcPos.row + 1 : mainPath.length;
        const maxCol = Math.max(...[...posMap.values()].map(p => p.col), 0);
        posMap.set(cf.to, { row, col: maxCol + 1 });
      }
    }

    // ── 4. Build GNodes ──
    const gNodes: GNode[] = [];

    for (const [id, pos] of posMap) {
      const step = stepById.get(id);
      const x = PAD + BACK_EDGE_MARGIN + pos.col * (NODE_W + GAP_X);
      const y = PAD + pos.row * (NODE_H + GAP_Y);

      if (step) {
        gNodes.push({
          id,
          label: truncate(step.prompt),
          fullLabel: step.prompt,
          type: step.type,
          row: pos.row,
          col: pos.col,
          x, y,
          isCurrent: id === this.currentStepId,
        });
      } else if (id.startsWith('xf:')) {
        const flowId = id.replace('xf:', '');
        gNodes.push({
          id,
          label: '→ ' + truncate(flowId, 18),
          fullLabel: '→ Flow: ' + flowId,
          type: 'cross-flow',
          row: pos.row,
          col: pos.col,
          x, y,
          isCurrent: false,
        });
      }
    }

    // ── 5. Build GEdges ──
    const nodeById = new Map(gNodes.map(n => [n.id, n]));
    const gEdges: GEdge[] = [];

    for (const re of rawEdges) {
      const fromN = nodeById.get(re.from);
      const toN = nodeById.get(re.to);
      if (!fromN || !toN) continue;

      const isBack = toN.row <= fromN.row && !re.isCrossFlow;
      const path = this.edgePath(fromN, toN, isBack);
      const mid = this.edgeMid(fromN, toN, isBack);

      // Edge is active if it connects from a visited step to the current step's predecessor
      const isActive = fromN.isCurrent || toN.isCurrent;

      gEdges.push({
        from: re.from,
        to: re.to,
        label: re.label ? truncate(re.label, 18) : undefined,
        path,
        labelX: mid.x,
        labelY: mid.y,
        isBack,
        isCrossFlow: re.isCrossFlow,
        isActive,
      });
    }

    // ── 6. ViewBox ──
    const hasOnlyMainCol = gNodes.every(n => n.col === 0);
    const maxX = Math.max(...gNodes.map(n => n.x + NODE_W), 0) + PAD;
    const maxY = Math.max(...gNodes.map(n => n.y + NODE_H), 0) + PAD;

    if (hasOnlyMainCol) {
      // Center the single column: shift all nodes so column is centered in viewBox
      const contentW = NODE_W + PAD * 2;
      const totalW = Math.max(contentW + 40, 300);  // minimum width
      const offsetX = (totalW - NODE_W) / 2;
      for (const n of gNodes) {
        n.x = offsetX;
      }
      this.nodes = gNodes;
      this.edges = [];
      // Rebuild edges with new positions
      const nodeById2 = new Map(gNodes.map(n => [n.id, n]));
      for (const re of rawEdges) {
        const fromN = nodeById2.get(re.from);
        const toN = nodeById2.get(re.to);
        if (!fromN || !toN) continue;
        const isBack2 = toN.row <= fromN.row && !re.isCrossFlow;
        const path2 = this.edgePath(fromN, toN, isBack2);
        const mid2 = this.edgeMid(fromN, toN, isBack2);
        const isActive2 = fromN.isCurrent || toN.isCurrent;
        this.edges.push({
          from: re.from, to: re.to,
          label: re.label ? truncate(re.label, 18) : undefined,
          path: path2, labelX: mid2.x, labelY: mid2.y,
          isBack: isBack2, isCrossFlow: re.isCrossFlow, isActive: isActive2,
        });
      }
      this.viewBox = `0 0 ${totalW} ${maxY}`;
    } else {
      this.nodes = gNodes;
      this.edges = gEdges;
      const minX = -BACK_EDGE_MARGIN - 8;
      this.viewBox = `${minX} 0 ${maxX - minX} ${maxY}`;
    }
  }

  /* ── Edge path generation ───────────────────────────── */
  private edgePath(from: GNode, to: GNode, isBack: boolean): string {
    if (isBack) {
      const sx = from.x;
      const sy = from.y + NODE_H / 2;
      const ex = to.x;
      const ey = to.y + NODE_H / 2;
      const lx = Math.min(sx, ex) - BACK_EDGE_MARGIN;
      return `M ${sx},${sy} C ${lx},${sy} ${lx},${ey} ${ex},${ey}`;
    }

    if (to.row > from.row) {
      const sx = from.x + NODE_W / 2;
      const sy = from.y + NODE_H;
      const ex = to.x + NODE_W / 2;
      const ey = to.y;
      const dy = ey - sy;
      return `M ${sx},${sy} C ${sx},${sy + dy * 0.4} ${ex},${ey - dy * 0.4} ${ex},${ey}`;
    }

    // Same row
    if (to.col > from.col) {
      return `M ${from.x + NODE_W},${from.y + NODE_H / 2} L ${to.x},${to.y + NODE_H / 2}`;
    }
    return `M ${from.x},${from.y + NODE_H / 2} L ${to.x + NODE_W},${to.y + NODE_H / 2}`;
  }

  private edgeMid(from: GNode, to: GNode, isBack: boolean): { x: number; y: number } {
    if (isBack) {
      const lx = Math.min(from.x, to.x) - BACK_EDGE_MARGIN - 4;
      return { x: lx, y: (from.y + to.y) / 2 + NODE_H / 2 };
    }
    const sx = from.x + NODE_W / 2;
    const sy = from.y + NODE_H;
    const ex = to.x + NODE_W / 2;
    const ey = to.y;
    return { x: (sx + ex) / 2, y: (sy + ey) / 2 };
  }
}
