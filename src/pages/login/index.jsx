/* eslint-disable react-hooks/rules-of-hooks */
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { useLoginUserMutation } from "../../lib/api/authApi";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../lib/slices/authSlice";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const login = () => {
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/products");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    setLoading(true);

    // await sleep(2000);

    loginUser()
      .then((res) => {
        dispatch(
          setCredentials({
            user: name,
            token: "test",
          })
        );
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="flex justify-center items-center h-[100vh] flex-col"
      style={{
        background:
          'url("https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsb2ZmaWNlNF93aGl0ZV9hbmRfc2lsdmVyX3NpbXBsZV9wbGFpbl9ncmFkaWVudF9iYWNrZ3JvdV8zMDIzZTIwZC0zMzE5LTRmMjgtYmViYi1kZTdiZWY3MjY2OGUuanBn.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="mb-1 text-3xl">
        Welcome to the 1Fi Assessment - Login Page
      </p>
      <p className="mb-8 text-sm">
        This is a mock login page. Click the button below to simulate login.
      </p>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={name}
        disabled={loading}
        required
        style={{ width: "300px" }}
        autoFocus
        onKeyUp={(e) => {
          e.preventDefault();
          if (e.key === "Enter") {
            handleLogin(e);
          }
        }}
      />
      <button
        className="flex items-center hover:scale-105 transition-transform duration-200 ease-in-out hover:bg-black hover:text-white"
        style={{
          padding: "10px 10px 10px 20px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
        onClick={handleLogin}
        disabled={loading || name.trim() === ""}
      >
        <p className="text-lg font-medium inline">Login</p>
        {loading ? (
          <CircularProgress
            size={20}
            color="inherit"
            sx={{ marginLeft: "8px" }}
          />
        ) : (
          <ArrowCircleRightRoundedIcon style={{ marginLeft: "8px" }} />
        )}
      </button>
    </div>
  );
};

export default login;
