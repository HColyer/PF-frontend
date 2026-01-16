import { Link } from "react-router-dom";
import logo from "../assets/pestflowlogo.png";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
    const route = user.role === "Admin" ? "/admin" : "/technician"
    console.log(user)
    navigate(route)
    }
  })
  
  

  return (
    <div className="custom-bg-color min-h-screen flex flex-col text-white p-6 px-10">
      <nav className="flex justify-between mb-4 mx-auto">
        <img className="w-32 h-32" src={logo} alt="Logo" />
      </nav>
      <h1 className="text-left text-2xl font-medium mb-6">
        Pestflow — pest control management, made simple.
      </h1>
      <p className="text-lg">
        Streamline pest control operations by bringing jobs,
        contracts, technicians, and visits into one easy-to-use platform.
      </p>

      <div className="flex space-x-6 items-center w-full fixed left-0 bottom-4 px-4">
        <Link
          className="border-4 text-center border-white rounded w-1/2 py-3"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="border-4 text-center border-white rounded w-1/2 py-3"
          to="/register"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};
export default Home;
