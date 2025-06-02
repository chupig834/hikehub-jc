import { useState, useEffect} from "react";
import { MapPin, Calendar, Ruler, Mountain, Pencil } from "lucide-react";
import TripEditModal from "./TripEditModal";
import AutocompleteInput from "./AutocompleteInput";

export default function TripDetail({tripData, onTripDetailChange, onTrailInfoUpdate, disabled = false}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tripDetails, setTripDetails] = useState({
    trailName: "",
    location: "", 
    startDate: "",
    endDate: "",
    hikeLength: "",
    hikeUnit: "",
    elevationGain: "",
    altitudeUnit: "",
    allTrailsLink: ""
  });

  const formatDate = (dateStr) => {
    if(dateStr) {
      let [year, month, date] = dateStr.split("-")
      month = month.replace(/^0+/, ''); // remove leading zero
      date = date.replace(/^0+/, '');
      return month + "/" + date + "/" + year;
    } else {
      return "";
    }
  }

  useEffect(() => {
    if(tripDetails) 
      {
        setTripDetails(tripData);
      }
  }, [tripData, tripDetails])


  const handleChange = (e) => {
    setTripDetails({ ...tripDetails, [e.target.name]: e.target.value });
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      onTripDetailChange(tripDetails);
    }
    setIsEditing(!isEditing);
  }



  return (
    <>
    <div className="grow basis-0 min-w-0 bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <img
            src="/icons/map.svg" 
            alt="Trip Detail Icon"
            className="w-5 h-5 object-contain"
          />
          Trip Detail
        </h2>

        {!disabled && (
          <button
            onClick={handleToggleEdit}
            className="text-gray-500 hover:text-gray-700"
          >
            <img
            src="/icons/pencil.svg" 
            alt="Pencil Icon"
            className="w-5 h-5 object-contain" />
          </button>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <DetailRow label="Trail Name" value={tripDetails.trailName} />
        <DetailRow label="Location" value={tripDetails.location} />
        <DetailRow
          label="Duration"
          value={tripDetails.startDate && tripDetails.endDate ?
            `${formatDate(tripDetails.startDate)} - ${formatDate(tripDetails.endDate)}`
            : ""}
        />
        <DetailRow label="Hike Length" value={`${tripDetails.hikeLength} ${tripDetails.hikeUnit}`} />
        <DetailRow label="Elevation Gain" value={`${tripDetails.elevationGain} ${tripDetails.altitudeUnit}`} />
        <DetailRow label="AllTrails Link" value={`${tripDetails.allTrailsLink}`} truncate link/>
      </div>
    </div>

      {isEditing && (
        <TripEditModal
          tripDetails={tripDetails}
          setTripDetails={setTripDetails}
          onSave={async (updatedDetails) => {
            setTripDetails(updatedDetails);
            onTripDetailChange(updatedDetails);
            setIsEditing(false);
            try {
                const res = await fetch("/api/generateTrailInfo", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    trailName: updatedDetails.trailName,
                  }),
                });
                const json = await res.json();
                const parsed = JSON.parse(json.data); // or use a safe parser
                console.log(parsed)
                onTrailInfoUpdate?.(parsed); // only if the prop was passed
            } catch (err) {
                console.error("Failed to fetch trail info:", err);
              }
          }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>    
  );
};

function DetailRow({
  label,
  value,
  truncate = false,
  link = false,
  emptyFallbackImage = "/icons/empty.svg", // relative to /public
}: {
  label: string;
  value?: string;
  truncate?: boolean;
  link?: boolean;
  emptyFallbackImage?: string;
}) {
  const baseClass = "font-semibold text-right";
  const truncateClass = truncate
    ? "truncate whitespace-nowrap overflow-hidden max-w-[60%]"
    : "max-w-[70%]";

  const hasValue = value && value.trim() !== "";

  return (
    <div className="flex justify-between items-center">
      <p className="text-gray-900">{label}</p>
      {hasValue ? (
        link ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClass} text-blue-600 hover:underline ${truncateClass}`}
            title={value}
          >
            {value}
          </a>
        ) : (
          <p className={`text-gray-900 ${baseClass} ${truncateClass}`} title={truncate ? value : undefined}>
            {value}
          </p>
        )
      ) : (
        <img src={emptyFallbackImage} alt="--" className="" />
      )}
    </div>
  );
  }
