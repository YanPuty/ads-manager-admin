import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Sidebar() {
  const [screenChange, setScreenChange] = useState<boolean>(false)
  const [textChange, setTextChange] = useState<boolean>(true)
  useEffect(() => {
    window.addEventListener('resize', onScreenChange)
  }, [])

  function onScreenChange() {
    if (window.innerWidth <= 640) {
      setScreenChange(true)
      setTextChange(false)
    }
    else {
      setTextChange(true)
      setScreenChange(false)
    }
  }
  function toggleMenu() {
    setTextChange(!textChange)
    if (window.innerWidth <= 640) {

    }
  }
  return (
    <>
      <main className="flex w-full h-screen">
        <aside className={`sm:hidden bg-white h-screen ${screenChange ? 'hidden' : 'flex items-center'} shadow-lg p-4 space-y-3 flex-col`}>
          <section className="flex flex-col items-center max-sm:justify-center mb-5">
            <img src="/assets/images/logo.png" alt="" />
            <h2 className={`text-2xl ${textChange && 'hidden'}`}>Ads Manager</h2>
          </section>
          <section>
            <div className="text-xs">General</div>
            <ul className="text-sm">
              <Link to="/ad-account">
                <li className="py-3 pl-2 hover:bg-slate-100 rounded-md cursor-pointer transition duration-300 ease-in-out flex items-center">
                  <img src="/assets/icons/home.svg" alt="" />
                  <span className={`ml-3 w-48 ${textChange && 'hidden'}`}>Ads Manager</span>
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
                  <span className={`ml-3 w-48 ${textChange && 'hidden'}`}>Ad Account Setup</span>
                </li>
              </Link>
              <Link to="/account-management">
                <li className="py-3 pl-2 hover:bg-slate-100 rounded-md cursor-pointer transition duration-300 ease-in-out flex items-center">
                  <img src="/assets/icons/lock.svg" alt="" />
                  <span className={`ml-3 w-48 ${textChange && 'hidden'}`}>Account Management</span>
                </li>
              </Link>
            </ul>
          </section>
        </aside>
        <aside className={`hidden sm:block bg-white h-screen  ${screenChange ? 'hidden' : 'flex items-center'} shadow-lg p-4 space-y-3 flex-col`}>
          <section className="flex flex-col items-center max-sm:justify-center mb-5">
            <img src="/assets/images/logo.png" alt="" />
            <h2 className={`text-2xl ${textChange && 'hidden'}`}>Ads Manager</h2>
          </section>
          <section>
            <div className="text-xs">General</div>
            <ul className="text-sm">
              <Link to="/ad-account">
                <li className="py-3 pl-2 hover:bg-slate-100 rounded-md cursor-pointer transition duration-300 ease-in-out flex items-center">
                  <img src="/assets/icons/home.svg" alt="" />
                  <span className={`ml-3 w-48 ${textChange && 'hidden'}`}>Ads Manager</span>
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
                  <span className={`ml-3 w-48 ${textChange && 'hidden'}`}>Ad Account Setup</span>
                </li>
              </Link>
              <Link to="/account-management">
                <li className="py-3 pl-2 hover:bg-slate-100 rounded-md cursor-pointer transition duration-300 ease-in-out flex items-center">
                  <img src="/assets/icons/lock.svg" alt="" />
                  <span className={`ml-3 w-48 ${textChange && 'hidden'}`}>Account Management</span>
                </li>
              </Link>
            </ul>
          </section>
        </aside>
        <section className="w-full p-6 space-y-6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between cursor-pointer">
              <img src="/assets/icons/hamburger.svg" onClick={toggleMenu} alt="" />
              <div>Profile</div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg h-64 text-md p-4">
            <Outlet />
          </div>
        </section>
      </main >
    </>
  );
}

export default Sidebar;
