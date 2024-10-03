import React from 'react';

interface ConfirmationModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-lg mb-4">Are you sure you want to delete this post?</h2>
                <div className="flex justify-end">
                    <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 mr-2">Cancel</button>
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
