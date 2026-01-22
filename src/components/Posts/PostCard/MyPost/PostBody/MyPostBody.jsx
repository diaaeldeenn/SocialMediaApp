import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { BiMessageRounded, BiShareAlt } from "react-icons/bi";
import CommentIconDetails from "../../../PostDetails/CommentIconDetails.jsx";
import { useDisclosure } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MyPostBody({ post, postComments,setPostComments  }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  return (
    <>
      {/* Post Content */}
      {post?.body && (
        <div className="px-5 pb-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">
          {post.body}
        </div>
      )}

      {/* Post Image */}
      {post?.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full"
        >
          <img
            src={post.image}
            className="w-full object-cover max-h-[600px] cursor-pointer hover:opacity-95 transition-opacity"
            alt="post"
            onClick={() => window.open(post.image, "_blank")}
          />
        </motion.div>
      )}

      {/* Actions Bar */}
      <div className="flex items-center gap-8 px-5 py-4 border-t border-b border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLiked(!isLiked)}
          className={`cursor-pointer flex items-center gap-2 transition-colors ${
            isLiked
              ? "text-red-500"
              : "hover:text-red-500 dark:hover:text-red-400"
          }`}
        >
          {isLiked ? (
            <AiFillHeart className="w-6 h-6" />
          ) : (
            <AiOutlineHeart className="w-6 h-6" />
          )}
          <span className="font-medium text-sm">1.2K</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="cursor-pointer flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <BiMessageRounded className="w-6 h-6" />
          <span className="font-medium text-sm">
            {postComments?.length || 0}
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 hover:text-green-500 dark:hover:text-green-400 transition-colors"
        >
          <BiShareAlt className="w-6 h-6" />
          <span className="font-medium text-sm">17</span>
        </motion.button>
      </div>

      <CommentIconDetails
        postComments={postComments}
        setPostComments={setPostComments}
        post={post}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
    </>
  );
}
