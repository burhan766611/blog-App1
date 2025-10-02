import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [postData, SetPostData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    SetPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await API.post("/posts/create", postData);

      if (result.data.success) {
        alert(result.data.message);
        SetPostData({
          title: "",
          content: "",
        });
        navigate("/");
      } else {
        alert(result.data.message);
        SetPostData({
          title: "",
          content: "",
        });
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <>
      <section className="max-w-3xl mx-auto my-10 bg-white p-6 rounded-xl shadow-md">
        {/* Section Heading */}
        <h2 className="text-xl font-bold text-indigo-600 mb-6">
          Share a New Post
        </h2>

        {/* Post Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Post Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={postData.title}
              onChange={handleChange}
              placeholder="Enter your post title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Post Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={postData.content}
              onChange={handleChange}
              placeholder="Write your thoughts here..."
              rows="5"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Publish Post
          </button>
        </form>
      </section>
    </>
  );
};

export default CreateBlog;
