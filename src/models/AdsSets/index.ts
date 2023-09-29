import { InSightsData } from '../Insights';

export interface AdsSets {
  data: AdsSetsData[]
  paging: Paging
}

export interface AdsSetsData {
  name: string
  campaign: Campaign
  status: string
  id: string
  // Add On Mapped Key
  insight?: InSightsData;
  insights?: InSightsData[];
}

export interface Campaign {
  name: string;
  id: string
}

export interface Paging {
  cursors: Cursors
}

export interface Cursors {
  before: string
  after: string
}
