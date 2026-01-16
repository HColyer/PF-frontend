import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import logo from "../assets/pestflowlogo.png";

const API_URL = "https://localhost:7110/api";


export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data: {
        token: string;
        role: "Admin" | "Technician";
        name: string;
      } = await res.json();

      // ✅ store JWT
      localStorage.setItem("token", data.token);

      // ✅ set app user
      setUser({
        role: data.role,
        name: data.name,
      });
      // ✅ redirect by role
      navigate(data.role === "Admin" ? "/admin" : "/technician");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="custom-bg-color min-h-screen text-white flex flex-col px-12">
      <img className="size-32 mx-auto my-6 mb-2" src={logo} alt="Logo" />
      <form className="flex flex-col text-xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6">Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <label className="py-1" htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-1 text-slate-900 outline-none"
        />
        <label className="py-1" htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-1 text-slate-900 outline-none"
        />

        <button className="border-4 border-white py-2 mt-8 text-xl" type="submit">Sign In</button>
      </form>
    </div>
  );
}
