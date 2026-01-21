import { useEffect, useState } from "react";
import MyPostHeader from "./PostHeader/MyPostHeader.jsx";
import MyPostBody from "./PostBody/MyPostBody.jsx";
import MyPostFooter from "./PostFooter/MyPostFooter.jsx";
import { motion } from "framer-motion";

export default function MyPostCard({ post, getPost }) {
  const [postComments, setPostComments] = useState("");
  useEffect(() => {
    setPostComments(post.comments);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors hover:shadow-md"
    >
      {/* Header */}
      <MyPostHeader getPost={getPost} post={post} />
      {/* Body */}
      <MyPostBody
        post={post}
        postComments={postComments}
        setPostComments={setPostComments}
      />
      {/* Comment input */}
      <MyPostFooter
        post={post}
        postComments={postComments}
        setPostComments={setPostComments}
      />
    </motion.div>
  );
}
