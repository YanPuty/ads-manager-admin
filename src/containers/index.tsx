import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageNotFound } from '../components';
import { Sidebar } from '../core';

const LazyAdsManger = lazy(() => import('../pages/AdsManager'));

function Containers() {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route path="/" element={<LazyAdsManger />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Containers;
