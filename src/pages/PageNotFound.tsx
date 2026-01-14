import { Link } from "react-router-dom";

// No props needed for a simple 404 page
const PageNotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/login" style={{ color: "#007bff", textDecoration: "underline" }}>
        Go back to Login
      </Link>
    </div>
  );
};

export default PageNotFound;
