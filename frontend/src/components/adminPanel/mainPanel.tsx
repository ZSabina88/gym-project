import React, { useState } from "react";
import AdminPanelCoaches from "./AdminCoaches";
import AdminPanelUsers from "./AdminUsers";

const AdminPanel: React.FC = () => {
  const [showUsers, setShowUsers] = useState<boolean>(true);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex mb-6 border-b border-gray-300">
        <button
          onClick={() => setShowUsers(true)}
          className={`flex-1 py-2 text-center font-medium transition-colors duration-300 ${
            showUsers
              ? "bg-customGreen text-black"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setShowUsers(false)}
          className={`flex-1 py-2 text-center font-medium transition-colors duration-300 ${
            !showUsers
              ? "bg-customGreen text-black"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Coaches
        </button>
      </div>
      <div>{showUsers ? <AdminPanelUsers /> : <AdminPanelCoaches />}</div>
    </div>
  );
};

export default AdminPanel;
