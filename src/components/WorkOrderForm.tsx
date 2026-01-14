import { useState } from "react";

interface ContractFormData {
  customer: string;
  description: string;
  address: string;
  postCode: string;
  visitsDue: number;
  startDate: string; // ✅ string for <input type="date" />
  endDate?: string;
}

const ContractForm = () => {
  const [form, setForm] = useState<ContractFormData>({
    customer: "",
    description: "",
    address: "",
    postCode: "",
    visitsDue: 1,
    startDate: "",
    endDate: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "visitsDue" || name === "price" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...form,
      type: "Contract",
      startDate: new Date(form.startDate).toISOString(),
      endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
    };

    console.log("Contract payload:", payload);
    if (!form.customer || !form.address || !form.startDate || !form.postCode || !form.visitsDue || form.visitsDue < 1) {
      alert("Missing required fields");
      return;
    }

    // 🔜 POST to API
    // fetch("/api/workorders", { ... })
    try {
      console.log("Submitting contract:", payload);
      const res = await fetch("https://localhost:7110/api/admin/workorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
      body: JSON.stringify(payload)
    });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      alert("Contract created successfully!");
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Contract</h2>

      <input
        name="customer"
        placeholder="Customer name"
        value={form.customer}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Site Address"
        value={form.address}
        onChange={handleChange}
        required
      />

      <input
        name="postCode"
        placeholder="Postcode"
        value={form.postCode}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="visitsDue"
        min={1}
        placeholder="Visits Due"
        value={form.visitsDue}
        onChange={handleChange}
        required
      />

      {/* <input
        type="number"
        name="price"
        min={0}
        step="0.01"
        placeholder="Contract Price"
        value={form.price}
        onChange={handleChange}
        required
      /> */}

      <label>
        Start Date
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        End Date (optional)
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Create Contract</button>
    </form>
  );
};

export default ContractForm;
