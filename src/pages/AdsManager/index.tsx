/* eslint-disable react-hooks/exhaustive-deps */
import { filter, find, flatMap } from "lodash";
import React, { useEffect, useState } from "react";

import {
  Alert,
  DateRangePicker,
  DateTypeParam,
  Dropdown,
  ItemList,
} from "../../core";
import { AccountStatus } from "../../enums/AccountStatus";
import { useApi } from "../../hooks";
import { AdAccountsData } from "../../models/AdAccounts";
import { AdsSetsData } from "../../models/AdsSets";
import { InSights } from "../../models/Insights";
import { getAllAdsAccounts } from "../../service/ad-accounts";
import { getAdsSets } from "../../service/ads-manager";
import { getInsightsByAdId } from "../../service/insights";

function AdsManagerListingPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [accountStatus, setAccountStatus] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  const [adsSetsDate, setAdsSetData] = useState<AdsSetsData[]>([]);
  const [adAccounts, setAdAccounts] = useState<AdAccountsData[]>([]);
  const [items, setItems] = useState<AdsSetsData[]>([]);

  const [since, setSince] = useState<Date | null>(new Date(2022, 7, 6));
  const [until, setUnTil] = useState<Date | null>(new Date());
  //
  const [loading, setLoading] = useState(false);
  const [isFetchingInsight, setIsFetchingInsight] = useState(false);

  const { response: allAdsAccount } = useApi({
    service: getAllAdsAccounts,
    params: {},
    effects: [],
  });

  useEffect(() => {
    if (allAdsAccount?.data.length) {
      const mappedData = allAdsAccount.data.map((item) => ({
        ...item,
        name: item.name.concat(" (", item.account_id, ")"),
      }));
      setAdAccounts(mappedData);
      setSelectedId(mappedData[0].id);
      setAccountStatus(mappedData[0].account_status);
    }
  }, [allAdsAccount]);

  useEffect(() => {
    if (selectedId) {
      setLoading(true);
      getAdsSets(selectedId).then((response) => {
        const data = response.data;
        setLoading(false);
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
      setIsFetchingInsight(true);
      Promise.all(allInSightsPromise).then((insights: InSights[]) => {
        const flatMapInsight = flatMap(insights, ({ data }) => data);
        const adsSetData = adsSetsDate.map((row) => ({
          ...row,
          insight: find(flatMapInsight, { ad_id: row.id }),
          insights: filter(flatMapInsight, { ad_id: row.id }),
        }));
        setAdsSetData(adsSetData);
        setIsFetchingInsight(false);
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

  useEffect(() => {
    const filterSearch = adsSetsDate.filter(
      (item) =>
        item.name
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchInput.replace(/\s/g, "").toLowerCase()) ||
        item.campaign.name
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchInput.replace(/\s/g, "").toLowerCase()) ||
        item.status
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchInput.replace(/\s/g, "").toLowerCase()) ||
        item.insight?.objective
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchInput.replace(/\s/g, "").toLowerCase()) ||
        item.insight?.reach
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchInput.replace(/\s/g, "").toLowerCase()) ||
        item.insight?.impressions
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchInput.replace(/\s/g, "").toLowerCase()) ||
        item.insight?.spend
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchInput.replace(/\s/g, "").toLowerCase()),
    );
    setItems(filterSearch);
  }, [searchInput, adsSetsDate]);

  const formatNumber = (amount = "0") => {
    if (Number.isNaN(amount)) {
      return 0;
    }
    return Number(Number(amount) / 100).toFixed(2);
  };

  const formatNumberWithComma = (amount = "0") => {
    if (Number.isNaN(amount)) {
      return 0;
    }
    return Number(amount).toLocaleString();
  };

  const onChangeSelectedAccount = ({ id }: ItemList) => {
    const accountStatus = find(adAccounts, { id: id })?.account_status ?? null;
    setSelectedId(id);
    setAccountStatus(accountStatus);
  };

  const isNotActive = ![
    AccountStatus.ACTIVE,
    AccountStatus.ANY_ACTIVE,
  ].includes(accountStatus ?? -1);

  const fetchingInSightWrapper = (child: any) => {
    if (isFetchingInsight) {
      return <div className="h-4 bg-gray-200 mb-6 rounded"></div>;
    }
    return child;
  };

  return (
    <div>
      <div className="flex gap-4 flex-wrap">
        <input
          className="input-search"
          type="text"
          placeholder="Search Filter"
          style={{ backgroundImage: "url(/assets/icons/search.svg)" }}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {adAccounts.length > 0 && (
          <>
            <Dropdown
              classNames="w-80"
              category="Select User"
              items={adAccounts}
              value={selectedId}
              onChange={onChangeSelectedAccount}
            />
            <DateRangePicker from={since} to={until} onChange={onChangeDate} />
          </>
        )}
      </div>
      <div>
        {accountStatus && isNotActive && (
          <Alert
            type="danger"
            title="Facebook account is restricted from advertising"
            description="its assets can't be used to advertise because the account didn't comply with our Advertising Policies affecting business assets or other standards."
          />
        )}
      </div>

      <div className="overflow-scroll" style={{ maxHeight: "80vh" }}>
        <table className="table mt-5 relative">
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 ">No</th>
              <th className="sticky top-0 px-6 py-3 ">Ad</th>
              <th className="sticky top-0 px-6 py-3 ">Delivery</th>
              <th className="sticky top-0 px-6 py-3 ">Page Name</th>
              <th className="sticky top-0 px-6 py-3 ">Budgets</th>
              <th className="sticky top-0 px-6 py-3 ">Objective</th>
              <th className="sticky top-0 px-6 py-3 ">Reach</th>
              <th className="sticky top-0 px-6 py-3 ">Impression</th>
              <th className="sticky top-0 px-6 py-3 ">Amount Spend</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              !loading &&
              items.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="truncate" style={{ maxWidth: "200px" }}>
                    {item.name}
                  </td>
                  <td className="text-center">
                    <div className="delivery-status active">{item.status}</div>
                  </td>
                  <td className="text-center">{item.campaign.name}</td>
                  <td className="text-center">
                    $ {formatNumber(item.campaign.lifetime_budget)}
                  </td>
                  <td className="text-center">
                    {fetchingInSightWrapper(item.insight?.objective)}
                  </td>
                  <td className="text-center">
                    {fetchingInSightWrapper(
                      formatNumberWithComma(item.insight?.reach),
                    )}
                  </td>
                  <td className="text-center">
                    {fetchingInSightWrapper(
                      formatNumberWithComma(item.insight?.impressions),
                    )}
                  </td>
                  <td className="text-center">
                    {fetchingInSightWrapper(
                      item.insight?.spend ? `$ ${item.insight?.spend}` : "",
                    )}
                  </td>
                </tr>
              ))}
            {loading && (
              <tr>
                <td colSpan={9}>
                  <div
                    role="status"
                    className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={9}>
                  <div className="py-10">
                    <p className="absolute left-[50%] translate-x-[-50%] font-light italic">
                      There is no available data for this user
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdsManagerListingPage;
