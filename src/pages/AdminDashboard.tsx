import { useState } from "react";
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
  

  
  return (
  <div className="bg-emerald-600">
    <nav>
      <img className="w-50 h-50" src={logo} alt="Logo" />
    </nav>
    <h1>Admin Dashboard</h1>
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
