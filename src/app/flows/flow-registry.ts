import { FlowDefinition, FlowCategory, FlowCategoryMeta, FLOW_CATEGORIES } from './flow.model';

import { IN_DEN_SCHLAF_FINDEN } from './definitions/in-den-schlaf-finden';
import { ABEND_RUNTERFAHREN } from './definitions/abend-runterfahren';
import { TAG_ABSCHLIESSEN } from './definitions/tag-abschliessen';
import { NACH_UEBERFORDERUNG } from './definitions/nach-ueberforderung';
import { WENN_ALLES_ZU_VIEL } from './definitions/wenn-alles-zu-viel';
import { KURZER_RESET } from './definitions/kurzer-reset';
import { WIEDER_INS_ARBEITEN } from './definitions/wieder-ins-arbeiten';
import { ABLENKUNG_UNTERBRECHEN } from './definitions/ablenkung-unterbrechen';
import { KOERPERSIGNALE_PRUEFEN } from './definitions/koerpersignale-pruefen';
import { NACH_SOZIALEM_STRESS } from './definitions/nach-sozialem-stress';
import { GEDANKEN_SORTIEREN } from './definitions/gedanken-sortieren';
import { NAECHSTEN_SCHRITT_FINDEN } from './definitions/naechsten-schritt-finden';

export type { FlowDefinition, FlowCategory, FlowCategoryMeta } from './flow.model';
export { FLOW_CATEGORIES } from './flow.model';

export const ALL_FLOWS: FlowDefinition[] = [
  // Schlaf & Abend
  IN_DEN_SCHLAF_FINDEN,
  ABEND_RUNTERFAHREN,
  TAG_ABSCHLIESSEN,

  // Stress & Überforderung
  NACH_UEBERFORDERUNG,
  WENN_ALLES_ZU_VIEL,
  KURZER_RESET,

  // Fokus & Arbeit
  WIEDER_INS_ARBEITEN,
  ABLENKUNG_UNTERBRECHEN,

  // Körper & Bedürfnisse
  KOERPERSIGNALE_PRUEFEN,

  // Soziale Situationen
  NACH_SOZIALEM_STRESS,

  // Klarheit & Orientierung
  GEDANKEN_SORTIEREN,
  NAECHSTEN_SCHRITT_FINDEN,
];

export function getFlowsByCategory(category: FlowCategory): FlowDefinition[] {
  return ALL_FLOWS.filter(f => f.category === category);
}

export function getFlowById(id: string): FlowDefinition | undefined {
  return ALL_FLOWS.find(f => f.id === id);
}
