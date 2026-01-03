import React, { use } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import SocialLogin from "../Register/SocialLogin/SocialLogin";
import { motion } from "framer-motion";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { signIn } = use(AuthContext);

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login Failed",
          text: err.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <motion.div
      className="card bg-linear-to-b from-blue-400 via-blue-600 to-blue-700 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-5"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 60,
      }}
    >
      <h3 className="text-center font-semibold text-3xl">
        Welcome back
      </h3>
      <p className="text-center">Please Login</p>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input bg-white text-black dark:bg-gray-700 dark:text-white"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-200 text-sm font-medium mt-1">
              Email is Required
            </p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input bg-white text-black dark:bg-gray-700 dark:text-white"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <p className="text-red-200 text-sm font-medium mt-1">
              Password must be 6 characters or longer
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p className="font-medium">
          New to Zapshift?{" "}
          <Link className="font-semibold" to={"/auth/register"}>
            Register
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </motion.div>
  );
};

export default Login;
