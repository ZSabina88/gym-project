import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { fetchUsers, updateUserRole } from "../../features/Users/UserActions";
import { CircularProgress } from "@mui/material";

const AdminPanelUsers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const [editingRoles, setEditingRoles] = useState<{ [key: string]: string }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [saving, setSaving] = useState<{ [key: string]: boolean }>({});
  const [success, setSuccess] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = (userId: string, newRole: string) => {
    setEditingRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleSaveRole = (userId: string, email: string) => {
    const newRole = editingRoles[userId];
    if (newRole) {
      setSaving((prev) => ({ ...prev, [userId]: true }));
      dispatch(updateUserRole({ userId, role: newRole, email }))
        .then(() => {
          setSuccess((prev) => ({ ...prev, [userId]: true }));
        })
        .finally(() => {
          setSaving((prev) => ({ ...prev, [userId]: false }));
          setTimeout(() => {
            setSuccess((prev) => ({ ...prev, [userId]: false }));
          }, 2000);
        });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress sx={{ color: "#9EF300" }} />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row w-full justify-between">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
        </div>
      </div>
      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="p-4 border rounded shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center"
          >
            <div className="w-full lg:w-1/3 mb-2 lg:mb-0">
              <div className="text-left">
                <span className="font-bold">Name: </span>
                {user.name}
              </div>
              <div className="break-all text-ellipsis max-w-[300px] overflow-hidden text-left">
                <span className="font-bold ">Email: </span>
                {user.email}
              </div>
            </div>
            <div className="w-full lg:w-1/3 mb-2 lg:mb-0">
              <div className="text-left">
                <span className="font-bold ">Activity: </span>
                {user.activity}
              </div>
              <div className="text-left">
                <span className="font-bold">Target: </span>
                {user.target}
              </div>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center lg:justify-end">
              <span className="font-bold lg:mr-2">Role: </span>
              <select
                value={editingRoles[user.id] || user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="CLIENT">Client</option>
                <option value="COACH">Coach</option>
              </select>
              <button
                onClick={() => handleSaveRole(user.id, user.email)}
                className={`mt-2 w-[125px] lg:mt-0 lg:ml-2 px-3 py-1 rounded text-white ${
                  saving[user.id]
                    ? "animate-scale-up bg-blue-500"
                    : success[user.id]
                    ? "animate-bg-success bg-green-500"
                    : "bg-blue-500"
                }`}
              >
                {saving[user.id]
                  ? "Saving..."
                  : success[user.id]
                  ? "Saved!"
                  : "Change Role"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanelUsers;
