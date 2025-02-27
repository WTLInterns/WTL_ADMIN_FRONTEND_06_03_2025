"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaPlus } from "react-icons/fa";
import Navbar from "../../../container/components/Navbar";

const AllVendors = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [vendors, setVendors] = useState([
    { id: 1, businessName: "ABC Traders", contact: "9876543210", city: "New York" },
    { id: 2, businessName: "XYZ Enterprises", contact: "8765432109", city: "Los Angeles" },
    { id: 3, businessName: "LMN Solutions", contact: "7654321098", city: "Chicago" },
  ]);
  const [newVendor, setNewVendor] = useState({
    companyName: "",
    contactNo: "",
    alternateMobileNo: "",
    city: "",
    companyLogo: null,
    govtApprovalCertificate: null,
    companyDocs: null,
    businessEmail: "",
    bankName: "",
    bankAccountNo: "",
    ifscCode: "",
    panNo: "",
    panPhoto: null,
    companyOtherDetails: "",
  });

  const handleFileChange = (e) => {
    setNewVendor({ ...newVendor, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...newVendor, id: vendors.length + 1 };
    setVendors([...vendors, newEntry]);
    setShowForm(false);
  };

  return (
    <Navbar>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">B2B List</h2>

        <div className="mb-4 flex items-center gap-4">
          <input
            type="text"
            className="w-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlus /> Add B2B
          </button>
        </div>

        {showForm && (
          <form className="bg-gray-100 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold mb-4">Add B2B</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(newVendor).map((key) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="mb-1 font-semibold">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  {key.includes("Logo") || key.includes("Certificate") || key.includes("Docs") || key.includes("Photo") ? (
                    <input
                      id={key}
                      name={key}
                      type="file"
                      className="p-2 border border-gray-300 rounded-lg"
                      onChange={handleFileChange}
                    />
                  ) : (
                    <input
                      id={key}
                      type="text"
                      className="p-2 border border-gray-300 rounded-lg"
                      value={newVendor[key]}
                      onChange={(e) => setNewVendor({ ...newVendor, [key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">Submit</button>
              <button type="reset" className="bg-yellow-500 text-white px-6 py-2 rounded-lg" onClick={() => setNewVendor({
                companyName: "",
                contactNo: "",
                alternateMobileNo: "",
                city: "",
                companyLogo: null,
                govtApprovalCertificate: null,
                companyDocs: null,
                businessEmail: "",
                bankName: "",
                bankAccountNo: "",
                ifscCode: "",
                panNo: "",
                panPhoto: null,
                companyOtherDetails: "",
              })}>Reset</button>
              <button type="button" className="bg-red-600 text-white px-6 py-2 rounded-lg" onClick={() => setShowForm(false)}>Close</button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto mt-4">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">B2B ID</th>
                <th className="p-3 text-left">Business Name</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">City</th>
                <th className="p-3 text-center">View</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="border-b bg-gray-100">
                  <td className="p-3">{vendor.id}</td>
                  <td className="p-3">{vendor.companyName}</td>
                  <td className="p-3">{vendor.contactNo}</td>
                  <td className="p-3">{vendor.city}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => router.push(`/vendor-details/${vendor.id}`)}
                      className="text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                      <FaEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Navbar>
  );
};

export default AllVendors;
