import React, { useState } from "react";
import { Switch } from "@/components/ui/switch"; // Replace with your actual Switch or from shadcn/ui
import { Pencil } from "lucide-react";

const EmployeeDetails = () => {
  const [isActive, setIsActive] = useState(true);

  const handleStatusChange = () => {
    setIsActive((prev) => !prev);
    // Optional: Call API to update user status
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-xl p-6">
        {/* Header with Cover */}
        <div className="relative h-32 bg-cover bg-center rounded-md" style={{ backgroundImage: `url('/your-cover.jpg')` }}></div>

        {/* Card content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-10">
          {/* Left Profile */}
          <div className="col-span-1 flex flex-col items-center space-y-4">
            <img
              src="/avatar.jpg"
              alt="Profile"
              className="h-24 w-24 rounded-full border-4 border-white shadow"
            />
            <div className="text-center">
              <h3 className="text-xl font-semibold">Richard Davis</h3>
              <p className="text-gray-500">CEO / Co-Founder</p>
            </div>
            <Switch checked={isActive} onCheckedChange={handleStatusChange} />
            <span className={`text-sm font-medium ${isActive ? "text-green-600" : "text-red-600"}`}>
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Middle Info */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Profile Information</h4>
              <button className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
                <Pencil className="h-4 w-4" />
                Edit
              </button>
            </div>
            <p className="text-gray-600">
              Hi, I’m Richard. I'm the CEO at Company. My vision is to scale the business while nurturing company culture.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p><span className="font-semibold">Full Name:</span> Richard Davis</p>
              <p><span className="font-semibold">Mobile:</span> +1 123 456 7890</p>
              <p><span className="font-semibold">Email:</span> richard.davis@company.com</p>
              <p><span className="font-semibold">Location:</span> USA</p>
              <p className="col-span-2">
                <span className="font-semibold">Social:</span> 
                <span className="ml-2 text-blue-500">Facebook</span>, 
                <span className="ml-2 text-blue-400">Twitter</span>, 
                <span className="ml-2 text-pink-500">Instagram</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
