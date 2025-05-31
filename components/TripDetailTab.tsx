import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TripDetail from "./TripDetail"

export default function TripDetailTab({tripData, onTripDetailChange, disabled = false}: any) {
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
            />
        </TabsContent>

        <TabsContent value="details">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Additional Trip Info</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>🗺 Trail climbs over 3,000 ft with stunning views.</li>
                <li>💧 No water refill stations — bring plenty.</li>
                <li>🌄 Sunset views from the top are worth the climb.</li>
            </ul>
            </div>
        </TabsContent>
        </Tabs>
    )
}