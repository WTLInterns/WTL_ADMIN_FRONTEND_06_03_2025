"use client";
import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import Navbar from "../../../../container/components/Navbar";
import { useParams } from "next/navigation";
import axios from "axios";

const ArrowPage = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalTitle, setModalTitle] = useState(""); // Store the button text dynamically
  const [cab, setCab] = useState([]);
  const params = useParams();

  // Function to open modal with a dynamic title
  const openModal = (title) => {
    setModalTitle(title);
    setShowModal(true);
  };

  // Fetching data from the backend
  useEffect(() => {
    fetch(`http://localhost:8080/driverAdmin/${params.id}`) // Make sure this URL matches your backend API
      .then((response) => response.json())
      .then((data) => setCab(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, [params.id]);

  const [status, setStatus] = useState();
  const [message, setMessage] = useState(""); // For displaying messages like success or error

  // Function to handle status update
  const updateStatus = (status) => {
    // Validate the status (ensure it's either 'COMPLETED' or 'PENDING')
    if (status !== "COMPLETED" && status !== "PENDING") {
      setMessage("Invalid status! Status must be 'COMPLETED' or 'PENDING'.");
      return;
    }

    // Send the PUT request to update the status
    axios
      .put(
        `http://localhost:8080/driverAdmin/${params.id}/status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json", // Ensure request body is treated as JSON
          },
        }
      )
      .then((response) => {
        // On success, update the message state with the new status
        setMessage(`Status updated successfully to ${response.data.status}`);
      })
      .catch((error) => {
        // Handle error (e.g., if the CabAdmin with the given ID is not found)
        if (error.response && error.response.status === 404) {
          setMessage("CabAdmin not found!");
        } else {
          setMessage("An error occurred while updating the status.");
        }
      });
  };

  return (
    <Navbar>
      <div className="container mx-auto p-4">
        {/* Vehicle Details Header */}
        <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <FaCar className="text-blue-500 text-xl" />
          <h2 className="text-lg font-semibold text-gray-700">
            Driver Details
          </h2>
        </div>

        {/* Main Content */}
        <div className="relative flex items-center bg-white p-6 rounded-lg shadow-lg mt-10">
          {/* Left - Vehicle Image and Text */}
          <div className="w-1/2 h-[500px] flex flex-col justify-center items-center">
            {cab.DriverImgSelfies && (
              <img
                src={`http://localhost:8080/images/driverAdminImg/${cab.DriverImgSelfie}`}
                alt="Car"
                className="w-full h-full object-cover"
              />
            )}
            {/* Text Below the Image with slight margin */}
            <div className="flex justify-start mt-4 space-x-6">
              {/* Image 1 below Text 1 */}
              <div className="flex flex-col items-center">
                {cab.Aadhar ? (
                  <img
                    src={`http://localhost:8080/images/driverAdminImg/${cab.Aadhar}`} // Prepend the static URL
                    alt="Car"
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>

              {/* Image 2 below Text 2 */}
              <div className="flex flex-col items-center">
                {cab.DrLicenceNum ? (
                  <img
                    src={`http://localhost:8080/images/driverAdminImg/${cab.DrLicenceNum}`} // Prepend the static URL
                    alt="Car"
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>

              {/* Image 3 below Text 3 */}
              <div className="flex flex-col items-center">
                {cab.PvcNo ? (
                  <img
                    src={`http://localhost:8080/images/driverAdminImg/${cab.PvcNo}`} // Prepend the static URL
                    alt="Car"
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>
            </div>
          </div>

          {/* Right - Buttons */}
          <div className="w-[28%] flex flex-col justify-start p-4 space-y-6 mt-10 ml-6">
            {/* RC Number */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700 w-full">
                Driver Selfie
              </span>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={() => openModal("Driver Selfie")}
              >
                Show Image
              </button>
            </div>
            <hr className="border-t-2 border-gray-300" />

            {/* Insurance */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700 w-full">
                Aaddhar
              </span>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={() => openModal("Aaddhar")}
              >
                Show Image
              </button>
            </div>
            <hr className="border-t-2 border-gray-300" />

            {/* Permit */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700 w-full">
                Driver License No
              </span>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={() => openModal("Driver License No")}
              >
                Show Image
              </button>
            </div>
            <hr className="border-t-2 border-gray-300" />

            {/* Fitness Certificate */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700 w-full">
                PVC No
              </span>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={() => openModal("PVC No")}
              >
                Show Image
              </button>
            </div>
          </div>

          {/* Approve/Reject Buttons */}
          <div className="absolute top-4 right-4 flex space-x-4">
            <button
              onClick={() => updateStatus("COMPLETED")}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => updateStatus("PENDING")}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </div>

        {/* Modal (Popup) - Positioned at the Top */}
        {showModal && (
          <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 pt-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
              <h2 className="text-xl font-semibold mb-4 text-black">
                {modalTitle}
              </h2>

              {/* Dynamic Image Rendering Based on Modal Title */}
              {modalTitle === "Driver Selfie" && cab.DriverImgSelfie ? (
                <img
                  src={`http://localhost:8080/images/driverAdminImg/${cab.DriverImgSelfie}`}
                  alt={modalTitle}
                  className="w-full h-full object-cover mb-5"
                />
              ) : modalTitle === "Aaddhar" && cab.Aadhar ? (
                <img
                  src={`http://localhost:8080/images/driverAdminImg/${cab.Aadhar}`}
                  alt={modalTitle}
                  className="w-full h-full object-cover mb-5"
                />
              ) : modalTitle === "Driver License No" && cab.DrLicenceNum ? (
                <img
                  src={`http://localhost:8080/images/driverAdminImg/${cab.DrLicenceNum}`}
                  alt={modalTitle}
                  className="w-full h-full object-cover mb-5"
                />
              ) : modalTitle === "PVC No" && cab.PvcNo ? (
                <img
                  src={`http://localhost:8080/images/driverAdminImg/${cab.PvcNo}`}
                  alt={modalTitle}
                  className="w-full h-full object-cover mb-5"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <span>No Image Available</span>
                </div>
              )}

              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default ArrowPage;
