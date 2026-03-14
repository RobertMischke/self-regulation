import { DashboardConfig } from '../models/dashboard-config';
import { adhsRegulationConfig } from './adhs-regulation.config';

const dashboardConfigs: DashboardConfig[] = [adhsRegulationConfig];

export function getAllDashboardConfigs(): DashboardConfig[] {
  return dashboardConfigs;
}

export function getDashboardConfig(key: string): DashboardConfig | undefined {
  return dashboardConfigs.find((c) => c.key === key);
}
