import { useState } from "react"

export default function ShareModal({ id, visibility, onClose }) {
  const [isPublic, setIsPublic] = useState(visibility === "public")
  const [showCopied, setShowCopied] = useState(false)

  // Copy link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/explore/" + id)
    setShowCopied(true)
    setTimeout(() => { setShowCopied(false) }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose()}></div>

      {/* Modal content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-gray-50 rounded-lg shadow-lg w-full max-w-xl px-16 py-9 pointer-events-auto">
          <div className="text-center mb-6">
            <img
              src="/icons/share_primary.svg"
              alt="Share Icon"
              className="w-54 h-54 object-contain mx-auto mb-6" />
            <h2 className="text-xl font-bold">Share Your Packing List</h2>
            <p className="text-gray-400 font-normal">Share your packing list as a link to friends or publish it to the Community!</p>
          </div>

          <label className="mb-6 flex items-center cursor-pointer">
            <div className="grow flex-col">

              <span className="text-xs font-semibold text-gray-700 mr-auto">Publish to Community</span>
              <div className="text-gray-400">Anyone can view or save this packing list</div>
            </div>
            <input type="checkbox" value="" className="sr-only peer"
              checked={isPublic}
              onChange={(e) => {
                setIsPublic(e.target.checked)
              }} />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary dark:peer-checked:bg-blue-600"></div>
          </label>

          <div className="relative group">
            <button
              className="w-full mt-3 bg-background hover:bg-accent py-2 border rounded-md transition-colors"
              onClick={() => copyLink()}
            >Copy Link</button>
            <div className={`${showCopied ? "opacity-100" : "opacity-0"} absolute left-1/2 transform -translate-x-1/2 bottom-full mb-0 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-150`}>
              Copied!
            </div>
          </div>

          <button
            className="w-full mt-3 bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors"
            onClick={() => { onClose(isPublic) }}
          >Save</button>

          <div className="text-center mt-4">
            <button onClick={() => onClose()} className="text-sm text-gray-500 hover:text-primary">
              Go Back
            </button>
          </div>
        </div>
      </div>

    </div >
  )
}