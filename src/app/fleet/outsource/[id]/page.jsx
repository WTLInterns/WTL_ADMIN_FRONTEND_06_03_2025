"use client";
import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import Navbar from "../../../../container/components/Navbar";
import { useParams } from "next/navigation";
import axios from "axios";

const ArrowPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [cab, setCab] = useState(null); // Ensure cab is initialized properly

  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    fetch(`https://worldtriplink.com/vehicle/${params.id}`)
      .then((response) => response.json())
      .then((data) => setCab(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const updateStatus = (status) => {
    if (status !== "COMPLETED" && status !== "PENDING") {
      setMessage("Invalid status! Status must be 'COMPLETED' or 'PENDING'.");
      return;
    }

    axios
      .put(
        `https://worldtriplink.com/vehicle/${params.id}/status`,
        { status },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setMessage(`Status updated successfully to ${response.data.status}`);
      })
      .catch((error) => {
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
        <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <FaCar className="text-blue-500 text-xl" />
          <h2 className="text-lg font-semibold text-gray-700">
            Vehicle Details
          </h2>
        </div>

        <div className="relative flex items-center bg-white p-6 rounded-lg shadow-lg mt-10">
          <div className="w-1/2 h-[500px] flex flex-col justify-center items-center">
            {cab?.carImage && (
              <img
                src={`https://worldtriplink.com/images/outSourceImg/${cab.carImage}`}
                alt="Car"
                className="w-full h-full object-cover"
              />
            )}
            <div className="flex justify-start mt-8 space-x-6">
              <span className="text-gray-700 font-medium">Front side</span>
              <span className="text-gray-700 font-medium">Back side</span>
              <span className="text-gray-700 font-medium">Side side</span>
            </div>

            <div className="flex justify-start mt-4 space-x-6">
              <div className="flex flex-col items-center">
                {cab?.frontImage && (
                  <img
                    src={`https://worldtriplink.com/images/outSourceImg/${cab.frontImage}`}
                    alt="Front"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col items-center">
                {cab?.backImage && (
                  <img
                    src={`https://worldtriplink.com/images/outSourceImg/${cab.backImage}`}
                    alt="Back"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col items-center">
                {cab?.sideImage && (
                  <img
                    src={`https://worldtriplink.com/images/outSourceImg/${cab.sideImage}`}
                    alt="Side"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-[28%] flex flex-col justify-start p-4 space-y-6 mt-10 ml-6">
            {[
              { label: "Car RC Number", key: "rcImage" },
              { label: "Insurance", key: "insurance" },
              { label: "Permit", key: "permit" },
              { label: "Fitness Certificate", key: "fitnessCert" },
            ].map(({ label, key }) => (
              <React.Fragment key={key}>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-700 w-full">
                    {label}
                  </span>
                  <button
                    className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                    onClick={() => {
                      setModalTitle(label);
                      setShowModal(true);
                    }}
                  >
                    Show Image
                  </button>
                </div>
                <hr className="border-t-2 border-gray-300" />
              </React.Fragment>
            ))}
          </div>

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

        {showModal && (
          <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 pt-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
              <h2 className="text-xl font-semibold mb-4 text-black">
                {modalTitle}
              </h2>
              {modalTitle === "Car RC Number" && cab?.rcImage && (
                <img
                  src={`https://worldtriplink.com/images/outSourceImg/${cab.rcImage}`}
                  alt="Car RC Number"
                  className="w-full h-full object-cover mb-5"
                />
              )}
              {modalTitle === "Insurance" && cab?.insurance && (
                <img
                  src={`https://worldtriplink.com/images/outSourceImg/${cab.insurance}`}
                  alt="Insurance"
                  className="w-full h-full object-cover mb-5"
                />
              )}
              {modalTitle === "Permit" && cab?.permit && (
                <img
                  src={`https://worldtriplink.com/images/outSourceImg/${cab.permit}`}
                  alt="Permit"
                  className="w-full h-full object-cover mb-5"
                />
              )}
              {modalTitle === "Fitness Certificate" && cab?.fitnessCert && (
                <img
                  src={`https://worldtriplink.com/images/outSourceImg/${cab.fitnessCert}`}
                  alt="Fitness Certificate"
                  className="w-full h-full object-cover mb-5"
                />
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
