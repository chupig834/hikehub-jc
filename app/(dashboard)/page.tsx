"use client"

import { useContext, useState } from "react"
import Image from "next/image"
import { Plus, Users, Menu } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import ProfileDropdown from "@/components/user/profile-dropdown"
import SidebarContext from "@/components/sidebar/sidebar-context"
import UserDataContext from "@/components/user-data-context"

export default function HomePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { setShowSidebar } = useContext(SidebarContext)
  const { setLists } = useContext(UserDataContext)
  const [showLogin, setShowLogin] = useState(false)

  const name = session?.user.name
  const authenticated = status === "authenticated"

  const addPackingList = async () => {
    if (authenticated) {
      const res = await fetch('/api/list?name=New Packing List', { method: 'POST' })
      var data = await res.json()

      router.push(`/list/${data._id}`)

      // Update sidebar
      const getRes = await fetch("/api/list")
      data = await getRes.json()
      setLists(data)
    }
  };

  return (
    <div className="h-screen flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex justify-end items-center p-6">
        <div
          className="block lg:hidden cursor-pointer mr-auto"
          onClick={() => setShowSidebar(true)}>
          <Menu size={32} />
        </div>

        <ProfileDropdown key={showLogin.toString()} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-primary">
            <Image
              src="/logo/hikehub.svg"
              alt="Hikehub Logo"
              width={0}
              height={0}
              className="object-contain w-auto h-full"
              style={{ width: "auto", height: "48px" }}
            />
          </div>
          {name ?
            <h1 className="text-4xl font-bold">Hello, {name}. Welcome to hikehub.</h1> : <h1 className="text-4xl font-bold">Welcome to hikehub.</h1>
          }
        </div>
        <p className="text-xl text-center mb-12">The best packing list creation tool for hikers</p>

        <div className="flex flex-col gap-4">
          <button
            className="bg-primary hover:bg-primary/90 text-white rounded-md py-3 px-4 flex items-center justify-center gap-2"
            onClick={() => addPackingList()}
            disabled={!authenticated}
          >
            <Plus size={20} />
            Create New Packing List
          </button>
          <button
            className="bg-white border border-gray-200 hover:bg-gray-50 rounded-md py-3 px-4 flex items-center justify-center gap-2"
            onClick={() => router.push("/explore")}
          >
            <Users size={20} />
            Explore Community
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-gray-500 text-sm">© 2025 hikehub. All rights reserved.</div>
    </div >
  )
}

