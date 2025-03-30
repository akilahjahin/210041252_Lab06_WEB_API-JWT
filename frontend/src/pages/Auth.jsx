import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        idUser: "",
        name: "",
        email: "",
        password: "",
        height: "",
        colorGroup: ""
    });
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const endpoint = isRegister ? "/register" : "/login";
            const { data } = await api.post(endpoint, form);
            login(data.user, data.token);
            navigate("/");  // Redirect after login or registration
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div>
            <h1>User Management</h1>
            <h2>{isRegister ? "Register" : "Login"}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <>
                        <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium", marginRight: "15px", marginLeft: "15px" }}
                            type="text"
                            name="idUser"
                            value={form.idUser}
                            onChange={handleChange}
                            placeholder="User ID"
                            required
                        />
                        <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium", marginRight: "15px" }}
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />
                        <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium", marginRight: "15px" }}
                            type="number"
                            name="height"
                            value={form.height}
                            onChange={handleChange}
                            placeholder="Height"
                            required
                        />
                        <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium" }}
                            type="text"
                            name="colorGroup"
                            value={form.colorGroup}
                            onChange={handleChange}
                            placeholder="Color Group"
                            required
                        />
                    </>
                )}
                <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium", marginRight: "15px", marginLeft: "15px" }}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input style={{ marginTop: "10px", padding: "4px 12px", borderRadius: "6px", fontSize: "13.5px", fontWeight: "medium" }}
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button style={{ marginTop: "10px", padding: "4px 12px", backgroundColor: "#4bb81c", borderColor: "#389a0d", color: "white", borderRadius: "6px", fontSize: "13.5px", marginLeft: "15px", fontWeight: 600 }} type="submit">{isRegister ? "Register" : "Login"}</button>
            </form>
            <button style={{ marginTop: "10px", padding: "4px 12px", backgroundColor: "#229adf", borderColor: "#0c81c6", color: "white", borderRadius: "6px", fontSize: "13.5px", marginRight: "15px", marginLeft: "15px", fontWeight: 600  }} onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
        </div>
    );
};

export default Auth;
