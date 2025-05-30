"use client";

import { ICategory, IItem } from "@/models/list";
import { forwardRef, memo, useContext, useImperativeHandle, useState } from "react";
import UserDataContext from "./user-data-context";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import Link from "next/link";

const DEFAULT_COLORS = [
  "#ED336E",
  "#FC625D",
  "#FFA532",
  "#78C443",
  "#19D07D",
  "#F57942",
  "#42A9F9",
  "#10CEAF",
  "#00C6E9",
  "#A33EB0",
  "#9475AA",
  "#F04438",
  "#10CC48",
];

const EDIT_CATEGORIES_VALUE = "Edit Categories";

function getCategoryColor(categoryName, categories) {
  const cat = categories.find((c) => c.name === categoryName);
  return cat?.color || "#cccccc";
}

export interface PackingListHandle {
  getItems: () => IItem[],
  getCategories: () => ICategory[],
}

interface PackingListProps {
  initItems: IItem[];
  initCategories: ICategory[];
  onChange?: () => void;
  disabled: boolean;
}

const PackingList = forwardRef((props: PackingListProps, ref) => {
  const { initItems, initCategories, disabled } = props;
  const [items, setItems] = useState(initItems);
  const [categories, setCategories] = useState(() =>
    initCategories.map((cat, index) => ({
      ...cat,
      color: cat.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }))
  );
  const [addingCategory, setAddingCategory] = useState({});
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const { gear, setGear } = useContext(UserDataContext);
  const { isOver, setNodeRef } = useDroppable({
    id: 'packingList',
  });

  // Monitor onDragEnd when dropping item
  useDndMonitor({
    onDragEnd: (event) => {
      if (event.over && event.over.id === 'packingList') {
        const item = gear[parseInt(event.active.id.toString())]
        item.quantity = 1;
        setItems((items) => {
          const updated = [...items, item];
          props.onChange?.();  // notify parent
          return updated;
        });
      }
    }
  })

  useImperativeHandle(ref, () => ({
    getItems: () => {
      return items;
    },
    getCategories: () => {
      return categories;
    },
  }));

  // Add a new row with blank values
  const addItem = () => {
    const newItem = {
      name: "",
      category: filterCategory !== "All Categories" ? filterCategory : "",
      link: "",
      weight: undefined,
      unit: "oz",
      quantity: 1,
      comment: "",
    };
    setItems((items) => {
      const updated = [...items, newItem];
      props.onChange?.();  // notify parent
      return updated;
    });
  };

  // Remove an item by index
  const removeItem = (index) => {
    setItems((items) => {
      const updated = items.filter((_item, idx) => idx !== index);
      props.onChange?.(); // Notify parent that items changed
      return updated;
    });
  };

  // Update a specific field for an item
  const updateItem = (index, field, value) => {
    setItems((items) => {
      const updated = items.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      );
      props.onChange?.();
      return updated;
    });
  };

  const addToGearCloset = async (item) => {
    try {
      const res = await fetch("/api/gear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      })
      if (res.status === 201) {
        // Update sidebar
        const getRes = await fetch("/api/gear")
        const data = await getRes.json()
        setGear(data)
      } else
        console.log("Unable to add item")
    } catch (error) {
      console.log("An unexpected error occurred")
    }
  }

  const getNextColor = () => {
    const usedColors = categories.map((cat) => cat.color);
    for (let color of DEFAULT_COLORS) {
      if (!usedColors.includes(color)) {
        return color;
      }
    }
    return DEFAULT_COLORS[0];
  };

  const finishAddingCategory = (rowIndex) => {
    const newCatName = addingCategory[rowIndex]?.trim();
    setAddingCategory((prev) => {
      const updated = { ...prev };
      delete updated[rowIndex];
      return updated;
    });
    if (!newCatName) {
      updateItem(rowIndex, "category", "");
      return;
    }

    const existing = categories.find(
      (cat) => cat.name.toLowerCase() === newCatName.toLowerCase()
    );
    if (existing) {
      updateItem(rowIndex, "category", existing.name);
    } else {
      const newCategory = {
        name: newCatName,
        color: getNextColor(),
      };
      setCategories((prev) => [...prev, newCategory]);
      updateItem(rowIndex, "category", newCatName);
    }
  };

  // Handlers for the Category Editor Modal
  const handleRemoveCategory = (catName: string) => {
    setCategories((prev) => prev.filter((c) => c.name !== catName));
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.category === catName ? { ...item, category: "" } : item
      )
    );
  };

  const handleRenameCategory = (oldName: string, newName: string) => {
    if (!newName.trim()) return;
    setCategories((prev) =>
      prev.map((c) => (c.name === oldName ? { ...c, name: newName } : c))
    );
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.category === oldName ? { ...item, category: newName } : item
      )
    );
  };

  const handleAddNewCategory = () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) return;
    if (categories.find((cat) => cat.name.toLowerCase() === trimmedName.toLowerCase())) {
      return;
    }
    const newCategoryObj = {
      name: trimmedName,
      color: getNextColor(),
    };
    setCategories((prev) => [...prev, newCategoryObj]);
    setNewCategoryName("");
  };

  return (
    <div>
      <div className="mb-4">
        <div className="relative group inline-block">
          <select
            id="filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border rounded pr-10"
          >
            <option value="All Categories">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {filterCategory !== "All Categories" && (
            <button
              onClick={() => setFilterCategory("All Categories")}
              type="button"
              title="Clear filter"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 z-20 bg-white text-gray-600 hover:text-gray-700 focus:outline-none text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`overflow-x-auto rounded-lg bg-white border${isOver ? " ring ring-offset-4 ring-orange-300" : ""}`}
      >
        <table className="w-full table-auto border-collapse p-6 text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr className="text-left border-b">
              <th className="py-4 px-6">Item Name</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Link</th>
              <th className="py-4 px-6">Weight</th>
              <th className="py-4 px-6">Quantity</th>
              <th className="py-4 px-6">Comment</th>
              <th className="py-4 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {items
              ?.filter(
                (item) =>
                  filterCategory === "All Categories" ||
                  item.category === filterCategory
              )
              .map((item, index) => (
                <tr key={index} className="border-b">
                  {/* Item Name */}
                  <td className="py-0">
                    <input
                      type="text"
                      placeholder="Item name"
                      value={item.name || ""}
                      disabled={disabled}
                      onChange={(e) => updateItem(index, "name", e.target.value)}
                      className="w-full px-6 py-4 focus:outline-none focus:ring-orange-300 focus:ring-1 disabled:bg-transparent"
                    />
                  </td>
                  {/* Category */}
                  <td className="py-0 px-6">
                    {addingCategory.hasOwnProperty(index) ? (
                      <input
                        type="text"
                        value={addingCategory[index]}
                        disabled={disabled}
                        onChange={(e) =>
                          setAddingCategory((prev) => ({
                            ...prev,
                            [index]: e.target.value,
                          }))
                        }
                        onBlur={() => finishAddingCategory(index)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            finishAddingCategory(index);
                          }
                        }}
                        placeholder="New category"
                        className="w-full px-2 py-1 border-0 rounded focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <div style={{ display: "inline-block" }}>
                        <select
                          value={item.category}
                          disabled={disabled}
                          onChange={(e) => {
                            if (e.target.value === EDIT_CATEGORIES_VALUE) {
                              setShowCategoryEditor(true);
                            } else {
                              setAddingCategory((prev) => {
                                const updated = { ...prev };
                                delete updated[index];
                                return updated;
                              });
                              updateItem(index, "category", e.target.value);
                            }
                          }}
                          className="appearance-none focus:outline-none truncate text-center disabled:opacity-100"
                          style={{
                            backgroundColor: getCategoryColor(item.category, categories),
                            color: "#fff",
                            borderRadius: "9999px",
                            padding: "0.25rem 0.5rem",
                            backgroundImage: "none",
                            display: "inline-block",
                            width: "auto",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <option
                            value=""
                            style={{ backgroundColor: "#fff", color: "#000" }}
                          >
                            None
                          </option>
                          {categories.map((category, idx) => (
                            <option
                              key={idx}
                              value={category.name}
                              style={{ backgroundColor: "#fff", color: "#000" }}
                            >
                              {category.name}
                            </option>
                          ))}
                          <option
                            value={EDIT_CATEGORIES_VALUE}
                            style={{ backgroundColor: "#fff", color: "#000" }}
                          >
                            Edit Categories
                          </option>
                        </select>
                      </div>
                    )}
                  </td>
                  {/* Link */}
                  <td className="py-0">
                    {(disabled && item.link) ? (
                      <div className="max-w-64 overflow-hidden px-6 py-4 truncate text-blue-600">
                        <a target="_blank" href={item.link} rel="noopener noreferrer">{item.link}</a>
                      </div>
                    ): (
                    <input
                      type="text"
                      placeholder="Link"
                      value={item.link || ""}
                      disabled={disabled}
                      onChange={(e) => updateItem(index, "link", e.target.value)}
                      className="w-full px-6 py-4 focus:outline-none focus:ring-orange-200 focus:ring-1 disabled:bg-transparent"
                    />
                    )}
                  </td>
                  {/* Weight */}
                  <td className="py-0">
                    <div className="flex flex-row">
                      <input
                        type="number"
                        min="0"
                        placeholder="Weight"
                        value={item.weight ?? ""}
                        disabled={disabled}
                        onChange={(e) => {
                          const floatVal = parseFloat(e.target.value);
                          updateItem(index, "weight", isNaN(floatVal) ? undefined : floatVal);
                        }}
                        className="w-24 pl-6 mr-1 py-4 focus:outline-none focus:ring-orange-200 focus:ring-1 disabled:bg-transparent"
                      />
                      <select
                        className="w-min"
                        value={item.unit || "oz"}
                        disabled={disabled}
                        onChange={(e) => updateItem(index, "unit", e.target.value)}
                      >
                        <option>oz</option>
                        <option>lb</option>
                        <option>g</option>
                        <option>kg</option>
                      </select>
                    </div>
                  </td>
                  {/* Quantity */}
                  <td className="py-0">
                    <input
                      type="number"
                      min="1"
                      placeholder="Quantity"
                      value={item.quantity ?? ""}
                      disabled={disabled}
                      onChange={(e) => {
                        const intVal = parseInt(e.target.value);
                        updateItem(index, "quantity", isNaN(intVal) ? undefined : intVal);
                      }}
                      className="w-24 pl-6 pr-0 py-4 focus:outline-none focus:ring-orange-200 focus:ring-1 disabled:bg-transparent"
                    />

                  </td>
                  {/* Comment */}
                  <td className="py-0">
                    <input
                      type="text"
                      placeholder="Add Comment"
                      value={item.comment || ""}
                      disabled={disabled}
                      onChange={(e) => updateItem(index, "comment", e.target.value)}
                      className="w-full px-6 py-4 focus:outline-none focus:ring-orange-200 focus:ring-1 disabled:bg-transparent"
                    />
                  </td>
                  {/* Actions */}
                  <td className="px-4">
                    <div className="flex justify-end space-x-2">
                      {item.name && (
                        <button
                          onClick={() => { addToGearCloset(item) }}
                          className="text-gray-500 hover:text-blue-500"
                        >
                          <img src="/icons/move.svg" alt="Edit" className="w-6 h-6" />
                        </button>
                      )}
                      {!disabled && (
                        <button
                          onClick={() => removeItem(index)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <img src="/icons/trash.svg" alt="Delete" className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
          {!disabled && (
            <tfoot>
              <tr>
                <td colSpan={7} className="px-6 py-4">
                  {/* Add New Item Button */}
                  <button
                    onClick={addItem}
                    className="text-green-600 font-medium flex items-center hover:text-green-700"
                  >
                    Add New Item
                  </button>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {showCategoryEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        {/* Modal container */}
        <div className="w-[400px] shadow-xl rounded-xl overflow-hidden bg-gray-100">
          
          {/* Header section: spans full width with gray background */}
          <div className="relative bg-gray-100 px-6 py-4">
            <h2 className="text-lg font-bold text-center">Categories</h2>
            <button
              onClick={() => setShowCategoryEditor(false)}
              className="absolute top-4 right-1 px-4 py-1 text-[#008B62] hover:text-[#007B5C] font-semibold"
            >
              Done
            </button>
          </div>
      
          {/* Body section: white with padding */}
          <div className="bg-white px-6 py-3">
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {categories.map((cat) => (
                <li key={cat.name} className="flex items-center justify-between py-1">
                  <CategoryRenameItem
                    category={cat}
                    onRename={(newName) => handleRenameCategory(cat.name, newName)}
                    onRemove={() => handleRemoveCategory(cat.name)}
                  />
                </li>
              ))}
            </ul>
      
            <div className="-mx-6 my-3">
              <hr className="border-gray-300" />
            </div>
      
            {/* Add new category */}
            <div className="flex items-center">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="min-w-0 border p-2 rounded-md"
              />
              <button
                onClick={handleAddNewCategory}
                className="ml-2 bg-[#008B62] text-white px-4 py-2 rounded-md hover:bg-[#007B5C] whitespace-nowrap"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
});

function CategoryRenameItem({ category, onRename, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(category.name);

  return (
    <div className="flex items-center justify-between space-x-4 w-full">
      {/* Left side: Bubble or input */}
      <div className="flex-grow">
        {editing ? (
          <input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={(e) => {
              if (e.relatedTarget && e.relatedTarget.id === "saveButton") return;
              onRename(tempName);
              setEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onRename(tempName);
                setEditing(false);
              }
            }}
            className="border-b px-2 py-1 w-full focus:outline-none"
            autoFocus
          />
        ) : (
          <span
            className="inline-block px-3 py-1 text-white text-sm font-medium rounded-full"
            style={{
              backgroundColor: category.color,
              whiteSpace: "nowrap",
            }}
          >
            {category.name}
          </span>
        )}
      </div>

      {/* Right side: Action buttons */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        {editing ? (
          <button
          id="saveButton"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            onRename(tempName);
            setEditing(false);
          }}
          className="text-green-600 hover:text-green-800 py-1 ml-1"
        >
          Save
        </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            title="Edit category"
            className="hover:text-gray-800"
          >
            <img src="/icons/pencil.svg" alt="Edit" className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={() => onRemove(category.name)}
          title="Remove category"
          className="hover:text-red-600"
        >
          <img src="/icons/trash.svg" alt="Delete" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default memo(PackingList);
