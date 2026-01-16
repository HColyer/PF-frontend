import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.tsx";
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
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-white p-6">Loading...</div>;
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login  />} />
      <Route path="/register" element={<SignUp />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user} allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/technician"
        element={
          <ProtectedRoute user={user} allowedRoles={["Technician"]}>
            <TechDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
