import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Textarea,
  Divider,
} from "@heroui/react";
import { useRef, useState } from "react";
import { IoMdPhotos } from "react-icons/io";
import { MdEmojiEmotions, MdClose } from "react-icons/md";
import { createPost, updatePost } from "../../../services/api/post.api.js";
import { userContext } from "../../../context/UserContext/UserContext.jsx";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostModal({ isOpen, onOpenChange, getAllPosts, post }) {
  const fileInput = useRef("");
  const postInput = useRef("");
  const [selectedFile, setSelectedFile] = useState(post?.image || "");
  const [formDataImage, setFormDataImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(userContext);



  function chooseFile() {
    const file = fileInput.current.files[0];
    setSelectedFile(URL.createObjectURL(file));
    setFormDataImage(file);
  }

  const addPost = async () => {
    const formData = new FormData();
    if (postInput.current.value) {
      formData.append("body", postInput.current.value);
    }
    if (formDataImage) {
      formData.append("image", formDataImage);
    }
    setIsLoading(true);
    try {
      if (post) {
        await updatePost(post._id, formData);
      } else {
        await createPost(formData);
      }
      getAllPosts();
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      onClose={() => {
        setSelectedFile("");
      }}
      size="2xl"
      classNames={{
        base: "dark:bg-gray-800",
        header: "dark:bg-gray-800 dark:text-white border-b dark:border-gray-700",
        body: "dark:bg-gray-800",
        closeButton: "dark:text-white hover:bg-gray-700",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center text-xl font-bold">
              {!post ? "Create Post" : "Update Post"}
            </ModalHeader>
            <ModalBody className="p-6">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={userData?.photo}
                  className="w-12 h-12 rounded-full ring-2 ring-blue-500/20"
                  alt="user"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {userData?.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Public
                  </span>
                </div>
              </div>

              {/* Textarea */}
              <Textarea
                defaultValue={post?.body}
                ref={postInput}
                minRows={selectedFile ? 3 : 6}
                placeholder={`What's on your mind, ${userData?.name}?`}
                classNames={{
                  input: "dark:text-white text-lg",
                  inputWrapper:
                    "border-none shadow-none dark:bg-gray-800 hover:bg-transparent",
                }}
                variant="flat"
              />

              {/* Image Preview */}
              <AnimatePresence>
                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative my-4 rounded-2xl "
                  >
                    <img
                      src={selectedFile}
                      className="w-full rounded-2xl"
                      alt="preview"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedFile("");
                        setFormDataImage("");
                      }}
                      className="absolute top-4 right-4 bg-gray-800/70 hover:bg-gray-800/90 text-white p-2 rounded-full transition-colors"
                    >
                      <MdClose className="text-xl" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-between bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                    Add to your post:
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => fileInput.current.click()}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <IoMdPhotos className="text-2xl text-green-500" />
                  </motion.button>
                  <input
                    type="file"
                    hidden
                    ref={fileInput}
                    onChange={chooseFile}
                    accept=".jpg,.jpeg,.png"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <MdEmojiEmotions className="text-2xl text-yellow-500" />
                  </motion.button>
                </div>
              </div>
            </ModalBody>
            <Divider className="dark:bg-gray-700" />
            <div className="p-6">
              <Button
                isLoading={isLoading}
                onPress={addPost}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg h-12"
                radius="lg"
              >
                {!post ? "Post" : "Update"}
              </Button>
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}