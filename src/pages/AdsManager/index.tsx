import React from 'react';

import { DateRangePicker } from '../../core';

function AdsManagerListingPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <input
          className="input-search"
          type="text"
          placeholder="Search Filter"
          style={{ backgroundImage: "url(/assets/icons/search.svg)" }}
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
            <tr>
              <td className="text-center">1</td>
              <td className="truncate" style={{ maxWidth: "200px" }}>
                ក្រុមហ៊ុនអាមេរិក ជប៉ុន និងចិន កំពុងជោគជ័យនឹងការវិនិយោគនៅកម្ពុជា
                (Video inside) (ភ្នំពេញ)៖ ក្រុមហ៊ុនរបស់អាមេរិក ជប៉ុន និងចិន
                ដែលកំពុងវិនិយោគនៅកម្ពុជា ទទួលបានជោគ​ជ័យ និងការវិវឌ្ឍន៍ល្អប្រសើរ
                ព្រមទាំងត្រៀមការវិនិយោគនៅជំហានបន្តបន្ទាប់របស់ពួកគេ។
              </td>
              <td className="text-center">
                <div className="delivery-status active">Active</div>
              </td>
              <td className="text-center">Fresh News</td>
              <td className="text-center">10 Days</td>
              <td className="text-center">$ 1,000</td>
              <td className="text-center">Engagements</td>
              <td className="text-center">20</td>
              <td className="text-center">1000</td>
              <td className="text-center">1000</td>
            </tr>
            <tr>
              <td className="text-center">1</td>
              <td className="truncate" style={{ maxWidth: "200px" }}>
                ក្រុមហ៊ុនអាមេរិក ជប៉ុន និងចិន កំពុងជោគជ័យនឹងការវិនិយោគនៅកម្ពុជា
                (Video inside) (ភ្នំពេញ)៖ ក្រុមហ៊ុនរបស់អាមេរិក ជប៉ុន និងចិន
                ដែលកំពុងវិនិយោគនៅកម្ពុជា ទទួលបានជោគ​ជ័យ និងការវិវឌ្ឍន៍ល្អប្រសើរ
                ព្រមទាំងត្រៀមការវិនិយោគនៅជំហានបន្តបន្ទាប់របស់ពួកគេ។
              </td>
              <td className="text-center">
                <div className="delivery-status complete">Complete</div>
              </td>
              <td className="text-center">Fresh News</td>
              <td className="text-center">10 Days</td>
              <td className="text-center">$ 1,000</td>
              <td className="text-center">Engagements</td>
              <td className="text-center">20</td>
              <td className="text-center">1000</td>
              <td className="text-center">1000</td>
            </tr>
            <tr>
              <td className="text-center">1</td>
              <td className="truncate" style={{ maxWidth: "200px" }}>
                ក្រុមហ៊ុនអាមេរិក ជប៉ុន និងចិន កំពុងជោគជ័យនឹងការវិនិយោគនៅកម្ពុជា
                (Video inside) (ភ្នំពេញ)៖ ក្រុមហ៊ុនរបស់អាមេរិក ជប៉ុន និងចិន
                ដែលកំពុងវិនិយោគនៅកម្ពុជា ទទួលបានជោគ​ជ័យ និងការវិវឌ្ឍន៍ល្អប្រសើរ
                ព្រមទាំងត្រៀមការវិនិយោគនៅជំហានបន្តបន្ទាប់របស់ពួកគេ។
              </td>
              <td className="text-center">
                <div className="delivery-status error">Error</div>
              </td>
              <td className="text-center">Fresh News</td>
              <td className="text-center">10 Days</td>
              <td className="text-center">$ 1,000</td>
              <td className="text-center">Engagements</td>
              <td className="text-center">20</td>
              <td className="text-center">1000</td>
              <td className="text-center">1000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdsManagerListingPage;
