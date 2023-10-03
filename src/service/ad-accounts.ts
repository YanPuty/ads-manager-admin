import { GET } from '../core';
import { AdAccounts } from '../models/AdAccounts';

export const getAllAdsAccounts = (): Promise<AdAccounts> => {
  return GET<AdAccounts>('me/adaccounts?fields=name,adaccounts,account_id,account_status');
}