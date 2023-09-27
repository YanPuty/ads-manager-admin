import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Dropdown } from "../../../components";

function Sidebar() {
  const [screenChange, setScreenChange] = useState<boolean>(false);
  const [textChange, setTextChange] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("resize", onScreenChange);
  });

  function onScreenChange() {
    if (window.innerWidth <= 640) {
      setScreenChange(true);
      setTextChange(!textChange);
      setToggle(true);
    } else {
      setTextChange(true);
      setScreenChange(false);
    }
  }

  function toggleHamburger() {
    setTextChange(!textChange);
    setToggle(!toggle);
  }

  return (
    <>
      <main className="flex w-full h-screen">
        <aside
          className={`overflow-hidden h-screen z-30 bg-white absolute sm:relative shadow-lg p-4 space-y-3 top-0 sm:left-0 animate duration-300
          ${textChange && !screenChange ? "min-w-20 flex flex-col items-center" : "min-w-[300px]"}
          ${!toggle ? "left-[0%]" : "left-[-100%] "}`}
        >
          <section className="flex flex-col items-center max-sm:justify-start">
            <img
              src="/assets/icons/delete.svg"
              alt=""
              onClick={toggleHamburger}
              className={`sm:hidden absolute left-[85%] p-2 top-0 cursor-pointer`}
            />
            <div className="flex self-start items-center">
              <img src="/assets/images/logo.png" alt="" />
              <h2
                className={`text-2xl duration-300 animate whitespace-nowrap ${textChange && !screenChange && "hidden"}`}
              >
                Ads Manager
              </h2>
            </div>
          </section>
          <section>
            <div className={`${toggle ? 'flex flex-col justify-center text-center items-center' : 'text-left'} pb-3 space-y-5`}>
              <h2 className='text-xs'>Facebook Account</h2>
              {toggle && <img src="/assets/icons/apple.svg" alt="" className='bg-slate-500 p-3 rounded-full text-sm' />}
            </div>
            <Dropdown category="Select User" toggle={toggle} pic={true} items={['User 1', 'User 2']} />
          </section>
          <section>
            <div className="text-xs">General</div>
            <ul className=" text-sm">
              <Link to="/ad-account">
                <li className="py-3 pl-2 mt-2 hover:bg-slate-100 rounded-md cursor-pointer transition duration-300 ease-in-out flex items-center">
                  <img src="/assets/icons/home.svg" alt="" />
                  <span
                    className={`ml-3 duration-500 animate ${textChange && !screenChange && "hidden"}`}
                  >
                    Ads Manager
                  </span>
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
                  <span
                    className={`ml-3 duration-500 animate ${textChange && !screenChange && "hidden"}`}
                  >
                    Ad Account Setup
                  </span>
                </li>
              </Link>
              <Link to="/account-management">
                <li className="py-3 pl-2 hover:bg-slate-100 rounded-md cursor-pointer transition duration-300 ease-in-out flex items-center">
                  <img src="/assets/icons/lock.svg" alt="" />
                  <span
                    className={`ml-3 duration-500 animate ${textChange && !screenChange && "hidden"}`}
                  >
                    Account Management
                  </span>
                </li>
              </Link>
            </ul>
          </section>
        </aside>
        <section className="w-full p-6 space-y-6 overflow-scroll">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <img
                src="/assets/icons/hamburger.svg"
                alt=""
                onClick={toggleHamburger}
                className="cursor-pointer"
              />
              <div className="flex items-center cursor-pointer">
                <div className="mr-4">
                  <div className="font-medium">Edgar Jones</div>
                  <div className="text-xs text-right">Advertiser</div>
                </div>
                <img src="/assets/images/logo.png" alt="" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 mb-3">
            <h2 className="font-bold">Ad Account</h2>
            <Dropdown category="Select Ad Account" addedStyle="min-w-[350px]" pic={false} items={['Ad Account(123456789)']} />
          </div>
          <div className="w-full bg-white rounded-lg p-4">
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
}

export default Sidebar;
