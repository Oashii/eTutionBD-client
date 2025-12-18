import React from 'react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', cancelText = 'Cancel', isDangerous = false }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="btn btn-outline"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`btn ${isDangerous ? 'btn-error' : 'btn-primary'}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDialog;
