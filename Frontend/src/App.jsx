import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Logout from "./pages/Logout";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import AddComment from "./pages/AddComment";
import BlogDetails from "./pages/BlogDetails";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { isLoggedin , user} = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createPost" element={<CreateBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/EditPost" element={<EditBlog />} />
          <Route path="/addComment" element={<AddComment />} />
          <Route path="/post/:id" element={<BlogDetails isLoggedin={isLoggedin} user={user} />} />
        </Routes>
      </main>
      {/* Footer (sticks to bottom) */}
      <Footer />
    </div>
  );
}

export default App;
