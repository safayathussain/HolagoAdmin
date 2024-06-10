"use client";
import logo from "@/public/image/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CiMenuFries, CiMenuBurger } from "react-icons/ci";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <section
      className={`block md:hidden
  `}
    >
      <div className="flex justify-between items-center my-5">
        <div>
          <Image src={logo} alt="logo" />
        </div>
        <div>
          {open ? (
            <CiMenuBurger onClick={handleOpen} className="text-3xl" />
          ) : (
            <CiMenuFries onClick={handleOpen} className="text-3xl" />
          )}
        </div>
      </div>
      <aside
        className={`md:block ${
          open ? "block" : "hidden"
        } z-50 absolute top-0 left-0`}
      >
        <div className="min-h-screen flex flex-row w-[290px] shadow-xl">
          <div className="flex flex-col bg-white overflow-hidden px-3 w-full">
            <div className="flex items-center justify-center my-5 w-full">
              <Link className="w-full" href="/dashboard">
                <Image
                  src={logo}
                  alt="best electronic logo"
                  quality={100}
                  loading="lazy"
                  sizes="100vw"
                  className="w-full h-full object-contain "
                />
              </Link>
            </div>
            <ul className="flex flex-col py-2">
              <li>
                <Link
                  href="/dashboard"
                  className={`flex flex-row items-center duration-700 text-black ${
                    pathname == "/dashboard" ? "bg-black text-white" : ""
                  } hover:bg-black rounded-xl my-1 py-0 group`}
                >
                  <span className="inline-flex items-center justify-center px-2 py-2 text-lg">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard"
                          ? "hidden"
                          : "group-hover:hidden duration-700"
                      }`}
                    >
                      <circle
                        cx="16.75"
                        cy="5.25"
                        r="4.25"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <circle
                        cx="5.25"
                        cy="5.25"
                        r="4.25"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <circle
                        cx="16.75"
                        cy="16.75"
                        r="4.25"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <circle
                        cx="5.25"
                        cy="16.75"
                        r="4.25"
                        stroke="black"
                        stroke-width="1.5"
                      />
                    </svg>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard"
                          ? "block"
                          : " hidden group-hover:block "
                      } duration-700`}
                    >
                      <circle
                        cx="16.75"
                        cy="5.25"
                        r="4.25"
                        stroke="white"
                        stroke-width="1.5"
                      />
                      <circle
                        cx="5.25"
                        cy="5.25"
                        r="4.25"
                        stroke="white"
                        stroke-width="1.5"
                      />
                      <circle
                        cx="16.75"
                        cy="16.75"
                        r="4.25"
                        stroke="white"
                        stroke-width="1.5"
                      />
                      <circle
                        cx="5.25"
                        cy="16.75"
                        r="4.25"
                        stroke="white"
                        stroke-width="1.5"
                      />
                    </svg>
                  </span>
                  <span className="text-sm group-hover:text-white ml-3">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/orders"
                  className={`flex flex-row items-center duration-700 text-black ${
                    pathname == "/dashboard/orders" ? "bg-black text-white" : ""
                  } hover:bg-black rounded-xl my-1 py-0 group`}
                >
                  <span className="inline-flex items-center justify-center px-2 py-2 text-lg group">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/orders"
                          ? "hidden"
                          : "group-hover:hidden duration-700"
                      }`}
                    >
                      <path
                        d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H6"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 22C11.3284 22 12 21.3284 12 20.5C12 19.6716 11.3284 19 10.5 19C9.67157 19 9 19.6716 9 20.5C9 21.3284 9.67157 22 10.5 22Z"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M17.5 22C18.3284 22 19 21.3284 19 20.5C19 19.6716 18.3284 19 17.5 19C16.6716 19 16 19.6716 16 20.5C16 21.3284 16.6716 22 17.5 22Z"
                        stroke="black"
                        stroke-width="1.5"
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/orders"
                          ? "block"
                          : " hidden group-hover:block "
                      } duration-700`}
                    >
                      <path
                        d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H6"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 22C11.3284 22 12 21.3284 12 20.5C12 19.6716 11.3284 19 10.5 19C9.67157 19 9 19.6716 9 20.5C9 21.3284 9.67157 22 10.5 22Z"
                        stroke="white"
                        stroke-width="1.5"
                      />
                      <path
                        d="M17.5 22C18.3284 22 19 21.3284 19 20.5C19 19.6716 18.3284 19 17.5 19C16.6716 19 16 19.6716 16 20.5C16 21.3284 16.6716 22 17.5 22Z"
                        stroke="white"
                        stroke-width="1.5"
                      />
                    </svg>
                  </span>
                  <span className="text-sm group-hover:text-white ml-3">
                    Orders
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/products"
                  className={`flex flex-row items-center duration-700 text-black ${
                    pathname == "/dashboard/products"
                      ? "bg-black text-white"
                      : ""
                  } hover:bg-black rounded-xl my-1 py-0 group`}
                >
                  <span className="inline-flex items-center justify-center px-2 py-2 text-lg group">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/products"
                          ? "hidden"
                          : "group-hover:hidden duration-700"
                      }`}
                    >
                      <path
                        d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10C22 13.7712 22 15.6569 20.8284 16.8284C19.6569 18 17.7712 18 14 18H10C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 22C14.8233 21.364 13.4571 21 12 21C10.5429 21 9.17669 21.364 8 22"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/products"
                          ? "block"
                          : " hidden group-hover:block "
                      } duration-700`}
                    >
                      <path
                        d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10C22 13.7712 22 15.6569 20.8284 16.8284C19.6569 18 17.7712 18 14 18H10C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 22C14.8233 21.364 13.4571 21 12 21C10.5429 21 9.17669 21.364 8 22"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm group-hover:text-white ml-3">
                    Products
                  </span>
                </Link>
                <ul
                  className={`ml-[53px] ${
                    pathname == "/dashboard/products" ||
                    pathname == "/dashboard/products/categories"
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      href="/dashboard/products/categories"
                      className={`${
                        pathname == "/dashboard/products/categories" ? "" : ""
                      }  rounded-md py-1 flex justify-start`}
                    >
                      {pathname == "/dashboard/products/categories" ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="9" cy="9" r="9" fill="black" />
                          <circle cx="9" cy="9" r="6" fill="white" />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="9"
                            cy="9"
                            r="8.5"
                            fill="#E5E7EB"
                            stroke="#D1D5DB"
                          />
                        </svg>
                      )}
                      <span className="text-sm mx-3">Categories</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  href="/dashboard/outlets"
                  className={`flex flex-row items-center duration-700 text-black ${
                    pathname == "/dashboard/outlets"
                      ? "bg-black text-white"
                      : ""
                  } hover:bg-black rounded-xl my-1 py-0 group`}
                >
                  <span className="inline-flex items-center justify-center px-2 py-2 text-lg group">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/outlets"
                          ? "hidden"
                          : "group-hover:hidden duration-700"
                      }`}
                    >
                      <path
                        d="M2.9668 10.4956V15.4974C2.9668 18.3268 2.9668 19.7415 3.84548 20.6205C4.72416 21.4996 6.13837 21.4996 8.9668 21.4996H14.9668C17.7952 21.4996 19.2094 21.4996 20.0881 20.6205C20.9668 19.7415 20.9668 18.3268 20.9668 15.4974V10.4956"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M6.9668 17.9932H10.9668"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M10.1038 8.41799C9.82182 9.43639 8.79628 11.1931 6.84777 11.4477C5.12733 11.6725 3.82246 10.9216 3.48916 10.6076C3.12168 10.353 2.28416 9.53823 2.07906 9.02903C1.87395 8.51983 2.11324 7.41657 2.28416 6.96678L2.96743 4.98839C3.13423 4.49147 3.5247 3.31617 3.92501 2.91864C4.32533 2.52111 5.13581 2.50381 5.4694 2.50381H12.4749C14.2781 2.52929 18.2209 2.48774 19.0003 2.50382C19.7797 2.5199 20.2481 3.17324 20.3848 3.4533C21.5477 6.27012 22 7.88334 22 8.57075C21.8482 9.30407 21.22 10.6868 19.0003 11.295C16.6933 11.9271 15.3854 10.6976 14.9751 10.2257M9.15522 10.2257C9.47997 10.6245 10.4987 11.4274 11.9754 11.4477C13.4522 11.4681 14.7273 10.4378 15.1802 9.92013C15.3084 9.76737 15.5853 9.31419 15.8725 8.41799"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/outlets"
                          ? "block"
                          : " hidden group-hover:block "
                      } duration-700`}
                    >
                      <path
                        d="M2.9668 10.4956V15.4974C2.9668 18.3268 2.9668 19.7415 3.84548 20.6205C4.72416 21.4996 6.13837 21.4996 8.9668 21.4996H14.9668C17.7952 21.4996 19.2094 21.4996 20.0881 20.6205C20.9668 19.7415 20.9668 18.3268 20.9668 15.4974V10.4956"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M6.9668 17.9932H10.9668"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M10.1038 8.41799C9.82182 9.43639 8.79628 11.1931 6.84777 11.4477C5.12733 11.6725 3.82246 10.9216 3.48916 10.6076C3.12168 10.353 2.28416 9.53823 2.07906 9.02903C1.87395 8.51983 2.11324 7.41657 2.28416 6.96678L2.96743 4.98839C3.13423 4.49147 3.5247 3.31617 3.92501 2.91864C4.32533 2.52111 5.13581 2.50381 5.4694 2.50381H12.4749C14.2781 2.52929 18.2209 2.48774 19.0003 2.50382C19.7797 2.5199 20.2481 3.17324 20.3848 3.4533C21.5477 6.27012 22 7.88334 22 8.57075C21.8482 9.30407 21.22 10.6868 19.0003 11.295C16.6933 11.9271 15.3854 10.6976 14.9751 10.2257M9.15522 10.2257C9.47997 10.6245 10.4987 11.4274 11.9754 11.4477C13.4522 11.4681 14.7273 10.4378 15.1802 9.92013C15.3084 9.76737 15.5853 9.31419 15.8725 8.41799"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm group-hover:text-white ml-3">
                    Outlets
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/customers"
                  className={`flex flex-row items-center duration-700 text-black ${
                    pathname == "/dashboard/customers"
                      ? "bg-black text-white"
                      : ""
                  } hover:bg-black rounded-xl my-1 py-0 group`}
                >
                  <span className="inline-flex items-center justify-center px-2 py-2 text-lg group">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/customers"
                          ? "hidden"
                          : "group-hover:hidden duration-700"
                      }`}
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/customers"
                          ? "block"
                          : " hidden group-hover:block "
                      } duration-700`}
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="white"
                        stroke-width="1.5"
                      />
                      <path
                        d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm group-hover:text-white ml-3">
                    Customers
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/reporting"
                  className={`flex flex-row items-center duration-700 text-black ${
                    pathname == "/dashboard/reporting"
                      ? "bg-black text-white"
                      : ""
                  } hover:bg-black rounded-xl my-1 py-0 group`}
                >
                  <span className="inline-flex items-center justify-center px-2 py-2 text-lg group">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/reporting"
                          ? "hidden"
                          : "group-hover:hidden duration-700"
                      }`}
                    >
                      <path
                        d="M15 2.5V4C15 5.41421 15 6.12132 15.4393 6.56066C15.8787 7 16.5858 7 18 7H19.5"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14.1716C14.5803 2 14.7847 2 14.9685 2.07612C15.1522 2.15224 15.2968 2.29676 15.5858 2.58579L19.4142 6.41421C19.7032 6.70324 19.8478 6.84776 19.9239 7.03153C20 7.2153 20 7.41968 20 7.82843V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16Z"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 11H16M8 14H16M8 17H12.1708"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/reporting"
                          ? "block"
                          : " hidden group-hover:block "
                      } duration-700`}
                    >
                      <path
                        d="M15 2.5V4C15 5.41421 15 6.12132 15.4393 6.56066C15.8787 7 16.5858 7 18 7H19.5"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14.1716C14.5803 2 14.7847 2 14.9685 2.07612C15.1522 2.15224 15.2968 2.29676 15.5858 2.58579L19.4142 6.41421C19.7032 6.70324 19.8478 6.84776 19.9239 7.03153C20 7.2153 20 7.41968 20 7.82843V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 11H16M8 14H16M8 17H12.1708"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm group-hover:text-white ml-3">
                    Reporting
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/coupon"
                  className={`flex flex-row items-center duration-700 text-black ${
                    pathname == "/dashboard/coupon" ? "bg-black text-white" : ""
                  } hover:bg-black rounded-xl my-1 py-0 group`}
                >
                  <span className="inline-flex items-center justify-center px-2 py-2 text-lg group">
                    <svg
                      className={`${
                        pathname == "/dashboard/coupon"
                          ? "hidden"
                          : "group-hover:hidden duration-700"
                      }`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8738 21.5123L8.84345 20.3072C8.32816 20.0014 8.07051 19.8484 7.78457 19.8396C7.47557 19.83 7.21336 19.9767 6.65655 20.3072C6.03294 20.6774 4.79293 21.697 3.99083 21.2108C3.5 20.9132 3.5 20.1574 3.5 18.6457V8C3.5 5.17157 3.5 3.75736 4.37868 2.87868C5.25736 2 6.67157 2 9.5 2H14.5C17.3284 2 18.7426 2 19.6213 2.87868C20.5 3.75736 20.5 5.17157 20.5 8V18.6457C20.5 20.1574 20.5 20.9132 20.0092 21.2108C19.2071 21.697 17.9671 20.6774 17.3434 20.3072C16.8282 20.0014 16.5705 19.8484 16.2846 19.8396C15.9756 19.83 15.7134 19.9767 15.1566 20.3072L13.1262 21.5123C12.5786 21.8374 12.3047 21.9999 12 21.9999C11.6953 21.9999 11.4214 21.8374 10.8738 21.5123Z"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 8L9 14"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 14H14.991M9.00897 8H9"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg
                      className={`${
                        pathname == "/dashboard/coupon"
                          ? "block"
                          : " hidden group-hover:block "
                      } duration-700`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8738 21.5123L8.84345 20.3072C8.32816 20.0014 8.07051 19.8484 7.78457 19.8396C7.47557 19.83 7.21336 19.9767 6.65655 20.3072C6.03294 20.6774 4.79293 21.697 3.99083 21.2108C3.5 20.9132 3.5 20.1574 3.5 18.6457V8C3.5 5.17157 3.5 3.75736 4.37868 2.87868C5.25736 2 6.67157 2 9.5 2H14.5C17.3284 2 18.7426 2 19.6213 2.87868C20.5 3.75736 20.5 5.17157 20.5 8V18.6457C20.5 20.1574 20.5 20.9132 20.0092 21.2108C19.2071 21.697 17.9671 20.6774 17.3434 20.3072C16.8282 20.0014 16.5705 19.8484 16.2846 19.8396C15.9756 19.83 15.7134 19.9767 15.1566 20.3072L13.1262 21.5123C12.5786 21.8374 12.3047 21.9999 12 21.9999C11.6953 21.9999 11.4214 21.8374 10.8738 21.5123Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 8L9 14"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 14H14.991M9.00897 8H9"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm group-hover:text-white ml-3">
                    Coupon
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className={`flex flex-row items-center duration-700 text-black ${
                    pathname == "/dashboard/settings"
                      ? "bg-black text-white"
                      : ""
                  } hover:bg-black rounded-xl my-1 py-0 group`}
                >
                  <span className="inline-flex items-center justify-center px-2 py-2 text-lg group">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/settings"
                          ? "hidden"
                          : "group-hover:hidden duration-700"
                      }`}
                    >
                      <path
                        d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z"
                        stroke="black"
                        stroke-width="1.5"
                      />
                    </svg>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/settings"
                          ? "block"
                          : " hidden group-hover:block "
                      } duration-700`}
                    >
                      <path
                        d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z"
                        stroke="white"
                        stroke-width="1.5"
                      />
                    </svg>
                  </span>
                  <span className="text-sm group-hover:text-white ml-3">
                    Settings
                  </span>
                </Link>
              </li>
              <li>
                <div className="w-full border border-[#C3DDFD] my-5"></div>
              </li>
              <li>
                <Link
                  href="/dashboard/usermanagement"
                  className={`flex flex-row items-center duration-700 text-black ${
                    pathname == "/dashboard/usermanagement"
                      ? "bg-black text-white"
                      : ""
                  } hover:bg-black rounded-xl my-1 py-0 group`}
                >
                  <span className="inline-flex items-center justify-center px-2 py-2 text-lg group">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/usermanagement"
                          ? "hidden"
                          : "group-hover:hidden duration-700"
                      }`}
                    >
                      <path
                        d="M11.5 14.0116C9.45338 13.9164 7.38334 14.4064 5.57757 15.4816C4.1628 16.324 0.453366 18.0441 2.71266 20.1966C3.81631 21.248 5.04549 22 6.59087 22H12"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.5 6.5C15.5 8.98528 13.4853 11 11 11C8.51472 11 6.5 8.98528 6.5 6.5C6.5 4.01472 8.51472 2 11 2C13.4853 2 15.5 4.01472 15.5 6.5Z"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M18 20.7143V22M18 20.7143C16.8432 20.7143 15.8241 20.1461 15.2263 19.2833M18 20.7143C19.1568 20.7143 20.1759 20.1461 20.7737 19.2833M15.2263 19.2833L14.0004 20.0714M15.2263 19.2833C14.8728 18.773 14.6667 18.1597 14.6667 17.5C14.6667 16.8403 14.8727 16.2271 15.2262 15.7169M20.7737 19.2833L21.9996 20.0714M20.7737 19.2833C21.1272 18.773 21.3333 18.1597 21.3333 17.5C21.3333 16.8403 21.1273 16.2271 20.7738 15.7169M18 14.2857C19.1569 14.2857 20.1761 14.854 20.7738 15.7169M18 14.2857C16.8431 14.2857 15.8239 14.854 15.2262 15.7169M18 14.2857V13M20.7738 15.7169L22 14.9286M15.2262 15.7169L14 14.9286"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        pathname == "/dashboard/usermanagement"
                          ? "block"
                          : " hidden group-hover:block "
                      } duration-700`}
                    >
                      <path
                        d="M11.5 14.0116C9.45338 13.9164 7.38334 14.4064 5.57757 15.4816C4.1628 16.324 0.453366 18.0441 2.71266 20.1966C3.81631 21.248 5.04549 22 6.59087 22H12"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.5 6.5C15.5 8.98528 13.4853 11 11 11C8.51472 11 6.5 8.98528 6.5 6.5C6.5 4.01472 8.51472 2 11 2C13.4853 2 15.5 4.01472 15.5 6.5Z"
                        stroke="white"
                        stroke-width="1.5"
                      />
                      <path
                        d="M18 20.7143V22M18 20.7143C16.8432 20.7143 15.8241 20.1461 15.2263 19.2833M18 20.7143C19.1568 20.7143 20.1759 20.1461 20.7737 19.2833M15.2263 19.2833L14.0004 20.0714M15.2263 19.2833C14.8728 18.773 14.6667 18.1597 14.6667 17.5C14.6667 16.8403 14.8727 16.2271 15.2262 15.7169M20.7737 19.2833L21.9996 20.0714M20.7737 19.2833C21.1272 18.773 21.3333 18.1597 21.3333 17.5C21.3333 16.8403 21.1273 16.2271 20.7738 15.7169M18 14.2857C19.1569 14.2857 20.1761 14.854 20.7738 15.7169M18 14.2857C16.8431 14.2857 15.8239 14.854 15.2262 15.7169M18 14.2857V13M20.7738 15.7169L22 14.9286M15.2262 15.7169L14 14.9286"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm group-hover:text-white ml-3">
                    User Management
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className={`flex flex-row items-center duration-700 text-black hover:bg-black rounded-xl my-1 py-0 group`}
                >
                  <span className="inline-flex items-center justify-center px-2 py-2 text-lg group">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`group-hover:hidden duration-700`}
                    >
                      <path
                        d="M10 3L4 6V18L10 21"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M20 12H10M20 12L16.9998 9M20 12L16.9998 15"
                        stroke="black"
                        stroke-width="1.5"
                      />
                    </svg>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`hidden group-hover:block duration-700`}
                    >
                      <path
                        d="M10 3L4 6V18L10 21"
                        stroke="white"
                        stroke-width="1.5"
                      />
                      <path
                        d="M20 12H10M20 12L16.9998 9M20 12L16.9998 15"
                        stroke="white"
                        stroke-width="1.5"
                      />
                    </svg>
                  </span>
                  <span className="text-sm group-hover:text-white ml-3">
                    Logout
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </section>
  );
}
