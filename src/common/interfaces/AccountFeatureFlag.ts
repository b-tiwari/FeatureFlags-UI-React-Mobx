export interface FeatureFlagForAccount {
  key: string;
  active: string;
  description: string;
  [key: string]: string;
}
