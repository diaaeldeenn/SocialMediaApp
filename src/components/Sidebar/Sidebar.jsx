import { RiHome2Fill } from "react-icons/ri";
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { TfiTag } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { IoFlag } from "react-icons/io5";
import { motion } from "framer-motion";

const menuOptions = [
  {
    label: "Home",
    icon: <RiHome2Fill size={20} className="text-blue-500" />,
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    path: "/home",
  },
  {
    label: "Friends",
    icon: <FaUserFriends size={20} className="text-green-500" />,
    bgColor: "bg-green-500/10 dark:bg-green-500/20",
    path: "/friends",
  },
  {
    label: "Groups",
    icon: <FaUsers size={20} className="text-orange-500" />,
    bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
    path: "/groups",
  },
  {
    label: "Marketplace",
    icon: <FaStore size={20} className="text-violet-500" />,
    bgColor: "bg-violet-500/10 dark:bg-violet-500/20",
    path: "/marketplace",
  },
  {
    label: "Saved",
    icon: <TfiTag size={20} className="text-red-500" />,
    bgColor: "bg-red-500/10 dark:bg-red-500/20",
    path: "/saved",
  },
  {
    label: "Pages",
    icon: <IoFlag size={20} className="text-sky-500" />,
    bgColor: "bg-sky-500/10 dark:bg-sky-500/20",
    path: "/pages",
  },
  {
    label: "Favorites",
    icon: <RiHome2Fill size={20} className="text-gray-700 dark:text-gray-300" />,
    bgColor: "bg-gray-700/10 dark:bg-gray-300/20",
    path: "/favorites",
  },
];

const myGroups = [
  {
    groupIcon:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg",
    groupName: "Music Lovers",
  },
  {
    groupIcon:
      "https://images.pexels.com/photos/3182832/pexels-photo-3182832.jpeg?cs=srgb&dl=pexels-fauxels-3182832.jpg&fm=jpg",
    groupName: "Tech Innovators",
  },
  {
    groupIcon:
      "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?cs=srgb&dl=pexels-pixabay-414171.jpg&fm=jpg",
    groupName: "Travel Explorers",
  },
  {
    groupIcon:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?cs=srgb&dl=pexels-fauxels-3184418.jpg&fm=jpg",
    groupName: "Book Club",
  },
];

export default function Sidebar() {
  return (
    <div className="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      {/* Menu Options */}
      <div className="flex flex-col gap-1.5">
        {menuOptions.map((option, index) => (
          <motion.div
            key={option.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <NavLink
              to={option.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500/10 dark:bg-blue-500/20 shadow-sm"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <div className={`${option.bgColor} p-2.5 rounded-xl`}>
                {option.icon}
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {option.label}
              </span>
            </NavLink>
          </motion.div>
        ))}
      </div>

      {/* My Groups Section */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 px-2">
          My Groups
        </h2>
        <div className="space-y-2">
          {myGroups.map((group, index) => (
            <motion.div
              key={group.groupName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200"
            >
              <img
                src={group.groupIcon}
                alt={group.groupName}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-200 dark:ring-gray-600"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {group.groupName}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 px-2">
          © 2026 Sphere. All rights reserved.
        </p>
      </div>
    </div>
  );
}