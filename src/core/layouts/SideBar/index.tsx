import { Link, Outlet } from 'react-router-dom';

function Sidebar() {
  return (
    <>
      <main className="flex w-full h-screen">
        <aside className="bg-white w-64 h-screen shadow-lg p-4 space-y-3">
          <section className="flex items-center max-sm:justify-center flex-wrap">
            <img src="/assets/images/logo.png" alt="" />
            <h2 className="text-2xl">Ads Manager</h2>
          </section>
          <section>
            <div className="text-xs">General</div>
            <ul className=" text-sm">
              <Link to="/ad-account">
                <li className="py-3 pl-2 hover:bg-slate-100 rounded-md cursor-pointer transition duration-300 ease-in-out flex items-center">
                  <img src="/assets/icons/home.svg" alt="" />
                  <span className="ml-3">Ads Manager</span>
                </li>
              </Link>
            </ul>
          </section>
          <section className="space-y-3">
            <div className="text-xs">Setting</div>
            <ul className="text-sm">
              <Link to="/ad-account">
                <li className="py-3 pl-2 hover:bg-slate-100 rounded-md cursor-pointer transition duration-300 ease-in-out flex items-center">
                  <img src="/assets/icons/users.svg" alt="" />
                  <span className="ml-3">Ad Account Setup</span>
                </li>
              </Link>
              <Link to="/account-management">
                <li className="py-3 pl-2 hover:bg-slate-100 rounded-md cursor-pointer transition duration-300 ease-in-out flex items-center">
                  <img src="/assets/icons/lock.svg" alt="" />
                  <span className="ml-3">Account Management</span>
                </li>
              </Link>
            </ul>
          </section>
        </aside>
        <section className="w-full p-6 space-y-6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <img src="/assets/icons/hamburger.svg" alt="" />
              <div>Profile</div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg h-64 text-md p-4">
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
}

export default Sidebar;
