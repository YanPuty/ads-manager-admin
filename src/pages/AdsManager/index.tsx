/* eslint-disable react-hooks/exhaustive-deps */
import { filter, find, flatMap } from 'lodash';
import React, { useEffect, useState } from 'react';

import { DateRangePicker, DateTypeParam, Dropdown } from '../../core';
import { useApi } from '../../hooks';
import { AdAccountsData } from '../../models/AdAccounts';
import { AdsSetsData } from '../../models/AdsSets';
import { InSights } from '../../models/Insights';
import { getAllAdsAccounts } from '../../service/ad-accounts';
import { getAdsSets } from '../../service/ads-manager';
import { getInsightsByAdId } from '../../service/insights';

function AdsManagerListingPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [adsSetsDate, setAdsSetData] = useState<AdsSetsData[]>([]);
  const [adAccounts, setAdAccounts] = useState<AdAccountsData[]>([]);

  const [since, setSince] = useState<Date | null>(new Date(2022, 7, 6));
  const [until, setUnTil] = useState<Date | null>(new Date(2023, 8, 29));

  const { response: allAdsAccount } = useApi({
    service: getAllAdsAccounts,
    params: {},
    effects: [],
  });

  useEffect(() => {
    if (allAdsAccount && allAdsAccount.data.length) {
      const mappedData = allAdsAccount.data.map((item) => ({
        ...item,
        name: item.name.concat(" (", item.account_id, ")"),
      }));
      setAdAccounts(mappedData);
      setSelectedId(mappedData[0].id);
    }
  }, [allAdsAccount]);

  useEffect(() => {
    if (selectedId) {
      getAdsSets(selectedId).then((response) => {
        const data = response.data;
        setAdsSetData(data);
      });
    }
  }, [selectedId]);

  useEffect(() => {
    if (adsSetsDate.length && since && until) {
      const queryParam = { since, until };
      const allInSightsPromise = adsSetsDate.map((item) =>
        getInsightsByAdId(item.id, queryParam),
      );

      Promise.all(allInSightsPromise).then((insights: InSights[]) => {
        const flatMapInsight = flatMap(insights, ({ data }) => data);
        const adsSetData = adsSetsDate.map((row) => ({
          ...row,
          insight: find(flatMapInsight, { ad_id: row.id }),
          insights: filter(flatMapInsight, { ad_id: row.id }),
        }));
        setAdsSetData(adsSetData);
      });
    }
  }, [adsSetsDate.length, since, until]);

  const onChangeDate = (param: DateTypeParam) => {
    const { from, to } = param;
    if (from && to) {
      setSince(from);
      setUnTil(to);
    }
  };

  return (
    <div>
      <div className="flex gap-x-4 flex-wrap">
        <input
          className="input-search"
          type="text"
          placeholder="Search Filter"
          style={{ backgroundImage: "url(/assets/icons/search.svg)" }}
        />
        <Dropdown
          classNames="w-80"
          category="Select User"
          items={adAccounts}
          onChange={({ id }) => setSelectedId(id)}
        />
        <DateRangePicker from={since} to={until} onChange={onChangeDate} />
      </div>
      <div className="overflow-scroll" style={{ maxHeight: "80vh" }}>
        <table className="table mt-5">
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 ">No</th>
              <th className="sticky top-0 px-6 py-3 ">Ad</th>
              <th className="sticky top-0 px-6 py-3 ">Delivery</th>
              <th className="sticky top-0 px-6 py-3 ">Page Name</th>
              <th className="sticky top-0 px-6 py-3 ">Days</th>
              <th className="sticky top-0 px-6 py-3 ">Budgets</th>
              <th className="sticky top-0 px-6 py-3 ">Objective</th>
              <th className="sticky top-0 px-6 py-3 ">Reach</th>
              <th className="sticky top-0 px-6 py-3 ">Impression</th>
              <th className="sticky top-0 px-6 py-3 ">Amount Spend</th>
            </tr>
          </thead>

          <tbody>
            {adsSetsDate.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td className="truncate" style={{ maxWidth: "200px" }}>
                  {item.name}
                </td>
                <td className="text-center">
                  <div className="delivery-status active">{item.status}</div>
                </td>
                <td className="text-center">{item.campaign.name}</td>
                <td className="text-center">10 Days</td>
                <td className="text-center">$ 1,000</td>
                <td className="text-center">{item.insight?.objective}</td>
                <td className="text-center">{item.insight?.reach}</td>
                <td className="text-center">{item.insight?.impressions}</td>
                <td className="text-center">
                  {item.insight?.spend ? `$ ${item.insight?.spend}` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdsManagerListingPage;
