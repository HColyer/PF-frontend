import { useState } from "react";
import ContractForm from "../components/WorkOrderForm";
import SignUpForm from "../components/SignUpForm";
import ContactContainer from "../components/ContractList";
import logo from "../assets/pestflowlogo.png";
import icon from "../assets/pesticon.png";
import TechnicianList from "../components/TechnicianList";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";


const AdminDashboard = () => {
  const [isContractFormOpen, setIsContractFormOpen] = useState(false);
  const [isTechFormOpen, setIsTechFormOpen] = useState(false);
  const [isContactContainerOpen, setIsContactContainerOpen] = useState(false);
  const [isTechContainerOpen, setIsTechContainerOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="custom-bg-color min-h-screen text-white flex flex-col px-4">
      <nav className="flex justify-between">
        <img className="size-32 hidden md:block" src={logo} alt="Logo" />
        <img className="size-16 md:hidden" src={icon} alt="Logo" />
        {/* Buttons to open forms */}
        <div className="flex gap-4 items-center">
          <button onClick={() => setIsContractFormOpen(!isContractFormOpen)}>
            <FontAwesomeIcon icon={faFileCirclePlus} />
          </button>
          <button onClick={() => setIsTechFormOpen(!isTechFormOpen)}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
          <button className="border-2 border-white h-8 px-3 rounded" onClick={logout}>Logout</button>
        </div>
      </nav>
      <h1 className="text-3xl my-6">
        Welcome {user?.name && user.name[0].toUpperCase() + user.name.slice(1)}
      </h1>
      <button
            onClick={() => setIsContactContainerOpen(!isContactContainerOpen)}
          >
            Contracts
          </button>
          <button onClick={() => setIsTechContainerOpen(!isTechContainerOpen)}>
            Technicians
          </button>
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
