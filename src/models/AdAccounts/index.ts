import { Paging } from '../AdsSets';

export interface AdAccounts {
  data: AdAccountsData[];
  paging: Paging;
}

export interface AdAccountsData {
  id: string;
  name: string;
  account_id: string;
  account_status: number;
}