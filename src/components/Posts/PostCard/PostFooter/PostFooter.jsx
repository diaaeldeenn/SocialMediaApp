import { BiCamera } from "react-icons/bi";
import { BsEmojiSmile, BsThreeDotsVertical, BsFillSendFill } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import formatPostDate from "../postDate.js";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import PostDetails from "../../PostDetails/PostDetails.jsx";
import { useContext, useRef, useState } from "react";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../../../../services/api/comment.api.js";
import { userContext } from "../../../../context/UserContext/UserContext.jsx";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const DEFAULT_AVATAR =
  "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";

export default function PostFooter({ post, postComments, setPostComments }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userData } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const inputComment = useRef(null);
  const [sendComment, setSendComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const firstComment = postComments?.[0];

  const listenInput = () => {
    setSendComment(!!inputComment.current?.value);
  };

  const showComments = async () => {
    try {
      const res = await getComments(post?._id);
      setPostComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    if (!inputComment.current?.value) return;

    const commentData = {
      content: inputComment.current.value,
      post: post?._id,
    };

    setIsLoading(true);
    try {
      if (editingComment?._id) {
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
      await showComments();
      toast.success("Comment Deleted Successfully", {
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 p-5 border-b border-gray-100 dark:border-gray-700">
        <img
          src={userData?.photo || DEFAULT_AVATAR}
          alt="user"
          className="w-9 h-9 rounded-full ring-2 ring-blue-500/20 object-cover"
        />

        <input
          type="text"
          ref={inputComment}
          onChange={listenInput}
          placeholder="Write a comment..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />

        {sendComment && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              color="primary"
              isLoading={isLoading}
              onPress={addComment}
              size="sm"
              isIconOnly
              radius="full"
              className="min-w-10 h-10"
            >
              <BsFillSendFill className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <BiCamera className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <BsEmojiSmile className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </motion.button>
      </div>

      {firstComment && (
        <div className="p-5">
          <div className="flex items-start gap-3">
            <img
              src={
                firstComment?.commentCreator?.photo &&
                !firstComment.commentCreator.photo.includes("/undefined")
                  ? firstComment.commentCreator.photo
                  : DEFAULT_AVATAR
              }
              alt={firstComment?.commentCreator?.name || "User"}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
            />

            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                  {firstComment?.commentCreator?.name || "Unknown User"}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {firstComment?.content || ""}
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-4">
                {firstComment?.createdAt
                  ? formatPostDate(firstComment.createdAt)
                  : ""}
              </p>
            </div>

            {userData?._id === post?.user?._id &&
              userData?._id ===
                postComments?.[0]?.commentCreator?._id && (
                <Dropdown placement="left-start">
                  <DropdownTrigger className="cursor-pointer">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <BsThreeDotsVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </motion.button>
                  </DropdownTrigger>

                  <DropdownMenu
                    aria-label="controlComment"
                    variant="flat"
                    className="dark:bg-gray-700"
                  >
                    <DropdownItem
                      key="editComment"
                      onClick={() => {
                        setEditingComment(firstComment);
                        if (inputComment.current) {
                          inputComment.current.value = firstComment.content;
                          setSendComment(true);
                        }
                      }}
                      color="primary"
                      className="h-14 gap-2 dark:text-white"
                    >
                      <p className="font-semibold">Edit Comment</p>
                    </DropdownItem>

                    <DropdownItem
                      key="deleteComment"
                      onClick={() => removeComment(postComments?.[0]?._id)}
                      color="danger"
                    >
                      <p className="font-semibold">Delete Comment</p>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
          </div>

          {postComments?.length > 1 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={onOpen}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mt-4 mx-auto hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              View all {postComments.length} comments
              <IoChevronDown className="w-4 h-4" />
            </motion.button>
          )}

          <PostDetails
            postComments={postComments}
            post={post}
            setPostComments={setPostComments}
            onOpenChange={onOpenChange}
            isOpen={isOpen}
          />
        </div>
      )}
    </>
  );
}
