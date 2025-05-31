import React, { useState, useEffect } from "react";
import AutocompleteInput from "./AutocompleteInput";
import AutocompleteTrail from "./AutocompleteTrail";

interface TripDetails {
    trailName: string;
    location: string;
    startDate: string;
    endDate: string;
    hikeLength: string;
    hikeUnit: string;       
    elevationGain: string;
    altitudeUnit: string;
    allTrailsLink: string;    
  }
  

interface TripEditModalProps {
    tripDetails: TripDetails;
    setTripDetails: React.Dispatch<React.SetStateAction<TripDetails>>; // 
    onSave: (details: TripDetails) => void;
    onClose: () => void;
  }

export default function TripEditModal({
  tripDetails,
  onSave,
  onClose,
}: TripEditModalProps) {
  const [localDetails, setLocalDetails] = useState<TripDetails>({
    ...tripDetails,
    hikeUnit: tripDetails.hikeUnit || "mi",
    altitudeUnit: tripDetails.altitudeUnit || "ft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localDetails);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-gray-50 rounded-lg shadow-lg w-full max-w-xl px-12 py-10 pointer-events-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Trip Details</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Trail Name */}
            <div>
              <label className="block text-xs text-gray-700 font-semibold mb-1">Trail Name</label>
              <AutocompleteTrail
                name="trailName"
                value={localDetails.trailName}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs text-gray-700 font-semibold mb-1">Location</label>
              <AutocompleteInput
                name="location"
                value={localDetails.location}
                onChange={handleChange}
              />
            </div>

            {/* Trip Duration */}
            <div>
              <label className="block text-xs text-gray-700 font-semibold mb-1">Trip Duration</label>
              <div className="flex justify-between gap-4">
                {/* From */}
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">From</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="startDate"
                      value={localDetails.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm pr-10"
                      placeholder="MM-DD-YYYY"
                    />
                  </div>
                </div>

                {/* To */}
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">To</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="endDate"
                      value={localDetails.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm pr-10"
                      placeholder="MM-DD-YYYY"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hike Length + Unit */}
            <div>
              <label className="block text-xs text-gray-700 font-semibold mb-1">Hike Length</label>
              <div className="flex border border-gray-300 rounded-md bg-white">
                <input
                  type="text"
                  name="hikeLength"
                  value={localDetails.hikeLength}
                  onChange={handleChange}
                  placeholder="Enter Hike Length"
                  className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                />
                <select
                  name="hikeUnit"
                  value={localDetails.hikeUnit}
                  onChange={handleChange}
                  className="w-20 px-3 rounded-r-md bg-transparent focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                >
                  <option value="mi">mi</option>
                  <option value="km">km</option>
                </select>
              </div>
            </div>

            {/* Elevation Gain + Unit */}
            <div>
              <label className="block text-xs text-gray-700 font-semibold mb-1">Elevation Gain</label>
              <div className="flex border border-gray-300 rounded-md bg-white">
                <input
                  type="text"
                  name="elevationGain"
                  value={localDetails.elevationGain}
                  onChange={handleChange}
                  placeholder="Enter Elevation Gain"
                  className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                />
                <select
                  name="altitudeUnit"
                  value={localDetails.altitudeUnit}
                  onChange={handleChange}
                  className="w-20 px-3 rounded-r-md bg-transparent focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                >
                  <option value="ft">ft</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-700 font-semibold mb-1">AllTrails Link</label>
              <input
                type="text"
                name="allTrailsLink"
                value={localDetails.allTrailsLink}
                onChange={handleChange}
                placeholder="AllTrails Web"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors"
            >
              Save
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-primary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
