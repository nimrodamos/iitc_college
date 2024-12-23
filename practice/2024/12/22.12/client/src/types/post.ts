export type Post = {
  _id: string;
  title: string;
  content: string;
};

export type NewPost = Omit<Post, "_id">;
