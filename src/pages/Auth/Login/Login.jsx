import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { loginSchema } from "../../../lib/schema/authSchema.js";
import { signIn } from "../../../services/api/auth.api.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";


export default function Login() {
  const navigate = useNavigate();
  const [eyeePassowrd, setEyeePassowrd] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function setForms(formData) {
    try {
      const res = await signIn(formData);
      const token = res.data.token;
      localStorage.setItem("userToken", token);
      toast.success("Logged In Successfully", { position: "top-center" });
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response.data.error, { position: "top-center" });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Card Container */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 lg:p-10 backdrop-blur-lg border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
            Welcome Back!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Sign in to continue your journey
          </p>
        </motion.div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(setForms)}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
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
                inputWrapper: "dark:bg-gray-700 dark:border-gray-600 hover:dark:bg-gray-600",
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
                inputWrapper: "dark:bg-gray-700 dark:border-gray-600 hover:dark:bg-gray-600",
              }}
              variant="bordered"
              size="lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-2"
          >
            <Button
              isLoading={isSubmitting}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign In
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative my-8"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              New to Sphere?
            </span>
          </div>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              className="font-bold text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              to="/register"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500"
      >
        <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
      </motion.div>
    </motion.div>
  );
}