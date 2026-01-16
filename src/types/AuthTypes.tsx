// User type
// -------------------
export interface User {
  role: "Admin" | "Technician"; // restricts to only these roles
  name: string;
}

// -------------------
// Context type
// -------------------
export interface AuthContextType {
  user: User | null; // currently logged-in user
  setUser: (user: User | null) => void; // function to update user
  loading: boolean; // is auth loading?
  logout: () => void; // function to log out
}