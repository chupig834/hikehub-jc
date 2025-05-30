"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, ChevronDown, ArrowLeft, Mountain } from "lucide-react"
import { useSession } from "next-auth/react"
import ProfileDropdown from "@/components/user/profile-dropdown"
import DefaultProfileIcon from "@/components/user/default-profile-icon"

// Decorative shapes data
const decorativeShapes = [
  // Left side shapes
  { className: "w-[120px] h-[82px] top-0 left-0 bg-[#d4e0e44c] rounded absolute" },
  { className: "w-[87px] h-[87px] top-8 left-[62px] bg-[#5f92ea] rounded absolute" },
  { className: "w-[130px] h-[190px] -top-16 left-[259px] bg-[#d4e0e44c] rounded absolute" },
  { className: "w-[90px] h-[82px] -top-5 left-[454px] bg-[#d4e0e44c] rounded absolute" },
  { className: "w-[196px] h-[82px] -top-8 left-[63px] bg-[#d4e0e44c] rounded absolute" },
  // Right side shapes
  { className: "w-[87px] h-[87px] top-0 left-0 bg-[#2f9433] rounded absolute" },
  { className: "w-11 h-11 top-4 left-16 bg-[#aad282] rounded absolute" },
  { className: "w-[70px] h-[79px] top-0 left-10 bg-[#f2ec65] rounded absolute" },
  { className: "w-[60px] h-[78px] top-[-39px] left-[898px] bg-[#ff391e] rounded absolute" },
  // Bottom left shapes
  { className: "w-[120px] h-[45px] top-[31px] left-0 bg-[#ff641f] rounded absolute" },
  { className: "w-[57px] h-[55px] top-0 left-10 bg-[#f2ec65] rounded absolute" },
];

const rightComplexShapes = [
  // First group
  { className: "w-48 h-[149px] top-[27px] left-[101px] bg-[#aad282] rounded absolute" },
  { className: "w-[87px] h-[87px] top-[161px] left-4 bg-[#d4e0e44c] rounded absolute" },
  { className: "w-[57px] h-[106px] top-0 left-48 bg-[#2f9433] rounded absolute" },
  { className: "w-[60px] h-[92px] top-[197px] left-0 bg-[#5f92ea] rounded absolute" },
  // Second group
  { className: "w-[190px] h-[87px] top-0 left-[139px] bg-[#d4e0e44c] rounded absolute" },
  { className: "w-[244px] h-[169px] top-[161px] left-0 bg-[#d4e0e44c] rounded absolute" },
  { className: "w-[105px] h-32 top-[75px] left-[47px] bg-[#f2ec65] rounded absolute" },
  { className: "w-[87px] h-[87px] top-[63px] left-[257px] bg-[#ff641f] rounded absolute" },
  { className: "w-[60px] h-[54px] top-[17px] left-[199px] bg-[#ff391e] rounded absolute" },
  // Third group
  { className: "w-[87px] h-[173px] top-0 left-0 bg-[#d4e0e44c] rounded absolute" },
];

export default function ExplorePage() {
  const [showStickySearch, setShowStickySearch] = useState(false)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [hikeLengthFilter, setHikeLengthFilter] = useState('');
  const [showHikeLengthDropdown, setShowHikeLengthDropdown] = useState(false);
  const [elevationGainFilter, setElevationGainFilter] = useState('');
  const [showElevationGainDropdown, setShowElevationGainDropdown] = useState(false);

  // Trending searches data
  const trendingSearches = [
    "Yosemite",
    "Inca Trail",
    "Appalachian Trail",
    "Pacific Crest Trail",
    "John Muir Trail"
  ];

  const dateFilterOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last Year' }
  ];

  const hikeLengthOptions = [
    { value: '', label: 'All Lengths' },
    { value: 'short', label: '< 5 miles' },
    { value: 'medium', label: '5-10 miles' },
    { value: 'long', label: '> 10 miles' }
  ];

  const elevationGainOptions = [
    { value: '', label: 'All Elevations' },
    { value: 'low', label: '< 500 ft' },
    { value: 'moderate', label: '500-1000 ft' },
    { value: 'high', label: '1000-2000 ft' },
    { value: 'extreme', label: '> 2000 ft' }
  ];

  const formatPublishedDate = (date: string) => {
    const publishedDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Published today";
    } else if (diffDays === 1) {
      return "Published yesterday";
    } else if (diffDays < 7) {
      return `Published ${diffDays} days ago`;
    } else {
      return `Published ${publishedDate.toLocaleDateString()}`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (searchBarRef.current) {
        const searchBarPosition = searchBarRef.current.getBoundingClientRect().top
        if (searchBarPosition < 0) {
          setShowStickySearch(true)
        } else {
          setShowStickySearch(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const searchPackingLists = async () => {
      var limit = undefined
      if (!query.trim() && !dateFilter && !hikeLengthFilter && !elevationGainFilter) {
        limit = "12";
      }

      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query.trim()) {
          params.append('query', query);
        }
        if (dateFilter) {
          params.append('dateFilter', dateFilter);
        }
        if (hikeLengthFilter) {
          params.append('hikeLength', hikeLengthFilter);
        }
        if (elevationGainFilter) {
          params.append('elevationGain', elevationGainFilter);
        }
        if (limit) {
          params.append('limit', limit);
        }
        
        const response = await fetch(`/api/search?${params.toString()}`);
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPackingLists, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, dateFilter, hikeLengthFilter, elevationGainFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    setShowDateDropdown(false);
  };

  const handleHikeLengthChange = (value: string) => {
    setHikeLengthFilter(value);
    setShowHikeLengthDropdown(false);
  };

  const handleElevationGainChange = (value: string) => {
    setElevationGainFilter(value);
    setShowElevationGainDropdown(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative w-full h-[265px] bg-[#008b62] overflow-hidden">
        {/* Left side shapes container */}
        <div className="absolute w-[149px] h-[119px] top-[317px] left-[-91px]">
          {decorativeShapes.slice(0, 2).map((shape, index) => (
            <div key={`left-shape-${index}`} className={shape.className} />
          ))}
        </div>

        {/* Top shapes */}
        {decorativeShapes.slice(2, 5).map((shape, index) => (
          <div key={`top-shape-${index}`} className={shape.className} />
        ))}

        {/* Right side complex shapes */}
        <div className="absolute w-[379px] h-[590px] top-[-101px] left-[1362px]">
          <div className="absolute w-[293px] h-[289px] top-2.5 left-[71px]">
            {rightComplexShapes.slice(0, 4).map((shape, index) => (
              <div key={`right-complex-1-${index}`} className={shape.className} />
            ))}
          </div>

          <div className="absolute w-[344px] h-[330px] top-[260px] left-[35px]">
            {rightComplexShapes.slice(4, 9).map((shape, index) => (
              <div key={`right-complex-2-${index}`} className={shape.className} />
            ))}
          </div>

          <div className={rightComplexShapes[9].className} />
        </div>

        {/* Right side shapes */}
        <div className="absolute w-[108px] h-[87px] top-[72px] left-[1171px]">
          {decorativeShapes.slice(5, 7).map((shape, index) => (
            <div key={`right-shape-${index}`} className={shape.className} />
          ))}
        </div>

        {/* Top right shapes */}
        <div className="absolute w-[110px] h-[106px] top-[-9px] left-[1060px]">
          <div className={decorativeShapes[7].className} />
        </div>

        {/* Bottom left shapes */}
        <div className="absolute w-[120px] h-[76px] top-[94px] -left-20">
          {decorativeShapes.slice(9, 11).map((shape, index) => (
            <div key={`bottom-left-shape-${index}`} className={shape.className} />
          ))}
        </div>

        {/* Top right red shape */}
        <div className={decorativeShapes[8].className} />

        {/* Header content */}
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between mt-2 sm:mt-4">
            <Link href="/" className="inline-flex items-center justify-center gap-2.5 px-[15px] py-2.5 bg-white rounded-[5px] border border-solid border-[#bfbfbf]">
              <ArrowLeft className="!relative !w-4 !h-4" />
              <div className={`relative w-fit mt-[-1.00px] font-semibold text-black text-base tracking-[0] leading-[19.2px] whitespace-nowrap`}>
                Back to Home
              </div>
            </Link>

            {/* Logo in center */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/logo/hikehubwhite.svg"
                alt="Hikehub Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>

          <div className="mt-16 text-center px-4">
            <h1 className={`text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight`}>
              Hello, {session?.user?.name || "Guest"}. Explore all the Packing Lists out there.
            </h1>
          </div>
        </div>
      </section>

      {/* Search Section - Positioned relative to viewport */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[90%] max-w-[862px] px-4 sm:px-0" style={{ top: '325px' }}>
        {/* Main Search Bar */}
        <div ref={searchBarRef} className="flex flex-col items-center gap-4 sm:gap-6">
          {/* Search Input */}
          <div className="flex items-start justify-between px-3 sm:px-5 py-3 sm:py-[15px] w-full bg-white rounded-[10px] border border-solid border-[#c9cfd8] shadow-md">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full text-sm sm:text-base bg-transparent border-none outline-none"
              value={query}
              onChange={handleSearch}
            />
            <div className="flex w-5 h-5 sm:w-6 sm:h-6 items-center justify-center gap-2.5 bg-[#008b62] rounded-[100px] opacity-50">
              <Search className="!relative !w-3 !h-3 sm:!w-4 sm:!h-4 text-white" />
            </div>
          </div>

          {/* Trending Searches */}
          <div className="inline-flex items-center gap-2 sm:gap-4 w-full justify-center flex-wrap">
            <div className="text-xs sm:text-[14px] text-[#939393] mb-2 sm:mb-0">
              Trending Searches
            </div>
            {trendingSearches.map((topic) => (
              <div 
                key={topic} 
                className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#ececec] rounded-[100px] mb-2 sm:mb-0 cursor-pointer hover:bg-[#e0e0e0] transition-colors"
                onClick={() => setQuery(topic)}
              >
                <div className="text-xs sm:text-[14px] font-semibold text-black">
                  {topic}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Search Bar */}
      {showStickySearch && (
        <div className="fixed top-0 left-0 right-0 bg-[#008b62] z-50 py-2 sm:py-3 px-4 shadow-md transition-all duration-300 ease-in-out">
          <div className="flex items-start justify-between px-3 sm:px-5 py-3 sm:py-[15px] w-[90%] max-w-[862px] mx-auto bg-white rounded-[10px] border border-solid border-[#c9cfd8]">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full font-big-text text-sm sm:text-base text-[#939393] bg-transparent border-none outline-none"
              value={query}
              onChange={handleSearch}
            />
            <div className="flex w-5 h-5 sm:w-6 sm:h-6 items-center justify-center gap-2.5 bg-[#008b62] rounded-[100px] opacity-50">
              <Search className="!relative !w-3 !h-3 sm:!w-4 sm:!h-4 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Add spacing to account for absolute positioned search section */}
      <div className="h-48 sm:h-56"></div>

      {/* Filters */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4">
          <div className="relative">
            <button 
              className="flex items-center px-3 py-2 border rounded-md"
              onClick={() => setShowHikeLengthDropdown(!showHikeLengthDropdown)}
            >
              <span className="mr-2">
                {hikeLengthOptions.find(opt => opt.value === hikeLengthFilter)?.label || 'Hike Length'}
              </span>
              <ChevronDown size={16} />
            </button>
            {showHikeLengthDropdown && (
              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border">
                {hikeLengthOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      hikeLengthFilter === option.value ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleHikeLengthChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button 
              className="flex items-center px-3 py-2 border rounded-md"
              onClick={() => setShowElevationGainDropdown(!showElevationGainDropdown)}
            >
              <span className="mr-2">
                {elevationGainOptions.find(opt => opt.value === elevationGainFilter)?.label || 'Elevation Gain'}
              </span>
              <ChevronDown size={16} />
            </button>
            {showElevationGainDropdown && (
              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border">
                {elevationGainOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      elevationGainFilter === option.value ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleElevationGainChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button 
              className="flex items-center px-3 py-2 border rounded-md"
              onClick={() => setShowDateDropdown(!showDateDropdown)}
            >
              <span className="mr-2">
                {dateFilterOptions.find(opt => opt.value === dateFilter)?.label || 'Published Date'}
              </span>
              <ChevronDown size={16} />
            </button>
            {showDateDropdown && (
              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border">
                {dateFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      dateFilter === option.value ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleDateFilterChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hiking Destinations Grid */}
      <div className="container mx-auto px-4 mt-8 mb-16">
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}
        {loading && (
          <div className="text-center mb-4">Loading...</div>
        )}
        {!loading && !error && results.length === 0 && (
          <div className="text-center text-gray-500">
            {query || dateFilter ? "No results found" : "Search for packing lists or use the filters above"}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((item) => (
            <div key={item._id} className="rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/list/${item._id}`}>
                <div className="relative h-48">
                  <Image
                    src={item.coverImage || "/images/hiking-banner3.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <DefaultProfileIcon size={24} name={item.userName} />
                    </div>
                    <span className="text-sm text-gray-600">By {item.userName || "hikehub user"}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500">{item.createdAt ? formatPublishedDate(item.createdAt) : "Published recently"}</p>
                    <div className="flex items-center gap-3">
                      {item.hikeLength && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={14} className="mr-1" />
                          {item.hikeLength}
                        </div>
                      )}
                      {item.elevationGain && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mountain width={14} height={14} className="mr-1" />
                          {item.elevationGain}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
