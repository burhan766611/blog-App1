import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const {  loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts/allPost");
        if (res.data.success) {
          setPosts(res.data.posts);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);


  if (loading) return <p>loading...</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Posts</h1>

        {posts.length === 0 ? (
          <p className="text-gray-600">No posts available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post?._id}
                className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col justify-between"
              >
                {/* Post Content */}
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <p className="text-sm text-gray-500">
                    By:{" "}
                    {post.author?.username
                      ? post.author.username.charAt(0).toUpperCase() +
                        post.author.username.slice(1)
                      : "Unknown"}{" "}
                    on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex mt-4 space-x-3">
                  <Link
                    to={`/post/${post._id}`} 
                    className="flex-1 py-2 px-4 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition duration-200 text-center"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
