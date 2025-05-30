"use client"

import CoverImage from "@/components/CoverImage"
import { useContext, useEffect, useRef, useState } from "react"
import PackingList, { PackingListHandle } from "@/components/PackingList"
import TripDetail from "@/components/TripDetail"
import PackingWeightChart from "@/components/PackingWeightChart"
import WeatherForecast from "@/components/WeatherForecast"
import { Button } from "@/components/ui/button"
import ProfileDropdown from "@/components/user/profile-dropdown"
import { useParams, useRouter } from "next/navigation"
import { IPackingList } from "@/models/list"
import { Copy, LoaderCircle, Menu, Save } from "lucide-react"
import UserDataContext from "@/components/user-data-context"
import SidebarContext from "@/components/sidebar/sidebar-context"
import ShareModal from "@/components/share-modal"
import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const params = useParams()
  const id = params.id
  const router = useRouter()
  const { data: session } = useSession()
  const [data, setData] = useState<IPackingList>(undefined)
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(Date.now())
  const [saveText, setSaveText] = useState("")
  const [autoSaveDebounce, setAutoSaveDebounce] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [saveCount, setSaveCount] = useState(0)
  const [viewOnly, setViewOnly] = useState(true)
  const packingListRef = useRef<PackingListHandle>(null)
  // Passing trip information from TripDetail.tsx
  const [tripDetailsFromChild, setTripDetailsFromChild] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const { setLists } = useContext(UserDataContext);
  const { setShowSidebar } = useContext(SidebarContext);

  const handleTripDetailsChange = (newDetails) => {
    setTripDetailsFromChild(newDetails);
  }

  // Update chart when packing list weights are changed
  const handleListChange = () => {
    const chartData = getWeightChartData()
    setTimeout(() => setChartData(chartData), 0);
    // Note: using setTimeout as a workaround
  }

  // Fetch packing list
  const fetchData = async () => {
    setIsLoading(true)
    const res = await fetch(`/api/list/${id}`)
    if (res.status === 200) {
      const data = await res.json()
      setData(data)
    }
    setIsLoading(false)
    setUnsavedChanges(false)
  }

  const getPackingListState = () => {
    const items = packingListRef.current.getItems()
    const categories = packingListRef.current.getCategories()
    return { items, categories }
  }

  const setLastSavedTime = () => {
    const seconds = (Date.now() - lastSaved) / 1000
    if (seconds < 60) {
      setSaveText(`Last saved ${Math.round(seconds)}s ago`)
    } else {
      const minutes = Math.floor(seconds / 60)
      setSaveText(`Last saved ${minutes} min ago`)
    }
  }

  // Save packing list
  const saveData = async () => {
    setUnsavedChanges(false)
    setLastSaved(Date.now())
    setIsSaving(true)
    setSaveText("Saving...")

    const { items, categories } = getPackingListState()

    // Only update specified fields
    const payload = {
      name: data.name,
      visibility: data.visibility,
      coverImage: data.coverImage,
      categories,
      items,
      //Updating database with all the trip detail fields
      trailName: tripDetailsFromChild?.trailName || "",
      location: tripDetailsFromChild?.location || "",
      startDate: tripDetailsFromChild?.startDate || "",
      endDate: tripDetailsFromChild?.endDate || "",
      hikeLength: tripDetailsFromChild?.hikeLength && tripDetailsFromChild?.hikeUnit
                  ? `${tripDetailsFromChild.hikeLength} ${tripDetailsFromChild.hikeUnit}`
                  : "",
      elevationGain: tripDetailsFromChild?.elevationGain && tripDetailsFromChild?.altitudeUnit
                      ? `${tripDetailsFromChild.elevationGain} ${tripDetailsFromChild.altitudeUnit}`
                      : "",
      allTrailsLink: tripDetailsFromChild?.allTrailsLink
                     ? `${tripDetailsFromChild?.allTrailsLink} `
                     : "",
    }
    const res = await fetch(`/api/list/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      setSaveText("Saved")
      await updateSidebar()
    } else {
      setSaveText("Error saving")
    }
    setIsSaving(false)
  }

  const copyList = async () => {
    const res = await fetch(`/api/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      const data = await res.json()
      await updateSidebar()
      router.push(`/list/${data._id}`)
    } else {
      setSaveText("Error copying")
    }
  }

  const saveVisibility = async (visibility) => {
    const payload = { visibility }
    const res = await fetch(`/api/list/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
  }

  const updateSidebar = async () => {
    const getRes = await fetch("/api/list")
    const data = await getRes.json()
    setLists(data)
  }

  // Edit packing list name
  const setName = (name) => {
    setData({ ...data, name })
  }

  // Save visibility when share modal is closed
  const handleShareClose = (isPublic: boolean | undefined) => {
    if (isPublic !== undefined) {
      const visibility = isPublic ? "public" : "private"
      if (visibility !== data.visibility) {
        setData({ ...data, visibility })
        saveVisibility(visibility)
      }
    }
    setShowShareModal(false)
  }

  // On first render
  useEffect(() => {
    fetchData() // Fetch initial data on render
  }, [])

  // Allow editing if user is owner
  useEffect(() => {
    if (session && data?.owner === session?.user?.email)
      setViewOnly(false)
  }, [data, session])

  // Debounce auto save
  useEffect(() => {
    if (data) { // Only check for changes after data is fetched
      setUnsavedChanges(true)
      const timeout = setTimeout(() => {
        setAutoSaveDebounce(!autoSaveDebounce)
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [
    data,
    tripDetailsFromChild,
    packingListRef.current?.getItems(),
    packingListRef.current?.getCategories(),
  ])

  // Check for changes every 10 seconds
  useEffect(() => {
    const saveInt = setInterval(() => {
      if (unsavedChanges) {
        setAutoSaveDebounce(!autoSaveDebounce)
      }
    }, 10000);

    return () => clearInterval(saveInt)
  }, [lastSaved, unsavedChanges, autoSaveDebounce])

  // Update status every second
  useEffect(() => {
    const unsavedInt = setInterval(() => {
      if (unsavedChanges && !isSaving) {
        setLastSavedTime()
      }
    }, 1000)

    return () => clearInterval(unsavedInt)
  }, [lastSaved, unsavedChanges, isSaving])

  // Initiate auto save
  useEffect(() => {
    const seconds = (Date.now() - lastSaved) / 1000

    if (saveCount <= 1) { // Ignore when first loading
      setUnsavedChanges(false)
      setSaveCount(saveCount + 1)
      setSaveText("")
    } else {
      setLastSavedTime()
    }

    if (unsavedChanges && seconds > 10) {
      // Initiate save
      saveData()
    }
  }, [autoSaveDebounce])

  const getWeightChartData = () => {
    const items = packingListRef.current?.getItems() || [];
    const categories = packingListRef.current?.getCategories() || [];
    return calculateCategoryWeights(items, categories);
  };

  const convertToOunces = (weight: number, unit: string) => {
    switch (unit) {
      case "oz": return weight;
      case "lb": return weight * 16;
      case "g": return weight * 0.035274;
      case "kg": return weight * 35.274;
      default: return weight;
    }
  };

  const calculateCategoryWeights = (items, categories) => {
    const categoryMap: { [key: string]: number } = {};

    for (const item of items) {
      if (item.weight && item.quantity) {
        const totalWeight = convertToOunces(item.weight, item.unit) * item.quantity;
        const category = item.category || "None";
        categoryMap[category] = (categoryMap[category] || 0) + totalWeight;
      }
    }

    return Object.entries(categoryMap).map(([name, value]) => {
      const color = categories.find(c => c.name === name)?.color || "#cccccc";
      return { name, value, color };
    });
  };

  const formatDate = (dateStr) => {
    if(dateStr) {
        return new Date(dateStr).toISOString().slice(0,10);
      }
    else {
      return "";
    }
  }


  useEffect(() => {
    if (data) {
      const initialChart = calculateCategoryWeights(data.items, data.categories);
      setChartData(initialChart);
    }
  }, [data]);

  if (isLoading) {
    // Loading state
    return (
      <div className="h-screen bg-gray-50 w-full flex items-center justify-center">
        <LoaderCircle size={42} className="animate-spin mr-2" />
      </div>
    )
  } else if (!data) {
    // Not found state
    return (
      <div className="h-screen bg-gray-50 w-full flex p-6">
        <div
          className="block lg:hidden cursor-pointer"
          onClick={() => setShowSidebar(true)}>
          <Menu size={32} />
        </div>
        <div className="w-full flex items-center justify-center">Packing list not found.</div>
      </div>
    )
  } else {
    return (
      <div className="bg-gray-50 p-6">

        {/* Header Section */}
        <div className="mb-3 flex items-center gap-2">
          <div
            className="block lg:hidden cursor-pointer"
            onClick={() => setShowSidebar(true)}>
            <Menu size={32} />
          </div>

          <div className="grow">
            <h1 className="text-2xl font-bold">
              <input
                placeholder="Packing list name"
                value={data.name}
                onChange={(e) => setName(e.target.value) }
                disabled={viewOnly}
                className="w-full bg-transparent rounded focus:bg-white focus:outline-none focus:ring focus:ring-offset-4 focus:ring-orange-300" />
            </h1>
          </div>
          {!viewOnly && (
            <div className="shrink-0 ml-auto text-gray-500">{saveText}</div>
          )}

          {!viewOnly ? (
            <>
              {/* Share Button */}
              <div className="shrink-0">
                <Button
                  variant="outline"
                  onClick={() => setShowShareModal(true)}
                >
                  <img
                    src="/icons/share.svg"
                    alt="Share Icon"
                    className="w-4 h-4 object-contain" />
                    <span className="ml-2 hidden md:inline">Share</span>
                </Button>
              </div>
              {/* Save Button */}
              <div className="shrink-0">
                <Button
                  variant="default"
                  disabled={isSaving}
                  onClick={() => saveData()}
                >
                  {isSaving ? (
                    <><LoaderCircle size={18} className="animate-spin" /><span className="ml-2 hidden md:inline">Save</span></>
                  ) : (
                    <><Save size={18} /><span className="ml-2 hidden md:inline">Save</span></>
                  )}
                </Button>
              </div>
            </>
          ) : (
            /* Copy Button */
            <div className="shrink-0">
              <Button
                variant="default"
                onClick={() => copyList()}>
                  <><Copy size={18} /><span className="ml-2 hidden md:inline">Save a copy</span></>
              </Button>
            </div>
          )}
          <div className="shrink-0 py-auto">
            <ProfileDropdown />
          </div>
        </div>

        {/* Image on Separate Line */}
        <CoverImage
          imageUrl={data.coverImage}
          onImageChange={
            (newImage) => setData((prev) => ({ ...prev, coverImage: newImage }))
          }
          disabled={viewOnly} />


        {/* Summary Section: 3 Cards */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <TripDetail tripData={{
              trailName: tripDetailsFromChild?.trailName || data?.trailName || "",
              location: tripDetailsFromChild?.location || data?.location || "",
              startDate: tripDetailsFromChild?.startDate || formatDate(data.startDate),
              endDate: tripDetailsFromChild?.endDate || formatDate(data.endDate),
              hikeLength: tripDetailsFromChild?.hikeLength || data?.hikeLength?.split(" ")[0] || "",
              hikeUnit: tripDetailsFromChild?.hikeUnit || data?.hikeLength?.split(" ")[1] || "",
              elevationGain: tripDetailsFromChild?.elevationGain || data?.elevationGain?.split(" ")[0] || "",
              altitudeUnit: tripDetailsFromChild?.altitudeUnit || data?.elevationGain?.split(" ")[1] || "",
              allTrailsLink: tripDetailsFromChild?.allTrailsLink || data?.allTrailsLink || ""
            }} 
            onTripDetailChange={handleTripDetailsChange}
            disabled={viewOnly}
          />
          <PackingWeightChart data={getWeightChartData()} />
          <WeatherForecast
            address={tripDetailsFromChild?.location || data.location|| ""}
            startDate={tripDetailsFromChild?.startDate || data.startDate || ""}
            endDate={tripDetailsFromChild?.endDate || data.endDate || ""}
          />
        </div>

        {/* Packing List Component */}
        <div className="text-lg font-semibold flex items-center gap-2 mb-2">
          <img
            src="/icons/list.svg"
            alt="List Icon"
            className="w-5 h-5 object-contain"
          />
          <h2 className="text-xl font-semibold mb-0">Packing List</h2>
        </div>

        <PackingList
          ref={packingListRef}
          initItems={data.items}
          initCategories={data.categories}
          onChange={() => { handleListChange() }}
          disabled={viewOnly}
        />

        {/* Share Modal */}
        {showShareModal && (
          <ShareModal
            id={id}
            visibility={data.visibility}
            onClose={handleShareClose} />
        )}

      </div>
    )
  }
}

