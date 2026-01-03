import React, { use } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router";

import Swal from "sweetalert2";
import axios from "axios";
import SocialLogin from "./SocialLogin/SocialLogin";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { createUser, updateUser } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];
    createUser(data.email, data.password)
      .then(() => {
        //store image and get photoURL
        const formdata = new FormData();
        formdata.append("image", profileImg);

        const ImageApiURL = `https://api.imgbb.com/1/upload?&key=${
          import.meta.env.VITE_Image_Host_Key
        }`;
        axios.post(ImageApiURL, formdata).then((res) => {
          const photoURL = res.data.data.url;

          //create user in database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };

          axiosSecure
            .post("/users", userInfo)
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });

          //update user profile in firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUser(userProfile)
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
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
        Welcome to MovieHub
      </h3>
      <p className="text-center pt-3">Please Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input bg-white text-black dark:bg-gray-300 dark:text-black"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-200 text-sm font-medium mt-1">
              Name is Required
            </p>
          )}

          {/* Photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input bg-white text-black dark:bg-gray-300 dark:text-black"
            placeholder="Your Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-200 text-sm font-medium mt-1">
              Photo is Required
            </p>
          )}

          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input bg-white text-black dark:bg-gray-300 dark:text-black"
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
            type="password "
            className="input bg-white text-black dark:bg-gray-300 dark:text-black"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
            })}
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-200 text-sm font-medium mt-1">
              Password is required
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-200 text-sm font-medium mt-1">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-200 text-sm font-medium mt-1">
              Password doesn't contain enough requirements
            </p>
          )}
          <button type="submit" className="btn btn-neutral mt-4">
            Register
          </button>
        </fieldset>
        <p className="font-medium">
          Already have an account?{" "}
          <Link className=" font-semibold" to={"/auth/login"}>
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
      </motion.div>
  );
};

export default Register;
