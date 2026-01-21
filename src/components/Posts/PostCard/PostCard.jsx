import PostHeader from "./PostHeader/PostHeader.jsx";
import PostBody from "./PostBody/PostBody.jsx";
import PostFooter from "./PostFooter/PostFooter.jsx";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PostCard({ post, getAllPosts }) {
  const [postComments, setPostComments] = useState("");
  
  useEffect(() => {
    setPostComments(post.comments);
  }, [post.comments]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors hover:shadow-md"
    >
      <PostHeader post={post} getAllPosts={getAllPosts} />
      <PostBody
        post={post}
        postComments={postComments}
        setPostComments={setPostComments}
      />
      <PostFooter
        post={post}
        postComments={postComments}
        setPostComments={setPostComments}
      />
    </motion.div>
  );
}