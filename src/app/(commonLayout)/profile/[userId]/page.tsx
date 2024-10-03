

const UserProfile = async ({ params }: { params: { userId: string } }) => {
    try {
        const res = await fetch(`http://localhost:5000/api/users/${params.userId}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch post: ${res.statusText}`);
        }

        const { data } = await res.json();

        return (
            <div>
                <div className="max-w-md mx-auto my-10 bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex flex-col items-center p-5">
                        <img className="w-24 h-24 rounded-full border-2 border-gray-300" src={data.profilePicture} alt="Profile Picture" />
                        <h1 className="mt-4 text-2xl font-bold text-gray-800">{data.name}</h1>
                        <p className="mt-2 text-gray-600 text-center px-4">{data.bio || "Pet Lover"}</p>
                        <div className="flex space-x-4 mt-4">
                            <div className="text-center">
                                <span className="font-bold text-gray-800">{data.followers.length}</span>
                                <p className="text-gray-500 text-sm">Followers</p>
                            </div>
                            <div className="text-center">
                                <span className="font-bold text-gray-800">{data.following.length}</span>
                                <p className="text-gray-500 text-sm">Following</p>
                            </div>
                        </div>
                        <p className="text-gray-600">Member since: {new Date(data.createdAt).toLocaleDateString()}</p>
                        <div className="mt-4 text-gray-600">
                            <p className="text-sm">Email: {data.email}</p>
                            <p className="text-sm">Phone: {data.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching blog:", error);
        return <p>Error fetching blog details. Please try again later.</p>;
    }
};

export default UserProfile;
