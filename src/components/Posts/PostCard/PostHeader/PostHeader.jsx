import { BsThreeDotsVertical } from "react-icons/bs";
import formatPostDate from "../postDate.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { useContext } from "react";
import { userContext } from "../../../../context/UserContext/UserContext.jsx";
import PostModal from "../../CreatePost/PostModal.jsx";
import { deletePost } from "../../../../services/api/post.api.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function PostHeader({ post, getAllPosts }) {
  const { userData } = useContext(userContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const removePost = async (postId) => {
    try {
      await deletePost(postId);
      getAllPosts();
      toast.success("Post Deleted Successfully", {
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-5 pb-3">
      <div className="flex items-center gap-3">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={post?.user?.photo || "/default-avatar.png"}
          alt={post?.user?.name || "User"}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20 cursor-pointer"
        />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white hover:underline cursor-pointer">
            {post?.user?.name || "Unknown User"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {post?.createdAt ? formatPostDate(post.createdAt) : "Unknown date"}
          </p>
        </div>
      </div>
      {userData?._id === post?.user?._id && (
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="cursor-pointer">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <BsThreeDotsVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </motion.button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="controlPost"
            variant="flat"
            className="dark:bg-gray-700"
          >
            <DropdownItem
              onClick={onOpen}
              key="editPost"
              color="primary"
              className="h-14 gap-2 dark:text-white"
            >
              <p className="font-semibold">Edit Post</p>
            </DropdownItem>
            <DropdownItem
              onClick={() => removePost(post._id)}
              key="deletePost"
              color="danger"
            >
              <p className="font-semibold">Delete Post</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      <PostModal
        post={post}
        getAllPosts={getAllPosts}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
    </div>
  );
}
