"use client";
import React, { useEffect, useState } from "react";

import { FaCar } from "react-icons/fa";
import Navbar from "../../../../container/components/Navbar";
import { useParams } from "next/navigation";
import axios from "axios";

const ArrowPage = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalTitle, setModalTitle] = useState(""); // Store the button text dynamically
  const [rcNumber, setRcNumber] = useState(""); // Example RC Number
  const [cab, setCab] = useState([]);

  const params = useParams();
  console.log(params.id);

  // const cabs = cab?.find((p) => p.cab === parseInt(params.id));

  // Function to open modal with a dynamic title
  const openModal = (title) => {
    setModalTitle(title);
    setShowModal(true);
  };
  // console.log(id);
  useEffect(() => {
    // Fetching data from the backend
    fetch(`http://localhost:8080/cabAdmin/${params.id}`) // Make sure this URL matches your backend API
      .then((response) => response.json())
      .then((data) => setCab(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

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
        `http://localhost:8080/cabAdmin/${params.id}/status`,
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

  console.log(status);

  console.log(cab);
  return (
    <Navbar>
      <div className="container mx-auto p-4">
        {/* Vehicle Details Header */}
        <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <FaCar className="text-blue-500 text-xl" />
          <h2 className="text-lg font-semibold text-gray-700">
            Vehicle Details
          </h2>
        </div>

        {/* Main Content */}
        <div className="relative flex items-center bg-white p-6 rounded-lg shadow-lg mt-10">
          {/* Left - Vehicle Image and Text */}
          <div className="w-1/2 h-[500px] flex flex-col justify-center items-center">
            {cab.cabImage && (
              <img
                src={`http://localhost:8080/images/cabAdminImg/${cab.cabImage}`} // Prepend the static URL
                alt="Car"
                className="w-full h-full object-cover"
              />
            )}
            {/* Text Below the Image with slight margin */}
            <div className="flex justify-start mt-8 space-x-6">
              {" "}
              {/* Increased margin-top */}
              <span className="text-gray-700 font-medium">Front side</span>
              <span className="text-gray-700 font-medium">Back side</span>
              <span className="text-gray-700 font-medium">Side side</span>
            </div>
            {/* Small Images Below Each Text */}
            <div className="flex justify-start mt-4 space-x-6">
              {/* Image 1 below Text 1 */}
              <div className="flex flex-col items-center">
                {cab.frontImage && (
                  <img
                    src={`http://localhost:8080/images/cabAdminImg/${cab.frontImage}`} // Prepend the static URL
                    alt="Car"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </div>

              {/* Image 2 below Text 2 */}
              <div className="flex flex-col items-center">
                {cab.sideImage && (
                  <img
                    src={`http://localhost:8080/images/cabAdminImg/${cab.backImage}`} // Prepend the static URL
                    alt="Car"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </div>

              {/* Image 3 below Text 3 */}
              <div className="flex flex-col items-center">
                {cab.cabImage && (
                  <img
                    src={`http://localhost:8080/images/cabAdminImg/${cab.sideImage}`} // Prepend the static URL
                    alt="Car"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right - Buttons */}
          <div className="w-[28%] flex flex-col justify-start p-4 space-y-6 mt-10 ml-6">
            {/* RC Number */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700 w-full">
                Car RC Number
              </span>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={() => openModal("Car RC Number")}
              >
                Show Image
              </button>
            </div>
            <hr className="border-t-2 border-gray-300" />

            {/* Insurance */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700 w-full">
                Insurance
              </span>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={() => openModal("Insurance")}
              >
                Show Image
              </button>
            </div>
            <hr className="border-t-2 border-gray-300" />

            {/* Permit */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700 w-full">
                Permit
              </span>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={() => openModal("Permit")}
              >
                Show Image
              </button>
            </div>
            <hr className="border-t-2 border-gray-300" />

            {/* Fitness Certificate */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700 w-full">
                Fitness Certificate
              </span>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={() => openModal("Fitness Certificate")}
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
              {/* <input
                type="text"
                value={rcNumber}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              /> */}

              {modalTitle == "Car RC Number" ? (
                <img
                  src={`http://localhost:8080/images/cabAdminImg/${cab.cabImage}`} // Prepend the static URL
                  alt={modalTitle}
                  className="w-full h-full object-cover mb-5"
                />
              ) : (
                " "
              )}

              {modalTitle == "Insurance" ? (
                <img
                  src={`http://localhost:8080/images/cabAdminImg/${cab.insurance}`} // Prepend the static URL
                  alt={modalTitle}
                  className="w-full h-full object-cover mb-5"
                />
              ) : (
                " "
              )}
              {modalTitle == "Permit" ? (
                <img
                  src={`http://localhost:8080/images/cabAdminImg/${cab.permit}`} // Prepend the static URL
                  alt={modalTitle}
                  className="w-full h-full object-cover mb-5"
                />
              ) : (
                " "
              )}
              {modalTitle == "Fitness Certificate" ? (
                <img
                  src={`http://localhost:8080/images/cabAdminImg/${cab.fitnessCert}`} // Prepend the static URL
                  alt={modalTitle}
                  className="w-full h-full object-cover mb-5"
                />
              ) : (
                " "
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
