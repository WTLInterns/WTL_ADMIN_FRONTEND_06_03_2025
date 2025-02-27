"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../../../container/components/Navbar";

export default function B2BDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [b2bList, setB2bList] = useState([]);
  const [selectedB2B, setSelectedB2B] = useState(null);

  // For displaying a single image in a modal
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  // 1) Load the B2B list from localStorage
  useEffect(() => {
    const data = localStorage.getItem("b2bList");
    if (data) {
      setB2bList(JSON.parse(data));
    }
  }, []);

  // 2) Once we have b2bList, find the matching B2B by ID
  useEffect(() => {
    if (b2bList.length > 0) {
      const found = b2bList.find(
        (b2b) => b2b.id === parseInt(params.id, 10)
      );
      setSelectedB2B(found || null);
    }
  }, [b2bList, params.id]);

  // If no B2B found or still loading
  if (!selectedB2B) {
    return (
      <Navbar>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">B2B Details</h2>
          <p>Loading or not found...</p>
        </div>
      </Navbar>
    );
  }

  // Open the modal with the selected image
  const handleViewDoc = (base64Image) => {
    setImageSrc(base64Image);
    setShowImageModal(true);
  };

  // Close the details page and go back
  const handleClosePage = () => {
    router.back();
  };

  return (
    <Navbar>
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-5xl mx-auto">
        {/* Header with Close button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">B2B Details</h2>
          <button
            onClick={handleClosePage}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>

        {/* Main layout: Two columns */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Column: Profile Details */}
          <div className="w-full md:w-2/3 bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Profile Details</h3>

            {/* Company Information */}
            <h4 className="font-semibold mb-2">Company Information</h4>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <p className="font-medium">Name</p>
                <p>{selectedB2B.businessName}</p>
              </div>
              <div>
                <p className="font-medium">Mobile</p>
                <p>{selectedB2B.contact}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <p className="font-medium">Email</p>
                <p>{selectedB2B.businessEmail || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">Alternate Mobile</p>
                <p>{selectedB2B.alternateContact || "N/A"}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-medium">Address</p>
              <p>{selectedB2B.city}</p>
            </div>

            {/* Bank Details */}
            <h4 className="font-semibold mb-2">Bank Details</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-medium">Acc No</p>
                <p>{selectedB2B.bankAccountNo || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">IFSC Code</p>
                <p>{selectedB2B.ifscCode || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Certificate */}
          <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Certificate</h3>

            {/* Company Logo: display image directly */}
            <div className="mb-4">
              <p className="font-medium">Company Logo</p>
              {selectedB2B.companyLogo ? (
                <img
                  src={selectedB2B.companyLogo}
                  alt="Company Logo"
                  className="w-32 h-32 object-cover border rounded mt-2"
                />
              ) : (
                <p className="text-gray-500">No logo uploaded</p>
              )}
            </div>

            {/* Company Doc as button */}
            <div className="mb-4">
              <p className="font-medium">Company Doc</p>
              {selectedB2B.govtApprovalCert ? (
                <button
                  onClick={() => handleViewDoc(selectedB2B.govtApprovalCert)}
                  className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
                >
                  View Doc
                </button>
              ) : (
                <p className="text-gray-500">No document uploaded</p>
              )}
            </div>

            {/* PAN Photo as button */}
            <div>
              <p className="font-medium">PAN Photo</p>
              {selectedB2B.panPhoto ? (
                <button
                  onClick={() => handleViewDoc(selectedB2B.panPhoto)}
                  className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
                >
                  View Doc
                </button>
              ) : (
                <p className="text-gray-500">No PAN photo uploaded</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note and Buttons */}
        <p className="mt-6 text-green-600">
          This B2B is available to assign driver and cab
        </p>
        <div className="mt-4 flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Send Login Username and Password
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Block
          </button>
        </div>
      </div>

      {/* Image Modal for viewing docs */}
      {showImageModal && imageSrc && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              X
            </button>
            <img src={imageSrc} alt="Document" className="w-full h-auto" />
          </div>
        </div>
      )}
    </Navbar>
  );
}
