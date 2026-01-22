import { useContext, useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Input,
  Divider,
  Chip,
} from "@heroui/react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FiCamera, FiMail, FiCalendar, FiUser } from "react-icons/fi";
import { MdOutlineLock } from "react-icons/md";
import { userContext } from "../../context/UserContext/UserContext.jsx";
import {
  changePassword,
  getMyPosts,
  getProfile,
  updatePhoto,
} from "../../services/api/profile.api.js";
import PostSkeleton from "../../components/Posts/PostSkeleton/PostSkeleton.jsx";
import { toast } from "react-toastify";
import MyPost from "../../components/Posts/PostCard/MyPost/MyPost.jsx";
import CreatePostProfile from "../../components/Posts/CreatePost/CreatePostProfile/CreatePostProfile.jsx";
import { motion } from "framer-motion";

export default function Profile() {
  const { userData, setUserData, isLoading } = useContext(userContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const setPhoto = useRef("");
  const passwordInput = useRef("");
  const resetPasswordInput = useRef("");
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  const getPost = async () => {
    if (!userData?._id) return;
    setPostsLoading(true);
    try {
      const res = await getMyPosts(userData._id);
      setPosts(res.data?.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    if (userData?._id && !isLoading) {
      getPost();
    }
  }, [userData, isLoading]);

  const resetPassword = async () => {
    const passwordData = {
      password: passwordInput.current.value,
      newPassword: resetPasswordInput.current.value,
    };
    setLoading(true);
    try {
      await changePassword(passwordData);
      toast.success("Password Changed Successfully", {
        position: "top-center",
        theme: "colored",
      });
      passwordInput.current.value = "";
      resetPasswordInput.current.value = "";
    } catch (error) {
      console.log(error);
      toast.error("Failed To Change Password", {
        position: "top-center",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  function uploadPhoto() {
    setPhoto.current.click();
  }

  const addProfilePhoto = async () => {
    const photo = setPhoto.current.files[0];
    const formData = new FormData();
    formData.append("photo", photo);
    try {
      await updatePhoto(formData);
      const res = await getProfile();
      setUserData(res.data.user);
      toast.success("Photo Updated Successfully", {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || !userData) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-full max-w-xl p-4">
          <PostSkeleton />
        </div>
      </main>
    );
  }

  const user = {
    name: userData?.name || "",
    email: userData?.email || "",
    gender: userData?.gender || "",
    dateOfBirth: userData?.dateOfBirth || "",
    photo: userData?.photo || "",
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container p-4 lg:p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="relative h-48 md:h-64">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

            <div className="absolute -bottom-16 left-6 md:left-10 group">
              <Avatar
                isBordered
                color="primary"
                src={user.photo}
                className="w-32 h-32 md:w-40 md:h-40 text-large ring-4 ring-white dark:ring-gray-800 shadow-xl"
                showFallback
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={uploadPhoto}
                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <FiCamera className="text-lg" />
              </motion.button>
              <input
                onChange={addProfilePhoto}
                type="file"
                hidden
                ref={setPhoto}
                accept="image/*"
              />
            </div>
          </div>

          <div className="px-6 md:px-10 pb-6 pt-20 md:pt-8 md:pl-56">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  {user.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-2">
                  <FiMail className="text-blue-500" />
                  {user.email}
                </p>
              </div>
              <Chip
                variant="flat"
                color={user.gender === "male" ? "primary" : "secondary"}
                startContent={<FiUser className="text-sm" />}
                className="capitalize font-semibold"
                size="lg"
              >
                {user.gender}
              </Chip>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-16">
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="h-full"
            >
              <Card className=" h-full shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex gap-3 px-6 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <FiUser className="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        Profile Information
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Your personal details
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <Divider className="dark:bg-gray-700" />
                <CardBody className="px-6 py-6 space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} className="hover:shadow-md transition-all cursor-pointer flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                      <FiUser className="text-xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">
                        Full Name
                      </p>
                      <p className="text-gray-800 dark:text-white font-semibold mt-1">
                        {user.name}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="hover:shadow-md transition-all cursor-pointer flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl">
                      <FiMail className="text-xl text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">
                        Email Address
                      </p>
                      <p className="text-gray-800 dark:text-white font-semibold mt-1">
                        {user.email}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                      <FiCalendar className="text-xl text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                        Date of Birth
                      </p>
                      <p className="text-gray-800 dark:text-white font-semibold mt-1">
                        {user.dateOfBirth}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/50 rounded-xl">
                      <FiUser className="text-xl text-gray-900 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                        Gender
                      </p>
                      <p className="text-gray-800 dark:text-white font-semibold capitalize mt-1">
                        {user.gender}
                      </p>
                    </div>
                  </motion.div>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="h-full"
            >
              <Card className="h-full shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex gap-3 px-6 pt-6">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                    <MdOutlineLock className="text-2xl text-red-600 dark:text-red-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Change Password
                  </h2>
                </CardHeader>
                <CardBody className="px-6 py-6 flex flex-col justify-between gap-4">
                  <div className="space-y-10 grow flex flex-col">
                  <Input
                    label="Current Password"
                    ref={passwordInput}
                    type={showPassword ? "text" : "password"}
                    variant="bordered"
                    size="lg"
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <IoEye className="text-xl" />
                        ) : (
                          <IoEyeOff className="text-xl" />
                        )}
                      </button>
                    }
                  />
                  <Input
                    label="New Password"
                    ref={resetPasswordInput}
                    type={showRePassword ? "text" : "password"}
                    variant="bordered"
                    size="lg"
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowRePassword(!showRePassword)}
                      >
                        {showRePassword ? (
                          <IoEye className="text-xl" />
                        ) : (
                          <IoEyeOff className="text-xl" />
                        )}
                      </button>
                    }
                  />
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                    onPress={resetPassword}
                    isLoading={loading}
                  >
                    Update Password
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-3 space-y-6 mt-7">
            <CreatePostProfile getPost={getPost} />
          </div>

          <div className="lg:col-span-3 space-y-6 mt-7">
            <MyPost posts={posts} isLoading={postsLoading} getPost={getPost} />
          </div>
        </div>
      </div>
    </main>
  );
}
