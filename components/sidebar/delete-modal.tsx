export default function DeleteModal({ message, buttonText, onConfirm, onClose }) {

  return (
    <div className="fixed inset-0 z-50">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose()}></div>

      {/* Modal content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-gray-50 rounded-lg shadow-lg w-full max-w-xl px-16 py-9 space-y-7 pointer-events-auto">
          <img
            src="/icons/alert.svg"
            width={72}
            height={72}
            className="object-contain mx-auto"
          />
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-xl font-bold">{message}</h2>
            <p className="text-gray-400">You will not be able to recover this action later.</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onConfirm()}
              className="w-full bg-alert hover:bg-alert/90 text-white py-2 rounded-md transition-colors"
            >
              {buttonText}
            </button>
            <button
              onClick={() => onClose()}
              className="w-full bg-white border hover:bg-gray-100 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
