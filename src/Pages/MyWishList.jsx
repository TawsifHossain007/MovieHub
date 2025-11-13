import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../Components/Loading/Loading";

const MyWishlist = () => {
  const [collection, setCollection] = useState([]);
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/collection?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCollection(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/collection/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Deleted from My Watchlist",
              icon: "success",
            });

            const remainingCollection = collection.filter(
              (coll) => coll._id !== id
            );
            setCollection(remainingCollection);
          }
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="w-11/12 mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Movie</th>
                <th>Director</th>
                <th>Release year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {collection.map((singleCol, index) => (
                <tr key={singleCol._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={singleCol.posterUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{singleCol.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {singleCol.director}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {singleCol.genre}
                    </span>
                  </td>
                  <td>{singleCol.releaseYear}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(singleCol._id)}
                      className="btn btn-primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;
