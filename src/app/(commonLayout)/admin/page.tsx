import withAuth from "@/app/utils/withAuth";

const AdminDashboard = () => {

    return (
      <div className="p-6">
        <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Admin Dashboard Overview</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users Card */}
          <div className="bg-[#FEFCE8] p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-xl font-bold">16</p>
          </div>
  
          {/* Total Bikes Card */}
          <div className="bg-[#E0F7FA] p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold">Total Contents</h2>
            <p className="text-xl font-bold">08</p>
          </div>
  
          {/* Total Rentals Card */}
          <div className="bg-[#FEF2F2] p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <p className="text-xl font-bold">0</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
  