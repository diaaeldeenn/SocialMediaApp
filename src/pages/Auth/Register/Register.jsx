import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../../lib/schema/authSchema.js";
import { MdOutlineEmail } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState, useContext } from "react";
import { signUp } from "../../../services/api/auth.api.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { userContext } from "../../../context/UserContext/UserContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { refreshUserData } = useContext(userContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  const [eyeePassowrd, setEyeePassowrd] = useState(false);
  const [eyeeRePassowrd, setReEyeePassowrd] = useState(false);

  const setForms = async (formData) => {
    try {
      const res = await signUp(formData);
      const token = res.data.token;
      localStorage.setItem("userToken", token);
      toast.success("Account Created Successfully!", { position: "top-center" });
      refreshUserData();
      navigate("/login", { replace: true });
      reset();
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response.data.error, { position: "top-center" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 lg:p-10 backdrop-blur-lg border border-gray-100 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
            Join Sphere
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Create your account and start connecting
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(setForms)} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Input
              {...register("name")}
              errorMessage={errors.name?.message}
              isInvalid={Boolean(errors.name)}
              label="Full Name"
              placeholder="Enter your name"
              type="text"
              classNames={{
                input: "dark:text-white",
                label: "dark:text-gray-300",
                inputWrapper:
                  "dark:bg-gray-700 dark:border-gray-600 hover:dark:bg-gray-600",
              }}
              variant="bordered"
              size="lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Input
              {...register("email")}
              label="Email"
              placeholder="you@example.com"
              endContent={
                <MdOutlineEmail className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
              type="email"
              errorMessage={errors.email?.message}
              isInvalid={Boolean(errors.email)}
              classNames={{
                input: "dark:text-white",
                label: "dark:text-gray-300",
                inputWrapper:
                  "dark:bg-gray-700 dark:border-gray-600 hover:dark:bg-gray-600",
              }}
              variant="bordered"
              size="lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Input
              label="Password"
              placeholder="Enter your password"
              type={eyeePassowrd ? "text" : "password"}
              {...register("password")}
              errorMessage={errors.password?.message}
              isInvalid={Boolean(errors.password)}
              endContent={
                !eyeePassowrd ? (
                  <IoEye
                    className="text-2xl text-default-400 cursor-pointer shrink-0"
                    onClick={() => setEyeePassowrd(!eyeePassowrd)}
                  />
                ) : (
                  <IoEyeOff
                    className="text-2xl text-default-400 cursor-pointer shrink-0"
                    onClick={() => setEyeePassowrd(!eyeePassowrd)}
                  />
                )
              }
              classNames={{
                input: "dark:text-white",
                label: "dark:text-gray-300",
                inputWrapper:
                  "dark:bg-gray-700 dark:border-gray-600 hover:dark:bg-gray-600",
              }}
              variant="bordered"
              size="lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              type={eyeeRePassowrd ? "text" : "password"}
              {...register("rePassword")}
              errorMessage={errors.rePassword?.message}
              isInvalid={Boolean(errors.rePassword)}
              endContent={
                !eyeeRePassowrd ? (
                  <IoEye
                    className="text-2xl text-default-400 cursor-pointer shrink-0"
                    onClick={() => setReEyeePassowrd(!eyeeRePassowrd)}
                  />
                ) : (
                  <IoEyeOff
                    className="text-2xl text-default-400 cursor-pointer shrink-0"
                    onClick={() => setReEyeePassowrd(!eyeeRePassowrd)}
                  />
                )
              }
              classNames={{
                input: "dark:text-white",
                label: "dark:text-gray-300",
                inputWrapper:
                  "dark:bg-gray-700 dark:border-gray-600 hover:dark:bg-gray-600",
              }}
              variant="bordered"
              size="lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input
              type="date"
              {...register("dateOfBirth")}
              label="Birth Date"
              errorMessage={errors.dateOfBirth?.message}
              isInvalid={Boolean(errors.dateOfBirth)}
              classNames={{
                input: "dark:text-white",
                label: "dark:text-gray-300",
                inputWrapper:
                  "dark:bg-gray-700 dark:border-gray-600 hover:dark:bg-gray-600",
              }}
              variant="bordered"
              size="lg"
            />
            <Select
              {...register("gender")}
              errorMessage={errors.gender?.message}
              isInvalid={Boolean(errors.gender)}
              label="Gender"
              placeholder="Select gender"
              classNames={{
                trigger:
                  "dark:bg-gray-700 dark:border-gray-600 hover:dark:bg-gray-600",
                label: "dark:text-gray-300",
                value: "dark:text-white",
              }}
              variant="bordered"
              size="lg"
            >
              <SelectItem key="male">Male</SelectItem>
              <SelectItem key="female">Female</SelectItem>
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-2"
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              isLoading={isSubmitting}
            >
              Create Account
            </Button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="relative my-6"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Already have an account?
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            <Link
              to="/login"
              className="font-bold text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 text-center text-sm text-gray-500 dark:text-gray-500"
      >
        <p>
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </motion.div>
    </motion.div>
  );
}