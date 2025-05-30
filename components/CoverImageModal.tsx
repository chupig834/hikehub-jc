"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const stockImages = [
  "/images/hiking-banner1.jpg",
  "/images/hiking-banner2.jpg",
  "/images/hiking-banner3.jpg",
  "/images/hiking-banner4.jpg",
  "/images/hiking-banner5.jpg",
  "/images/hiking-banner6.jpg",
  "/images/inca.png",
  "/images/redwood.png",
  "/images/yosemite.png",
]

export default function CoverImageModal({ onSelect, onClose }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [tab, setTab] = useState("stock")

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-center mb-4">Update Cover Image</h2>

        {/* Tab header (you can wire this if you implement custom upload later) */}
        <div className="flex justify-center gap-6 text-sm border-b mb-4">
          <button
            className={`text-sm font-semibold px-2 pb-2 border-b-2 ${
                tab === "stock"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400"
            }`}
            onClick={() => setTab("stock")}
            >
            Choose From Stock Images
            </button>

          <button
            className={`px-3 py-1 border-b-2 ml-6 ${tab === "upload" ? "border-primary font-medium" : "text-gray-500"}`}
            onClick={() => setTab("upload")}
          >
            Upload Custom Image
          </button>
        </div>

        {/* Content */}
        {tab === "stock" ? (
        <div className="grid grid-cols-3 gap-3">
          {stockImages.map((img, idx) => (
            <div
              key={idx}
              className={`overflow-hidden rounded-lg cursor-pointer transition-all duration-200 border-2
                ${selectedImage === img ? "border-primary" : selectedImage ? "opacity-50 hover:opacity-80 border-transparent" : "border-transparent"}`}
              onClick={() => setSelectedImage(img)}
            >
              <img src={img} alt={`Cover ${idx}`} className="w-full h-24 object-cover" />
            </div>
          ))}
        </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-sm text-gray-500 mb-4">
            <p>Upload functionality not yet implemented</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6">
          <Button
            className={`w-full py-2 font-medium rounded transition-all duration-200
              ${selectedImage ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
            disabled={!selectedImage}
            onClick={() => selectedImage && onSelect(selectedImage)}
          >
            Update Image
          </Button>

          <Button
            variant="ghost"
            className="w-full mt-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
