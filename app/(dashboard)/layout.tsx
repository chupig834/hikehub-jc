"use client"

import GearItem from "@/components/gear-closet/gear-item"
import Sidebar from "@/components/sidebar/sidebar"
import SidebarContext from "@/components/sidebar/sidebar-context"
import UserDataContext from "@/components/user-data-context"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  const [showSidebar, setShowSidebar] = useState(false)
  const [lists, setLists] = useState([])
  const [gear, setGear] = useState([])
  const [activeGear, setActiveGear] = useState(null)

  const handleDragStart = (event) => {
    setActiveGear(event.active.id);
  }

  const handleDragEnd = () => {
    setActiveGear(null);
  }

  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      <UserDataContext.Provider value={{ lists, setLists, gear, setGear, activeGear, setActiveGear }}>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex">
            <div className={`w-[252px] h-screen shrink-0 flex fixed lg:sticky top-0 z-20 ${showSidebar ? "left-0" : "-left-full"} transition-[left] duration-300 ease-in-out`}>
              <Sidebar />
            </div>

            <div className="grow overflow-y-auto">
              {/* Sidebar Overlay */}
              {showSidebar && (
                <div className="lg:hidden fixed inset-0 z-10" onClick={() => setShowSidebar(false)}>
                </div>
              )}
              {children}
            </div>
          </div>

          <DragOverlay dropAnimation={null}>
            {activeGear ? (
              <div className="z-10 bg-primary rounded">
                <GearItem
                  id={activeGear}
                  item={gear[parseInt(activeGear)]}
                  isDragging={true} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </UserDataContext.Provider>
    </SidebarContext.Provider>
  )
}