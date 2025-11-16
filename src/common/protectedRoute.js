import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "./navbar";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
}
