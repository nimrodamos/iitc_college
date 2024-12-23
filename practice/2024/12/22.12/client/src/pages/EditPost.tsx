import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Post } from "../types/post";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axios.get<Post>(
        `http://localhost:5000/posts/${id}`
      );
      return data;
    },
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const updatePostMutation = useMutation({
    mutationFn: async (updatedPost: Post) => {
      const { data } = await axios.put(
        `http://localhost:5000/posts/${id}`,
        updatedPost
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // רענון רשימת הפוסטים
      navigate("/"); // חזרה לדף הבית
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePostMutation.mutate({ _id: id!, title, content });
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading post...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error loading post</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          disabled={updatePostMutation.status === "pending"}
        >
          {updatePostMutation.status === "pending"
            ? "Updating..."
            : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
