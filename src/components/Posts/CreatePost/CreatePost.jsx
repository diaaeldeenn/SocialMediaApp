import { Card, CardHeader, CardFooter, Divider, Image } from "@heroui/react";
import { Input } from "@heroui/react";
import { FaVideo } from "react-icons/fa6";
import { MdInsertPhoto } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { MdEmojiEmotions } from "react-icons/md";
import { useDisclosure } from "@heroui/react";
import PostModal from "./PostModal.jsx";
import { userContext } from "../../../context/UserContext/UserContext.jsx";
import { useContext } from "react";
import { motion } from "framer-motion";

export default function CreatePost({ getAllPosts }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userData } = useContext(userContext);


  if (!userData) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <CardHeader className="flex pb-4 gap-3">
            <Image
              alt="user avatar"
              height={44}
              radius="full"
              src={userData.photo}
              width={44}
              className="ring-2 ring-blue-500/20"
            />
            <Input
              onClick={onOpen}
              readOnly
              placeholder={`What's on your mind, ${userData.name}?`}
              type="text"
              classNames={{
                input: "cursor-pointer dark:text-white",
                inputWrapper:
                  "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors border-none",
              }}
              radius="full"
              size="lg"
            />
          </CardHeader>
          <Divider className="dark:bg-gray-700" />
          <CardFooter className="flex justify-around pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <FaVideo className="text-2xl text-red-500" />
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                Live
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <MdInsertPhoto className="text-2xl text-green-500" />
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                Photo
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <GoVideo className="text-2xl text-purple-500" />
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                Video
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <MdEmojiEmotions className="text-2xl text-yellow-500" />
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                Feeling
              </p>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
      <PostModal
        getAllPosts={getAllPosts}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
    </>
  );
}