import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import AddComment from "./AddComment";
import EditBlog from "./EditBlog";

const BlogDetails = ({ user, isLoggedin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(user, isLoggedin, id);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentData, setEditCommentData] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        if (res.data.success) {
          setPost(res.data.post);
          setComments(res.data.comments);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/posts/delete/${id}`);
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

  const handleEdit = (id) => {
    navigate(`/EditPost/${id}`);
  };


  const handleSaveComment = async (id) => {
    try {
      const res = await API.put(`/comments/edit/${id}`, { content: editCommentData });

      if (res.data.success) {
        alert(res.data.message);
        setComments(
          comments.map((c) =>
            c._id === id ? { ...c, content: editCommentData } : c
          )
        );
        setEditingCommentId(null);
        setEditCommentData("");
      } else {
        alert(res.data.message);
      }
    } catch {
      alert("Something went wrong , Try Again !");
    }
  };

  // const handleCommentEdit = (id) => {
  //   try{
  //     const res = API.put(`/comments/edit/${id}`)

  //   } catch {
  //     console.log("Something went wrong , Try Again !")
  //   }
  // };

  const handleCommentDelete = async (id) => {
    try {
      const res = await API.delete(`/comments/delete/${id}`);
      if (res.data.success) {
        alert(res.data.message);
        setComments(comments.filter((c) => c._id !== id));
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong , Try Again !");
    }
  };

  if (!post)
    return <p className="text-center py-10 text-gray-600">Loading...</p>;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-block text-indigo-600 hover:text-indigo-800 font-medium transition duration-200"
        >
          &larr; Back to All Posts
        </button>

        {/* Post Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
          {/* Title & Meta */}
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {post.title}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            By{" "}
            <span className="font-medium">
              {post.author?.username || "Unknown"}
            </span>{" "}
            on {new Date(post.createdAt).toLocaleDateString()}
          </p>

          {/* Post Content */}
          <p className="text-gray-700 leading-relaxed mb-8">{post.content}</p>

          {/* Edit/Delete Buttons */}
          {isLoggedin &&
            (user?.id === post.author?._id ||
              user?._id === post.author?._id) && (
              <div className="flex justify-end space-x-3 mb-8">
                <button
                  onClick={() => handleEdit(post._id)}
                  className="py-2 px-5 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 transition duration-200 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="py-2 px-5 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition duration-200 text-sm"
                >
                  Delete
                </button>
              </div>
            )}

          {/* Comments Section */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Comments
            </h2>

            {comments.length === 0 ? (
              <p className="text-gray-500 mb-4">
                No comments yet. Be the first one!
              </p>
            ) : (
              <ul className="space-y-4 mb-6">
                {comments.map((c) => (
                  <li
                    key={c._id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                  >
                    {/* If comment is being edited */}
                    {editingCommentId === c._id ? (
                      <div>
                        <textarea
                          value={editCommentData}
                          onChange={(e) => setEditCommentData(e.target.value)}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm text-gray-800"
                        />
                        <div className="flex justify-end space-x-2 mt-2">
                          <button
                            onClick={() => handleSaveComment(c._id)}
                            className="py-1.5 px-4 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCommentId(null)}
                            className="py-1.5 px-4 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Normal comment display */}
                        <p className="text-gray-700 mb-1">{c.content}</p>
                        <span className="text-sm text-gray-500">
                          By {c.author?.username || "Anonymous"}
                        </span>

                        {/* Action buttons */}
                        {isLoggedin &&
                          (user?.id === c.author?._id ||
                            user?._id === c.author?._id) && (
                            <div className="flex justify-end space-x-3 mt-2">
                              <button
                                onClick={() => {
                                  setEditingCommentId(c._id);
                                  setEditCommentData(c.content);
                                }}
                                className="py-1 px-3 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 text-sm transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleCommentDelete(c._id)}
                                className="py-1 px-3 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 text-sm transition"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {isLoggedin && (
              <>
                <AddComment
                  id={id}
                  comments={comments}
                  setComments={setComments}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
