import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Post } from "../types/post";
import { useState } from "react";

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get<Post[]>("http://localhost:5000/posts");
  return data;
};

const Home = () => {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:5000/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = (id: string) => {
    deletePostMutation.mutate(id);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading posts...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading posts: {String(error)}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
        <Link
          to="/create"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Create New Post
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {filteredPosts?.length ? (
        <ul className="space-y-4">
          {filteredPosts.map((post) => (
            <li
              key={post._id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-blue-600">
                {post.title}
              </h2>
              <p className="text-gray-700">{post.content}</p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={deletePostMutation.status === "pending"}
                >
                  {deletePostMutation.status === "pending"
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
              <Link
                to={`/posts/${post._id}`}
                className="text-blue-600 hover:underline"
              >
                {`View post: ${post.title}`}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          {searchTerm ? "No posts match your search." : "No posts available."}
        </p>
      )}
    </div>
  );
};

export default Home;
