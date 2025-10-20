import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { isLoggedin, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };


  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-indigo-600">BlogApp</div>
      <div className="flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
          Home
        </Link>
        {isLoggedin ? (
          <>
            <Link
              to="/createPost"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Create Post
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              SignUp
            </Link>
          </>
        )}
        {/* <Link
          to="/createPost"
          className="text-gray-700 hover:text-indigo-600 transition"
        >
          Create Post
        </Link> */}
        {/* <Link
          to="/login"
          className="text-gray-700 hover:text-indigo-600 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-gray-700 hover:text-indigo-600 transition"
        >
          SignUp
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
