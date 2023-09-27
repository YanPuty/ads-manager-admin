import { GET } from '../core';
import { AdsSets } from '../models/AdsSets';

export const getAdsSets = (): Promise<AdsSets> => {
  return GET<AdsSets>('act_1030357531162042/ads?fields=name,campaign{name},status');
}