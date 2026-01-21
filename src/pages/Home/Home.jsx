import PostCard from "../../components/Posts/PostCard/PostCard.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useContext, useEffect, useState } from "react";
import { getAllPosts } from "../../services/api/post.api";
import PostSkeleton from "../../components/Posts/PostSkeleton/PostSkeleton.jsx";
import CreatePost from "../../components/Posts/CreatePost/CreatePost.jsx";
import { motion } from "framer-motion";
import { userContext } from "../../context/UserContext/UserContext.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userData, isLoading: userLoading } = useContext(userContext);

  async function fetchPosts() {
    setIsLoading(true);
    try {
      const res = await getAllPosts();
      setPosts(res.data?.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (userLoading || !userData) {
    return (
      <div className="container mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 hidden lg:block">
            <div className="h-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
          </div>
          <div className="col-span-1 lg:col-span-6 space-y-6">
            {[0, 1, 2].map((i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }else{
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block lg:col-span-3"
            >
              <Sidebar />
            </motion.div>
  
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1 lg:col-span-6 space-y-6"
            >
              <CreatePost getAllPosts={fetchPosts} />
  
              {isLoading
                ? [0, 1, 2, 3, 4].map((_, index) => <PostSkeleton key={index} />)
                : posts &&
                  posts.map((post) => (
                    <PostCard
                      getAllPosts={fetchPosts}
                      key={post._id}
                      post={post}
                    />
                  ))}
            </motion.div>
  
            {/* Right Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden xl:block lg:col-span-3"
            >
              <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Suggestions
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          User {item}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Suggested for you
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    );

  }
}
