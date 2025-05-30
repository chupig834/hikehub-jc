"use client"

import { useState } from "react"
import CoverImageModal from "./CoverImageModal"

export default function CoverImage({ imageUrl, onImageChange, disabled = false }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="relative mb-4 group ">
        <img
          src={imageUrl}
          alt="Trip Banner"
          className="w-full h-[284px] object-cover rounded-lg"
        />

        {/* Hover Overlay */}
        {!disabled && (
          <div className="absolute inset-0 cursor-pointer bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white text-lg font-semibold"
            onClick={() => setShowModal(true)}>
            <img src="/icons/pencil.svg" alt="Edit Icon" className="w-8 h-8 mb-3 invert" />
            Change Cover Image
          </div>
        )}
      </div>

      {showModal && (
        <CoverImageModal
          onSelect={(url) => {
            onImageChange(url)
            setShowModal(false)
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
