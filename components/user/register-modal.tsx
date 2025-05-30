import { signIn } from "next-auth/react"
import { useState } from "react"

export default function RegisterModal({ email, password, onClose }) {
  const [name, setName] = useState("")
  const [occupation, setOccupation] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Missing field
    if (!name) {
      setError("Name is required")
      return
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, occupation }),
      })

      if (res.ok) {
        // Sign in the user after successful registration
        const signInRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (signInRes?.error) {
          setError("Incorrect credentials")
          return
        }

        // Reload page
        window.location.reload()
      } else {
        const data = await res.json()
        setError(data.message || "Registration failed")
      }
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

          <div className="mb-7">
            <h2 className="text-3xl font-bold mb-2">Just a few more steps...</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-xs mb-2" style={{ color: "#FC625D" }}>{error}</div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit}>

            <div className="space-y-2 mb-7">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />

              <input
                onChange={(e) => setOccupation(e.target.value)}
                type="text"
                placeholder="Enter Your Occupation"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors"
            >
              Start Making Packing Lists!
            </button>
          </form>

          <div className="text-center mt-2">
            <button onClick={() => onClose()} className="text-sm text-gray-500 hover:text-primary">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}