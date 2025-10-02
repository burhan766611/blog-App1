import React, { useState } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state || {};

  const [editData, SetEditData] = useState({
    title: post.title,
    content: post.content,
  });

  const handleChange = (e) => {
    SetEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(`/posts/update/${post._id}`, editData);

      if (res.data.success) {
        alert(res.data.message);
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong, please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <section className="max-w-3xl mx-auto my-10 bg-white p-6 rounded-xl shadow-md">
        {/* Heading */}
        <h2 className="text-xl font-bold text-indigo-600 mb-6">Edit Post</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
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
              value={editData.title}
              onChange={handleChange}
              placeholder="Update your post title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Content */}
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
              value={editData.content}
              onChange={handleChange}
              placeholder="Update your post content..."
              rows="6"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition duration-200"
          >
            Update Post
          </button>
        </form>

        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="w-full mt-4 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Cancel
        </button>
      </section>
    </>
  );
};

export default EditBlog;
