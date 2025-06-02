import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TripDetail from "./TripDetail"
import React, { useEffect, useState } from "react";


export default function TripDetailTab({tripData, onTripDetailChange, disabled = false}: any) {

    const [apiTrailData, setApiData] = useState(null);

    return (
        <Tabs defaultValue="overview" className="w-full max-w-xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="overview">Trip Overview</TabsTrigger>
                <TabsTrigger value="details">Additional Info</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
                <TripDetail
                tripData={tripData}
                onTripDetailChange={onTripDetailChange}
                disabled={disabled}
                onTrailInfoUpdate={setApiData}
                />
            </TabsContent>

            <TabsContent value="details">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Additional Trip Info</h3>
                {apiTrailData ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>🧭 Trail difficulty: {apiTrailData.difficulty_level}</li>
                        <li>⛺ Elevation Gain: {apiTrailData.elevation_gain}</li>
                        <li>🌤 Estimated Time: {apiTrailData.estimated_time}</li>
                        <li>Hike Length: {apiTrailData.length_miles}</li>
                        
                        {apiTrailData.highlights.length > 0 && (
                            <>
                                <li className="font-semibold mt-2"> Highlights </li>
                                {apiTrailData.highlights.map((item, idx) => 
                                    <li key={`highlight-${idx}`} className="ml-4 list-[circle]">{item}</li>)}
                            </>
                        )}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-400">No info available</p>
                )}
                </div>
            </TabsContent>
        </Tabs>
    )
}