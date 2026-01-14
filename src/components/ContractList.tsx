import { useEffect, useState } from "react";

const ContractsList = () => {
    const [contracts, setContracts] = useState<Array<{
    id: number;
    customer: string;
    address: string;
    postcode: string;
    description: string;
    startDate: string;
    endDate?: string;
    visitsDue: number;
    assignedTo: string | null;
    }>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Fetch contracts from API
        const fetchContracts = async () => {
        try {
            const res = await fetch("https://localhost:7110/api/admin/workorders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            },
        });
            if (!res.ok) {
            throw new Error("Failed to fetch contracts");
            }
            const data = await res.json();
            console.log(data);
            setContracts(data);
        } catch (error) {
            console.error("Error fetching contracts:", error);
        }
    };

    fetchContracts();
    
    setLoading(false);
  }, []);

  if (loading) return <p>Loading contracts...</p>;

  return (
    <div >
      <h2>Contracts</h2>

      {contracts.map(contract => (
        <div key={contract.id}>
          <h3>{contract.customer}</h3>
          <p>{contract.address}</p>
            <p>{contract.postcode}</p>
            <p>{contract.description}</p>
            <p>Start Date: {contract.startDate}</p>
            {contract.endDate && (
                <p>End Date: {contract.endDate}</p>
            )}
          <p>Visits due: {contract.visitsDue}</p>
          <p>Assigned to: {contract.assignedTo ?? "Unassigned"}</p>
        </div>
      ))}
    </div>
  );
};

export default ContractsList;