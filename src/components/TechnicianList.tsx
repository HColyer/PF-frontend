import { useState, useEffect } from "react";

interface Technician {
  id: number;
  name: string;
  email: string;
  role: string;
}

function TechnicianList() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  useEffect(() => {
    // Fetch technicians from API
    const fetchTechnicians = async () => { 
      try {
        const res = await fetch("https://localhost:7110/api/admin/techs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch technicians");
        }
        const data = await res.json();
        setTechnicians(data);
      } catch (error) {
        console.error("Error fetching technicians:", error);
      } 
    };
    fetchTechnicians();
  }, []);
  
  return (
    <div>
      <h2>Technicians</h2>

      {technicians.map((tech: { id: number; name: string; email: string; role: string; }) => (
        <div key={tech.id}>
          <h3>{tech.name}</h3>
          <p>{tech.email}</p>
          <p>{tech.role}</p>
        </div>
      ))}
    </div>
  );

}

export default TechnicianList;