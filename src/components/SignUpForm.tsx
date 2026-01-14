import { useState } from "react";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordReentered: string;
}

const SignUpForm = () => {
  const [form, setForm] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    passwordReentered: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.passwordReentered) {
      alert("Passwords do not match!");
      return;
    }

    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    console.log("Signup payload:", );
    try {
      const res = await fetch("https://localhost:7110/api/auth/register/tech", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
      body: JSON.stringify({email: data.email, name: data.name, password: data.password})
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      alert("Technician registered successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
        passwordReentered: "",
      });
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Username"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="passwordReentered">Re-enter Password</label>
        <input
          id="passwordReentered"
          name="passwordReentered"
          type="password"
          placeholder="Re-enter Password"
          value={form.passwordReentered}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUpForm;
