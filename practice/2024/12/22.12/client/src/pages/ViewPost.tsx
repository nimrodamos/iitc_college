import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Post } from "../types/post";

const fetchPostById = async (id: string): Promise<Post> => {
  const { data } = await axios.get<Post>(`http://localhost:5000/posts/${id}`);
  return data;
};

const ViewPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
  });

  // מוטציה למחיקת הפוסט
  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:5000/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const handleDelete = () => {
    if (id) {
      deletePostMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading post...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading post: {String(error)}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/"
        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 mb-4 inline-block"
      >
        Back to Home
      </Link>
      <div className="p-6 border rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post?.title}</h1>
        <p className="text-gray-700">{post?.content}</p>
        <div className="mt-6">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
            disabled={deletePostMutation.status === "pending"}
          >
            {deletePostMutation.status === "pending"
              ? "Deleting..."
              : "Delete Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
