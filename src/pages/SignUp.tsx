import { AuthContext } from "../context/AuthContext.tsx";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/pestflowlogo.png";

// Local form state shape
// passwordReentered is frontend-only for validation
interface SignUpFormData {
  company: string;
  email: string;
  password: string;
  passwordReentered: string;
  role: "Admin" | "Technician";
}

const SignUp: React.FC = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<SignUpFormData>({
    company: "",
    email: "",
    password: "",
    passwordReentered: "",
    role: "Admin",
  });

  // Generic input change handler
  // Uses the input "name" attribute to update the matching field
  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // Handles form submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Frontend-only password confirmation check
    if (formData.password !== formData.passwordReentered) {
      alert("Passwords do not match!");
      return;
    }

    // Build API payload (exclude passwordReentered)
    const payload = {
      company: formData.company,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    console.log("Sign Up Data:", payload);

    try {
      // Send signup request to backend
      const res = await fetch("https://localhost:7110/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Handle API errors
      if (!res.ok) {
        throw new Error(await res.text());
      }

      // Expected response from backend
      const data: {
        token: string;
        role: "Admin" | "Technician";
        name: string;
      } = await res.json();

      // Store JWT for authenticated requests
      localStorage.setItem("token", JSON.stringify({ token: data.token }));
      setUser({
        role: data.role,
        name: data.name,
      });

      // Redirect admin after successful signup
      navigate("/admin");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  }

  return (
    <div className="custom-bg-color min-h-screen text-white flex flex-col px-12">
      {/* App logo */}
      <img className="size-32 mx-auto my-2" src={logo} alt="Logo" />

      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>

      <form className="flex flex-col text-lg" onSubmit={handleSubmit}>
        {/* Company name */}
        <label className="my-1">Company Name</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="p-1 text-slate-900 outline-none"
        />

        {/* Email */}
        <label className="my-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-1 text-slate-900 outline-none"
        />

        {/* Password */}
        <label className="my-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="p-1 text-slate-900 outline-none"
        />

        {/* Password confirmation */}
        <label className="my-1">Re-type Password</label>
        <input
          type="password"
          name="passwordReentered"
          value={formData.passwordReentered}
          onChange={handleChange}
          required
          className="p-1 text-slate-900 outline-none"
        />

        {/* Submit */}
        <button
          className="border-4 border-white py-2 mt-10"
          type="submit"
        >
          Sign Up
        </button>
        <Link className="border-4 border-white py-2 text-center mt-2" to="/">Back to Home</Link>
      </form>
    </div>
  );
};

export default SignUp;