import React, { useEffect, useState } from 'react';

import { DateRangePicker, Dropdown } from '../../core';
import { useApi } from '../../hooks';
import { AdAccountsData } from '../../models/AdAccounts';
import { AdsSetsData } from '../../models/AdsSets';
import { getAllAdsAccounts } from '../../service/ad-accounts';
import { getAdsSets } from '../../service/ads-manager';

function AdsManagerListingPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [adsSetsDate, setAdsSetData] = useState<AdsSetsData[]>([]);
  const [adAccounts, setAdAccounts] = useState<AdAccountsData[]>([]);

  const { response: allAdsAccount } = useApi({
    service: getAllAdsAccounts,
    params: {},
    effects: [],
  });

  useEffect(() => {
    if (allAdsAccount && allAdsAccount.data.length) {
      const mappedData = allAdsAccount.data.map((item) => ({
        ...item,
        name: item.name.concat(' (', item.account_id, ')'),
      }));
      setAdAccounts(mappedData);
      setSelectedId(mappedData[0].id);
    }
  }, [allAdsAccount]);

  useEffect(() => {
    if (selectedId) {
      getAdsSets(selectedId).then((response) => {
        if (response && response.data) {
          setAdsSetData(response.data);
        }
      });
    }
  }, [selectedId]);

  return (
    <div>
      <div className="flex gap-x-4">
        <input
          className="input-search"
          type="text"
          placeholder="Search Filter"
          style={{ backgroundImage: 'url(/assets/icons/search.svg)' }}
        />
        <Dropdown
          classNames="w-60"
          category="Select User"
          items={adAccounts}
          onChange={({ id }) => setSelectedId(id)}
        />
        <DateRangePicker />
      </div>
      <div className="overflow-scroll" style={{ maxHeight: '80vh' }}>
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
              <th className="sticky top-0 px-6 py-3 ">Impression</th>
            </tr>
          </thead>

          <tbody>
            {adsSetsDate.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td className="truncate" style={{ maxWidth: '200px' }}>
                  {item.name}
                </td>
                <td className="text-center">
                  <div className="delivery-status active">Active</div>
                </td>
                <td className="text-center">{item.campaign.name}</td>
                <td className="text-center">10 Days</td>
                <td className="text-center">$ 1,000</td>
                <td className="text-center">Engagements</td>
                <td className="text-center">20</td>
                <td className="text-center">1000</td>
                <td className="text-center">1000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdsManagerListingPage;
