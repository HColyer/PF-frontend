import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TechDashboard from "./pages/TechDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/PageNotFound";

export interface User {
  role: "Admin" | "Technician";
  name: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<SignUp setUser={setUser} />} />

        <Route
          path="/Admin"
          element={
            <ProtectedRoute user={user} allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Technician"
          element={
            <ProtectedRoute user={user} allowedRoles={["Technician"]}>
              <TechDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
