import { BiCamera } from "react-icons/bi";
import {
  BsEmojiSmile,
  BsThreeDotsVertical,
  BsFillSendFill,
} from "react-icons/bs";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../../../../services/api/comment.api.js";
import { userContext } from "../../../../context/UserContext/UserContext.jsx";
import { toast } from "react-toastify";
import formatPostDate from "../postDate.js";
import { motion } from "framer-motion";

export default function PostAllcomment({ post, postComments, setPostComments }) {
  const inputComment = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [sendComment, setSendComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const { userData } = useContext(userContext);

  const listenInput = () => {
    setSendComment(inputComment.current.value !== "");
  };

  const showComments = async () => {
    try {
      const res = await getComments(post._id);
      setPostComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    const commentData = {
      content: inputComment.current.value,
      post: post._id,
    };

    setIsLoading(true);
    try {
      if (editingComment) {
        await updateComment(editingComment._id, commentData.content);
        setEditingComment(null);
        await showComments();
        toast.success("Comment Updated Successfully", {
          position: "bottom-right",
          theme: "colored",
        });
      } else {
        const res = await createComment(commentData);
        setPostComments(res.data.comments);
      }

      inputComment.current.value = "";
      setSendComment(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      showComments();
      toast.success("Comment Deleted Successfully", {
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {postComments?.map((comment) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <img
              src={
                comment.commentCreator.photo?.includes("/undefined")
                  ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                  : comment.commentCreator.photo
              }
              className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-600"
              alt="user"
            />

            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                  {comment.commentCreator?.name || "Unknown User"}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {comment.content || ""}
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-4">
                {comment.createdAt ? formatPostDate(comment.createdAt) : ""}
              </p>
            </div>

            {userData?._id === post?.user?._id &&
              userData?._id === comment?.commentCreator?._id && (
                <Dropdown placement="left-start">
                  <DropdownTrigger>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <BsThreeDotsVertical className="w-4 h-4 text-gray-500" />
                    </motion.button>
                  </DropdownTrigger>
                  <DropdownMenu className="dark:bg-gray-700">
                    <DropdownItem
                      onClick={() => {
                        setEditingComment(comment);
                        inputComment.current.value = comment.content;
                        setSendComment(true);
                      }}
                      key="editComment"
                      color="primary"
                      className="dark:text-white"
                    >
                      Edit Comment
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => removeComment(comment._id)}
                      key="deleteComment"
                      color="danger"
                    >
                      Delete Comment
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-3 p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <img
          src={userData?.photo}
          alt="user"
          className="w-9 h-9 rounded-full ring-2 ring-blue-500/20"
        />
        <input
          type="text"
          ref={inputComment}
          onChange={listenInput}
          placeholder="Write a comment..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
        />
        {sendComment && (
          <Button
            color="primary"
            isLoading={isLoading}
            onPress={addComment}
            size="sm"
            isIconOnly
            radius="full"
          >
            <BsFillSendFill className="w-4 h-4" />
          </Button>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <BiCamera className="w-5 h-5 text-gray-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <BsEmojiSmile className="w-5 h-5 text-gray-400" />
        </motion.button>
      </div>
    </div>
  );
}
