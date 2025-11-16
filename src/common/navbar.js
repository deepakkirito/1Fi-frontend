import { useDispatch, useSelector } from "react-redux";
import { logout } from "../lib/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const logoutButton = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-black sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-white">1Fi Assessment</h1>
        <ul className="flex gap-4">
          <li>
            <p className="text-white">Welcome {user}</p>
          </li>
          <li style={{ borderLeft: "1px solid white", paddingLeft: "10px" }}>
            <a href="/products" className="text-white hover:text-gray-300">
              Products
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="text-white hover:text-gray-300"
              onClick={logoutButton}
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
      {/* <div className="pb-10"></div> */}
    </>
  );
};

export default Navbar;
