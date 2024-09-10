import React, { useState } from "react";
import AdminPanelCoaches from "./adminCoaches";
import AdminPanelUsers from "./adminUsers";

const AdminPanel: React.FC = () => {
  const [showUsers, setShowUsers] = useState<boolean>(true);

  const toggleView = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={toggleView}
        className="mb-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        {showUsers ? "Show Coaches" : "Show Users"}
      </button>
      {showUsers ? <AdminPanelUsers /> : <AdminPanelCoaches />}
    </div>
  );
};

export default AdminPanel;
