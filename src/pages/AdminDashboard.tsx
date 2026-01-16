import { useEffect, useState } from "react";
import ContractForm from "../components/WorkOrderForm";
import SignUpForm from "../components/SignUpForm";
import ContactContainer from "../components/ContractList";
import logo from "../assets/pestflowlogo.png";
import TechnicianList from "../components/TechnicianList";



const AdminDashboard = () => {
  const [isContractFormOpen, setIsContractFormOpen] = useState(false);  
  const [isTechFormOpen, setIsTechFormOpen] = useState(false);
  const [isContactContainerOpen, setIsContactContainerOpen] = useState(false);
  const [isTechContainerOpen, setIsTechContainerOpen] = useState(false);
  const [username, setUsername] = useState("Admin User");

  useEffect(() => {
    // Fetch admin user details from API or local storage
    const fetchUserDetails = async () => {
      const res = await fetch("https://localhost:7110/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUsername(data.name.toUpperCase());
      } else {
        setUsername("something went wrong");
      }
    };
    fetchUserDetails();
  }, []);
  
  return (
  <div className="bg-emerald-600">
    <nav>
      <img className="w-50 h-50" src={logo} alt="Logo" />
    </nav>
    <h1>Welcome {username}</h1>
    {/* Buttons to open forms */}
    <button onClick={() => setIsContractFormOpen(!isContractFormOpen)}>Add Contract</button>
    <button onClick={() => setIsTechFormOpen(!isTechFormOpen)}>Add Technician</button>
    <button onClick={() => setIsContactContainerOpen(!isContactContainerOpen)}>View Contracts</button>
    <button onClick={() => setIsTechContainerOpen(!isTechContainerOpen)}>View Techs</button>

    {isContractFormOpen && (
      <div>
        <ContractForm />
      </div>
    )}
    {isTechFormOpen && (
      <div>
         <SignUpForm />
      </div>
    )}
    {isContactContainerOpen && (
      <div>
        <ContactContainer />
      </div>
    )}
    {isTechContainerOpen && (
      <div>
        <TechnicianList />
      </div>
    )}

  </div>
  );
};

export default AdminDashboard;
