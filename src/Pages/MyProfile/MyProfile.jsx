import React, { use, useRef } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { user, updateUser } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: crntuser = {}, refetch } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const updateUserModalRef = useRef();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const openUpdateUserModal = (user) => {
    reset({
      name: user.displayName,
      photo: "",
    });
    updateUserModalRef.current.showModal();
  };

  const handleUpdateUser = async (data) => {
    const imageFile = data.photo[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const ImageApiURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Image_Host_Key
    }`;

    const imgRes = await axios.post(ImageApiURL, formData);
    const imageUrl = imgRes.data.data.url;

    const userData = {
      displayName: data.name,
      photoURL: imageUrl,
    };

    await updateUser({ displayName: data.name, imageUrl });

    axiosSecure.patch(`/users/${crntuser._id}`, userData).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        updateUserModalRef.current.close();
        refetch();
      }
    });
  };
    const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    duration: 0.6,
    ease: "easeOut"
  };
  
  return (
    
   <motion.div
      className="max-w-3xl mx-auto mt-10 min-h-screen"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="rounded-2xl shadow-xl p-8 bg-linear-to-br from-white via-green-50 to-green-100 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          <img
            src={crntuser?.photoURL}
            alt="profile"
            className="w-28 h-28 rounded-full shadow-md border-2 border-green-300"
          />

          <h2 className="text-3xl font-semibold flex items-center gap-2">
            {crntuser?.displayName}
          </h2>
          <p className="text-gray-700 text-lg">{crntuser?.email}</p>

          <div className="w-full border-t my-6 border-green-200"></div>

          <div className="w-full space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {crntuser?.displayName}
            </p>
            <p>
              <strong>Email:</strong> {crntuser?.email}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(crntuser?.createdAt).toDateString()}
            </p>
          </div>

          <div className="w-full border-t my-6 border-green-200"></div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openUpdateUserModal(crntuser)}
              className="btn bg-blue-600 text-white hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <dialog
        ref={updateUserModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="card bg-white w-full mx-auto max-w-sm shrink-0 shadow-2xl p-5">
            <h3 className="text-center font-semibold text-3xl">
              Update Profile
            </h3>
            <p className="text-center pt-3">
              Update your profile information below.
            </p>
            <form
              onSubmit={handleSubmit(handleUpdateUser)}
              className="card-body"
            >
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input bg-green-200"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is Required</p>
                )}

                <label className="label">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input bg-green-200"
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1">Photo is Required</p>
                )}

                <button type="submit" className="btn btn-neutral mt-4">
                  Update Profile
                </button>
              </fieldset>
            </form>
          </div>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => updateUserModalRef.current.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default MyProfile;
