import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login";
import Products from "./pages/products";
import Product from "./pages/product";
import ProtectedRoute from "./common/protectedRoute";
import Navbar from "./common/navbar";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Products />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Product />
      </ProtectedRoute>
    ),
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={routes} />;
};
