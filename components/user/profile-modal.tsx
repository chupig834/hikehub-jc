import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

export default function ProfileModal({ onClose }) {
  const { update } = useSession()
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [occupation, setOccupation] = useState("")

  const fetchData = async () => {
    const res = await fetch("/api/user")
    if (res.status === 200) {
      const data = await res.json()
      if (data.email)
        setEmail(data.email)
      if (data.name)
        setName(data.name)
      if (data.occupation)
        setOccupation(data.occupation)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      setError("Name is required")
      return
    }

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, occupation })
      })
      if (res.status === 200) {
        update({ name }) // Update session
        onClose()
      } else
        setError("Unable to update profile")
    } catch (error) {
      setError("An unexpected error occurred")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="fixed inset-0 z-50">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose()}></div>

      {/* Modal content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-gray-50 rounded-lg shadow-lg w-full max-w-lg px-7 py-10 pointer-events-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Profile Settings</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-xs mb-4" style={{ color: "#FC625D" }}>{error}</div>
          )}

          {/* Form */}
          <form className="space-y-3" onSubmit={handleSubmit}>

            <label className="block text-xs text-gray-700 font-semibold">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <label className="block text-xs text-gray-700 font-semibold">Email </label>
            <input
              disabled
              value={email}
              type="text"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <label className="block text-xs text-gray-700 font-semibold">Occupation</label>
            <input
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              type="text"
              placeholder="Enter occupation"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <div>
              <button
                type="submit"
                className="w-full mt-3 bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors"
              >Save</button>
            </div>
          </form>

          <div className="text-center mt-4">
            <button onClick={() => onClose()} className="text-sm text-gray-500 hover:text-primary">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}