import React from 'react';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; bio: string; phone: string; profilePicture?: string }) => void;
    formData: { name: string; bio: string; phone: string; profilePicture?: string } | null;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, onSubmit, formData }) => {
    const [name, setName] = React.useState(formData?.name || '');
    const [bio, setBio] = React.useState(formData?.bio || '');
    const [phone, setPhone] = React.useState(formData?.phone || '');
    const [profilePicture, setProfilePicture] = React.useState(formData?.profilePicture || '');

    React.useEffect(() => {
        if (formData) {
            setName(formData.name);
            setBio(formData.bio);
            setPhone(formData.phone);
            setProfilePicture(formData.profilePicture || '');
        }
    }, [formData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, bio, phone, profilePicture });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="bio">Bio</label>
                        <textarea
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="profilePicture">Profile Picture URL</label>
                        <input
                            type="text"
                            name="profilePicture"
                            value={profilePicture}
                            onChange={(e) => setProfilePicture(e.target.value)}
                            className="border rounded w-full p-2"
                            placeholder="Enter image URL"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 bg-gray-300 text-gray-800 py-1 px-3 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-1 px-3 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
