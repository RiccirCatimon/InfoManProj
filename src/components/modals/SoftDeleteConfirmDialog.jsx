// src/components/modals/SoftDeleteConfirmDialog.jsx
export default function SoftDeleteConfirmDialog({ title, message, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">🗑️</div>
          <h3 className="text-lg font-bold text-gray-900">{title || 'Confirm Soft Delete'}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">{message || 'This record will be marked INACTIVE. It can be recovered from Deleted Items.'}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-50">
            {loading ? 'Deleting…' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
