import { GET } from '../core';
import { InSights } from '../models/Insights';

interface InSightsQueryParam {
  since: Date,
  until: Date,
}

export const getInsightsByAdId = (adId: string, queryParam: InSightsQueryParam) => {
  const { since, until } = queryParam;
  const params = {
    time_range: { since: getDateFormat(since), until: getDateFormat(until) },
    fields: "reach,spend,impressions,adset_id,ctr,account_id,action_values,ad_name,adset_name,attribution_setting,cpc,cpp,ad_id,cpm,objective,website_ctr"
  }
  return GET<InSights>(`${adId}/insights`, params)
}

const getDateFormat = (paramDate: Date) => {
  const year = paramDate.getFullYear().toString();
  const months = paramDate.getMonth().toString();
  const date = paramDate.getDate().toString();
  return `${year}-${months}-${date}`;
}