import { GET } from '../core';
import { AdsSets } from '../models/AdsSets';

export const getAdsSets = (actId: string): Promise<AdsSets> => {
  return GET<AdsSets>(`${actId}/ads?fields=name,campaign{name},status`);
}