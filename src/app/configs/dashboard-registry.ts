import { DashboardConfig } from '../models/dashboard-config';
import { adhsRegulationConfig } from './adhs-regulation.config';
import { emotionRegulationConfig } from './emotion-regulation.config';
import { recoveryDashboardConfig } from './recovery-dashboard.config';
import { orientationCheckConfig } from './orientation-check.config';
import { socialRegulationConfig } from './social-regulation.config';
import { eveningCheckinConfig } from './evening-checkin.config';

const dashboardConfigs: DashboardConfig[] = [
  adhsRegulationConfig,
  emotionRegulationConfig,
  recoveryDashboardConfig,
  orientationCheckConfig,
  socialRegulationConfig,
  eveningCheckinConfig,
];

export function getAllDashboardConfigs(): DashboardConfig[] {
  return dashboardConfigs;
}

export function getDashboardConfig(key: string): DashboardConfig | undefined {
  return dashboardConfigs.find((c) => c.key === key);
}
