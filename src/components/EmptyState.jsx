import React from 'react';

function EmptyState({ 
  icon = "🔍", 
  title = "No Data Found", 
  description = "There is currently no information to display here.", 
  actionLabel, 
  onActionClick 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] p-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center shadow-sm w-full">
      {/* Dynamic Icon */}
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>

      {/* Dynamic Title and Description */}
      <h3 className="text-lg font-bold text-slate-800 font-sans">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mt-1 mb-6">{description}</p>

      {/* Dynamic Button (Only shows up if actionLabel is provided) */}
      {actionLabel && onActionClick && (
        <button 
          onClick={onActionClick}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;