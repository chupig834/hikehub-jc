import { useDraggable } from "@dnd-kit/core";
import { CSSProperties, useContext, useState } from "react";
import EditGearModal from "./edit-gear-modal";
import DeleteModal from "../sidebar/delete-modal";
import { cn } from "@/lib/utils";
import UserDataContext from "../user-data-context";

interface GearItemProps {
  className?: string;
  id: string; // Draggable id
  item: any;
  isDragging?: boolean;
}

export default function GearItem({ className, item, id, isDragging=false }: GearItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { setGear } = useContext(UserDataContext);

  const deleteGear = async (id) => {
    await fetch(`/api/gear/${id}`, { method: 'DELETE' });
    updateGear();
  };
  const updateGear = async () => {
    const res = await fetch('/api/gear');
    const data = await res.json();
    setGear(data);
  };

  return (<>
    {showEditModal &&
      <EditGearModal item={item} onClose={(success) => {
        setShowEditModal(false);
        if (success)
          updateGear();
      }} />
    }

    {showDeleteModal &&
      <DeleteModal
        message={`Are you sure you want to delete ${item.name}?`}
        buttonText="Delete Item"
        onConfirm={() => {
          deleteGear(item._id);
          setShowDeleteModal(false);
        }}
        onClose={() => setShowDeleteModal(false)} />
    }
    <div
      ref={setNodeRef}
      className={cn("group text-white text-sm flex flex-row hover:bg-primary-foreground/10 rounded", className)}

    >
      <div className={`p-2 grow overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        {...listeners}
        {...attributes}
      >
        <div className="truncate">{item.name}</div>
        <div className="text-[10px] truncate">{item.link}</div>
      </div>
      <div className="p-2 shrink-0 items-center flex group-hover:hidden">
        {item.weight} {item.unit}
      </div>
      <div className="p-2 flex-none flex items-center space-x-2 hidden group-hover:flex">
        <button
          onClick={() => {
            setShowEditModal(true);
          }}>
          <img
            src="/icons/edit_white.svg"
            alt="Edit gear item"
            className="object-contain"
            width={16}
            height={16}
          />
        </button>
        <button
          onClick={() => {
            setShowDeleteModal(true);
          }}>
          <img
            src="/icons/trash_white.svg"
            alt="Delete gear item"
            className="object-contain"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  </>)
}