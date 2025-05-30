export default function SuccessModal({ title, description, onClose }) {

  return (
    <div className="fixed inset-0 z-50">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose()}></div>

      {/* Modal content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-gray-50 rounded-lg shadow-lg w-full max-w-xl px-16 py-9 space-y-7 pointer-events-auto">
          <img
            src="/icons/success.svg"
            width={72}
            height={72}
            className="object-contain mx-auto"
          />
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-400">{description}</p>

          </div>

          <div className="text-center">
            <button
              onClick={() => onClose()}
              className="text-primary hover:text-primary/90 transition-colors"
            >
              OK
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
