import React, { useState } from "react";
import Link from "next/link";
import {
  FaBusinessTime,
  FaCheck,
  FaUsers,
  FaCar,
  FaChevronDown,
  FaGlobe,
  FaEdit,
  FaTimes,
  FaCarAlt,
} from "react-icons/fa";
import {
  BsArrowRightCircle,
  BsArrowLeftCircle,
  BsArrowDownCircle,
} from "react-icons/bs";
import { FaPeopleGroup, FaChartPie } from "react-icons/fa6";

const Layout = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const toggleDropdown = (dropdownKey) => {
    setOpenDropdown(openDropdown === dropdownKey ? null : dropdownKey);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-5 overflow-hidden">
        <img className="mx-auto" src="/images/wtlLogo.jpeg" alt="WTL Logo" />
        <ul>
          <li>
            <Link
              href="/dashboard"
              className="block py-2 px-4 hover:bg-blue-500 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => toggleDropdown("allBooking")}
              className="flex items-center justify-between w-full py-2 px-4 hover:bg-blue-500 rounded"
            >
              All Booking
              <FaChevronDown
                className={`ml-2 transform ${
                  openDropdown === "allBooking" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openDropdown === "allBooking" && (
              <ul className="mt-2 bg-white text-gray-700 rounded shadow-md w-full">
                <li>
                  <Link
                    href="/online/online-booking"
                    className="flex items-center py-2 px-4 hover:bg-blue-100 rounded"
                  >
                    <FaGlobe className="mr-2" />
                    Online Booking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/online/custom-booking"
                    className="flex items-center py-2 px-4 hover:bg-blue-100 rounded"
                  >
                    <FaEdit className="mr-2" />
                    Custom Booking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/online/cancel-booking"
                    className="flex items-center py-2 px-4 hover:bg-blue-100 rounded w-4"
                  >
                    <FaTimes className="mr-2" />
                    Cancel Booking
                  </Link>
                </li>
              </ul>
            )}
          </li>



      {/* B2B Dropdown */}
<li className="relative">
            <button
              onClick={() => toggleDropdown("b2b")}
              className="flex items-center justify-between w-full py-2 px-4 hover:bg-blue-500 rounded"
            >
              B2B
              <FaChevronDown
                className={`ml-2 transform ${openDropdown === "b2b" ? "rotate-180" : ""}`}
              />
            </button>
            {openDropdown === "b2b" && (
              <ul className="mt-2 bg-white text-gray-700 rounded shadow-md w-full">
                <li>
                  <Link
                    href="/B2B/All_B2B"
                    className="flex items-center py-2 px-4 hover:bg-blue-100 rounded"
                  >
                    <FaBusinessTime className="mr-2" />
                    All B2B
                  </Link>
                </li>
                <li>
                  <Link
                    href="/B2B/B2B_Request"
                    className="flex items-center py-2 px-4 hover:bg-blue-100 rounded"
                  >
                    <FaCheck className="mr-2" />
                    Request B2B
                  </Link>
                </li>
                <li>
                  <Link
                    href="/B2B/B2B_Report"
                    className="flex items-center py-2 px-4 hover:bg-blue-100 rounded"
                  >
                    <FaUsers className="mr-2" />
                    B2B Report
                  </Link>
                </li>
                
              </ul>
            )}
          </li>


          {/* {Fleet Section} */}
          <button
            onClick={() => toggleDropdown("Fleet")}
            className="flex items-center justify-between w-full py-2 px-4 hover:bg-blue-500 rounded"
          >
            Fleet
            <FaChevronDown
              className={`ml-2 transform ${
                openDropdown === "allBooking" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openDropdown === "Fleet" && (
            <ul className="mt-2 bg-white text-gray-700 rounded shadow-md w-full">
              <li>
                <Link
                  href="/fleet/cabs"
                  className="flex items-center py-2 px-4 hover:bg-blue-100 rounded"
                >
                  <FaCarAlt className="mr-2 " />
                  _Cabs
                </Link>
              </li>
              <li>
                <Link
                  href="/fleet/drivers"
                  className="flex items-center py-2 px-4 hover:bg-blue-100 rounded"
                >
                  <FaPeopleGroup className="mr-2" />
                  _Drivers
                </Link>
              </li>
              <li>
                <Link
                  href="/fleet/outsource"
                  className="flex items-center py-2 px-4 hover:bg-blue-100 rounded "
                >
                  <FaChartPie className="mr-2" />
                  _Outsource
                </Link>
              </li>
            </ul>
          )}

          {/* B2B Dropdown */}
          {/* <li className="relative">
            <button
              onClick={() => toggleDropdown("b2b")}
              className="flex items-center justify-between w-full py-2 px-4 hover:bg-blue-500 rounded"
            >
              B2B
              <FaChevronDown
                className={`ml-2 transform ${
                  openDropdown === "b2b" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openDropdown === "b2b" && (
              <ul className="mt-2 bg-white text-gray-700 rounded shadow-md w-full">
                <li>
                  <Link
                    href="/b2b/all"
                    className="flex items-center py-2 px-4 hover:bg-blue-100 rounded"
                  >
                    <FaBusinessTime className="mr-2" />
                    All B2B
                  </Link>
                </li>
                <li>
                  <Link
                    href="/b2b/all/request"
                    className="flex items-center py-2 px-4 hover:bg-blue-100 rounded"
                  >
                    <FaCheck className="mr-2" />
                    Request B2B
                  </Link>
                </li>
                <li>
                  <Link
                    href="/b2b/all/report"
                    className="flex items-center py-2 px-4 hover:bg-blue-100 rounded"
                  >
                    <FaUsers className="mr-2" />
                    B2B Report
                  </Link>
                </li>
              </ul>
            )}
          </li> */}

          {/* Other Links */}
          <li>
            <Link
              href="/websiteDashboard"
              className="block py-2 px-4 hover:bg-blue-500 rounded"
            >
              Website Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/update-root-rate"
              className="block py-2 px-4 hover:bg-blue-500 rounded"
            >
              Update Root Rate
            </Link>
          </li>

          {/* Vendors Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown("vendors")}
              className="flex items-center justify-between w-full py-2 px-4 hover:bg-blue-500 rounded"
            >
              Vendors
              <FaChevronDown
                className={`ml-2 transform ${
                  openDropdown === "vendors" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openDropdown === "vendors" && (
              <ul className="mt-2 bg-gray-700 rounded shadow-md w-full">
                <li>
                  <Link
                    href="/vendors/all-vendors"
                    className="flex items-center py-2 px-4 hover:bg-gray-600 rounded"
                  >
                    <FaBusinessTime className="mr-2" />
                    All Vendors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/request-vendor"
                    className="flex items-center py-2 px-4 hover:bg-gray-600 rounded"
                  >
                    <FaCheck className="mr-2" />
                    Request Vendors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vendor-report"
                    className="flex items-center py-2 px-4 hover:bg-gray-600 rounded"
                  >
                    <FaUsers className="mr-2" />
                    Vendor Report
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default Layout;
