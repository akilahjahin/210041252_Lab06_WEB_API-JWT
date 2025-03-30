import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Users from "./components/Users";

const App = () => {
    const { user } = useContext(AuthContext);

    console.log("User state:", user);  // Debugging user state

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Users /> : <Navigate to="/auth" />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Router>
    );
};

export default App;
