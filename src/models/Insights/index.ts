import { Paging } from '../AdsSets';

export interface InSights {
  data: InSightsData[];
  paging: Paging;
}

export interface InSightsData {
  reach: string
  spend: string
  impressions: string
  ctr: string
  account_name: string
  ad_name: string
  adset_name: string
  cpc: string
  cpp: string
  ad_id: string;
  adset_id: string;
  cpm: string
  objective: string
  website_ctr: WebsiteCtr[]
  date_start: string
  date_stop: string
}

export interface WebsiteCtr {
  action_type: string
  value: string
}