import { EnabledFor, KeyVal } from './';

export interface FeatureFlag {
  _id?: string;
  app: string;
  key: string;
  description: string;
  enabledFor: EnabledFor;
  KeyVals: KeyVal[];
};
