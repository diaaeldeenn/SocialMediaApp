import {
  Navbar as NavUI,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Skeleton,
} from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { IoNotifications, IoMoon, IoSunny } from "react-icons/io5";
import { RiMessengerFill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../context/UserContext/UserContext.jsx";
import { useTheme } from "../../context/Theme/ThemeContext.jsx";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const { userData, isLoading } = useContext(userContext);
  const { theme, toggleTheme } = useTheme();

  function logOut() {
    localStorage.removeItem("userToken");
    navigate("/login", { replace: true });
  }

  return (
    <NavUI
      isBordered
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <NavbarBrand className="mr-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <p className="cursor-pointer font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Sphere
          </p>
        </motion.div>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex">
        <Input
          radius="full"
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small dark:text-white",
            inputWrapper:
              "h-full font-normal text-default-500 bg-gray-100 dark:bg-gray-700 border-none hover:bg-gray-200 dark:hover:bg-gray-600",
          }}
          placeholder="Search Sphere..."
          size="sm"
          startContent={<FiSearch className="text-xl text-gray-400" />}
          type="search"
        />
      </NavbarContent>

      <NavbarContent as="div" className="items-center gap-2" justify="end">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="cursor-pointer hidden sm:flex rounded-full bg-gray-100 dark:bg-gray-700 p-2.5 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {theme === "light" ? (
            <IoMoon className="text-xl text-gray-700 dark:text-gray-300" />
          ) : (
            <IoSunny className="text-xl text-yellow-400" />
          )}
        </motion.button>

        {/* Notifications */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-full bg-gray-100 dark:bg-gray-700 p-2.5 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Badge color="danger" content="5" size="sm" placement="top-right">
            <IoNotifications className="text-2xl text-gray-700 dark:text-gray-300" />
          </Badge>
        </motion.div>

        {/* Messages */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-full bg-gray-100 dark:bg-gray-700 p-2.5 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Badge color="danger" content="5" size="sm" placement="top-right">
            <RiMessengerFill className="text-2xl text-gray-700 dark:text-gray-300" />
          </Badge>
        </motion.div>

        {/* User Menu */}
        {isLoading || !userData ? (
          <Skeleton className="rounded-full w-8 h-8 dark:bg-gray-700" />
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger className="cursor-pointer">
              <Avatar
                isBordered
                as="button"
                className="transition-transform hover:scale-105"
                color="primary"
                name={userData.name}
                size="sm"
                src={userData.photo}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="dark:bg-gray-800"
            >
              <DropdownItem
                key="profile"
                className="h-14 gap-2 dark:text-white"
                textValue="User Info"
              >
                <p className="font-semibold dark:text-gray-300">Signed in as</p>
                <p className="font-semibold dark:text-gray-400">
                  {userData.email}
                </p>
              </DropdownItem>

              {isProfilePage && (
                <DropdownItem
                  key="home"
                  color="success"
                  onClick={() => navigate("/home")}
                  className="dark:text-white"
                >
                  Home
                </DropdownItem>
              )}

              {!isProfilePage && (
                <DropdownItem
                  key="settings"
                  color="primary"
                  onClick={() => navigate("/profile")}
                  className="dark:text-white"
                >
                  My Profile
                </DropdownItem>
              )}

              <DropdownItem key="logout" color="danger" onClick={logOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </NavUI>
  );
}
