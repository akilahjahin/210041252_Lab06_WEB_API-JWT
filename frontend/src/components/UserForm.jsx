import React, { useState, useEffect } from "react";
import api from "../api";

const UserForm = ({ userToEdit, onSuccess, resetEdit, loggedInUser }) => {
    const [user, setUser] = useState({
        idUser: "",
        name: "",
        email: "",
        password: "",
        height: "",
        colorGroup: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (userToEdit) {
            // Populate the form with the userToEdit data
            setUser({
                idUser: userToEdit.idUser,
                name: userToEdit.name,
                email: userToEdit.email,
                password: "", // Keep password empty for edit
                height: userToEdit.height,
                colorGroup: userToEdit.colorGroup || ""
            });
        } else {
            // If no user is being edited, use the logged-in user for idUser
            setUser({
                idUser: loggedInUser?.idUser || "", // Set logged-in user's ID
                name: "",
                email: "",
                password: "",
                height: "",
                colorGroup: ""
            });
        }
    }, [userToEdit, loggedInUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (userToEdit) {
                const updatedUser = { ...user };
                if (!updatedUser.password) delete updatedUser.password; // Don't send empty password

                // Check if the logged-in user's email is being updated
                const isEmailUpdated = userToEdit.email !== updatedUser.email;

                await api.put(`/${userToEdit.idUser}`, updatedUser);
                alert("User updated successfully!");

                // If email was updated, log the user out and redirect to login page
                if (isEmailUpdated) {
                    // Clear user data from session or storage
                    localStorage.removeItem("authToken"); // Example: remove token from localStorage
                    // Or if using sessionStorage or state management, clear the session accordingly

                    // Redirect to the login page
                    window.location.href = "/auth"; // Redirect to the login page
                }
            } else {
                await api.post("/register", user);
                alert("User added successfully!");
            }

            onSuccess();
            resetEdit();
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred.");
            console.error("Error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* The ID field should be shown for adding but disabled for editing */}
            <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium", marginRight: "15px", marginLeft: "15px" }}
                type="text"
                name="idUser"
                value={user.idUser}
                onChange={handleChange}
                placeholder="ID User"
                disabled={!!userToEdit} // Disable if editing
                required={!userToEdit} // Make it required only when adding a user
            />
            <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium", marginRight: "15px" }}
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium", marginRight: "15px" }}
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            {!userToEdit && (
                <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium", marginRight: "15px" }}
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
            )}
            <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium", marginRight: "15px" }}
                type="text"
                name="height"
                value={user.height}
                onChange={handleChange}
                placeholder="Height"
            />
            <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium", marginRight: "15px" }}
                type="text"
                name="colorGroup"
                value={user.colorGroup}
                onChange={handleChange}
                placeholder="Color Group"
            />
            <button style={{ marginTop: "10px", padding: "4px 12px", backgroundColor: "#4bb81c", borderColor: "#389a0d", fontWeight: 600, color: "white", borderRadius: "6px", fontSize: "13.5px", marginLeft: "15px" }} type="submit" disabled={loading}>
                {loading ? "Processing..." : userToEdit ? "Update User" : "Add User"}
            </button>
            {userToEdit && <button style={{ marginTop: "10px", padding: "4px 12px", backgroundColor: "#717476", borderColor: "#4a4b4b", fontWeight: 600, color: "white", borderRadius: "6px", fontSize: "13.5px", marginLeft: "15px" }} type="button" onClick={resetEdit}>Cancel</button>}
        </form>
    );
};

export default UserForm;
