import React, { useState } from "react";
import API from "../services/api";

const AddComment = ({ id, comments, setComments }) => {
  const [commentData, setCommentData] = useState("");

  const handleChange = (e) => {
    setCommentData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(`/comments/add/${id}`, {
        content: commentData,
      });
      if (res.data.success) {
        setComments([...comments, res.data.comment]);
        setCommentData("");
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wront try again ! ");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm"
      >
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Add Comment
        </label>
        <textarea
          id="content"
          value={commentData}
          onChange={handleChange}
          rows="3"
          placeholder="Write your comment here..."
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-sm"
        />
        <button
          type="submit"
          className="mt-3 w-full py-2 px-4 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition duration-200"
        >
          Add Comment
        </button>
      </form>
    </>
  );
};

export default AddComment;
