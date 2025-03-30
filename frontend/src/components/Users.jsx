import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import UserForm from "./UserForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";  // Importing useNavigate to handle redirection

const Users = () => {
    const { logout, user: loggedInUser } = useContext(AuthContext);
    const navigate = useNavigate();  // Hook to redirect users
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showUsers, setShowUsers] = useState(false);  // For toggling user list visibility

    useEffect(() => {
        if (showUsers) fetchUsers();  // Fetch users if button clicked
    }, [showUsers]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/");  // Fetch users from the backend
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error.response?.data || error.message);
        }
        setLoading(false);
    };

    const handleDelete = async (idUser) => {
        if (idUser === loggedInUser.idUser) {
            alert("You cannot delete your own account!");
            logout();  // Logout the user if they attempt to delete their own account
            navigate("/auth");  // Redirect to the login page
            return;
        }

        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await api.delete(`/${idUser}`);  // Correct path for deletion

            if (response.status === 200 || response.status === 204) {
                console.log("User deleted successfully");

                // Functional state update to ensure React detects change
                setUsers(prevUsers => prevUsers.filter(user => user.idUser !== idUser));
                fetchUsers();  // Refresh the user list after deletion
            } else {
                console.error("Failed to delete user: Unexpected status", response.status);
            }
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
            alert("Failed to delete user");
        }
    };

    return (
        <div>
            <h1>User Management System</h1>

            {/* Show the Display All Users button after login */}
            {loggedInUser && (
                <>
                    <h3>Welcome, {loggedInUser.name}</h3>

                    {/* Show the UserForm only if logged in */}
                    <UserForm
                        userToEdit={editingUser}
                        onSuccess={() => fetchUsers()}
                        resetEdit={() => setEditingUser(null)}
                        loggedInUser={loggedInUser}
                        logoutOnEmailChange={() => {
                            logout();  // Log the user out if their email is updated
                            navigate("/auth");  // Redirect to the login page
                        }}
                    />
                </>
            )}

            <button
                style={{ marginTop: "10px", padding: "4px 12px", backgroundColor: "#ffefaf", borderColor: "#fee682", fontWeight: 600, color: "#232323", borderRadius: "6px", fontSize: "13.5px", marginRight: "15px" }}
                onClick={() => setShowUsers(!showUsers)}
            >
                {showUsers ? "Hide Users" : "Display All Users"}
            </button>

            {/* Show loading indicator while fetching data */}
            {loading ? (
                <p>Loading users...</p>
            ) : (
                showUsers && loggedInUser && (
                    <table border="1" style={{ borderCollapse: "collapse", textAlign: "center" }}>
                        <caption style={{ paddingTop: "30px", fontSize: "21px", fontWeight: 600, marginBottom: "6px", color: "#232323" }}>Users' Information Table</caption>
                        {/* Table header */}
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: "#232323", color: "white", fontSize: "15px", padding: "10px 18px" }}>ID User</th>
                                <th style={{ backgroundColor: "#232323", color: "white", fontSize: "15px", padding: "10px 18px" }}>Name</th>
                                <th style={{ backgroundColor: "#232323", color: "white", fontSize: "15px", padding: "10px 18px" }}>Email</th>
                                <th style={{ backgroundColor: "#232323", color: "white", fontSize: "15px", padding: "10px 18px" }}>Height</th>
                                <th style={{ backgroundColor: "#232323", color: "white", fontSize: "15px", padding: "10px 18px" }}>Color Group</th>
                                <th style={{ backgroundColor: "#232323", color: "white", fontSize: "15px", padding: "10px 18px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.idUser}>
                                    <td style={{ fontSize: "13.5px", fontWeight: 500, backgroundColor: "#fff", padding: "10px 18px" }}>{user.idUser}</td>
                                    <td style={{ fontSize: "13.5px", fontWeight: 500, backgroundColor: "#fff", padding: "10px 18px" }}>{user.name}</td>
                                    <td style={{ fontSize: "13.5px", fontWeight: 500, backgroundColor: "#fff", padding: "10px 18px" }}>{user.email}</td>
                                    <td style={{ fontSize: "13.5px", fontWeight: 500, backgroundColor: "#fff", padding: "10px 18px" }}>{user.height}</td>
                                    <td style={{ fontSize: "13.5px", fontWeight: 500, backgroundColor: "#fff", padding: "10px 18px" }}>{user.colorGroup}</td>
                                    <td style={{ fontSize: "13.5px", fontWeight: 500, backgroundColor: "#fff" }}>
                                        <button
                                            style={{ marginTop: "10px", padding: "4px 12px", backgroundColor: "#1684c3", borderColor: "#0c81c6", color: "white", borderRadius: "6px", fontSize: "12px", fontWeight: 600, marginRight: "7.5px", marginLeft: "15px" }}
                                            onClick={() => setEditingUser(user)}
                                        >
                                            Edit User
                                        </button>
                                        <button
                                            style={{ marginTop: "10px", padding: "4px 12px", backgroundColor: "#ba1919", borderColor: "#a60c0c", fontWeight: 600, color: "white", borderRadius: "6px", fontSize: "12px", marginLeft: "7.5px", marginRight: "15px" }}
                                            onClick={() => handleDelete(user.idUser)}
                                        >
                                            Delete User
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}

            {/* Show logout button */}
            {loggedInUser && (
                <button
                    style={{ marginTop: "10px", padding: "4px 12px", backgroundColor: "#cc1d1d", borderColor: "#a60c0c", fontWeight: 600, color: "white", borderRadius: "6px", fontSize: "13.5px", marginRight: "15px" }}
                    onClick={logout}
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Users;
