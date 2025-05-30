"use client"

import { LogOut, User, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import LoginModal from "@/components/user/login-modal"
import { Button } from "../ui/button"
import ProfileModal from "./profile-modal"
import SignOutModal from "./sign-out-modal"
import DefaultProfileIcon from "./default-profile-icon"

export default function ProfileDropdown() {
  const router = useRouter()
  const session = useSession()
  const [showDropdown, setShowDropdown] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showSignOut, setShowSignOut] = useState(false)

  // User data
  const user = {
    name: session.data?.user.name,
    email: session.data?.user.email,
    image: session.data?.user.image,
  }

  return (
    session.status === "authenticated" ? (
      <div className="w-[40px] h-[40px] relative">
        <button
          className="rounded-full overflow-hidden cursor-pointer border"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {user.image
            ? <img
              src={user.image}
              alt="Profile icon"
              className="w-full h-full object-cover" />
            : <DefaultProfileIcon name={user.name} size={40} />
          }
        </button>

        {/* Profile Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 py-1">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium">{user.name ?? "Not signed in"}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setShowSettings(true)
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
              <User size={16} />
              Profile
            </a>
            <a
              href="#"
              onClick={() => setShowSignOut(true)}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </a>
          </div>
        )}

        {/* Profile Settings Modal */}
        {showSettings && (
          <ProfileModal onClose={() => setShowSettings(false)} />
        )}

        {/* Sign Out Confirmation Modal */}
        {showSignOut && (
          <SignOutModal onClose={() => setShowSignOut(false)} />
        )}
      </div>
    ) : (
      <>
        <Button variant="outline" onClick={() => setShowSignIn(true)}>
          <LogIn size={18} className="mr-2" />
          <span className="w-fit whitespace-nowrap">Log in</span>
        </Button>

        {/* Sign In Modal */}
        {showSignIn && (
          <LoginModal onClose={() => setShowSignIn(false)} />
        )}
      </>
    )

  )
}