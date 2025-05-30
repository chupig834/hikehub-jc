import React, { useState } from "react"

interface AddGearModalProps {
  onClose: (showSuccess: boolean) => void
}

AddGearModal.defaultProps = {

}

export default function AddGearModal({ onClose }: AddGearModalProps) {
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [weight, setWeight] = useState(undefined)
  const [unit, setUnit] = useState("oz")
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      setError("Name is required")
      return
    }

    try {
      const res = await fetch("/api/gear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, link, weight, comment, unit })
      })
      if (res.status === 201)
        onClose(true)
      else
        setError("Unable to add item")
    } catch (error) {
      setError("An unexpected error occurred")
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose(false)}></div>

      {/* Modal content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-gray-50 rounded-lg shadow-lg w-full max-w-xl px-16 py-9 pointer-events-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Add to Gear Closet</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-xs mb-4" style={{ color: "#FC625D" }}>{error}</div>
          )}

          {/* Gear Item Form */}
          <form className="space-y-3" onSubmit={handleSubmit}>

            <label className="block text-xs text-gray-700 font-semibold">Item Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter item name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <label className="block text-xs text-gray-700 font-semibold">Item Link</label>
            <input
              onChange={(e) => setLink(e.target.value)}
              type="text"
              placeholder="Enter item link"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <label className="block text-xs text-gray-700 font-semibold">Item Weight</label>
            <div className="flex border border-gray-300 rounded-md bg-white">
              <input
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                min="0"
                placeholder="Enter item weight"
                className="block w-full px-3 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <select
                className="block w-min bg-transparent rounded-r-md focus:outline-none focus:ring-1 focus:ring-primary"
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="oz">oz</option>
                <option>lb</option>
                <option>g</option>
                <option>kg</option>
              </select>
            </div>

            <label className="block text-xs text-gray-700 font-semibold">Item Comment</label>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Enter comment"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <div>
              <button
                type="submit"
                className="w-full mt-3 bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors"
              >Add to Gear Closet</button>
            </div>
          </form>

          <div className="text-center mt-4">
            <button onClick={() => onClose(false)} className="text-sm text-gray-500 hover:text-primary">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}