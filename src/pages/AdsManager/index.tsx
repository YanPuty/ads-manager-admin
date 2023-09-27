import React, { useEffect, useState } from 'react';

import { DateRangePicker } from '../../core';
import { useApi } from '../../hooks';
import { AdsSetsData } from '../../models/AdsSets';
import { getAdsSets } from '../../service/ads-manager';

function AdsManagerListingPage() {
  const [adsSetsDate, setAdsSetData] = useState<AdsSetsData[]>([]);
  const { response } = useApi({ service: getAdsSets, params: {}, effects: [] });

  useEffect(() => {
    if (response && response.data) {
      setAdsSetData(response.data);
    }
  }, [response]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <input
          className="input-search"
          type="text"
          placeholder="Search Filter"
          style={{ backgroundImage: 'url(/assets/icons/search.svg)' }}
        />
        <DateRangePicker />
      </div>
      <div className="overflow-scroll">
        <table className="table mt-5">
          <thead>
            <tr>
              <th>No</th>
              <th>Ad</th>
              <th>Delivery</th>
              <th>Page Name</th>
              <th>Days</th>
              <th>Budgets</th>
              <th>Objective</th>
              <th>Reach</th>
              <th>Impression</th>
              <th>Impression</th>
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
