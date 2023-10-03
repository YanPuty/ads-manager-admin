import { InSightsData } from '../Insights';

export interface AdsSets {
  data: AdsSetsData[]
  paging: Paging
}

export interface AdsSetsData {
  name: string
  campaign: Campaign
  end_time?: string;
  status: string
  id: string
  // Add On Mapped Key
  insight?: InSightsData;
  insights?: InSightsData[];
}

export interface Campaign {
  id: string
  name: string;
  lifetime_budget: string;
  start_time?: string;
  daily_budget?: string;
}

export interface Paging {
  cursors: Cursors
}

export interface Cursors {
  before: string
  after: string
}
