import { signOut } from "next-auth/react"

export default function SignOutModal({ onClose }) {

  const handleSignOut = async (e) => {
    e.preventDefault()
    await signOut({ callbackUrl: '/', redirect: true })
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose()}></div>

      {/* Modal content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-gray-50 rounded-lg shadow-lg w-full max-w-lg px-7 py-10 pointer-events-auto">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold mb-2">Are you sure you want to sign out?</h2>
            <p className="text-base text-gray-400">You will need to sign in again if you wish to access your account.</p>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors"
          >Sign Out</button>

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