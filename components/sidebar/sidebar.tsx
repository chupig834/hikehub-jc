"use client";

import { SquarePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AddGearModal from "../gear-closet/add-gear-modal";
import UserDataContext from "../user-data-context";
import DeleteModal from "./delete-modal";
import SuccessModal from "./success-modal";
import GearItem from "../gear-closet/gear-item";

export default function Sidebar() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { lists, setLists, gear, setGear } = useContext(UserDataContext);
  const [showDeleteListModal, setShowDeleteListModal] = useState(false);
  const [showAddGearModal, setShowAddGearModal] = useState(false);
  const [selectedList, setSelectedList] = useState(undefined);
  const [showGearSuccessModal, setShowGearSuccessModal] = useState(false);

  const isActive = (id) => pathname === `/list/${id}`;

  const fetchPackingLists = async () => {
    if (session.status === "authenticated") {
      const res = await fetch('/api/list');
      const data = await res.json();
      setLists(data);
    }
  };
  const addPackingList = async () => {
    if (session.status === "authenticated") {
      const res = await fetch('/api/list?name=New Packing List', { method: 'POST' });
      const data = await res.json()
      fetchPackingLists();
      router.push(`/list/${data._id}`)
    }
  };
  const deletePackingList = async (id) => {
    if (session.status === "authenticated") {
      await fetch(`/api/list/${id}`, { method: 'DELETE' });
      if (isActive) {
        router.push("/")
      }
      fetchPackingLists();
    }
  };
  const fetchGear = async () => {
    if (session.status === "authenticated") {
      const res = await fetch('/api/gear');
      const data = await res.json();
      setGear(data);
    }
  }
  const addGear = async () => {
    if (session.status === "authenticated") {
      setShowAddGearModal(true);
    }
  };

  const onGearModalClose = (showSuccess) => {
    setShowAddGearModal(false);
    if (showSuccess) {
      fetchGear();
      setShowGearSuccessModal(true);
    }
  };


  // Refresh data when logging in/out
  useEffect(() => {
    fetchPackingLists();
    fetchGear();
  }, [session.status]);

  return (
    <div className="w-full bg-primary flex flex-col py-5 overflow-y-auto scrollbar">

      {showDeleteListModal &&
        <DeleteModal
          message={`Are you sure you want to delete this packing list?`}
          buttonText="Delete Packing List"
          onConfirm={() => {
            deletePackingList(selectedList._id);
            setShowDeleteListModal(false);
          }}
          onClose={() => setShowDeleteListModal(false)} />
      }

      {showAddGearModal && <AddGearModal onClose={onGearModalClose} />}
      {showGearSuccessModal &&
        <SuccessModal
          title="You have successfully added the item to your gear closet."
          description="You may drag-and-drop it into a packing list at any time."
          onClose={() => setShowGearSuccessModal(false)} />
      }


      <h1 className="px-5 text-white text-2xl font-bold"><Link href="/">hikehub.</Link></h1>

      {/* Packing List Section */}
      <div className="px-5 py-3 flex-grow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-sm font-bold">Packing Lists</h2>
          <button className="text-white" onClick={addPackingList}>
            <SquarePlus size={16} />
          </button>
        </div>

        <div className="space-y-2">
          {lists.length > 0
            ? lists.map(packingList => (
              <div
                key={packingList._id}
                className={"group text-white text-sm flex flex-row " + (isActive(packingList._id)
                  ? "bg-primary-foreground/10 rounded"
                  : "hover:bg-primary-foreground/10 rounded")}>
                <div
                  className="p-2 flex-1 truncate cursor-pointer"
                  onClick={() => router.push(`/list/${packingList._id}`)}
                >
                  {packingList.name}
                </div>
                <button
                  className="m-2 text-white flex-none hidden group-hover:block"
                  onClick={() => {
                    setSelectedList(packingList);
                    setShowDeleteListModal(true);
                  }}>
                  <img
                    src="/icons/trash_white.svg"
                    alt="Delete packing list"
                    className="object-contain"
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            ))
            : (
              <div className="flex flex-col items-center justify-center mt-4 mb-4">
                <div className="relative flex items-center justify-center">
                  <img
                    src="/icons/no-results.svg"
                    alt="Empty Gear Closet"
                    className="object-contain mt-4"
                    height="120px"
                  />
                </div>
                <p className="text-white text-center text-[13px] mt-4">
                  There are currently no
                  <br />
                  packing lists.
                </p>
              </div>
            )}
        </div>
      </div>

      {/* Gear Closet Section */}
      <div className="px-5 py-3 flex-grow mt-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-sm font-bold">Gear Closet</h2>
          <button className="text-white" onClick={addGear}>
            <SquarePlus size={16} />
          </button>
        </div>

        <div className="">
          {gear.length > 0 ? (
            gear.map((item, index) => (
              <GearItem
                id={index.toString()}
                className="mt-2"
                key={item._id}
                item={item} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-4 mb-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <img
                  src="/icons/empty-folder.svg"
                  alt="Empty Gear Closet"
                  className="object-contain mt-4"
                  width="83px"
                  height="83px"
                />
              </div>
              <p className="text-white text-center text-[13px] mt-4">
                There are currently no items
                <br />
                in your gear closet. Create
                <br />
                one right now!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
