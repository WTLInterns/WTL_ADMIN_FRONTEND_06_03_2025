"use client";

import { useState } from "react";
import axios from "axios";

const Outsourceform = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    vehicleNameAndRegNo: "",
    vehicleRcNo: "",
    carNoPlate: "",

    carOtherDetails: "",
    // status: "",
  });

  const [files, setFiles] = useState({
    insurance: null,
    permit: null,
    authorization: null,

    carImage: null,
    frontImage: null,
    backImage: null,
    sideImage: null,
    // status: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles({
      ...files,
      [name]: selectedFiles[0], // Store the first selected file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("vehicleNameAndRegNo", formData.vehicleNameAndRegNo);
    data.append("vehicleRcNo", formData.vehicleRcNo);
    data.append("carNoPlate", formData.carNoPlate);
    data.append("carOtherDetails", formData.carOtherDetails);
    // data.append("status", "PENDING");
    // Append files to FormData
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        data.append(key, files[key]);
      } else {
        console.log(`File for ${key} is missing`);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/vehicle/save",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Drive saved successfully!");
      console.log(response.data);
      console.log(response.error);
    } catch (error) {
      console.error("Error saving vehicle:", error);
      alert("Failed to save vehicle. Please try again.");
    }
  };

  if (!isOpen) return null;

  // ✅ Handle Reset Form
  const handleReset = () => {
    setFormData({
      driverName: "",
      contactNo: "",
      alternateNo: "",
      email: "",
      address: "",
      adhaar: "",
      frontImage: null,
      backImage: null,
      sideImage: null,
      dlNo: null,
      pvcNo: null,
      selfie: null,
      insurance: null,
      permit: null,
      authorization: null,
      otherDetails: "",
    });
  };

  // ✅ Handle Modal Close when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white w-[95%] max-w-5xl h-auto max-h-[90vh] rounded-lg shadow-lg p-6 ">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Add Driver Form
        </h2>

        {/* Scrollable Content */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto px-2">
            <div>
              <label className="font-medium">Vehicle Name & Reg. No.</label>
              <input
                type="text"
                name="vehicleNameAndRegNo"
                value={formData.vehicleNameAndRegNo}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="font-medium">Vehicle RC No.</label>
              <input
                type="text"
                name="vehicleRcNo"
                value={formData.vehicleRcNo}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="font-medium">Car Plate No.</label>
              <input
                type="text"
                name="carNoPlate"
                value={formData.carNoPlate}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            {/* <div>
              <label className="font-medium">Driver's Email ID</label>
              <input type="email" className="border p-2 rounded-md w-full" />
            </div>

            <div className="md:col-span-2">
              <label className="font-medium">Address</label>
              <textarea className="border p-2 rounded-md w-full"></textarea>
            </div> */}

            {/* File Uploads */}
            <div>
              <label className="font-medium">Insurance</label>
              <input
                type="file"
                name="insurance"
                onChange={handleFileChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="font-medium">Permit</label>
              <input
                type="file"
                name="permit"
                onChange={handleFileChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="font-medium">Authorization</label>
              <input
                type="file"
                name="authorization"
                onChange={handleFileChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="font-medium">Car Image</label>
              <input
                type="file"
                name="carImage"
                onChange={handleFileChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="font-medium">Front Image</label>
              <input
                type="file"
                name="frontImage"
                onChange={handleFileChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="font-medium">Back Image</label>
              <input
                type="file"
                name="backImage"
                onChange={handleFileChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="font-medium">Side Image</label>
              <input
                type="file"
                name="sideImage"
                onChange={handleFileChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            {/* <div>
              <label className="font-medium">Insurance</label>
              <input type="file" className="border p-2 rounded-md w-full" />
            </div>

            <div>
              <label className="font-medium">Permit</label>
              <input type="file" className="border p-2 rounded-md w-full" />
            </div>

            <div>
              <label className="font-medium">Authorization</label>
              <input type="file" className="border p-2 rounded-md w-full" />
            </div> */}

            <div className="md:col-span-2">
              <label className="font-medium">Car's Other Details</label>
              <textarea className="border p-2 rounded-md w-full"></textarea>
            </div>
          </div>

          {/* ✅ Buttons Section */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
            >
              Reset
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Outsourceform;
