"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaPlus } from "react-icons/fa";
import Navbar from "../../../container/components/Navbar";

const AllB2B = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // B2B list state
  const [b2bList, setB2BList] = useState([
    { id: 1, businessName: "ABC Traders", contact: "9876543210", city: "New York" },
    { id: 2, businessName: "XYZ Enterprises", contact: "8765432109", city: "Los Angeles" },
    { id: 3, businessName: "LMN Solutions", contact: "7654321098", city: "Chicago" },
  ]);

  // Form data (including file fields as base64 strings)
  const [formData, setFormData] = useState({
    businessName: "",
    contact: "",
    alternateContact: "",
    city: "",
    businessEmail: "",
    bankName: "",
    bankAccountNo: "",
    ifscCode: "",
    panNo: "",
    otherDetails: "",
    companyLogo: null,        // base64
    govtApprovalCert: null,   // base64
    panPhoto: null,           // base64
  });

  // Convert file inputs to base64 so we can display actual images later
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, [name]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save the b2bList in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("b2bList", JSON.stringify(b2bList));
  }, [b2bList]);

  // Add a new B2B record
  const handleSubmit = (e) => {
    e.preventDefault();
    const newB2B = {
      id: b2bList.length + 1,
      ...formData,
    };

    setB2BList([...b2bList, newB2B]);

    // Reset form and close modal
    setFormData({
      businessName: "",
      contact: "",
      alternateContact: "",
      city: "",
      businessEmail: "",
      bankName: "",
      bankAccountNo: "",
      ifscCode: "",
      panNo: "",
      otherDetails: "",
      companyLogo: null,
      govtApprovalCert: null,
      panPhoto: null,
    });
    setShowModal(false);
  };

  return (
    <Navbar>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">B2B List</h2>

        {/* Search & Add B2B */}
        <div className="mb-4 flex items-center gap-4">
          <input
            type="text"
            className="w-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Add B2B
          </button>
        </div>

        {/* B2B Table */}
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
              {b2bList
                .filter((b2b) =>
                  b2b.businessName.toLowerCase().includes(search.toLowerCase())
                )
                .map((b2b) => (
                  <tr key={b2b.id} className="border-b bg-gray-100">
                    <td className="p-3">{b2b.id}</td>
                    <td className="p-3">{b2b.businessName}</td>
                    <td className="p-3">{b2b.contact}</td>
                    <td className="p-3">{b2b.city}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => router.push(`/B2B/b2b-details/${b2b.id}`)}
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

      {/* Modal for Adding B2B */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Add B2B Form</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="businessName"
                placeholder="Company Name"
                className="w-full p-2 mb-2 border rounded"
                value={formData.businessName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact No."
                className="w-full p-2 mb-2 border rounded"
                value={formData.contact}
                onChange={handleChange}
              />
              <input
                type="text"
                name="alternateContact"
                placeholder="Alternate Mobile No."
                className="w-full p-2 mb-2 border rounded"
                value={formData.alternateContact}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City Name"
                className="w-full p-2 mb-2 border rounded"
                value={formData.city}
                onChange={handleChange}
              />
              <label className="block mb-1 font-semibold">companyLogo</label>
              <input
                type="file"
                name="companyLogo"
                className="w-full p-2 mb-2 border rounded"
                onChange={handleFileChange}
              />
              <label className="block mb-1 font-semibold">govtApprovalCert</label>
              <input
                type="file"
                name="govtApprovalCert"
                className="w-full p-2 mb-2 border rounded"
                onChange={handleFileChange}
              />
              {/* Label + file input for PAN Photo */}
              <label className="block mb-1 font-semibold">PAN Photo</label>
              <input
                type="file"
                name="panPhoto"
                className="w-full p-2 mb-2 border rounded"
                onChange={handleFileChange}
              />
              <label className="block mb-1 font-semibold">Compony Docs</label>
              <input
                type="file"
                name="componyDocs"
                className="w-full p-2 mb-2 border rounded"
                onChange={handleFileChange}
              />
              <input
                type="email"
                name="businessEmail"
                placeholder="Business Email"
                className="w-full p-2 mb-2 border rounded"
                value={formData.businessEmail}
                onChange={handleChange}
              />
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                className="w-full p-2 mb-2 border rounded"
                value={formData.bankName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="bankAccountNo"
                placeholder="Bank Account No"
                className="w-full p-2 mb-2 border rounded"
                value={formData.bankAccountNo}
                onChange={handleChange}
              />
              <input
                type="text"
                name="ifscCode"
                placeholder="IFSC Code"
                className="w-full p-2 mb-2 border rounded"
                value={formData.ifscCode}
                onChange={handleChange}
              />
              <input
                type="text"
                name="panNo"
                placeholder="PAN No."
                className="w-full p-2 mb-2 border rounded"
                value={formData.panNo}
                onChange={handleChange}
              />
              <textarea
                name="otherDetails"
                placeholder="Company Other Details"
                className="w-full p-2 mb-2 border rounded"
                value={formData.otherDetails}
                onChange={handleChange}
              />
              <div className="flex justify-end gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() =>
                    setFormData({
                      businessName: "",
                      contact: "",
                      alternateContact: "",
                      city: "",
                      businessEmail: "",
                      bankName: "",
                      bankAccountNo: "",
                      ifscCode: "",
                      panNo: "",
                      otherDetails: "",
                      companyLogo: null,
                      govtApprovalCert: null,
                      panPhoto: null,
                    })
                  }
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Navbar>
  );
};

export default AllB2B;
